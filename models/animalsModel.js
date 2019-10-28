const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    color: { type: String, default: "white" },
    model: { type: String, required: true },
    countOfLegs: { type: Number }
});

const Animals = mongoose.model("Animals", schema);

module.exports = Animals;

