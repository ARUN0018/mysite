const http = require("http");
const host = "localhost";
const port = 8000;
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

function getPlayer() {
  return new Promise(function (resolve, reject) {
    fs.readFile("lap.txt", { encoding: "utf8" }, function (err, data) {
      if (err) {
        reject("rejected" + err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

const deletePlayer = function (players, deletename) {
  console.log(deletename);
  const index = players.findIndex(function (player) {
    return player.name == deletename;
  });
  console.log(players.name);
  console.log(index);
  if (index != -1) {
    players.splice(index, 1);
    return [players];
  } else {
    throw err;
  }
};

const writePlayer = function (players) {
  return new Promise(function (resolve, reject) {
    fs.writeFile("lap.txt", JSON.stringify(players), function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const requestListener = function (req, res) {
  if (req.method == "GET" && req.url == "/") {
    getPlayer().then(function (players) {
      res.write(JSON.stringify(players));
      res.end();
    });
  } else if (req.method == "DELETE" && req.url == "/") {
    bodyReader(req)
      .then(function (body) {
        return JSON.parse(body).name;
      })
      .then(function (playerName) {
        getPlayer().then(function (players) {
          return deletePlayer(players, playerName);
        });
      })
      .then(function (players) {
        console.log(players);
        res.end();
      })
      .catch((err) => {
        console.log("Rejected" + err);
        res.end();
      });
  } else {
    console.log("end");
    res.end();
  }
};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server on running http://${host}:${port}`);
});
