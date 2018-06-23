const Image = require("mongoose").model("Image");
const Tag = require("mongoose").model("Tag");
const fs = require("fs");

module.exports = (req, res) => {
	if (req.pathname === '/search') {
		fs.readFile("./views/results.html","utf8" , (err, result) => {
			if (err) {
				throw err;
			}
			let params = {};
			if (req.pathquery.tagName) {
				let tagNames = req.pathquery.tagName.split(",").filter(t => t.length > 0);

				if (tagNames > 0) {
					Tag.find({name: {$in: tagNames}})
						.then(tags => {
							let ids = tags.map(t => t._id);
							params.tags = ids;
							findByParams(params);
						})
						.catch(err => {
							console.log(err);
							throw err;
						})
				} else {
					findByParams(params);
				}
			} else {
        findByParams(params);
      }

			function findByParams(params) {
				Image.find({})
					.then(data => {
						let imagesHtml = "";

						for (const image of data) {
							imagesHtml += imageTemplate(image);
						}
          
						result = result.replace("<div class='replaceMe'></div>", imagesHtml);
          
						res.writeHead(200, {
							"content-type": "text/html"
						});
						res.write(result);
						res.end();
					})
					.catch(err => {
						console.log(err);
						throw err;
					});
			}
		});

		
	} else {
		return true
	}
}

function imageTemplate(image) {
	return `<fieldset id ="${image._id}">
  <img src="${image.url}">
  </img><p>${image.description}<p/>
  <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
  </button> 
  </fieldset>`;
}


