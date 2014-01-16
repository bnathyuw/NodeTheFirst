module.exports = function(writeResponse, routes) {
	routes = routes || [];

    function defaultHandler(response, write) {
	    write(response, 200, "Hello, world!", "text/plain");
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
		console.log(routes);
		var handler = findHandler(pathname);
		handler(response, writeResponse);
	}

	return {
		route: route
	};
}