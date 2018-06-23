const Tag = require("mongoose").model("Tag");
const formidable = require("formidable");

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      const name = fields.tagName;

      Tag.create({
        name,
        images: []
      }).then(tag => {
        res.writeHead(302, {
          location: "/"
        });

        res.end();
      }).catch(err => {
        res.writeHead(500, {
          "content-type": "text/plain"
        });

        res.write("500 server error!");
        res.end();
      });
    });
  } else {
    return true
  }
}
