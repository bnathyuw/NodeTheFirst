var StatusEndpoint = require("../../NodeTheFirst/statusEndpoint.js");
var nodeunit = require("nodeunit");

var result;

exports["when I call the status endpoint"] = nodeunit.testCase({
	setUp: function(callback) {

		var statusEndpoint = StatusEndpoint();

		result = statusEndpoint.handle();

		callback();
	},

	tearDown: function(callback) {
		callback();
	},

	"then I get a status of 200 ok": function(test) {
		test.expect(1);
		
		test.equal(result.statusCode, 200);

		test.done();
	},
	
	"then I get a content type of plain text": function(test) {
		test.expect(1);

		test.equal(result.contentType, "text/plain");

		test.done();
	},
	
	"then I get the correct content": function(test) {
		test.expect(1);

		test.equal(result.content, "Status: OK");

		test.done();
	}
});