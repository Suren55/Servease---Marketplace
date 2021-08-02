const express = require("express");
const { User, validateUser } = require("../models/user");
const { Business } = require("../models/business");
const { Customer } = require("../models/customer");
const router = express.Router();

// check verification
router.get("/verification", async (req, res) => {
  try {
    const cognitoUserId = req.headers["cognito-user-id"];

    if (!cognitoUserId) {
      throw new Error("Missing cognito user id!");
    }

    const loggedInUser = await User.findOne({
      userCognitoId: cognitoUserId,
    }).select("-_id -userCognitoId -__v");
    console.log("cognitoUserId", cognitoUserId);
    console.log("cognitoUserId", loggedInUser);
    const { userType: loggedInUserType } = loggedInUser;

    let accountInfo;
    if (loggedInUserType === "customer") {
      accountInfo = await Customer.findOne({
        customerId: cognitoUserId,
      }).select(" -userCognitoId -__v");
    } else {
      accountInfo = await Business.findOne({
        businessId: cognitoUserId,
      }).select("-_id -businessId -__v");
    }

    return res.send({ accountInfo, userInfo: loggedInUser });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

module.exports = router;
