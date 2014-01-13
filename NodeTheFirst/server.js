var http = require("http");
var url = require("url");

function start(route, writeResponse) {

	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;

		route(pathname, response, writeResponse);
	}

	http.createServer(onRequest).listen(1337);
}

exports.start = start;