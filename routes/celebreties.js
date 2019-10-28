const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/who-are-you", async (req, res) => {

    const randomNumber = Math.floor(Math.random() * 335);

    const result = await axios.get("https://www.randomlists.com/data/celebrities.json")
        .then(res => res.data.RandL.items);

    const you = result[randomNumber];

    const modifiedYou = you.replace(" ", "_").toLowerCase();

    const url = `https://www.randomlists.com/img/people/${modifiedYou}.webp`;

    const youAre = {
        name: you,
        photo: url
    };

    res.json({ result: youAre });

})

module.exports = router;