(function (global) {
  // Window is self in worker. Self is window in iframe.
  // Try for Firefox, which doesn't have a setter for these properties
  try {
    global.window = global.window || global;
  } catch (e) { }
  try {
    global.self = global.self || global; 
  } catch (e) { }
  
  
  var Sandboss;
  
  // Messaging.
  var msg_handler = function (e) {
    var message = JSON.parse(e.data),
        current = Sandboss,
        parts = message['type'].split('.');
    
    // Route message.
    for (var i = 0; i < parts.length; i++) {
      current = current[parts[i]];
    }
    
    current(message.data)
  };
  global.addEventListener('message', msg_handler, false);
  
  // Dummy console for some scripts would think there is one.
  (function () {
    var noop = function () {};
    var methods = ['debug', 'error', 'info', 'log',
                  'warn', 'dir', 'dirxml', 'trace',
                  'assert', 'count', 'markTimeline', 
                  'profile', 'profileEnd', 'time', 
                  'timeEnd', 'timeStamp', 'group', 
                  'groupCollapsed', 'groupEnd'];

    if (typeof console === 'undefined') {
      global.console = {};
    }

    for (var i = 0; i < methods.length; i++) {
      if (typeof global.console[methods[i]] !== 'function') {
        try{
          global.console[methods[i]] = noop;
        } catch (e) {}
      }
    }
  })();  
  
  
  // Sandbox controller.
  Sandboss = {
    outTimeout: 0,
    output_buffer: [],
    OUT_EVERY_MS: 50,
    syncTimeout: Infinity,
    isFrame : typeof document !== 'undefined',
    // Responsible for posting messages.
    post: function (msg) {
      var msgStr = JSON.stringify(msg);
      if (this.isFrame) {
        // Window communication require additional origin argument.
        window.parent.postMessage(msgStr, '*');
      } else {
        self.postMessage(msgStr);
      }
    },
    // Import an array of scripts.
    importScripts: function (scriptsArr) {
      this.progress(50);
      var reqs = [],
          totalSize = 0,
          lastLoadedTable = [],
          totalUpdated = [],
          totalLoaded = 0,
          that = this,
          XHR = XMLHttpRequest || ActiveXObject('Microsoft.XMLHTTP');

      var updateSize = function (req) {
        if (totalUpdated.indexOf(req) === -1){
          totalUpdated.push(req);
          totalSize += parseInt(req.getResponseHeader('X-Raw-Length'), 10);
        }
      };

      var updateProgressCreator = function (index) {
        return function (e) {
          var loaded = e.loaded || e.position,
              lastLoaded = lastLoadedTable[index] || 0;

          lastLoadedTable[index] = loaded;
          totalLoaded += loaded - lastLoaded;
          var percentageDone = (totalLoaded / totalSize) * 100;
          if (totalUpdated.length === scriptsArr.length) {
           that.progress(percentageDone); 
          }
        };
      };

      var finished = scriptsArr.length;
      var finish = function (e) {
        var i;
        if (finished === 0) {
          for (i = 0; i < reqs.length; i++) {
            (self.execScript || function(data) {
                    self['eval'].call(self, data);
            })(reqs[i].responseText);
          }
          that.engine = new self.JSREPLEngine(that.input, that.out, that.result, that.err, self, that.ready);
          that.bindAll(Sandboss.engine);
          that.hide('JSREPLEngine');
        }
      };
      for (var i = 0; i < scriptsArr.length; i++){
        (function (i) {
          reqs[i] = new XHR();
          if (reqs[i].addEventListener) {
            reqs[i].addEventListener('progress', updateProgressCreator(i), false);
          }
          reqs[i].onprogress = updateProgressCreator(i);
          reqs[i].onreadystatechange = function () {
            if (reqs[i].readyState === 2) {
              updateSize(reqs[i]);
            } else if (reqs[i].readyState === 4) {
              finished--;
              finish();
            }
          };
          reqs[i].open('GET', scriptsArr[i], true);
          reqs[i].send(null);
        })(i);
      }
    },
    // Outbound output.
    out: function (text) {
      var that = this;
      this.output_buffer.push(text);
      if (this.outTimeout === 0) {
        this.outTimeout = setTimeout(this.flush, this.OUT_EVERY_MS);
        this.syncTimeout = Date.now();
      } else if (Date.now() - this.syncTimeout > this.OUT_EVERY_MS) {
        clearTimeout(this.outTimeout);
        this.flush();
      }
    },
    flush: function () {
      if (!this.output_buffer.length) return;
      var message = {
        type: 'output',
        data: this.output_buffer.join('')
      };
      this.post(message);
      this.outTimeout = 0;
      this.output_buffer = [];
    },
    // Outbound errors.
    err: function (e) {
      var message = {
        type: 'error',
        data: e.toString()
      };
      this.flush();
      this.post(message);
    },
    // Outbound input.
    input: function (callback) {
      // Incoming input would call "Sandboss.input.write", hence its our continuation callback.
      this.input.write = callback;
      var message = {
        type: 'input'
      };
      this.flush();
      this.post(message);
    },
    result: function (data) {
      var message = {
        type: 'result',
        data: data
      };
      this.flush();
      this.post(message);
    },
    // Outbound language ready function.
    ready: function (data) {
      var message = {
        type: 'ready'
      };
      this.post(message);
    },
    // Inbound/Outbound getNextLineIndent.
    // Gets the nextline indent and sends it in an 'indent' message.
    getNextLineIndent: function (data) {
      // Get line indent
      var indent = this.engine.GetNextLineIndent(data);
      var message = {
        type: 'indent',
        data: indent
      };
      this.post(message);
    },
    progress: function (data) {
      var message = {
        type: 'progress',
        data: data
      };
      this.post(message);
    },
    dbInput: function () {
      var message = {
        type: 'db_input'
      };
      this.flush();
      this.post(message);
    },
    serverInput: function () {
      var message = {
        type: 'server_input'
      };
      this.flush();
      this.post(message);
    },
    // Bind all methods to its owner object.
    bindAll: function (obj) {
      for (var method in obj) {
        (function (method) {
          var fn = obj[method];
          if (typeof fn == "function") {
            obj[method] = function () {
              var args = [].slice.call(arguments);
              return fn.apply(obj, args);
            };
          }
        })(method);
      }
    },
    // Try to hide and secure stuff.
    hide: function (prop) {
      try {
        Object.defineProperty(global, prop, {
          writable: false,
          enumerable: false,
          configurable: false,
          value: global[prop]
        }); 
      } catch (e) {}
    },

    set_input_server: function (settings) {
      this.input_server = {
        url: (settings.url || '/emscripten/input/') + settings.input_id,
        cors: settings.cors || false
      };
    },

    outputAce: function (data) {
        var message = {
            type: 'aceInjection',
            data: data
        };
        this.post(message);
    },

    dumpHtml: function (data){
        var message = {
            type: 'outputHtml',
            data: data
        };
        this.post(message);
    },

    tutorialResult: function (resultObj){
        var message = {
            type: 'tutResult',
            data: resultObj
        };
        this.post(message);
    }
  };
  
  // Bind all the sand minions to the SANDBOSS!! MWAHAHAHA
  Sandboss.bindAll(Sandboss);
  global.Sandboss = Sandboss;
  Sandboss.hide('Sandboss');
  
  var createRequest = function (method, url, isCors){
    var xhr = new XMLHttpRequest();
    if (isCors) {
      if ("withCredentials" in xhr) {
        xhr.open(method, url, false);
      } else if (typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        xhr.open(method, url);
      } else {
        throw new Error('Your browser doesn\' support CORS');
      }
    } else {
      xhr.open(method, url, false);
    }
    return xhr;
  }

  // Synchronous input for emscripted languages.
  if (self.openDatabaseSync) {
    var DB = self.openDatabaseSync('replit_input', '1.0', 'Emscripted input', 1024);
    self.prompt = function () {
      Sandboss.dbInput();
      var t = null;
      DB.transaction(function (tx) {t=tx});
      var i, j, res;
      while (!(res = t.executeSql('SELECT * FROM input').rows).length) {
        for (i = 0; i < 100000000; i++);
      }
      t.executeSql('DELETE FROM input');
      return res.item(0).text;
    }
    Sandboss.hide('prompt');
  } else if (!Sandboss.isFrame) {
    self.prompt = function () {
      Sandboss.serverInput();
      var req = createRequest('GET', Sandboss.input_server.url, Sandboss.input_server.cors);
      req.send(null);

      if (req.status === 200) {  
        return req.responseText;
      } else {
        return 'ERROR: ON NON-WEBKIT BROWSERS CONNECTION TO THE SERVER IS NEEDED FOR INPUT';
      }
    };
  }
})(this);;
/**
  @preserve
  Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
  All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions
  are met:

    1. Redistributions of source code must retain the above copyright
       notice, this list of conditions and the following disclaimer.

    2. Redistributions in binary form must reproduce the above copyright
       notice, this list of conditions and the following disclaimer in the
       documentation and/or other materials provided with the distribution.

    3. The names of its contributors may not be used to endorse or promote
      products derived from this software without specific prior written
       permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
  "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
  A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

  Any feedback is very welcome.
  http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
  email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/
/*
  I've wrapped Makoto Matsumoto and Takuji Nishimura's code in a namespace
  so it's better encapsulated. Now you can have multiple random number generators
  and they won't stomp all over eachother's state.

  If you want to use this as a substitute for Math.random(), use the random()
  method like so:

  var m = new MersenneTwister();
  var randomNumber = m.random();

  You can also call the other genrand_{foo}() methods on the instance.

  If you want to use a specific seed in order to get a repeatable random
  sequence, pass an integer into the constructor:

  var m = new MersenneTwister(123);

  and that will always produce the same random sequence.

  Sean McCullough (banksean@gmail.com)
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.

   Before using, initialize the state by using init_genrand(seed)
   or init_by_array(init_key, key_length).

*/

