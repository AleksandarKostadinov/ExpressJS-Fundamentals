const formidable = require("formidable");
const Image = require('mongoose').model("Image");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = (req, res) => {
	if (req.pathname === '/addImage' && req.method === 'POST') {
		addImage(req, res)
	} else if (req.pathname === '/delete' && req.method === 'GET') {
		deleteImg(req, res)
	} else {
		return true
	}
}

function addImage(req, res) {
	let form = new formidable.IncomingForm();

	form.parse(req, (err, fields, files) => {
		if (err) {
			throw err;
		}

		const tags = fields.tagsId.split(",").filter((t) => t !== "").filter(onlyUnique).map(ObjectId);

		const image = {
			url: fields.imageUrl,
			description: fields.description,
			tags
		};

		Image.create(image)
			.then(image => {
				res.writeHead(302, {
					location: "/"
				});
				res.end();
			})
			.catch(err => {
				console.log(err);

				res.writeHead(500, {
					"content-type": "text/plain"
				});

				res.write("500 server error!");
				res.end();
			})
	});
}

function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

function deleteImg(req, res) {
	Image.deleteOne({ _id: req.pathquery.id })
		.then(() => {
			res.writeHead(302, {
				location: "/"
			});
			res.end();
		})
		.catch(err => {
			res.writeHead(500, {
				"content-type": "text/plain"
			});

			res.write("500 server error!");
			res.end();
		});
}
