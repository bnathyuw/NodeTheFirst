var nodeunit = require("nodeunit");
var http = require("http");
var Request = require("../request");

var request;

exports["When I hit an unknown endpoint"] = nodeunit.testCase({
	setUp: function(callback) {
		request = Request({
			host: "localhost",
			port: "1337",
			path: "/unknown-endpoint"
		});
		callback();
	},

	tearDown: function(callback) {
		callback();
	},

	"then I get a 404 status code": function(test) {
		test.expect(1);

		request.getResponse(function(response) {
			var statusCode = response.statusCode;
			test.equal(statusCode, 404);
			test.done();
		});
	},

	"then the response is encoded as plain text": function(test) {
		test.expect(1);

		request.getResponse(function(response) {
			var contentType = response.headers["content-type"];
			test.equal(contentType, "text/plain");
			test.done();
		});
	},

	"then the response tells me the page wasn't found": function(test) {
		test.expect(1);

		request.getResponse(function(response) {
			test.equal(response.content, "Page not found");
			test.done();
		});
	}
});