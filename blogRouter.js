const express = require("express");
const blogController = require("./blogController");
const router = express.Router();

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(blogController.createBlog);

router.route("/singup").post(blogController.singup);
router.route("/login").post(blogController.login);

router
  .route("/createBlog")
  .post(blogController.protect, blogController.createBlog);

router
  .route("/updateBlog/:id")
  .patch(blogController.protect, blogController.updateBlog);

router
  .route("/deleteBlog/:id")
  .delete(blogController.protect, blogController.deleteBlog);

module.exports = router;
