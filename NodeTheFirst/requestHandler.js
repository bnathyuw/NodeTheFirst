module.exports = function(parse, route) {

	function handleRequest(request, response) {
		var pathname = parse(request.url).pathname;

		route(pathname, response);
	}

	return {
		handleRequest: handleRequest
	};
};