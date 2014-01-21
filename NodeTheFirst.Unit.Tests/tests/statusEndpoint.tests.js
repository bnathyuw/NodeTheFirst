var nodeunit = require("nodeunit");
var StatusEndpoint = require("../../NodeTheFirst/statusEndpoint");
var Stub = require("../stub");

var writeResponse;

exports["when asked if it can handle calls to the status url"] = nodeunit.testCase({
		"then it replies true": function(test) {
			test.expect(1);

			var statusEndpoint = StatusEndpoint();

			var result = statusEndpoint.canHandle({ pathname: "/status" });

			test.ok(result);

			test.done();
		}
});

exports["when I call the status endpoint"] = nodeunit.testCase({
	setUp: function(callback) {
		var statusEndpoint = StatusEndpoint();

		writeResponse = Stub();

		statusEndpoint.handle({}, writeResponse);

		callback();
	},

	tearDown: function(callback) {
		callback();
	},

	"then the response is written with the default values": function(test) {
		test.expect(2);

		test.equal(writeResponse.getNumberOfCalls(), 1);
		test.deepEqual(writeResponse.getArgumentsFromLatestCall(), [{ statusCode: 200, content: "Status: OK", contentType: "text/plain" }]);

		test.done();
	}
});