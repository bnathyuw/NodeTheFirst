var nodeunit = require("nodeunit");
var http = require("http");

function hitStatusEndpoint(test, testResponse, testContent) {

	function callback(response) {
		if(testResponse) testResponse(response);
		
		var content = "";
		response.on("data", function(chunk) {
			content += chunk;
		});
		response.on("end", function() {
			if (testContent) testContent(content);
			test.done();
		});
	}
	
    var options = {
			host: "localhost",
			port: "1337",
			path: "/unknown-endpoint"
		};

	http.request(options, callback).end();
}

exports["When I hit an unknown endpoint"] = nodeunit.testCase({
	setUp: function(callback) {
		callback();
	},

	tearDown: function(callback) {
		callback();
	},

	"then I get a 404 status code": function(test) {
		test.expect(1);

		hitStatusEndpoint(test, function(response) {
			var statusCode = response.statusCode;
			test.equal(statusCode, 404);
		});
	},

	"then the response is encoded as plain text": function(test) {
		test.expect(1);

		hitStatusEndpoint(test, function(response) {
			var contentType = response.headers["content-type"];
			test.equal(contentType, "text/plain");
		});
	},

	"then the response tells me the page wasn't found": function(test) {
		test.expect(1);

		hitStatusEndpoint(test, null, function(content) {
			test.equal(content, "Page not found");
		});
	}
});