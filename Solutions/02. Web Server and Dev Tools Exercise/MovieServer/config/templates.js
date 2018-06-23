const moviePlaceholder = "{{replace-me}}";
const movieTemplate = `<div class="movie">
                             <img class="moviePoster" src="${moviePlaceholder}"/>          
                        </div>`;
const errorTemplate = `<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>`;
const successTemplate = `<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>`;
const movieDetailsTemplate = `<div class="content">
                                <img src="{{URLPlch}}" alt=""/>
                                <h3>Title  {{titlePlch}}</h3>
                                <h3>Year {{yearPlch}}</h3>
                                <p> {{descriptionPlsh}}</p>
                            </div>`;
const addForm = `<h1>Add New Movie</h1>
                <div class="container">
                    <form action="/movie/add" method="POST">
                        <label for="movieTitle">Title</label>
                        <input type="text" id="movieTitle" name="movieTitle" placeholder="The title of the movie">

                        <label for="movieYear">Year</label>
                        <input type="text" id="movieYear" name="movieYear" placeholder="Year of release">

                        <label for="moviePoster">Poster URL</label>
                        <input type="text" id="moviePoster" name="moviePoster" placeholder="Link to a poster">

                        <label for="movieDescription">Movie description</label>
                        <textarea id="movieDescription" name="movieDescription" placeholder="Movie description" rows="10" cols="10"></textarea>

                        <input type="submit" value="Submit">

                    </form>
                </div>
                {{notificationPlaceholder}}`;
const notificationPlaceholder = `{{notificationPlaceholder}}`;

module.exports = {
    getMovieTeplate() {
        return movieTemplate;
    },

    getErrorBoxTemplate() {
        return errorTemplate;
    },

    getSuccessTemplate() {
        return successTemplate;
    },

    getMovieDetailesTemplate() {
        return movieDetailsTemplate;
    },

    getPosterPlaceholder() {
        return moviePlaceholder;
    },

    getAddForm() {
        return addForm;
    },

    getNotificationPlaceholder() {
        return notificationPlaceholder;
    },
}