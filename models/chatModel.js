const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  message: { type: String, required: true },
  author: { type: String },
  date: { type: Date }
});

const Chat = mongoose.model("Chat", schema);

module.exports = Chat;
