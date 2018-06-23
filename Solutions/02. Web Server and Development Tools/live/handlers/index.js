const staticHandler = require("./static");
const homeHandler = require("./home");
const aboutHandler = require("./about");
const bigFileHandler = require("./bigFileHandler");
const dataHandler = require("./data");
const errorHandler = require("./error");

module.exports = [
    homeHandler,
    aboutHandler,
    staticHandler,
    bigFileHandler,
    dataHandler,
    errorHandler,
];