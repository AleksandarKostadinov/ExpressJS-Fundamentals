const fs = require("fs");
const pathM = require("path");

module.exports = {
    sendHtml(statusCodeOfHtml, dynamicData) {
        let pathName = pathM.join(__dirname, "../views/layout.html");

        fs.readFile(pathName, "utf8", (err, data) => {
            if (err) {
                console.log(err);
            }
            this.writeHead(statusCodeOfHtml, {
                "content-type": "text/html"
            });
            
            if (dynamicData) {
                data = data.replace("{{mainPlaceholder}}", dynamicData);
            }

            this.write(data);
            this.end();
        });
    }
};