var express = require("express");

var server = require("./server/server");

app = require("express")();

app.use(express.static("public"));

app.get("", function (req, res) {
    res.sendFile(__dirname + "/web/index.html");
});

app.get("/hello", function(req, res) {
    res.send("Hello");
});

app.get("/steven", function(req, res) {
    res.send("steven");
});

app.listen(8080);