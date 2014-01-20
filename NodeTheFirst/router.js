module.exports = function(writeResponse, routes) {
	routes = routes || [];

	function defaultHandler(write) {
		write({ statusCode: 200, content: "Hello, world!", contentType: "text/plain" });
	}

	function findHandler(requestDetails) {
		return routes.filter(function(rt) {
			return rt.path == requestDetails.pathname;
		}).map(function(rt) {
			return rt.handle;
		})[0] || defaultHandler;
	}

	function route(requestDetails, response) {
		var handle = findHandler(requestDetails);

		handle(function(responseDetails) {
			writeResponse(response, responseDetails);
		});
	}

	return {
		route: route
	};
}