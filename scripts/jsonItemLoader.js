/**
 * Json loading function
 */
// Base Load JSON file function
function loadJSON(filePath, callBack) {
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open('GET', filePath, true);
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == "200") {
            callBack(request.responseText);
        }
    };
    request.send(null);
}

/**
 * JsonItemLoader module
 */
var jsonItemLoader = {};
jsonItemLoader['items'] = [];
jsonItemLoader.addItem = function(newItem) {
    jsonItemLoader['items'].push(newItem);
}
jsonItemLoader.getItems = function() {
    return jsonItemLoader['items'];
}
jsonItemLoader.loadFromJSON = function(filePath, objectProcessCallBack) {
    loadJSON(filePath, function(reseponse) {
        var actualJSON = JSON.parse(reseponse);
        for (var i = 0; i < actualJSON.length; i++) {
            objectProcessCallBack(actualJSON[i]);
        }
    })
};