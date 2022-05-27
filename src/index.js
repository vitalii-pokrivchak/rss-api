const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { router } = require("./posts/v1/");
const { PORT, MONGO_URL } = require("./config");

// Initialize application
const app = express();

// Register middlewares for application
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/v1/posts", router);

// Run application
(async function () {
  try {
    await mongoose.connect(MONGO_URL);

    app.listen(PORT, () =>
      console.log(`Server has been started on ${PORT} port...`)
    );
  } catch (e) {
    console.log(e.message);
  }
})();
