const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    console.log(req.headers);

    if (req.url === "/index.html") {
        const stat = fs.statSync("./index.html");

        res.writeHead(200, {
            "Content-Type": "text/html",
            "Content-Length": stat.size
        });

        const readStream = fs.createReadStream("./index.html");

        readStream.pipe(res);
    } else {
        res.end("404");  
    }
});

server.listen(8000);