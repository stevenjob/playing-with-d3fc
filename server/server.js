var express = require("express");
//var config = require("./config");
var http = require("http");

module.exports = function(port, callback) {
    var app = express();
    var server = http.Server(app);
    port = port || 8080;

    var listeningServer = server.listen(port || 8080);

    if (callback) {
        callback();
    }

    return listeningServer;
};
