var nodeunit = require("nodeunit");
var Request = require("../request");
var xml2js = require("xml2js");

var request;

exports["When I retrieve a resource as json"] = nodeunit.testCase({
	setUp: function(callback) {
		request = Request({
			host: "localhost",
			port: "1337",
			path: "/kittens/fluffles",
			headers: {
				"accept": "application/json"
			}
		});
		callback();
	},

	tearDown: function(callback) {
		callback();
	},

	"then I get a 200 ok status code": function(test) {
		test.expect(1);

		request.getResponse(function(response) {
			var statusCode = response.statusCode;
			test.equal(statusCode, 200);
			test.done();
		});
	},

	"then the content type is json": function(test) {
		test.expect(1);

		request.getResponse(function(response) {
			var contentType = response.headers["content-type"];
			test.equal(contentType, "application/json");
			test.done();
		});
	},

	"then the resource is serialised as json": function(test) {
		test.expect(2);

		request.getResponse(function(response) {
			var parsedResource;
			test.doesNotThrow(function() {
				parsedResource = JSON.parse(response.content);
			});
			test.deepEqual(parsedResource, { "name": "Fluffles", "favouriteThing": "balls of wool" });
			
			test.done();
		});
	}
});

exports["When I retrieve a resource as xml"] = nodeunit.testCase({
	setUp: function(callback) {
		request = Request({
			host: "localhost",
			port: "1337",
			path: "/kittens/fluffles",
			headers: {
				"accept": "application/xml"
			}
		});
		callback();
	},

	tearDown: function(callback) {
		callback();
	},

	"then I get a 200 ok status code": function(test) {
		test.expect(1);

		request.getResponse(function(response) {
			var statusCode = response.statusCode;
			test.equal(statusCode, 200);
			test.done();
		});
	},

	"then the content type is xml": function(test) {
		test.expect(1);

		request.getResponse(function(response) {
			var contentType = response.headers["content-type"];
			test.equal(contentType, "application/xml");
			test.done();
		});
	},

	"then the resource is serialised as xml": function(test) {
		test.expect(2);

		request.getResponse(function(response) {
			test.doesNotThrow(function() {
				xml2js.parseString(response.content, function(err, parsedResource) {
					test.ifError(err);
					test.deepEqual(parsedResource, { kitten: { name: ["Fluffles"], favouriteThing: ["balls of wool"] } });
					test.done();
				});
			});
		});
	}
});