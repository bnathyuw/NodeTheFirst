var Router = require("../../NodeTheFirst/router.js");
var nodeunit = require("nodeunit");

var status, actualResponse, content, suppliedResponse;

exports["route"] = nodeunit.testCase({
	setUp: function(callback) {
		status = null;
		actualResponse = null;
		content = null;
		suppliedResponse = { a: 1 };

		var router = Router(function(r, s, c) {
			status = s;
			actualResponse = r;
			content = c;
		});

		router.route("/", suppliedResponse);

		callback();
	},

	tearDown: function(callback) {
		callback();
	},

	"should write status": function(test) {
		test.expect(1);

		test.equal(status, 200, "Status");

		test.done();
	},

	"should pass through response for modification": function(test) {
		test.expect(1);

		test.equal(actualResponse, suppliedResponse, "Content");

		test.done();
	},

	"should write output": function(test) {
		test.expect(1);

		test.equal(content, "Hello, world!", "Content");

		test.done();
	}
});