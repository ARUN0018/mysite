"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var fs_1 = require("fs");
var host = "localhost";
var port = 8081;
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
function readplayersFile(callback) {
    (0, fs_1.readFile)("file.txt", { encoding: "utf8" }, function (err, data) {
        var parsedData = err ? data : JSON.parse(data);
        callback(err, parsedData);
    });
}
function writePlayersFile(data, callback) {
    (0, fs_1.writeFile)("file.txt", JSON.stringify(data), function (err) {
        callback(err);
    });
}
var requestListener = function (req, res) {
    if (req.method == "POST") {
        console.log(req.url);
        if (req.url == "/") {
            bodyReader(req).then(function (body) {
                var player = JSON.parse(body);
                readplayersFile(function (err, players) {
                    if (err) {
                        console.log("Err");
                        res.writeHead(500);
                        res.end();
                    }
                    else {
                        players.push(player);
                        writePlayersFile(players, function (err) {
                            if (err) {
                                console.log("Err");
                                res.writeHead(500);
                                res.end();
                            }
                            else {
                                res.writeHead(200, {
                                    "Content-type": "application/json",
                                    "Access-Control-Allow-Origin": "http://localhost:3003",
                                });
                                res.write(body);
                                res.end();
                            }
                        });
                    }
                });
            });
        }
    }
    else if (req.method == "GET" && req.url == "/") {
        readplayersFile(function (err, data) {
            if (err) {
                console.log("Err");
                res.writeHead(500);
                res.end();
            }
            else {
                res.writeHead(200, {
                    "Content-type": "text/html",
                    "Access-Control-Allow-Origin": "http://localhost:3003",
                });
                res.write(JSON.stringify(data));
                console.log("GET");
                res.end();
            }
        });
    }
    else if (req.method == "DELETE" && req.url == "/") {
        if (req.url == "/") {
            readplayersFile(function (err, players) {
                if (err) {
                    console.log("Err");
                    res.writeHead(500);
                    res.end();
                }
                else {
                    console.log("File read");
                    bodyReader(req).then(function (body) {
                        var playerToDelete = JSON.parse(body).name;
                        var index = players.findIndex(function (player) {
                            return player.name === playerToDelete;
                        });
                        if (index !== -1) {
                            players.splice(index, 1);
                            writePlayersFile(players, function (err) {
                                if (err) {
                                    res.writeHead(500);
                                    res.end();
                                }
                                else {
                                    res.writeHead(200, {
                                        "Content-Type": "application/json",
                                        "Access-Control-Allow-Origin": "http://localhost:3003",
                                        "Access-Control-Allow-Credentials": "true",
                                    });
                                    console.log("player deleted and file updated!");
                                    res.write(JSON.stringify({ element: " deleted" }));
                                    res.end();
                                }
                            });
                        }
                        else {
                            res.writeHead(500);
                            res.write(JSON.stringify("no data"));
                            res.end();
                        }
                    });
                }
            });
        }
    }
    else if (req.method == "PUT" && req.url == "/") {
        bodyReader(req).then(function (body) {
            var newPlayer = JSON.parse(body);
            var player = JSON.parse(body).name;
            readplayersFile(function (err, players) {
                if (err) {
                    res.writeHead(500);
                    res.end();
                }
                else {
                    var index = players.findIndex(function (author) {
                        return author.name == player;
                    });
                    if (index !== -1) {
                        players.splice(index, 1, newPlayer);
                        writePlayersFile(players, function (err) {
                            if (err) {
                                console.log("error");
                                res.writeHead(500);
                                res.end();
                            }
                            else {
                                res.writeHead(200, { "Content-type": "application/json" });
                                res.write(JSON.stringify({ element: "updated" }));
                                res.end();
                            }
                        });
                    }
                    else {
                        console.log("error");
                        res.writeHead(500);
                        res.end();
                    }
                }
            });
        });
    }
    else if (req.method == "OPTIONS" && req.url == "/") {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "http://localhost:3003",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS,PUT,DELETE",
            "Access-Control-Allow-Headers": "Origin,X-Requested-With,Content-Type,Accept",
        });
        res.end();
    }
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Not found" }));
    }
};
var server = (0, http_1.createServer)(requestListener);
server.listen(port, host, function () {
    console.log("Server running on http://".concat(host, ":").concat(port));
});
