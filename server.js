// cd "C:\Users\Користувач\Desktop\Bodya"
// nodemon server.js

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

http.createServer((req, res) => {
  let filePath = "." + req.url;
  if (filePath === "./") filePath = "./index.html";

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".svg": "image/svg+xml",
  };

  const contentType = mimeTypes[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("Not Found");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
}).listen(PORT, '0.0.0.0',  () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
