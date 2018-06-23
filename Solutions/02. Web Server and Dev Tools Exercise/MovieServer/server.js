const http = require("http");
const url = require("url");
const handlers = require("./handlers");
const postParserMiddleware = require("./config/postParser");
const responseMixins = require("./mixins/responseMixins");
const port = 8000;

let server = http.createServer(frontController);

/**
 * 
 * @param {http.ClientRequest} req 
 * @param {http.ClientResponse} res 
 */
function frontController(req, res) {
    req.path = url.parse(req.url).pathname;

    Object.assign(res, responseMixins)

    postParserMiddleware(req, res)
        .then(() => {
            if (req.url === '/favicon.ico') { // this favicon drove me Nuts :) and this is what I did 
                req.path = "/static/images" + req.path;
            }

            for (const handler of handlers) {
                if (handler(req, res) !== true) {
                    break;
                }
            }
        }).catch(err => {
            console.log(err);
        });
}

server.listen(port);
console.log(`Listening on port ${port} ...`);