const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    customerId: {
        type: String, 
        required: true
    },
    fullName: {
        type: String,
        maxLength: 30,
        required: true
    },
})); 

function validateCustomer(customer){
    const customerSchema = Joi.object({
        fullName: Joi.string().max(30).required(),
        userType: Joi.string().valid("customer").required(),
    });

    return customerSchema.validate(customer);
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;