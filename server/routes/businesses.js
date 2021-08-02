const { User, validateUser } = require("../models/user");
const { Business, validateBusiness } = require("../models/business");
const express = require("express");

const router = express.Router();

// business sign up
router.post("/", async (req, res) => {
  const { email, password, userType, businessName, specialties, userCognitoId } = req.body;

  const { error: userError } = validateUser({ email, password, userCognitoId });
  if (userError)
    return res.status(400).send({ message: "User error is: " + userError.details[0].message });

  const { error: businessError } = validateBusiness({ userType, businessName, specialties });
  if (businessError) 
    return res.status(400).send({ message: "Business error is: " + businessError.details[0].message });

  try {
    const user = new User({
      email,
      userType,
      userCognitoId
    });

    await user.save();

    const business = new Business({
      businessId: userCognitoId,
      businessName,
      specialties
    });

    await business.save();

    return res.status(200).send("Business successfully registered");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

module.exports = router;
