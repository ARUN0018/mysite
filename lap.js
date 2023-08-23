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

const requestListener = function (req, res) {
  if (req.method === "POST") {
    if (req.url === "/books") {
      bodyReader(req).then(function (body) {
        const book = JSON.parse(body);

        fs.readFile("lap.txt", { encoding: "utf8" }, function (err, data) {
          if (err) {
            console.log("Err");
            res.writeHead(500);
            res.end();
          } else {
            const books = JSON.parse(data);
            books.push(book);
            fs.writeFile("lap.txt", JSON.stringify(books), (err) => {
              if (err) throw err;
            });
            res.writeHead(200, { "Content-type": "application/json" });
            res.write(body);
            res.end();
          }
        });
      });
    }
  } else if (req.method == "GET" && req.url == "/books") {
    fs.readFile("lap.txt", { encoding: "utf8" }, function (err, data) {
      if (err) {
        console.log("error");
        res.writeHead(500);
        res.end();
      } else {
        res.writeHead(200);
        res.write(data);
        res.end();
      }
    });
  } else if (req.method == "DELETE" && req.url == "/books") {
    bodyReader(req).then(function (body) {
      const book = JSON.parse(body).name;

      fs.readFile("lap.txt", { encoding: "utf8" }, function (err, data) {
        if (err) {
          console.log("error");
          res.writeHead(500);
          res.end();
        } else {
          const books = JSON.parse(data);
          const index = books.findIndex(function (author) {
            return author.name === book;
          });

          if (index !== -1) {
            books.splice(index, 1);
            fs.writeFile("lap.txt", JSON.stringify(books), function (err) {
              if (err) {
                console.log("error");
                res.writeHead(500);
                res.end();
              } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.write(JSON.stringify({ element: "deleted" }));
                res.end();
              }
            });
          } else {
            console.log("error");
            res.writeHead(500);
            res.end();
          }
        }
      });
    });
  } else if (req.method == "PUT" && req.url == "/books") {
    bodyReader(req).then(function (body) {
      const abook = JSON.parse(body);
      const book = JSON.parse(body).name;

      fs.readFile("lap.txt", { encoding: "utf8" }, function (err, data) {
        if (err) {
          console.log("error");
          res.writeHead(500);
          res.end();
        } else {
          const books = JSON.parse(data);

          const index = books.findIndex(function (author) {
            return author.name == book;
          });
          if (index !== -1) {
            books.splice(index, 1, abook);
            fs.writeFile("lap.txt", JSON.stringify(books), function (err) {
              if (err) {
                console.log("error");
                res.writeHead(500);
                res.end();
              } else {
                res.writeHead(200, { "Content-type": "application/json" });
                res.write(JSON.stringify({ element: "updated" }));
                res.end();
              }
            });
          } else {
            console.log("error");
            res.writeHead(500);
            res.end();
          }
        }
      });
    });
  } else {
    res.writeHead(400, { "Content-type": "application/json" });
    res.write(JSON.stringify("not found"));
    res.end();
  }
};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server on running http://${host}${port}`);
});
