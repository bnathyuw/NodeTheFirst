module.exports = function(http, port, onRequest) {

	function start() {
		http.createServer(onRequest).listen(port);
	}

	return {
		start: start
	};
}