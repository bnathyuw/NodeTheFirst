var StatusEndpoint = require("../../NodeTheFirst/statusEndpoint.js");
var nodeunit = require("nodeunit");

var suppliedResponse, actualStatus, actualContent, actualContentType;

exports["when I call the status endpoint"] = nodeunit.testCase({
	setUp: function(callback) {
		var statusEndpoint = StatusEndpoint();
		suppliedResponse = {};
		actualStatus = "";
			actualContent = "";
			actualContentType = "";

		function writeResponse(status, content, contentType) {
			actualStatus = status;
			actualContent = content;
			actualContentType = contentType;
		}

		statusEndpoint.handle(writeResponse);

		callback();
	},

	tearDown: function(callback) {
		callback();
	},

	"then I get a status of 200 ok": function(test) {
		test.expect(1);
		
		test.equal(actualStatus, 200);

		test.done();
	},
	
	"then I get a content type of plain text": function(test) {
		test.expect(1);

		test.equal(actualContentType, "text/plain");

		test.done();
	},
	
	"then I get the correct content": function(test) {
		test.expect(1);

		test.equal(actualContent, "Status: OK");

		test.done();
	}
});