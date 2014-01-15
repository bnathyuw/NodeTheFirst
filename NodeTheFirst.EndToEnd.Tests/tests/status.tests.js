var nodeunit = require("nodeunit");
var http = require("http");

function hitStatusEndpoint(test, testResponse) {

	function callback(response) {
		testResponse(response);

		response.on("data", function() {
		});
		response.on("end", function() {
			test.done();
		});
	}
	
    var options = {
			host: "localhost",
			port: "1337",
			path: "/status"
		};

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

		hitStatusEndpoint(test, function(response) {
			var statusCode = response.statusCode;
			test.equal(statusCode, 200);
		});
	},

	"then the response is encoded as plain text": function(test) {
		test.expect(1);

		hitStatusEndpoint(test, function(response) {
			var contentType = response.headers["content-type"];
			test.equal(contentType, "text/plain");
		});
	}
});