const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: { type: String },
  password: { type: String }
});

schema.methods.setPassword = function setPassword(password) {
  this.password = bcrypt.hashSync(password, 10);
};

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      username: this.username,
      email: this.email
    },
    "thesecretisopened",
    { expiresIn: "6h" }
  );
};

schema.methods.toAuth = function toAuth() {
  return {
    token: this.generateJWT()
  };
};

schema.plugin(uniqueValidator, { message: "This email is already taken" });

const Users = mongoose.model("Users", schema);

module.exports = Users;
