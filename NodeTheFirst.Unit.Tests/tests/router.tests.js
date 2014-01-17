var Router = require("../../NodeTheFirst/router.js");
var nodeunit = require("nodeunit");

(function() {
	var actualStatus, actualResponse, actualContent, suppliedResponse, actualContentType;

	exports["when I call an unconfigured route"] = nodeunit.testCase({
		setUp: function(callback) {
			suppliedResponse = { a: 1 };
			actualStatus = null;
			actualResponse = null;
			actualContent = null;
			
			var router = Router(function(r, s, c, ct) {
				actualResponse = r;
				actualStatus = s;
				actualContent = c;
				actualContentType = ct;
			});

			router.route("/", suppliedResponse);

			callback();
		},

		tearDown: function(callback) {
			callback();
		},

		"should pass through response for modification": function(test) {
			test.expect(1);

			test.equal(actualResponse, suppliedResponse);

			test.done();
		},

		"should write status": function(test) {
			test.expect(1);

			test.equal(actualStatus, 200);

			test.done();
		},

		"should write output": function(test) {
			test.expect(1);

			test.equal(actualContent, "Hello, world!");

			test.done();
		},

		"should write content type": function(test) {
			test.expect(1);

			test.equal(actualContentType, "text/plain");

			test.done();
		}
	});
})();

(function() {
	var suppliedResponse, suppliedContentType, suppliedContent, suppliedStatus, actualStatus, actualResponse, actualContent, actualContentType, actualArguments;

	exports["when I call a configured route"] = nodeunit.testCase({
		setUp: function(callback) {
			suppliedStatus = 123;
			suppliedContent = "Hi there";
			suppliedContentType = "text/gobbledigook";
			suppliedResponse = { a: 1 };    
			actualStatus = null;
			actualResponse = null;
			actualContent = null;
			actualContentType = null;
			
			var configuredHandler = function(write) {
				write(suppliedStatus, suppliedContent, suppliedContentType);
			};

			var routes = [{ path: "/here-i-am", handle: configuredHandler }];

			var router = Router(function(r, s, c, ct) {
				actualArguments = Array.prototype.slice.call(arguments);
				actualStatus = s;
				actualResponse = r;
				actualContent = c;
				actualContentType = ct;
			}, routes);

			router.route("/here-i-am", suppliedResponse);

			callback();
		},

		tearDown: function(callback) {
			callback();
		},

		"should call router with correct arguments": function(test) {
			test.expect(1);

			test.deepEqual(actualArguments, [suppliedResponse, suppliedStatus, suppliedContent, suppliedContentType]);

			test.done();
		}
	});
})();