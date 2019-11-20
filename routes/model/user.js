const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
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

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin(unique, { message: "the email will be unique" })

module.exports = mongoose.model("user", userSchema);