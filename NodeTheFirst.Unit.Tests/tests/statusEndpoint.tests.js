var nodeunit = require("nodeunit");
var StatusEndpoint = require("../../NodeTheFirst/statusEndpoint");
var Stub = require("../stub");

var writeResponse;

exports["when I call the status endpoint"] = nodeunit.testCase({
	setUp: function(callback) {
		var statusEndpoint = StatusEndpoint();

		writeResponse = Stub();

		statusEndpoint.handle(writeResponse);

		callback();
	},

	tearDown: function(callback) {
		callback();
	},

	"then the response is written with the default values": function(test) {
		test.expect(2);

		test.equal(writeResponse.getNumberOfCalls(), 1);
		test.deepEqual(writeResponse.getArgumentsFromLatestCall(), [200, "Status: OK", "text/plain"]);

		test.done();
	}
});