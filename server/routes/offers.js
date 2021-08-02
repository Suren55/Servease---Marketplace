const express = require("express");
const { Business } = require("../models/business");
const { Offer, validateOffer } = require("../models/offer");
const route = express.Router();

route.post("/", async (req, res) => {
    try{
        const {error} = validateOffer(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const {businessId, postId, price, message, createdAt} = req.body;

        // fetch business info to embed in the Offer
        // const businessInfo = await Business.find({cognitoId: businessId});
        // const { name, rating, city } = businessInfo;

        const offer = new Offer({
            businessId, 
            postId, 
            price, 
            message, 
            createdAt,
            // businessInfo: {
            //     name,
            //     rating, 
            //     city
            // }
        });

        await offer.save();

        return res.status(200).send("Offer is successfully created");
    }
    catch(error){
        console.log(error);
        return res.status(400).send(error);
    }
})

route.get("/", async (req, res) => {
  try {
      const allOffers = await Offer.find();
      return res.status(200).send(allOffers);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }  
})

route.get("/:postId", async (req, res) => {
    try {
        const allOffersForSpecificPost = await Offer.find({postId: req.params.postId});
        return res.status(200).send(allOffersForSpecificPost);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    } 
})

module.exports = route;