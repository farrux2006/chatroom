const express = require("express");
const Users = require("../models/authModel");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

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

router.post("/reset", async (req, res) => {
  const { email } = req.body;

  function setup() {
    return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "elcinmehher123@gmail.com",
        pass: "elcin12345"
      }
    });
  }

  await Users.findOne({ email }, (err, findedUser) => {
    if (err) {
      console.log(err);
      res.json({ error: "User not found!" });
    } else {
      const tranport = setup();

      const em = {
        from: `from Chatroom`,
        to: email,
        subject: "reset password",
        text: `http://localhost:4000/reset/?email=${email}`
      };

      tranport.sendMail(em);
    }
  });
});

module.exports = router;
