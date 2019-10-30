const app = require("express")();
const http = require("http").createServer(app)
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors")
const path = require("path");
const io = require("socket.io");
const socketChat = require("./sockets/sockets")



const animalRoute = require("./routes/animals");
const celebretiesRoute = require("./routes/celebreties");

const socket = io(http);
socketChat(socket);

app.set('view engine','ejs');
app.use(require("express").static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());


// app.use("/api", animalRoute);
app.use("/api", celebretiesRoute)

app.get("/", (req, res) => {
    res.render('pages/index')

});

app.get("/chat", (req, res) => {
    res.render('pages/chat')
    
});

// mongoose.connect('mongodb://localhost/animals', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }, () => console.log("mongo db is ready"));



http.listen(process.env.PORT || 4000, () => {
    console.log("server ready on port 4000")
})
