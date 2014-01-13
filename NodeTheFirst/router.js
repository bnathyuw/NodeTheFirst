function route(pathname, writeResponse) {
	console.log("About to route a request for " + pathname);
	writeResponse(200, "Hello, world!");
}

exports.route = route;