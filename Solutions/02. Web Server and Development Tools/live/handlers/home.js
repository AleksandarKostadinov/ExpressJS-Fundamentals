const fs = require("fs");

function homeHandler(req, res) {
    if (req.path === "/" || req.path === "/index.html") {
        res.sendHtml("./index.html", 200);
    } else {
        return true;
    }
}

module.exports = homeHandler;