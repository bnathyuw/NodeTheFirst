﻿var http = require("http");
var url = require("url");
var responseWriter = require("./responseWriter")();
var statusEndpoint = require("./statusEndpoint")();
var kittenEndpoint = require("./kittenEndpoint")();
var routes = [statusEndpoint, kittenEndpoint];
var router = require("./router")(responseWriter.writeResponse, routes);
var requestHandler = require("./requestHandler")(url.parse, router.route);
var server = require("./server")(http, 1337, requestHandler.handleRequest);

server.start();