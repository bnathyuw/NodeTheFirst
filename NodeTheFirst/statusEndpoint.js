module.exports = function() {

	function handle() {
		return {
			statusCode: 200,
			contentType: "text/plain",
			content: "Status: OK"
		};
	}

	return {
		handle:handle
	};
}