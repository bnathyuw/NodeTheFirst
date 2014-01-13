var requestHandler = require("../../NodeTheFirst/requestHandler.js");

exports.shouldRouteTheRequest = function(test) {
	test.expect(2);
	var actualPathname;
	var actualResponse;
	var pathname = "def";
	var request = { url: "abc" };
	var response = { b: 2 };

	var parse = function(url) {
		if (url === "abc") return { pathname: pathname };
		return "";
	};
	
	var route = function(p, r) {
		actualPathname = p;
		actualResponse = r;
	};

	requestHandler(parse, route).onRequest(request, response);

	test.equal(actualPathname, pathname, "pathname");
	test.equal(actualResponse, response, "response");
	test.done();
}