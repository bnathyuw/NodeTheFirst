module.exports = function() {

	function handle(response, writeResponse) {
		writeResponse(response, 200, "Status: OK", "text/plain");
	}

	return {
		handle:handle
	};
}