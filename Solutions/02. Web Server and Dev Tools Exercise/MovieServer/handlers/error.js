function errorHandler(req, res) {
    res.sendHtml(404, "<h1>Not found!</h1>");
}

module.exports = errorHandler;
