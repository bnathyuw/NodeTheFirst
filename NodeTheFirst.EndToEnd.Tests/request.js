var http = require("http");

module.exports = function(options) {

	function getResponse(testResponse) {

		function callback(response) {
			var content = "";
			response.on("data", function(chunk) {
				content += chunk;
			});
			response.on("end", function() {
				testResponse({
					statusCode: response.statusCode,
					headers: response.headers,
					content: content
				});
			});
		}
		
		http.request(options, callback).end();
	}

	return {
		getResponse: getResponse
	};
}