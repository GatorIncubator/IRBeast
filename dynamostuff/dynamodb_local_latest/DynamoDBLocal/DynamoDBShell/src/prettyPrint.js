/**
 * Created by goldwate on 4/11/2014.
 */

$(document).on('click', 'li:has(ul)', function (event) {
    REPLIT.jqconsole.Disable();
    if (this === event.target) {
        $(this).css('list-style-image',
            (!$(this).children().is(':hidden')) ? 'url(images/plusbox.gif)' : 'url(images/minusbox.gif)');
        $(this).children().toggle('slow');
    }
    return false;
});

var wireMachine = {
    "Items":
    {
        "type":"array",
        "isWire": false 
    },

    "Key":
    {
        "*":
        {
            "type": "item",
            "isWire": false 
        }
    },

    "Item":
    {
        "type": "item",
        "isWire": false 
    },

    "ExclusiveStartKey":
    {
        "*":
        {
            "type": "item",
            "isWire": false 
        }
    },

    "RequestItems" :
    {
        "*":
        {
            "Keys":
            {
                "type": "array",
                "isWire": false 
            },

            "DeleteRequest":
            {
                "Key":
                {
                    "type": "item",
                    "isWire": false 
                }
            },

            "PutRequest":
            {
                "Item":
                {
                    "type": "item",
                    "isWire": false
                }
            }
        }
    },

    "Responses":
    {
        "*":
        {
            "type":"array",
            "isWire": false 
        }
    },

    "UnprocessedKeys":
    {
        "*":
        {
            "Keys":
            {
                "type":"array",
                "isWire": false 
            }
        }
    },

    "Attributes":
    {
        "*":
        {
            "type":"item",
            "isWire": false
        }
    },

    "ItemCollectionMetrics":
    {
        "ItemCollectionKey":
        {
            "*":
            {
                "type":"item",
                "isWire": false
            }
        }
    }
};

var jsonPrettyPrint = function (obj, isWire) {
    var div = document.createElement('div');
    var $div = $(div);
    div.className = "ppOutput";
    var list = document.createElement('ul');
    div.appendChild(list);

    try {
        if (isWire) {
            wireFrameJson(obj, list, "", true);
        } else {
            mixedJson(obj, list, false, wireMachine);
        }
    } catch (e){
        $div.innerHTML = JSON.stringify(obj);
    }

    $div.find('li:has(ul)')
        .css({cursor:'pointer', 'list-style-image':'url(images/minusbox.gif)'});

    $div.find('li:not(:has(ul))')
        .css({cursor:'default', 'list-style-image':'none'});

    return $div;
};

/* logic to parse DynamoDB wire-frame format*/
function wireFrameJson(obj, root, type, first){
    var back = false;
    ProcessJson(obj, root, type, first);
    function ProcessJson(obj, root, type, first) {
        for (var prop in obj) {
            var li = document.createElement('li');
            li.innerHTML = JSON.stringify(prop);
            li.className = "fieldName";

            if (first) {
                li.className = "objectValue";
                if (back) {
                    root.parentNode.appendChild(li);
                    back = false;
                }
                else {
                    root.appendChild(li);
                }

                li.innerHTML += " { ";
                root = li;
                ProcessJson(obj[prop], root, "", false);
            }

            if (["SS", "NS", "BS", "M", "L"].indexOf(prop) > -1) {
                var newUl = document.createElement('ul');
                switch (prop) {
                    case "SS":
                        newUl.className = "stringSet";
                        break;
                    case "NS":
                        newUl.className = "numberSet";
                        break;
                    case "BS":
                        newUl.className = "binarySet";
                        break;
                    case "M":
                        newUl.className = "mapValue";
                        break;
                    case "L":
                        newUl.className = "listValue";
                        break;
                }
                root.appendChild(newUl);
                root = newUl;
                ProcessJson(obj[prop], root, prop, false);
            }

            if (["SS", "NS", "BS", "M", "L"].indexOf(type) > -1) {
                var newLi = document.createElement('li');
                var newUl = document.createElement('ul');
                switch (type) {
                    case "SS":
                        root.appendChild(newLi);
                        newLi.className = "stringValue";
                        newLi.innerHTML += JSON.stringify(obj[prop]);
                        newLi.innerHTML += " (String Set)";
                        break;
                    case "NS":
                        root.appendChild(newLi);
                        newLi.className = "numberValue";
                        newLi.innerHTML += Number(obj[prop]);
                        break;
                    case "BS":
                        newLi.className = "binaryValue";
                        root.appendChild(newLi);
                        newLi.innerHTML += "(binary)" + JSON.stringify(obj[prop]);
                        break;
                    case "M":
                        newLi.className = "objectValue";
                        newLi.innerHTML = prop + " { ";

                        if (back) {
                            root.parentNode.appendChild(newLi);
                            back = false;
                        }
                        else
                            root.appendChild(newLi);
                        root = newLi;
                        break;
                    case "L":
                        newLi.className = "arrayValue";
                        newLi.innerHTML = prop+": { ";
                        if (back) {
                            root.parentNode.appendChild(newLi);
                            back = false;
                        }
                        else
                            root.appendChild(newLi);
                        root = newLi;
                        break;
                }
                ProcessJson(obj[prop], root, prop, false);
            }

            if (["S", "N", "B", "BO", "NU"].indexOf(prop) > -1) {
                var span = document.createElement('span');
                switch (prop) {
                    case "S":
                        span.className = "stringValue";
                        span.innerHTML += ":" + JSON.stringify(obj.S);
                        break;
                    case "N":
                        span.className = "numberValue";
                        span.innerHTML += ":" + Number(obj.N);
                        break;
                    case "B":
                        span.className = "binaryValue";
                        span.innerHTML += ":" + "(binary)" + JSON.stringify(obj.B);
                        break;
                    case "BO":
                        span.className = "booleanValue";
                        span.innerHTML += ":" + JSON.stringify(obj.BO);
                        break;
                    case "NU":
                        span.className = "nullValue";
                        span.innerHTML += ":" + "null";
                        break;
                }
                root.className = "fieldName";
                root.innerHTML = root.innerHTML.substr(0, root.innerHTML.length - 3);
                root.appendChild(span);
            }
        }
        back = true;
    }
}

