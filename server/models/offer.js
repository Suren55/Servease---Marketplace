const mongoose = require("mongoose");
const Joi = require("joi");

const Offer = mongoose.model("Offer", new mongoose.Schema({
    businessId:{
        type: String,
        required: true
    },
    postId:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 1,
        required: true
    },
    message:{
        type: String,
        max: 1000,
    },
    // isAccepted: {
    //     type: Boolean,
    //     required: true
    // },
    // createdAt:{
    //     type: Date,
    //     required: true,
    // }
    createdAt:{
        type: String,
        required: true,
    },
}));

function validateOffer(offer){
    const offerSchema = Joi.object({
        businessId: Joi.string().required(),
        postId: Joi.string().required(),
        price: Joi.number().min(1).required(),
        message: Joi.string().required(),
        createdAt: Joi.string().required()
    })

    return offerSchema.validate(offer);
}

exports.Offer = Offer;
exports.validateOffer = validateOffer;