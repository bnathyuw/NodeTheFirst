function writeResponse(response, responseDetails) {
	response.writeHead(responseDetails.statusCode, { "Content-Type": responseDetails.contentType });
	response.write(responseDetails.content);
	response.end();
}

module.exports = function() {
	return {
		writeResponse: writeResponse
	};
};