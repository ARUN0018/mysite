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
// bodyReader(req).then(function(body){
//
// })

const books = [];

const requestListener = function (req, res) {
  if (req.method === "POST") {
    if (req.url === "/books") {
      bodyReader(req).then(function (body) {
        const book = JSON.parse(body);
        fs.readFile("lap.txt", { encoding: "utf8" }, function (err, data) {
          if (err) {
            console.log("Err");
          } else {
            const books = JSON.parse(data);
            books.push(a, book);
            fs.writeFile("lap.txt", JSON.stringify(books), (err) => {
              if (err) throw err;
            });
            res.writeHead(200, { "Content-type": "application/json" });
            res.write(body);
            res.end();
          }
        });
      });
    } else {
      res.writeHead(400, { "Content-type": "application/json" });
      res.write(JSON.stringify("not found"));
      res.end();
    }
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server on running http://${host}${port}`);
});
