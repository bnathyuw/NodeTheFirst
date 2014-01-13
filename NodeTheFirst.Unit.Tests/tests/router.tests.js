var router = require("../../NodeTheFirst/router.js");

exports.shouldWriteStatus = function(test) {
	test.expect(1);
	var status;

	function writeResponse(r, s) {
		status = s;
	}

	router(writeResponse).route("/", null);

	test.equal(status, 200, "Status");
	test.done();
};

exports.shouldPassThroughResponseForModification = function(test) {
	test.expect(1);
	var actualResponse;
	var response = { a: 1 };

	function writeResponse(r) {
		actualResponse = r;
	}

	router(writeResponse).route("/", response);

	test.equal(actualResponse, response, "Content");
	test.done();
};

exports.shouldWriteOutput = function(test) {
	test.expect(1);
	var content;

	function writeResponse(r, s, c) {
		content = c;
	}

	router(writeResponse).route("/", null);

	test.equal(content, "Hello, world!", "Content");
	test.done();
};