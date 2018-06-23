function aboutHandler (req, res) {
    if (req.path === "/about.html") {
        res.sendHtml("./about.html", 200);
    } else {
        return true;
    }
}

module.exports = aboutHandler;