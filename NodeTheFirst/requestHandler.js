module.exports = function(parse, route) {

	function handleRequest(request, response) {
		var pathname = parse(request.url).pathname;

		route({ pathname: pathname }, response);
	}

	return {
		handleRequest: handleRequest
	};
};