function writeResponse(response, status, content) {
	response.writeHead(status, { "Content-Type": "text/plain" });
	response.write(content);
	response.end();
}

module.exports = function() {
	return {
		writeResponse: writeResponse
	};
};