const http = require("http");
const host = "localhost";
const port = 8081;
const fs = require("fs");

const bodyReader = (req) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", () => {
      resolve(chunks.join(""));
    });
  });
};
// bodyReader(req).then(function(body){
//
// })

function readFile(callback) {
  fs.readFile("file.txt", { encoding: "utf8" }, function (err, data) {
    var parsedData = err ? data : JSON.parse(data);
    callback(err, parsedData);
  });
}

function writeFile(data, callback) {
  fs.writeFile("file.txt", JSON.stringify(data), (err) => {
    callback(err);
  });
}

const requestListener = function (req, res) {
  if (req.method == "POST") {
    console.log(req.url);
    if (req.url == "/player") {
      bodyReader(req).then(function (body) {
        const player = JSON.parse(body);

        readFile(function (err, players) {
          if (err) {
            console.log("Err");
            res.writeHead(500);
            res.end();
          } else {
            players.push(player);

            writeFile(players, function (err) {
              if (err) {
                console.log("Err");
                res.writeHead(500);
                res.end();
              } else {
                res.writeHead(200, { "Content-type": "application/json" });
                res.write(body);
                res.end();
              }
            });
          }
        });
      });
    }
  } else if (req.method == "GET" && req.url == "/player") {
    readFile(function (err, data) {
      if (err) {
        console.log("Err");
        res.writeHead(500);
        res.end();
      } else {
        res.writeHeader(200);
        res.write(JSON.stringify(data));
        res.end();
      }
    });
  } else if (req.method == "DELETE" && req.url == "/player") {
    if (req.url == "/player") {
      readFile(function (err, players) {
        if (err) {
          console.log("Err");
          res.writeHead(500);
          res.end();
        } else {
          console.log("File read");

          bodyReader(req).then(function (body) {
            const playerToDelete = JSON.parse(body).name;
            const index = players.findIndex(function (player) {
              return player.name === playerToDelete;
            });
            if (index !== -1) {
              players.splice(index, 1);

              writeFile(players, function (err) {
                if (err) {
                  console.log("player deleted and file updated!");
                  res.writeHead(500);
                  res.end();
                } else {
                  res.writeHeader(200);
                  res.write(JSON.stringify({ element: " deleted" }));
                  res.end();
                }
              });
            } else {
              res.writeHead(500);
              res.write(JSON.stringify("no data"));
              res.end();
            }
          });
        }
      });
    }
  } else {
    res.writeHeader(404);
    res.end(JSON.stringify({ error: "Not found" }));
  }
};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server running on http://${host}${port}`);
});
