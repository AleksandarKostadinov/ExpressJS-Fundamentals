let db = require("../config/dataBase");
const templates = require("../config/templates")

function moviesHandler(req, res) {
    if (req.path === "/movie/all") {
        let moviesHtml = "";
        db.map(m => {
            moviesHtml += templates.getMovieTeplate()
                .replace(templates.getPosterPlaceholder(), decodeURIComponent(m.moviePoster));
        });

        res.sendHtml(200, moviesHtml);
    } else if (req.path === "/movie/add" && req.method === "GET") {
        res.sendHtml(200, templates.getAddForm().replace(templates.getNotificationPlaceholder(), ""));
    } else if (req.path === "/movie/add" && req.method === "POST") {
        let movieData = req.bodyData;

        let notification = '';


        if (!movieData.moviePoster || !movieData.movieTitle) {
            notification = templates.getErrorBoxTemplate();
        } else {
            db.push(movieData);
            notification = templates.getSuccessTemplate();
        }

        let addHtml = templates.getAddForm()
            .replace(templates.getNotificationPlaceholder(), notification);

        res.sendHtml(200, addHtml);

    } else if (req.path.startsWith("/movie/details/") && req.method === "GET") {
        let index = Number(req.path.substr(req.path.lastIndexOf("/") + 1));
        let currentMovie = db[index];

        console.log(db);
        console.log(currentMovie);

        let detailsHtml = templates.getMovieDetailesTemplate()
            .replace("{{URLPlch}}", decodeURIComponent(currentMovie.moviePoster))
            .replace("{{titlePlch}}", currentMovie.movieTitle)
            .replace("{{descriptionPlsh}}", decodeURIComponent(currentMovie.movieDescription))
            .replace("{{yearPlch}}", currentMovie.movieYear);

        res.sendHtml(200, detailsHtml);
    } else {
        return true;
    }
}

module.exports = moviesHandler;