module.exports = function() {

	function canHandle(requestDetails) {
		return /\/kittens\/(.*)/.test(requestDetails.pathname);
	}

	function handle(requestDetails, writeResponse) {
		var kitten = { name: "Fluffles", favouriteThing: "balls of wool" };
		writeResponse({ statusCode: 200, content: JSON.stringify(kitten), contentType: requestDetails.headers.accept });}

	return {
        canHandle: canHandle,
		handle:handle
	};
}