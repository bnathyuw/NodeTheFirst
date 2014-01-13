var nodeunit = require('nodeunit');
var ResponseWriter = require("../../NodeTheFirst/responseWriter.js");

var status, contentType, content, wasEnded, responseWriter;

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

		responseWriter = ResponseWriter();

		callback();
	},

	tearDown: function(callback) {
		callback();
	},

	"should write status to head": function(test) {
		test.expect(1);

		responseWriter.writeResponse(this.response, 200, "blah");

		test.equal(status, 200, "Status");

		test.done();
	},

	"should set correct content type": function(test) {
		test.expect(1);
	
		responseWriter.writeResponse(this.response, 200, "blah");

		test.equal(contentType, "text/plain", "Content Type");

		test.done();
	},

	"should set correct content": function(test) {
		test.expect(1);

		responseWriter.writeResponse(this.response, 200, "blah");

		test.equal(content, "blah", "Content");

		test.done();
	},

	"should end response": function(test) {
		test.expect(1);

		responseWriter.writeResponse(this.response, 200, "blah");

		test.equal(wasEnded, true, "Was ended");

		test.done();
	}
});