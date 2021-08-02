const mongoose = require('mongoose');
const Joi = require("joi");

const Post = mongoose.model('Post', new mongoose.Schema({
    flavor: {
        type: String, 
        trim: true,
        minLength: 1,
        maxLength: 255,
        required: true
    },
    eventType:{
        type: String, 
        required: true
    },
    servingSizeMin:{
        type: Number, 
        min: 1,
        required: true
    },
    servingSizeMax:{
        type: Number, 
        max: 500,
        required: true
    },
    deliveryMethod:{
        type: String,
        trim: true,
        required: true
    },
    deliveryDate:{
        type: Date,
        min: Date.now(),
        required: true,
    },
    sampleImages:{
        type: Array,
    },
    budgetMin:{
        type: Number,
        min: 1,
        required: true,
    },
    budgetMax:{
        type: Number,
        max: 1000,
        required: true,
    },
    notes:{
        type: String,
        maxLength: 1000,
    },
    customerId:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date, 
        required: true, 
    },
})); 

function validatePost(post){
    const postSchema = Joi.object({
        flavor: Joi.string().min(1).max(255).required(),
        eventType: Joi.string().required(),
        servingSizeMin: Joi.number().min(1).required(),
        servingSizeMax: Joi.number().max(500).required(),
        deliveryMethod: Joi.string().required(),
        deliveryDate: Joi.date().greater('now').required(),
        sampleImages: Joi.array(),
        budgetMin: Joi.number().min(1).required(),
        budgetMax: Joi.number().max(1000).required(),
        notes: Joi.string().max(1000).allow(""),
        customerId: Joi.string().required(),
        createdAt: Joi.date().required()
    });

    return postSchema.validate(post);
}

exports.Post = Post;
exports.validatePost = validatePost;