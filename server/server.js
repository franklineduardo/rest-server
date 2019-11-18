require("./config/config");

const express = require("express");
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get("/usuarios", (req, res) => {
    res.json("get usuarios");
})

app.post("/usuarios", (req, res) => {

    let body = req.body;

    if (body.name === undefined) {
        res.status(400).json({
            ok: "False",
            message: "el nombre es necesario"
        })

    } else {
        res.json({
            Person: body
        })
    }
});

app.put("/usuarios/:id", (req, res) => {

    let id = req.params.id;

    res.json({
        id
    });
})

app.delete("/usuarios/", (req, res) => {
        res.json("delete usuarios");
    })
    .listen(process.env.PORT, () => {
        console.log(`escuchando en puerto ${process.env.PORT}`);
    });