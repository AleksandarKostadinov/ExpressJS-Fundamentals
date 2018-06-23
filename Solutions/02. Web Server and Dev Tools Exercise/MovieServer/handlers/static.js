const fs = require("fs");
const mimeTypes = {
    "css": "text/css",
    "js": "application/javascript",
    "png": "image/png",
    "jpg": "image/jpeg",
    "ico": "image/x-icon",
};


function staticHandler(req, res) {
    if (req.path.startsWith("/static/")) {
        const extention = req.path.split(".").pop();

        res.writeHead(200, {
            "content-type": mimeTypes[extention],
        });
        const read = fs.createReadStream("." + req.path);
        
        read.pipe(res);

        read.on("error", () => {
            res.sendHtml(404, "<h1>Not Found!<h1>");
        });
    } else {
        return true;
    }
}

module.exports = staticHandler;