module.exports = function(writeResponse, routes) {
    routes = routes || [];

	function defaultHandler(write) {
		write(200, "Hello, world!", "text/plain");
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

		handle(function(status, content, contentType) {
			writeResponse(response, status, content, contentType);
		});
	}

	return {
		route: route
	};
}