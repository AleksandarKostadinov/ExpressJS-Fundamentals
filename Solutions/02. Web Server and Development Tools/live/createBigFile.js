const fs = require("fs");
const file = fs.createWriteStream("./file.txt");

for (let i = 0; i< 1e5; i++) {
    file.write("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores velit placeat illo illum, expedita iste dolorem tempora culpa mollitia debitis ratione nemo itaque voluptatem ducimus exercitationem ea voluptatibus ab explicabo.")
}

file.end();