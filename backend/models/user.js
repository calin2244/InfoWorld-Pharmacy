const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 150,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 2048,
    },
    address: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 150
    },
    cnp: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 150
    }
});

const User = mongoose.model("User", userSchema);

exports.User = User;
