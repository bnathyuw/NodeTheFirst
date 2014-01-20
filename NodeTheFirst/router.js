module.exports = function(writeResponse, routes) {
	routes = routes || [];

	function handleUnroutedRequest(write) {
		write({ statusCode: 404, content: "Page not found", contentType: "text/plain" });
	}

	function findHandler(requestDetails) {
		return routes.filter(function(rt) {
			return rt.canHandle(requestDetails);
		}).map(function(rt) {
			return rt.handle;
		})[0] || handleUnroutedRequest;
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