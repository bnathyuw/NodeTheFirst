var nodeunit = require("nodeunit");
var KittenEndpoint = require("../../NodeTheFirst/kittenEndpoint");
var Stub = require("../stub");
var xml2js = require("xml2js");

var writeResponse;

exports["When asked it if can handle calls to the kitten endpoint"] = nodeunit.testCase({
	"then it replies true when a kitten name is given": function(test) {
		test.expect(1);

		var kittenEndpoint = KittenEndpoint();

		var result = kittenEndpoint.canHandle({ pathname: "/kittens/fluffles" });

		test.ok(result);

		test.done();
	},
	"then it replies false when no kitten name is given": function(test) {
		test.expect(1);

		var kittenEndpoint = KittenEndpoint();

		var result = kittenEndpoint.canHandle({ pathname: "/kittens" });

		test.equal(result, false);

		test.done();
	}
});

exports["When we request a json response"] = nodeunit.testCase({
	"then the content type is json": function(test) {
		test.expect(1);

		var kittenEndpoint = KittenEndpoint();
		writeResponse = Stub();

		kittenEndpoint.handle({headers: { "accept": "application/json" } }, writeResponse);

		test.equal(writeResponse.getArgumentsFromLatestCall()[0].contentType, "application/json");

		test.done();
	},
	
    "then the response is encoded as json":function(test) {
		test.expect(1);

		var kittenEndpoint = KittenEndpoint();
		writeResponse = Stub();

		kittenEndpoint.handle({headers: { "accept": "application/json" } }, writeResponse);
	    var content = writeResponse.getArgumentsFromLatestCall()[0].content;
	    var parsedContent = JSON.parse(content);
	    test.deepEqual(parsedContent, {name:"Fluffles", favouriteThing:"balls of wool"});

		test.done();    
    }
});

exports["When we request an xml response"] = nodeunit.testCase({
	"then the content type is xml": function(test) {
		test.expect(1);

		var kittenEndpoint = KittenEndpoint();
		writeResponse = Stub();

		kittenEndpoint.handle({headers: { "accept": "application/xml" } }, writeResponse);

		test.equal(writeResponse.getArgumentsFromLatestCall()[0].contentType, "application/xml");

		test.done();
	},
	
    "then the response is encoded as xml": function(test) {
		test.expect(1);

		var kittenEndpoint = KittenEndpoint();
		writeResponse = Stub();

		kittenEndpoint.handle({headers: { "accept": "application/xml" } }, writeResponse);
	    var content = writeResponse.getArgumentsFromLatestCall()[0].content;
	    test.doesNotThrow(function() {
		    xml2js.parseString(content, function(err, result) {
			    test.deepEqual(result, { kitten: { name: ["Fluffles"], favouriteThing: ["balls of wool"] } });
			    test.done();
		    });
	    });
	}
});