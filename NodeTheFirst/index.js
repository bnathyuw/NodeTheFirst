var server = require("./server");
var router = require("./router");
var responseWriter = require("./responseWriter");

server.start(router.route, responseWriter.writeResponse);