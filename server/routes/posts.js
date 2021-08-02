const express = require("express");
const S3 = require("aws-sdk/clients/s3");
const multer = require("multer");
const ss = require("stream-stream");
const fs = require("fs");
const util = require("util");
const config = require("../config/default.json");
const { Post, validatePost } = require("../models/post");
const auth = require("../middleware/auth");
const route = express.Router();

const upload = multer({ dest: "uploads/" });

const s3Bucket = new S3({
  region: config.S3.AWS_BUCKET_REGION,
  accessKeyId: config.S3.AWS_ACCESS_KEY,
  secretAccessKey: config.S3.AWS_SECRET_KEY,
});

route.post("/", upload.array("image", 3), async (req, res) => {
  try {
    const { error } = validatePost(req.body);
    if (error) return res.status(417).send(error.details[0].message);

    const uploadedImages = req.files;
    let sampleImages = [];

    const {
      flavor,
      servingSizeMin,
      servingSizeMax,
      eventType,
      deliveryMethod,
      deliveryDate,
      budgetMin,
      budgetMax,
      notes,
      customerId,
      createdAt,
    } = req.body;

    const post = new Post({
      flavor,
      servingSizeMin,
      servingSizeMax,
      eventType,
      deliveryMethod,
      deliveryDate,
      sampleImages,
      budgetMin,
      budgetMax,
      notes,
      customerId,
      createdAt,
    });

    const postResult = await post.save();

    for (let i = 0; i < uploadedImages.length; i++) {
      const fileStream = fs.createReadStream(uploadedImages[i].path);
      const ext =
        uploadedImages[i].originalname.split(".")[
          uploadedImages[i].originalname.split(".").length - 1
        ];

      let uploadParams = {
        Bucket:
          config.S3.AWS_BUCKET_NAME + "/posts/" + postResult._id.toString(),
        Body: fileStream,
        Key: `${uploadedImages[i].filename}.${ext}`,
        ContentType: uploadedImages[i].mimetype,
      };

      const uploadedImage = await s3Bucket.upload(uploadParams).promise();
      sampleImages.push(uploadedImage.Location);

      await Post.findOneAndUpdate(
        { _id: postResult._id },
        { $set: { sampleImages } },
        function (err, doc) {
          if (err) {
            console.log(err);
          }

          console.log(doc);
        }
      );

      fs.unlinkSync(uploadedImages[i].path);
    }

    // 1. bucket/posts/postId/image1, image2, image3
    // 2. bucket/customerProfilePics/customerId/profilePic
    // 3. bucket/businessProfilePics/businessId/profilePic
    // 4. bucket/businessGalleryPics/businesId/image1, image2 ... image100

    return res.status(200).send({ message: "post is successfully created" });
  } catch (error) {
    console.log(error);
    return res.status(402).send(error);
  }
});

route.get("/", async (req, res) => {
  try {
    const post = await Post.find();

    return res
      .status(200)
      .send({ message: `All posts are fetched successfully`, content: post });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

route.get("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.find({ _id: postId });

    return res.status(200).send({
      message: `Post with the id ${postId} is fetched successfully`,
      content: post,
    });
  } catch (error) {
    return res.status(400).send(error);
  }
});

route.get("/customers/:id", async (req, res) => {
  try {
    const allPostsByCustomer = await Post.find({ customerId: req.params.id });
    return res.status(200).send(allPostsByCustomer);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

module.exports = route;
