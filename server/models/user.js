const mongoose = require('mongoose');
const Joi = require("joi");

const User = mongoose.model('User', new mongoose.Schema({
    email: {
        type: String, 
        required: true,
        unique: true,
        maxLength: 255
    },
    userType:{
        type: String,
        required: true
    },
    userCognitoId:{
        type: String, 
        required: true, 
    }
})); 

function validateUser(user){
    const userSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().max(255),
        userCognitoId: Joi.string().required()
    });

    return userSchema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;