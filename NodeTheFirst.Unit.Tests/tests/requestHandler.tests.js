var nodeunit = require("nodeunit");
var RequestHandler = require("../../NodeTheFirst/requestHandler");
var Stub = require("../stub");

var actualPathname, actualResponse, pathname, suppliedRequest, suppliedHeaders, suppliedResponse, requestHandler, route, parse;

exports["on request"] = nodeunit.testCase({
	setUp: function(callback) {
		pathname = "def";
		suppliedHeaders = { "foo": "bar" };
		suppliedRequest = { url: "abc", headers: suppliedHeaders };
		suppliedResponse = { b: 2 };

		parse = Stub(function(url) {
			return {
				pathname: url === "abc" ? pathname : ""
			};
		});

		route = Stub();

		requestHandler = RequestHandler(parse, route);
		requestHandler.handleRequest(suppliedRequest, suppliedResponse);

		callback();
	},

	tearDown: function(callback) {
		callback();
	},

	"should parse the url": function(test) {
		test.expect(2);

		test.equal(parse.getNumberOfCalls(), 1);
		test.deepEqual(parse.getArgumentsFromLatestCall(), [suppliedRequest.url]);

		test.done();

	},

	"should route the request": function(test) {
		test.expect(2);

		test.equal(route.getNumberOfCalls(), 1);
		test.deepEqual(route.getArgumentsFromLatestCall(), [{ pathname: pathname, headers: suppliedHeaders }, suppliedResponse]);

		test.done();
	}
});