module.exports = function(parse, route) {

	function onRequest(request, response) {
		var pathname = parse(request.url).pathname;

		route(pathname, response);
	}

	return {
		onRequest: onRequest
	};
};