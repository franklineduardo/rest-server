const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const validRols = {
    rols: ["ADMIN_ROLE", "USER_ROLE"],
    message: "error"
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: "USER_ROLE",
        Enum: validRols
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false

    }
});

userSchema.plugin(unique, { message: "the email will be unique" })

module.exports = mongoose.model("user", userSchema);