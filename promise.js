const http = require("http");
const host = "localhost";
const port = 8000;
const fs = require("fs");

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

const requestListener = function (req, res) {
  if (req.method == "GET" && req.url == "/") {
    getPlayer().then(function (players) {
      console.log("players");
      res.write(JSON.stringify(players));
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
