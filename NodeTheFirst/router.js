module.exports = function(writeResponse, routes) {
	routes = routes || [];

	function defaultHandler(write) {
		write({ statusCode: 200, content: "Hello, world!", contentType: "text/plain" });
	}

	function findHandler(pathname) {
		return routes.filter(function(rt) {
			return rt.path == pathname;
		}).map(function(rt) {
			return rt.handle;
		})[0] || defaultHandler;
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