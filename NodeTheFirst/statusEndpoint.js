module.exports = function() {

	function handle(writeResponse) {
		writeResponse(200, "Status: OK", "text/plain");
	}

	return {
        path: "/status",
		handle:handle
	};
}