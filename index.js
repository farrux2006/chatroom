const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors")
const path = require("path");

const animalRoute = require("./routes/animals");
const celebretiesRoute = require("./routes/celebreties");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

// app.use("/api", animalRoute);
app.use("/api", celebretiesRoute)

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"))
});


// mongoose.connect('mongodb://localhost/animals', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }, () => console.log("mongo db is ready"));

app.listen(process.env.PORT || 4000, () => {
    console.log("server ready on port 4000")
})
