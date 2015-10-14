//var initDb = require("./server/db/initialise-db");
var server = require("./server/server");
var express = require("express");

//initDb(function(db) {
    server(process.env.PORT || 8080, function() {
        console.log("Server listening");
    });
//});
