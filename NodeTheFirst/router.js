module.exports = function(writeResponse) {

	function route(pathname, response) {
		writeResponse(response, 200, "Hello, world!", "text/plain");
	}

	return {
		route: route
	};
}