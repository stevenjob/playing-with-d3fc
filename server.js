var express = require("express");

var server = require("./server/server");

app = require("express")();

app.use(express.static("public"));

app.get("/hello", function(req, res) {
    res.send("Hello");
});

app.listen(8080);