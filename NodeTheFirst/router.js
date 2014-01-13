function route(pathname, response, writeResponse) {
	writeResponse(response, 200, "Hello, world!");
}

exports.route = route;