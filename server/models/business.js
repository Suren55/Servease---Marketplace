const Joi = require("joi");
const mongoose = require("mongoose");

const Business = mongoose.model("Business", new mongoose.Schema({
    businessId: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      maxLength: 50,
      required: true,
    },
    specialties: {
      type: Array,
      required: true,
    },
  })
);

function validateBusiness(business) {
  const businessSchema = Joi.object({
    businessName: Joi.string().max(50).required(),
    specialties: Joi.array().required(),
    userType: Joi.string().valid("business").required(),
  });

  return businessSchema.validate(business);
}

exports.Business = Business;
exports.validateBusiness = validateBusiness;
