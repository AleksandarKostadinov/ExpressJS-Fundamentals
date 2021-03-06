const mongoose = require("mongoose");

let catSchema = mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number , required: true },
    color: {type: String, required: true},
});

catSchema.methods.sayHello = function () {
    return `Hello from ${this.name}`;
}

catSchema.virtual("description").get(function () {
    return `${this.name} - ${this.age}`;
});

catSchema.path("age").validate(function () {
    return this.age >= 1 && this.age <= 20;
}, "Cat age must be between 1 and 20!");


let Cat = mongoose.model("Cat",catSchema);

module.exports = Cat;