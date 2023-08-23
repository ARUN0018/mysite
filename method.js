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

const players = [];

const requestListener = function (req, res) {
  if (req.method == "POST") {
    console.log(req.url);
    if (req.url == "/player") {
      bodyReader(req).then(function (body) {
        const player = JSON.parse(body);

        fs.readFile("file.txt", { encoding: "utf8" }, function (err, data) {
          if (err) {
            console.log("Err");
          } else {
            const players = JSON.parse(data);
            players.push(player);
            fs.writeFile("file.txt", JSON.stringify(players), (err) => {
              if (err) throw err;
            });
            res.writeHead(200, { "Content-type": "application/json" });
            res.write(body);
            res.end();
          }
        });
      });
    } else {
      res.writeHeader(404);
      res.end(JSON.stringify({ error: "Not found" }));
    }
  } else if (req.method == "GET" && req.url == "/player") {
    fs.readFile("file.txt", { encoding: "utf8" }, (err, data) => {
      if (err) throw err;
      res.writeHeader(200);
      res.write(data);
      res.end();
    });
    return;
  } else if (req.method == "DELETE" && req.url == "/player") {
    if (req.url == "/player") {
      fs.readFile("file.txt", { encoding: "utf8" }, function (err, data) {
        if (err) {
          res.writeHead(200);
          res.write("err");
        } else {
          console.log("File read");
          const players = JSON.parse(data);

          bodyReader(req).then(function (body) {
            const playerToDelete = JSON.parse(body).name;
            const index = players.findIndex(function (player) {
              return player.name === playerToDelete;
            });
            if (index !== -1) {
              players.splice(index, 1);

              fs.writeFile(
                "file.txt",
                JSON.stringify(players),
                { encoding: "utf8" },
                (err) => {
                  if (err) {
                    console.log("player deleted and file updated!");
                    res.writeHead(500);
                    res.end();
                  } else {
                    res.writeHeader(200);
                    res.write(JSON.stringify({ element: " deleted" }));
                    res.end();
                  }
                }
              );
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
