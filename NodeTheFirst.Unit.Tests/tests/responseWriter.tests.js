var responseWriter = require("../../NodeTheFirst/responseWriter.js");

exports.shouldWriteStatusToHead = function(test) {
	test.expect(1);
	var status;
	var response = {
		writeHead: function(s) {
			status = s;
		},
		write: function() {
		},
		end: function() {
		}
	};

	responseWriter().writeResponse(response, 200, "blah");

	test.equal(status, 200, "Status");

	test.done();
};
exports.shouldSetCorrectContentType = function(test) {
	test.expect(1);
	var contentType;
	var response = {
		writeHead: function(s, h) {
			contentType = h["Content-Type"];
		},
		write: function() {
		},
		end: function() {
		}
	};

	responseWriter().writeResponse(response, 200, "blah");

	test.equal(contentType, "text/plain", "Content Type");

	test.done();
};

exports.shouldSetCorrectContent = function(test) {
	test.expect(1);
	var content;
	var response = {
		writeHead: function() {
		},
		write: function(c) {
			content = c;
		},
		end: function() {
		}
	};

	responseWriter().writeResponse(response, 200, "blah");

	test.equal(content, "blah", "Content");

	test.done();
};

exports.shouldEndResponse = function(test) {
	test.expect(1);
	var wasEnded;
	var response = {
		writeHead: function() {
		},
		write: function() {
		},
		end: function() {
			wasEnded = true;
		}
	};

	responseWriter().writeResponse(response, 200, "blah");

	test.equal(wasEnded, true, "Was ended");

	test.done();
};