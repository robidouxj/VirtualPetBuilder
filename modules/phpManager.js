ajax = {};
phpPath = "../php/";
function setphpPath(path) { phpPath = path; }

ajax.send = function (url, callback, method, data, async=true) {
    var x = new XMLHttpRequest();

    x.open(method, url, async);
    x.onreadystatechange = function () {
        if (x.readyState == 4) { callback(x.responseText) }
    };
    if (method == 'POST') { x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); }
    x.send(data)
};

ajax.get = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
};

ajax.post = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'POST', query.join('&'), async)
};

function getXML(xmlFile, fx) {
	url = './php/getXMLFile.php';
	data = {'filepath':xmlFile}
	ajax.post(url, data, fx);
}
