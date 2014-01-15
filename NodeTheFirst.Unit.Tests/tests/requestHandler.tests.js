var nodeunit = require("nodeunit");
var RequestHandler = require("../../NodeTheFirst/requestHandler.js");

var actualPathname, actualResponse, pathname, suppliedRequest, suppliedResponse, requestHandler;

exports["on request"] = nodeunit.testCase({
	setUp: function(callback) {
		pathname = "def";
		suppliedRequest = { url: "abc" };
		suppliedResponse = { b: 2 };

        var parse = function(url) {
		    if (url === "abc") return { pathname: pathname };
			return "";
		};

		var route = function(pathname, response) {
			actualPathname = pathname;
			actualResponse = response;
		};
		
		requestHandler = RequestHandler(parse, route);
		requestHandler.handleRequest(suppliedRequest, suppliedResponse);

		callback();
	},

	tearDown: function(callback) {
		callback();
	},

	"should route the request": function(test) {
		test.expect(2);

		test.equal(actualPathname, pathname, "pathname");
		test.equal(actualResponse, suppliedResponse, "response");

		test.done();
	}
});