/* Logic to move back and forth between wire-frame and regular JSON */
function mixedJson(obj, root, skip, machine){
    var back = false;
    ProcessJson(obj, root, skip, machine);
    function ProcessJson(obj, root, skip, machine) {
        for (var prop in obj) {
            var li = document.createElement('li');
            var nextMachine = null;
            li.innerHTML = JSON.stringify(prop);
            li.className = "fieldName";

            if(machine != null && machine.hasOwnProperty("isWire") && machine.isWire === true){
                if(machine.type === "array"){
                    for(var num in obj)
                    {
                        var newLi = document.createElement('li');
                        newLi.className = "objectValue";
                        newLi.innerHTML = num + ": { ";
                        root.appendChild(newLi);
                        var newUl = document.createElement('ul');
                        newLi.appendChild(newUl);
                        root = newUl;
                        wireFrameJson(obj[num], root, "", true);
                        root = root.parentNode.parentNode;
                    }
                }
                else{
                    wireFrameJson(obj, root, "", true);
                    root = root.parentNode.parentNode;
                }
                back = true;
                return;
            }

            if(machine != null && machine.hasOwnProperty(prop)){
                nextMachine = machine[prop];
            }
            else if (machine != null && machine.hasOwnProperty("*")){
                nextMachine = machine["*"];
            }
            else
            {
                nextMachine = null;
            }

            if ((obj[prop] instanceof Object)) {

                if (Array.isArray(obj[prop])) {
                    li.className = "arrayValue";
                    li.innerHTML += " [ ";
                }
                else{
                    li.className = "objectValue";
                    if(skip)
                        li.innerHTML = prop + ": { ";
                    else
                        li.innerHTML += " { ";
                }

                var nextSkip = false;
                var newUl = document.createElement('ul');

                if (back) {
                    root.parentNode.parentNode.appendChild(li);
                } else {
                    root.appendChild(li);
                }
                li.appendChild(newUl);
                root = newUl;

                if (Array.isArray(obj[prop])) {
                    nextSkip = true;
                }
                back = false;
                ProcessJson(obj[prop], root, nextSkip, nextMachine);
            } else {
                if (!back && root.parentNode.className == "arrayValue")
                    li.innerHTML = JSON.stringify(obj[prop]);
                else if (back && root.parentNode.parentNode.className == "arrayValue")
                    li.innerHTML = JSON.stringify(obj[prop]);
                else{
                    var span = document.createElement('span');
                    span.className = "fieldName";
                    span.innerHTML = li.innerHTML;
                    li.innerHTML = "";
                    li.appendChild(span);
                    li.innerHTML += ":" + (JSON.stringify(obj[prop]));
                }

                switch (typeof obj[prop]) {

                    case "boolean":
                        li.className = "booleanValue";
                        break;
                    case "number":
                        li.className = "numberValue";
                        break;
                    case "string":
                        li.className = "stringValue";
                        break;
                    case "object":
                        li.className = "nullValue";
                        break;
                }
                if (back) {
                    root.parentNode.parentNode.appendChild(li);
                }
                else {
                    root.appendChild(li);
                }
            }
        }
        back = true;
    }
}
