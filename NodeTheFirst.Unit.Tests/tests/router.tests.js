var nodeunit = require("nodeunit");
var Router = require("../../NodeTheFirst/router");
var Stub = require("../stub");

(function() {
	var suppliedResponse, writeContent;

	exports["when I call an unconfigured route"] = nodeunit.testCase({
		setUp: function(callback) {
			suppliedResponse = { a: 1 };

			writeContent = Stub();

			var router = Router(writeContent);

			router.route("/", suppliedResponse);

			callback();
		},

		tearDown: function(callback) {
			callback();
		},

		"should write content correctly": function(test) {
			test.expect(2);

			test.equal(writeContent.getNumberOfCalls(), 1);
			test.deepEqual(writeContent.getArgumentsFromLatestCall(), [suppliedResponse, 200, "Hello, world!", "text/plain"]);

			test.done();
		}
	});
})();

(function() {
	var suppliedResponse, suppliedContentType, suppliedContent, suppliedStatus, writeContent;

	exports["when I call a configured route"] = nodeunit.testCase({
		setUp: function(callback) {
			suppliedResponse = { a: 1 };
			suppliedStatus = 123;
			suppliedContent = "Hi there";
			suppliedContentType = "text/gobbledigook";
			
			var configuredHandler = function(write) {
				write(suppliedStatus, suppliedContent, suppliedContentType);
			};

			var routes = [{ path: "/here-i-am", handle: configuredHandler }];

			writeContent = Stub();
			
			var router = Router(writeContent, routes);

			router.route("/here-i-am", suppliedResponse);

			callback();
		},

		tearDown: function(callback) {
			callback();
		},

		"should write content correctly": function(test) {
			test.expect(2);

			test.equal(writeContent.getNumberOfCalls(), 1);
			test.deepEqual(writeContent.getArgumentsFromLatestCall(), [suppliedResponse, suppliedStatus, suppliedContent, suppliedContentType]);

			test.done();
		}
	});
})();