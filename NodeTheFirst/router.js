module.exports = function(writeResponse, routes) {
	routes = routes || [];

	function defaultHandler(write) {
		write({ statusCode: 200, content: "Hello, world!", contentType: "text/plain" });
	}

	function findHandler(pathname) {
		for (var i = 0; i < routes.length; i++) {
			var r = routes[i];
			if (r.path == pathname) {
				return r.handle;
			}
		}
		return defaultHandler;
	}

	function route(pathname, response) {
		var handle = findHandler(pathname);

		handle(function(responseDetails) {
			writeResponse(response, responseDetails);
		});
	}

	return {
		route: route
	};
}