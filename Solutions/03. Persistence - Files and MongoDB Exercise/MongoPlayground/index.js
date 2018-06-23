const http = require('http')
const url = require('url')
const qs = require('querystring')
const port = process.env.PORT || 5000
const handlers = require('./handlers/handlerBlender')

require('./config/db').then(() => {
	console.log("DB ready");

	http
		.createServer((req, res) => {
			let currentUrl = url.parse(req.url);

			req.pathname = currentUrl.pathname
			req.pathquery = qs.parse(currentUrl.query)
			for (let handler of handlers) {
				if (!handler(req, res)) {
					break
				}
			}
		})
		.listen(port, () => {
			console.log(`Listening on port ${port} ...`);
		});
}).catch(e => { throw e; });

