const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A blog must have a title"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "A blog must have content"],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "Blog_User", // Reference to User model
      required: [true, "A blog must belong to a user"],
    },
    // tags: [String], // optional array of tags
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
    select: false,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
