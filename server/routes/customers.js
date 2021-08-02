const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/user");
const { Customer, validateCustomer } = require("../models/customer");

router.post("/", async (req, res) => {
  const { userError } = validateUser(req.body);
  if (userError)
    return res.status(400).send("User error is: " + error.details[0].message);

  const { customerError } = validateCustomer(req.body);
  if (customerError)
    return res
      .status(400)
      .send("Customer error is: " + error.details[0].message);

  try {
    const user = new User({
      email: req.body.email,
      userType: req.body.userType,
      userCognitoId: req.body.userCognitoId,
    });

    const customer = new Customer({
      customerId: req.body.userCognitoId,
      fullName: req.body.fullName,
    });

    await user.save();
    await customer.save();

    return res.status(200).send({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

module.exports = router;
