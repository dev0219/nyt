// diet log
const express = require("express");
const diets = require("../models/Diet");

const router = express.Router();

router
    .get("/alldiet", async function(req, res) {
        let data = await diets.all();
        res.send(data);
    })
    .post("/postdiet", (req, res) => {
        res.send(diets.postDiet(req.body.newdiet))
    })

module.exports = router;