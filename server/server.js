var express = require("express");
var config = require("./config");
var http = require("http");
var socketIo = require("socket.io");
var GameManager = require("./game/game-manager");
var api = require("./api");
var LobbyManager = require("./lobby-manager");
var LobbySocket = require("./lobby-socket");
var highscoreActionsDisconnected = require("./db/highscore-actions");

module.exports = function(port, db, activeSessions, callback) {
    var app = express();
    var server = http.Server(app);
    var io = socketIo(server);
    var gameManagers = [];
    port = port || 8080;

    activeSessions = activeSessions || {};

    api(app, db, activeSessions);

    var highscoreActions = highscoreActionsDisconnected(db);

    var lobbyManager = new LobbyManager(gameManagers, highscoreActions, activeSessions);
    var lobbySocket = new LobbySocket(lobbyManager, activeSessions, io);

    io.on("connection", function (socket) {

        socket.on("registerWait", function(data) {
            var gameId = data.gameId;
            if (typeof gameId === "string") {
                try {
                    gameId = parseInt(gameId);
                } catch (e) {
                    // Do nothing
                }
            }

            var userToken = activeSessions[data.token];
            if (userToken) {
                var gameToJoin = lobbyManager.findGameById(gameId);
                if (gameToJoin) {
                    gameToJoin.addReservationClearedListener(userToken, function () {
                        socket.emit("reservationCleared");
                    });
                } else {
                    socket.emit("reservationCleared");
                }
            }
        });

        socket.on("join", function (params) {

            var token = params.token;
            var type = params.type;

            var userToken = activeSessions[token];

            if ((userToken && !lobbyManager.isUserInGame(userToken)) || config.development) {

                var userId = activeSessions[token] || new Date().valueOf();

                var gameManagerToUse = lobbyManager.autoJoin(userId, type, socket);

                socket.on("disconnect", function () {
                    // Delete game if it is empty
                    if (gameManagerToUse && gameManagerToUse.players.length === 0 &&
                        Object.keys(gameManagerToUse.reservedSlots).length === 0) {
                        gameManagerToUse.destroy();
                    }
                });

            } else {
                socket.emit("forceDisconnect", {message: "You may not be logged in, or are already in game."});
                socket.disconnect();
            }
        });
    });

    var listeningServer = server.listen(port || 8080);

    if (callback) {
        callback();
    }

    return listeningServer;
};
