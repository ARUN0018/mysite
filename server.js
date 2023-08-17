const http = require("http");
const host = "localhost";
const port = 8000;
var fs = require("fs").promises;

const requestListener = function (req, res) {
  fs.readFile(__dirname + "/index.html")
    .then((content) => {
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.write(content);
      res.end();
    })
    .catch((err) => {
      res.writeHead(500);
      res.end(err.tostring());
      return;
    });
};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
