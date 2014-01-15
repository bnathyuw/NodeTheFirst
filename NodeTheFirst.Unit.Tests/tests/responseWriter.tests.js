var nodeunit = require('nodeunit');
var ResponseWriter = require("../../NodeTheFirst/responseWriter.js");

var status, contentType, content, wasEnded;

exports["write response"] = nodeunit.testCase({
	setUp: function(callback) {
		status = null;
		contentType = null;
		content = null;
		wasEnded = false;
		
        this.response = {
			writeHead: function(s, h) {
				status = s;
				contentType = h["Content-Type"];
			},
			write: function(c) {
				content = c;
			},
			end: function() {
				wasEnded = true;
			}
		};

		var responseWriter = ResponseWriter();
		
		responseWriter.writeResponse(this.response, 200, "blah", "text/html");

		callback();
	},

	tearDown: function(callback) {
		callback();
	},

	"should write status to head": function(test) {
		test.expect(1);

		test.equal(status, 200, "Status");

		test.done();
	},

	"should set correct content type": function(test) {
		test.expect(1);
	
		test.equal(contentType, "text/html", "Content Type");

		test.done();
	},

	"should set correct content": function(test) {
		test.expect(1);

		test.equal(content, "blah", "Content");

		test.done();
	},

	"should end response": function(test) {
		test.expect(1);

		test.equal(wasEnded, true, "Was ended");

		test.done();
	}
});