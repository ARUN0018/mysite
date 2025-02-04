import { createServer, IncomingMessage, ServerResponse } from "http";
import { readFile, writeFile } from "fs";

const host = "localhost";
const port = 8082;

const bodyReader = (req: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    const chunks: string[] = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", () => {
      resolve(chunks.join(""));
    });
  });
};

type Player = {
  name: string;
  game: string;
};

const requestListener = function (req: IncomingMessage, res: ServerResponse) {
  if (req.url == "/" && req.method == "GET") {
    readFile("file.txt", { encoding: "utf8" }, function (err, data) {
      if (err) {
        res.writeHead(500);
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(data);
        res.end();
      }
    });
  } else if (req.method == "POST" && req.url == "/") {
    readFile("file.txt", { encoding: "utf8" }, function (err, data) {
      if (err) {
        res.writeHead(500);
        res.end();
      } else {
        const players: Player[] = JSON.parse(data);

        bodyReader(req).then(function (body) {
          const player: Player = JSON.parse(body);

          players.push(player);
          writeFile("file.txt", JSON.stringify(players), function (err) {
            if (err) {
              res.writeHead(500);
              res.end();
            } else {
              res.writeHead(200);
              res.write(JSON.stringify("successfully create"));
              res.end();
            }
          });
        });
      }
    });
  } else if (req.method == "DELETE" && req.url == "/") {
    readFile("file.txt", { encoding: "utf8" }, function (err, data) {
      if (err) {
        res.writeHead(500);
        res.end();
      } else {
        const players: Player[] = JSON.parse(data);
        bodyReader(req).then(function (body) {
          const playerToDelete: string = JSON.parse(body).name;
          const index = players.findIndex(function (player) {
            return player.name == playerToDelete;
          });
        });
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
};

const server = createServer(requestListener);
server.listen(port, host, () => {
  console.log(`server running on http://${host}:${port}`);
});
