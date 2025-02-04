const http = require("http");
const host = "localhost";
const port = 8080;

const movie = JSON.stringify([
  { name: "Jailer", actor: "Rajini", year: 2023 },
  { name: "Leo", actor: "Vijay", year: 2023 },
]);
const director = JSON.stringify([
  { name: "Nelson", age: 30, movies: 4 },
  { name: "Lokesh", age: 34, movies: 4 },
]);

const requestListener = function (req, res) {
  res.setHeader = ("Content-Type", "application/json");
  switch (req.url) {
    case "/movie":
      res.writeHead(200);
      res.write(movie);
      res.end();
      break;

    case "/director":
      res.writeHead(200);
      res.write(director);
      res.end();
      break;

    default:
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Not found" }));
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server running in http://${host}${port}`);
});
