const { Schema, model } = require("mongoose");

const Post = model(
  "Post",
  new Schema(
    {
      title: { type: String, unique: true },
      link: { type: String, default: "" },
      description: { type: String },
      categories: { type: [String], default: [] },
      pubDate: { type: String },
      creator: { type: String },
      metadata: { type: Array, default: [] },
    },
    { timestamps: true }
  )
);

module.exports = Post;
