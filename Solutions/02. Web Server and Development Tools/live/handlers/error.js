function errorHandler(req, res) {
    res.sendHtml("./error.html", 404);
}

module.exports = errorHandler;
