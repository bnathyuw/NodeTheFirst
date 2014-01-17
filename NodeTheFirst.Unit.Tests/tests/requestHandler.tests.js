var nodeunit = require("nodeunit");
var RequestHandler = require("../../NodeTheFirst/requestHandler");
var Stub = require("../stub");

var actualPathname, actualResponse, pathname, suppliedRequest, suppliedResponse, requestHandler, route, parse;

exports["on request"] = nodeunit.testCase({
	setUp: function(callback) {
		pathname = "def";
		suppliedRequest = { url: "abc" };
		suppliedResponse = { b: 2 };

		parse = Stub(function(url) {
			if (url === "abc") return { pathname: pathname };
			return "";
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
		test.deepEqual(route.getArgumentsFromLatestCall(), [pathname, suppliedResponse]);

		test.done();
	}
});