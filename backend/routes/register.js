const express = require("express");
const joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const genAuthToken = require("../utils/genAuthToken");

const router = express.Router();

router.post("/", async(req, res) =>{
    const schema = joi.object({
        name: joi.string().min(4).max(50).required(),
        email: joi.string().min(5).max(150).required().email(),
        password: joi.string().min(5).max(200).required(),
        address: joi.string().min(10).max(150).required(),
        cnp: joi.string().min(10).max(100).required()
    });

    const { error } = schema.validate(req.body)
    if(error)
        return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email: req.body.email})
    if(user) //user exists
        return res.status(400).send("E-mail is already linked to an account.");
    
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        cnp: req.body.cnp
    });

    //salvam o parola encriptate in mongoDB
    const encrypt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, encrypt);

    user = await user.save();

    const token = genAuthToken(user);
    res.send(token);
});

module.exports = router;