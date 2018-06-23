const mongoose = require("mongoose");
const Cat = require("./models/Cat");

let Owner = mongoose.model("Owner", {
   name: {type: String, required: true}, 
   age: {type: Number, required: true}, 
   cats: [Cat.schema]
});

mongoose
    .connect("mongodb://localhost:27017/cats")
    .then(() => {
        let cat = new Cat({
            age: 50
        });

        cat.save().catch(e => console.log(e));
    })
    .catch(e => console.log(e));

