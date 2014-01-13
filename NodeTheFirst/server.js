var http = require("http");
var url = require("url");

function start(route) {

	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		function writeResponse(status, content) {
			response.writeHead(status, { "Content-Type": "text/plain" });
			response.write(content);
			response.end();
		}

		route(pathname, writeResponse);
	}

	http.createServer(onRequest).listen(1337);

	console.log("Server has started.");
}

exports.start = start;