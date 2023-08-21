const http = require("http");
const host = "localhost";
const port = 8081;
const fs = require("fs");
const { encode } = require("punycode");

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
        const player = JSON.stringify(body);
        players.push(player);
        res.writeHeader(200);
        res.write(body);
        fs.appendFile("file.txt", body, (err) => {
          if (err) throw err;
        });
        res.end();
        return;
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
      fs.readFile("file.txt", { encoding: "utf8" }, (err, data) => {
        if (err) throw err;
        console.log("File read");
        const players = data;
      });

      const playerToDelete = body.name;
      const index = players.findIndex(
        (player) => player.name === playerToDelete
      );
      if (index !== -1) {
        players.splice(index, 1);
        res.writeHeader(200);
        res.write(JSON.stringify({ element: " deleted" }));
        fs.writeFile("file.txt", JSON.stringify(players), (err) => {
          if (err) throw err;
          console.log("player deleted and file updated!");
        });
        res.writeHeader(200);
        res.write(JSON.stringify({ element: " deleted" }));
        res.end();
      } else {
        res.writeHeader(404);
        res.end(JSON.stringify({ error: "Not found" }));
      }
    }
  }
};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server running on http://${host}${port}`);
});
