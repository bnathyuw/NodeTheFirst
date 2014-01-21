var nodeunit = require("nodeunit");
var KittenEndpoint = require("../../NodeTheFirst/kittenEndpoint");
var Stub = require("../stub");

var writeResponse;

exports["When asked it if can handle calls to the kitten endpoint"] = nodeunit.testCase({
	"then it replies true when a kitten name is given": function(test) {
		test.expect(1);

		var kittenEndpoint = KittenEndpoint();

		var result = kittenEndpoint.canHandle({ pathname: "/kittens/fluffles" });

		test.ok(result);

		test.done();
	},
	"then it replies false when no kitten name is given": function(test) {
		test.expect(1);

		var kittenEndpoint = KittenEndpoint();

		var result = kittenEndpoint.canHandle({ pathname: "/kittens" });

		test.equal(result, false);

		test.done();
	}
});

exports["When we request a json response"] = nodeunit.testCase({
	"then we get a json response": function(test) {
		test.expect(1);

		var kittenEndpoint = KittenEndpoint();
		writeResponse = Stub();

		kittenEndpoint.handle({headers: { "accept": "application/json" } }, writeResponse);

		test.equal(writeResponse.getArgumentsFromLatestCall()[0].contentType, "application/json");

		test.done();
	}
});

exports["When we request an xml response"] = nodeunit.testCase({
	"then we get a json response": function(test) {
		test.expect(1);

		var kittenEndpoint = KittenEndpoint();
		writeResponse = Stub();

		kittenEndpoint.handle({headers: { "accept": "application/xml" } }, writeResponse);

		test.equal(writeResponse.getArgumentsFromLatestCall()[0].contentType, "application/xml");

		test.done();
	}
});

//exports["when I call the status endpoint"] = nodeunit.testCase({
//	setUp: function(callback) {
//		var statusEndpoint = StatusEndpoint();

//		writeResponse = Stub();

//		statusEndpoint.handle(writeResponse);

//		callback();
//	},

//	tearDown: function(callback) {
//		callback();
//	},

//	"then the response is written with the default values": function(test) {
//		test.expect(2);

//		test.equal(writeResponse.getNumberOfCalls(), 1);
//		test.deepEqual(writeResponse.getArgumentsFromLatestCall(), [{ statusCode: 200, content: "Status: OK", contentType: "text/plain" }]);

//		test.done();
//	}
//});