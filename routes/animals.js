const express = require("express");
const Animal = require("../models/animalsModel");

const router = express.Router();

router.post("/add-animal", (req, res) => {
    const { color, model, countOfLegs } = req.body;

    const animal = new Animal({
        color: color,
        model: model,
        countOfLegs: countOfLegs
    })
    animal.save();
    res.json({ animals: animal })
})

router.get("/get-animals", async (req, res) => {

    const animal = await Animal.find({});

    if (animal) {
        res.json({ animals: animal })
    } else {
        res.json({ error: "Animals not found." })
    }

})

router.delete("/delete-animal/:id", async (req, res) => {

    const id = req.params.id;

    const animal = await Animal.findByIdAndRemove(id);
    
    if (animal) {
        res.json({ success: "Deleted" })
    } else {
        res.json({ animal: "Animal not found" })
    }

})

// router.put -> update

router.put("/update-animal/:id", async (req, res) => {
    const { id } = req.params;
    const { color, model, countOfLegs } = req.body;

    await Animal.findByIdAndUpdate(id, { 
        $set: { 
            color: color,
            model: model,
            countOfLegs: countOfLegs
         } 
    }, 
    { new: true }, 
    (err, data) => {
            if (err) {
                console.log('err', err)
            }
            res.json({ a: data })
    });

})

module.exports = router;