(function () {
  var MersenneTwister = function(seed) {
    if (seed == undefined) {
      seed = Date.now();
    }
    /* Period parameters */
    this.N = 624;
    this.M = 397;
    this.MATRIX_A = 0x9908b0df;   /* constant vector a */
    this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
    this.LOWER_MASK = 0x7fffffff; /* least significant r bits */

    this.mt = new Array(this.N); /* the array for the state vector */
    this.mti=this.N+1; /* mti==N+1 means mt[N] is not initialized */

    this.init_genrand(seed);
  };

  /* initializes mt[N] with a seed */
  MersenneTwister.prototype.init_genrand = function(s) {
    this.mt[0] = s >>> 0;
    for (this.mti=1; this.mti<this.N; this.mti++) {
        var s = this.mt[this.mti-1] ^ (this.mt[this.mti-1] >>> 30);
     this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)
    + this.mti;
        /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
        /* In the previous versions, MSBs of the seed affect   */
        /* only MSBs of the array mt[].                        */
        /* 2002/01/09 modified by Makoto Matsumoto             */
        this.mt[this.mti] >>>= 0;
        /* for >32 bit machines */
    }
  };

  /* initialize by an array with array-length */
  /* init_key is the array for initializing keys */
  /* key_length is its length */
  /* slight change for C++, 2004/2/26 */
  MersenneTwister.prototype.init_by_array = function(init_key, key_length) {
    var i, j, k;
    this.init_genrand(19650218);
    i=1; j=0;
    k = (this.N>key_length ? this.N : key_length);
    for (; k; k--) {
      var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30)
      this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525)))
        + init_key[j] + j; /* non linear */
      this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
      i++; j++;
      if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
      if (j>=key_length) j=0;
    }
    for (k=this.N-1; k; k--) {
      var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30);
      this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941))
        - i; /* non linear */
      this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
      i++;
      if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
    }

    this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
  };

  /* generates a random number on [0,0xffffffff]-interval */
  MersenneTwister.prototype.genrand_int32 = function() {
    var y;
    var mag01 = new Array(0x0, this.MATRIX_A);
    /* mag01[x] = x * MATRIX_A  for x=0,1 */

    if (this.mti >= this.N) { /* generate N words at one time */
      var kk;

      if (this.mti == this.N+1)   /* if init_genrand() has not been called, */
        this.init_genrand(5489); /* a default initial seed is used */

      for (kk=0;kk<this.N-this.M;kk++) {
        y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
        this.mt[kk] = this.mt[kk+this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      for (;kk<this.N-1;kk++) {
        y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
        this.mt[kk] = this.mt[kk+(this.M-this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      y = (this.mt[this.N-1]&this.UPPER_MASK)|(this.mt[0]&this.LOWER_MASK);
      this.mt[this.N-1] = this.mt[this.M-1] ^ (y >>> 1) ^ mag01[y & 0x1];

      this.mti = 0;
    }

    y = this.mt[this.mti++];

    /* Tempering */
    y ^= (y >>> 11);
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= (y >>> 18);

    return y >>> 0;
  };

  /* generates a random number on [0,0x7fffffff]-interval */
  MersenneTwister.prototype.genrand_int31 = function() {
    return (this.genrand_int32()>>>1);
  };

  /* generates a random number on [0,1]-real-interval */
  MersenneTwister.prototype.genrand_real1 = function() {
    return this.genrand_int32()*(1.0/4294967295.0);
    /* divided by 2^32-1 */
  };

  /* generates a random number on [0,1)-real-interval */
  MersenneTwister.prototype.random = function() {
    return this.genrand_int32()*(1.0/4294967296.0);
    /* divided by 2^32 */
  };

  /* generates a random number on (0,1)-real-interval */
  MersenneTwister.prototype.genrand_real3 = function() {
    return (this.genrand_int32() + 0.5)*(1.0/4294967296.0);
    /* divided by 2^32 */
  };

  /* generates a random number on [0,1) with 53-bit resolution*/
  MersenneTwister.prototype.genrand_res53 = function() {
    var a=this.genrand_int32()>>>5, b=this.genrand_int32()>>>6;
    return(a*67108864.0+b)*(1.0/9007199254740992.0);
  };

  /* These real versions are due to Isaku Wada, 2002/01/09 added */
  /** jsREPL **/
  (function() {
    Math._random = Math.random;
    var M = new MersenneTwister(42);
    Math.random = function() {
      return M.random();
    };
    Math.seed = function(s) {
      M = new MersenneTwister(s);
    };
  })();
})()
;
if (!Date.now) {
  Date.now = function now() {
    return +new Date();
  };
}

if (!Object.keys) {
  Object.keys = function(o) {
    if (o !== Object(o)) throw new TypeError('Object.keys called on non-object');
    var ret = [];
    for (var p in o) if (Object.prototype.hasOwnProperty.call(o,p)) ret.push(p);
    return ret;
  };
}

if (!Object.getOwnPropertyNames) {
  Object.getOwnPropertyNames = Object.keys;
}

if (!Object.create) {
  Object.create = function(o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}

if (!Array.isArray) {
  Array.isArray = function(a) {
    return {}.toString.call(a) == '[object Array]';
  };
}

if (!Function.prototype.bind) {  
  
  Function.prototype.bind = function (oThis) {  
  
    if (typeof this !== "function") // closest thing possible to the ECMAScript 5 internal IsCallable function  
      throw new TypeError("Function.prototype.bind - what is trying to be fBound is not callable");  
  
    var aArgs = Array.prototype.slice.call(arguments, 1),   
        fToBind = this,   
        fNOP = function () {},  
        fBound = function () {  
          // Fix for safari not allowing instanceof to be called on an undefined prototype;
          try {
            return fToBind.apply(this instanceof fNOP ? this : oThis || window, aArgs.concat(Array.prototype.slice.call(arguments))); 
          } catch (e) {
            return fToBind.apply(oThis || window, aArgs.concat(Array.prototype.slice.call(arguments))); 
          }
        };  
  
    fNOP.prototype = this.prototype;  
    fBound.prototype = new fNOP();  
  
    return fBound;  
  
  };  
  
}
if (!Object.freeze) {
  Object.freeze = function( obj ) {
    return obj.___frozen___ = true;
  };
}

if (!Object.isFrozen) {
  Object.isFrozen = function ( obj ) {
    return Boolean(obj.___frozen___);
  }
}