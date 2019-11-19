const express = require("express");
const bodyParser = require('body-parser')
const User = require("../model/user")
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get("/user", (req, res) => {
    res.json("get user local");
})

app.post("/user", (req, res) => {

    let body = req.body;

    let user = new User({
        name: body.name,
        password: body.password,
        email: body.email,
        role: body.role
    })

    user.save((err, userDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        } else {
            res.json({
                ok: true,
                userDB
            });
        }
    })
});

app.put("/user/:id", (req, res) => {

    let id = req.params.id;

    res.json({
        id
    });
})


app.delete("/user/", (req, res) => {
    res.json("delete user");
})

module.exports = app;