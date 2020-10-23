const express = require('express');
const router = express.Router();
const account = require('../config/profile.json');
const user = require('../models/User');

router
    .post('/login', (req, res) => {
        console.log("===============req=============");
        console.log(req.body);
        try {
            if (req.body.email == account.email && req.body.password == account.password) {
                res.send({ status: 0, message: "OK" });
            } else {
                res.send({ status: 1, message: "Fail" });
            }
        } catch (error) {
            res.status(401).send({ message: error.message });
        }
    })
    .post('/register', (req, res) => {
        res.send(user.register(req.body.myinfo));
    })
    .get('/getinfo', async function(req, res) {
        let data = await user.getinfo();
        res.send(data);
    })
    .post('/editprofile', (req, res) => {
        console.log("**********");
        console.log(req.body.profile);
        res.send(user.editprofile(req.body.profile));
    })

module.exports = router;