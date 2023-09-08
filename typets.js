"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var fs_1 = require("fs");
var host = "localhost";
var port = 8082;
var bodyReader = function (req) {
    return new Promise(function (resolve, reject) {
        var chunks = [];
        req.on("data", function (chunk) {
            chunks.push(chunk);
        });
        req.on("end", function () {
            resolve(chunks.join(""));
        });
    });
};
var requestListener = function (req, res) {
    if (req.url == "/" && req.method == "GET") {
        (0, fs_1.readFile)("file.txt", { encoding: "utf8" }, function (err, data) {
            if (err) {
                res.writeHead(500);
                res.end();
            }
            else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.write(data);
                res.end();
            }
        });
    }
    else if (req.method == "POST" && req.url == "/") {
        (0, fs_1.readFile)("file.txt", { encoding: "utf8" }, function (err, data) {
            if (err) {
                res.writeHead(500);
                res.end();
            }
            else {
                var players_1 = JSON.parse(data);
                bodyReader(req).then(function (body) {
                    var player = JSON.parse(body);
                    players_1.push(player);
                    (0, fs_1.writeFile)("file.txt", JSON.stringify(players_1), function (err) {
                        if (err) {
                            res.writeHead(500);
                            res.end();
                        }
                        else {
                            res.writeHead(200);
                            res.write(JSON.stringify("successfully create"));
                            res.end();
                        }
                    });
                });
            }
        });
    }
    else if (req.method == "DELETE" && req.url == "/") {
        (0, fs_1.readFile)("file.txt", { encoding: "utf8" }, function (err, data) {
            if (err) {
                res.writeHead(500);
                res.end();
            }
            else {
                var players_2 = JSON.parse(data);
                bodyReader(req).then(function (body) {
                    var playerToDelete = JSON.parse(body).name;
                    var index = players_2.findIndex(function (player) {
                        return player.name == playerToDelete;
                    });
                });
            }
        });
    }
    else {
        res.writeHead(404);
        res.end();
    }
};
var server = (0, http_1.createServer)(requestListener);
server.listen(port, host, function () {
    console.log("server running on http://".concat(host, ":").concat(port));
});
