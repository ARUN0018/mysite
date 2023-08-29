const http = require("http");
const host = "localhost";
const port = 3001;
const url = require("url");
const fs = require("fs");
const { Script } = require("vm");

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

const requestListener = function (req, res) {
  if (req.method == "GET" && req.url == "/") {
    fs.readFile("file.txt", { encoding: "utf8" }, function (err, data) {
      if (err) {
        res.writeHead(500);
        res.end();
      } else {
        var a = `
  <html>
    <head><meta http-equiv="refresh"/>
    <style>
        body{
            background-image : url("https://img.freepik.com/free-vector/blue-curve-background_53876-113112.jpg?w=2000");
            background-attachment:fixed;
            background-repeat: no-repeat;
            background-size: cover;
            color: aliceblue;
            color:black;
        }
        table{
          text-align :center;
        }
    </style>
    </head>
    <body onload> 
    <script>
      function deletePlayer(playerName) {
        var data=JSON.stringify({
          name:playerName
         });

         var lap= new XMLHttpRequest();
         lap.withCredentials = true;

         lap.addEventListener("readystatechange", function(){
            if(this.readyState === 4){
              location.reload();
              console.log(this.responseText);
            }
         });

         lap.open("DELETE","http://localhost:3001/");
         lap.setRequestHeader("Content-Type","application/json");

         lap.send(data);
          }
       </script>`;
        var html = "<table>";
        const players = JSON.parse(data);
        for (i = 0; i < players.length; i++) {
          html +=
            "<tr><td>" +
            players[i].name +
            "</td><td>" +
            players[i].game +
            "</td><td><button onclick=\"deletePlayer('" +
            players[i].name +
            "')\"> Delete </button></td></tr>";
        }
        html += "</table>";
        html += "</body>";
        html += "</html>";
        a += html;

        res.writeHead(200, { "Content-type": "text/html" });
        res.write(a);
        res.end();
      }
    });
  } else if (req.method == "DELETE" && req.url == "/") {
    fs.readFile("file.txt", { encoding: "utf8" }, function (err, data) {
      if (err) {
        res.writeHead(500);
        res.end();
      } else {
        const players = JSON.parse(data);
        bodyReader(req).then(function (body) {
          const play = JSON.parse(body).name;

          const index = players.findIndex(function (player) {
            return player.name == play;
          });

          if (index !== -1) {
            players.splice(index, 1);
            fs.writeFile("file.txt", JSON.stringify(players), function (err) {
              if (err) {
                res.writeHead(500);
                res.write("Error");
                res.end();
              } else {
                res.writeHead(200, { "Content-type": "application/json" });
                res.write(JSON.stringify({ element: "deleted" }));
                res.end();
              }
            });
          } else {
            res.writeHead(500);
            res.write("Error");
            res.end();
          }
        });
      }
    });
  } else {
    res.writeHead(500, { "Content-type": "text/html" });
    res.write(JSON.stringify("not found"));
    res.end();
  }
};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`server running on http://${host}:${port}`);
});
