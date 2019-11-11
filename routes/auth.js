const express = require("express");
const Users = require("../models/authModel");
const { check, validationResult } = require("express-validator");

const router = express.Router();

router.post(
  "/register",
  [check("email").isEmail(), check("username").isLength({ max: 10 })],
  (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(422).json({ error: error.array() });
    }

    const { username, email, password } = req.body;

    const user = new Users({
      username,
      email,
      password
    });
    user.setPassword(password);
    user
      .save()
      .then(record => {
        res.json({ user: record.toAuth() });
      })
      .catch(err => {
        res.json({ error: err });
      });
  }
);

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("accept");

  Users.findOne({ email }).then(user => {
    if (user && user.isValidPassword(password)) {
      res.json({ user: user.toAuth() });
    } else {
      res
        .status(400)
        .json({ errors: { global: { notFound: "User not found" } } });
    }
  });
});

module.exports = router;
