function homeHandler(req, res) {
    if (req.path === "/" || req.path === "/index.html") {
        res.sendHtml(200, "<h1>Hello I'm your Node Movie DB app!</h1>");
    } else {
        return true;
    }
}

module.exports = homeHandler;