var http = require("http");
var url = require("url");
var responseWriter = require("./responseWriter")();
var router = require("./router")(responseWriter.writeResponse);
var requestHandler = require("./requestHandler")(url.parse, router.route);
var server = require("./server")(http, 1337, requestHandler.handleRequest);

server.start();