var nodeunit = require("nodeunit");
var http = require("http");

var options = {
	host: "localhost",
	port: "1337",
	path: "/status"
};

function hitStatusEndpoint(testResponse) {
	function callback(response) {
		var content = "";
		response.on("data", function(chunk) {
			content += chunk;
		});
		response.on("end", function() {
			if (testResponse) testResponse({
				statusCode: response.statusCode,
				headers: response.headers,
				content: content
			});
		});
	}

	http.request(options, callback).end();
}

exports["When I hit the status endpoint"] = nodeunit.testCase({
	setUp: function(callback) {
		callback();
	},

	tearDown: function(callback) {
		callback();
	},

	"then I get a 200 status code": function(test) {
		test.expect(1);

		hitStatusEndpoint(function(response) {
			var statusCode = response.statusCode;
			test.equal(statusCode, 200);
			test.done();
		});
	},

	"then the response is encoded as plain text": function(test) {
		test.expect(1);

		hitStatusEndpoint(function(response) {
			var contentType = response.headers["content-type"];
			test.equal(contentType, "text/plain");
			test.done();
		});
	},

	"then the response contains the status": function(test) {
		test.expect(1);

		hitStatusEndpoint(function(response) {
			test.equal(response.content, "Status: OK");
			test.done();
		});
	}
});