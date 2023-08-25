const http = require("http");
const host = "localhost";
const port = 3000;
const url = require("url");

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

const a = `
  <html>
    <head></head>
    <body>
      <h1>Players</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Game</th>
        </tr>
        <tr>
          <td>Virat</td>
          <td>cricket</td>
        </tr>
        <tr>
          <td>Rohit</td>
          <td>cricket</td>
        </tr>
      </table>
    </body>
  </html>`;

const requestListener = function (req, res) {
  if (req.url == "/a") {
    res.writeHead(200, { "Content-type": "text/html" });
    res.write(a);
    res.end();
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
