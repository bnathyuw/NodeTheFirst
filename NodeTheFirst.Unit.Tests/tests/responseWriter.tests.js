var nodeunit = require('nodeunit');
var ResponseWriter = require("../../NodeTheFirst/responseWriter");
var Stub = require("../stub");

var response;

exports["write response"] = nodeunit.testCase({
	setUp: function(callback) {
		
        response = {
			writeHead: Stub(),
			write: Stub(),
			end: Stub()
		};

		var responseWriter = ResponseWriter();
		
		responseWriter.writeResponse(response, { statusCode: 200, content: "blah", contentType: "text/html" });

		callback();
	},

	tearDown: function(callback) {
		callback();
	},

	"should set correct content type": function(test) {
		test.expect(2);

		test.equal(response.writeHead.getNumberOfCalls(), 1);
		test.deepEqual(response.writeHead.getArgumentsFromLatestCall(), [200, { "Content-Type": "text/html" }]);

		test.done();
	},

	"should set correct content": function(test) {
		test.expect(2);

		test.equal(response.write.getNumberOfCalls(), 1);
		test.deepEqual(response.write.getArgumentsFromLatestCall(), ["blah"]);

		test.done();
	},

	"should end response": function(test) {
		test.expect(1);

		test.equal(response.end.getNumberOfCalls(), 1);

		test.done();
	}
});