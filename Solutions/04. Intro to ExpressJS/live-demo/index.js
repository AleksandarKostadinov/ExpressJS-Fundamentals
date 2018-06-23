const express = require("express");
const port = 5000;

let app = express();

app.get('/', (req, res) => {
	res.send("Hello from express!");
});

app.listen(port, () => { console.log("Running on " + port) });