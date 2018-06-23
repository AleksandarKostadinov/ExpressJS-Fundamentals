const homeHandler = require("./home");
const moviesHandler = require("./movies");
//const addMovieHandler = require("./addMovie")
const staticHandler = require("./static");
const errorHandler = require("./error");

module.exports = [
    homeHandler,
    moviesHandler,
    //addMovieHandler,
    staticHandler,
    errorHandler,
];