module.exports = function() {

	function handle(writeResponse) {
		writeResponse({ statusCode: 200, content: "Status: OK", contentType: "text/plain" });
	}

	return {
        path: "/status",
		handle:handle
	};
}