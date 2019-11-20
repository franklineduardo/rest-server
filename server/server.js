const express = require("express");
const mongoose = require("mongoose");
require("./config/config");

const app = express();

app.use(require("../routes/users/user"));

app.use(require("../routes/index"));


mongoose.connect('mongodb://localhost:27017/cafe', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    promiseLibrary: global.Promise

});

app.listen(process.env.PORT, () => {
    console.log(`escuchando en puerto ${process.env.PORT}`);
});