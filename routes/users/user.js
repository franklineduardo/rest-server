const express = require("express");
const bodyParser = require('body-parser')
const User = require("../model/user")
const bcrypt = require("bcrypt");
const _ = require("underscore");
const { validateToken, adminRole } = require("../../server/middleware/autenticacion");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get("/user", validateToken, (req, res) => {

    let since = req.query.since || 0;
    since = Number(since);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    User.find({})
        .skip(since)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.countDocuments({}, (err, count) => {
                res.json({
                    users,
                    count
                });
            })

        })
})

app.post("/user", [validateToken, adminRole], (req, res) => {

    let body = req.body;

    let user = new User({
        name: body.name,
        password: bcrypt.hashSync(body.password, 10),
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

app.put("/user/:id", [validateToken, adminRole], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ["name", "email", "img", "role", "status"]);

    User.findByIdAndUpdate(id, body, { new: true }, (err, userDB) => {
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

})

app.delete("/user/:id", [validateToken, adminRole], (req, res) => {

    let id = req.params.id
    User.findByIdAndRemove(id, (err, userDeleted) => {
        if (userDeleted === null) {
            res.status(400).json({
                ok: false,
                err: {
                    message: "user not found"
                }
            });
        } else {
            res.json({
                ok: true,
                user: userDeleted
            })
        };
    })
})

module.exports = app;