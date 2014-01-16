module.exports = function(writeResponse, routes) {
	routes = routes || [];

	function route(pathname, response) {
		console.log(routes);
		
        for (var i = 0; i < routes.length; i++) {
	        var r = routes[i];
	        console.log(r);
	        if (r.path == pathname) {
		        r.handle(response, writeResponse);
		        return;
	        }
        }
        
		writeResponse(response, 200, "Hello, world!", "text/plain");
	}

	return {
		route: route
	};
}