const http = require("http");
const host = "localhost";
const port = 8000;
const fs = require("fs");
const { callbackify } = require("util");

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

/**
 * reads data from "lap.txt",
 *   calls callback when read is complete
 *      err is passed to callback if there is an error in reading
 *      data is the content read from the file
 */
function readFile(callback) {
  fs.readFile("lap.txt", { encoding: "utf8" }, function (err, data) {
    var parsedData = err ? data : JSON.parse(data);
    callback(err, parsedData);
  });
}
// readFile(filepath,function(data){
//
//})

/**
 * writes data to "lap.txt"
 *   calls callback when write is complete
 *      err is passed to callback if there is an error in writing
 */
function writeFile(data, callback) {
  fs.writeFile("lap.txt", JSON.stringify(data), function (err) {
    callback(err);
  });
}

const requestListener = function (req, res) {
  if (req.method === "POST") {
    if (req.url === "/books") {
      bodyReader(req).then(function (body) {
        const book = JSON.parse(body);

        readFile(function (err, books) {
          if (err) {
            res.writeHead(500);
            res.end();
          } else {
            books.push(book);

            writeFile(books, function (err) {
              if (err) {
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
  } else if (req.method == "GET" && req.url == "/books") {
    readFile(function (err, data) {
      if (err) {
        res.writeHead(500);
        res.end();
      } else {
        res.writeHead(200);
        res.write(JSON.stringify(data));
        res.end();
      }
    });
  } else if (req.method == "DELETE" && req.url == "/books") {
    bodyReader(req).then(function (body) {
      const book = JSON.parse(body).name;

      readFile(function (err, books) {
        if (err) {
          res.writeHead(500);
          res.end();
        } else {
          const index = books.findIndex(function (author) {
            return author.name === book;
          });

          if (index !== -1) {
            books.splice(index, 1);
            writeFile(books, function (err) {
              if (err) {
                res.writeHead(500);
                res.end();
              } else {
                {
                  res.writeHead(200, { "Content-Type": "application/json" });
                  res.write(JSON.stringify({ element: "deleted" }));
                  res.end();
                }
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

      readFile(function (err, books) {
        if (err) {
          res.writeHead(500);
          res.end();
        } else {
          const index = books.findIndex(function (author) {
            return author.name == book;
          });
          if (index !== -1) {
            books.splice(index, 1, abook);
            writeFile(books, function (err) {
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
