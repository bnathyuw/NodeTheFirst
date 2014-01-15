function writeResponse(response, status, content, contentType) {
	response.writeHead(status, { "Content-Type": contentType });
	response.write(content);
	response.end();
}

module.exports = function() {
	return {
		writeResponse: writeResponse
	};
};