const fs = require("fs");
const mimeTypes = {
    "css": "text/css",
    "js": "application/javascript",
    "png": "image/png",
    "jpg": "image/jpeg"
};


function staticHandler(req, res) {
    if (req.path.startsWith("/static/")) {
        const extention = req.path.split(".").pop();

        res.writeHead(200, {
            "content-type": mimeTypes[extention],
        });
        const read = fs.createReadStream("." + req.path);
        read.on("error", () => {
            res.sendHtml("./error.html", 404);
        });
        read.pipe(res);
    } else {
        return true;
    }
}

module.exports = staticHandler;