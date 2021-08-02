const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const customers = require("./routes/customers");
const businesses = require("./routes/businesses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const posts = require("./routes/posts");
const offers = require("./routes/offers");
const app = express();

mongoose
  .connect("mongodb+srv://suren:hidden@cluster0.ehigg.mongodb.net/testDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected successfully to MongoDB"))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "*",
    credentials: true,
    exposedHeaders: ["x-auth-token"],
  })
);
app.use(express.json());
app.use("/api/users", users);
app.use("/api/customers", customers);
app.use("/api/businesses", businesses);
app.use("/api/auth", auth);
app.use("/api/posts", posts);
app.use("/api/offers", offers);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));