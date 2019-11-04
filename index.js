const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const celebretiesRoute = require("./routes/celebreties");
const authRoute = require("./routes/auth");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", celebretiesRoute);
app.use("/api", authRoute);

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/chat", (req, res) => {
  res.render("pages/chat");
});

mongoose.connect(
  "mongodb://farrux:supermen2006@ds241968.mlab.com:41968/farrux",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log("mongo db is ready")
);

app.listen(process.env.PORT || 4000, () => {
  console.log("server ready on port 4000");
});
