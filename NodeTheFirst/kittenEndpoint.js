module.exports = function() {

	function canHandle(requestDetails) {
		return /\/kittens\/(.*)/.test(requestDetails.pathname);
	}

    function serialise(contentType, kitten) {
	    if (contentType === "application/xml") return "<kitten><name>" + kitten.name + "</name><favouriteThing>" + kitten.favouriteThing + "</favouriteThing></kitten>";

	    return JSON.stringify(kitten);
    }

	function handle(requestDetails, writeResponse) {
		var contentType = requestDetails.headers.accept;
		var kitten = { name: "Fluffles", favouriteThing: "balls of wool" };
		writeResponse({ statusCode: 200, content: serialise(contentType, kitten), contentType: contentType });}

	return {
        canHandle: canHandle,
		handle:handle
	};
}