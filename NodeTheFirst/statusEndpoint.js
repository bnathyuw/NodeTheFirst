module.exports = function() {

	function canHandle(requestDetails) {
		return requestDetails.pathname === "/status";
	}

	function handle(writeResponse) {
		writeResponse({ statusCode: 200, content: "Status: OK", contentType: "text/plain" });
	}

	return {
        canHandle: canHandle,
		handle:handle
	};
}