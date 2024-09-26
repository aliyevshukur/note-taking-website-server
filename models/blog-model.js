const mongoose = require("mongoose");

const contextSchema = mongoose.Schema({
  id: {
    type: Number,
    required: [true, "Please enter field id"],
    default: 0,
  },
  type: {
    type: String,
    required: [true, "Please enter field type"],
    default: "",
  },
  text: { type: String, default: "" },
  url: { type: String, default: "" },
});

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title"],
      default: "",
    },
    context: {
      type: [contextSchema],
      required: [true, "Please enter context fields"],
      default: "",
    },
    thumbnailImage: {
      type: String,
      required: [true, "Please enter thumbnail image"],
      default: "",
    },
    postDate: {
      type: String,
      required: [true, "Please enter postDate"],
      default: "",
    },
    author: {
      type: String,
      required: [true, "Please enter author"],
      default: "",
    },
    authorImage: {
      type: String,
      required: [true, "Please enter authorImage"],
      default: "",
    },
  },
  {
    timestamp: true,
  },
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
