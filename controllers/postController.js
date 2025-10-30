import { validationResult } from "express-validator";
import { Post } from "../models/postModel.js";

const createPost = async (req, res) => {
  try {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, msg: "Errors", errors: Errors.array() });
    }

    const { title, description, catogery } = req.body;
    let obj = { title, description };
    if (catogery) {
      obj.catogery = catogery;
    }

    const postData = await Post.create(obj);
    const postDetails = await Post.findOne({ _id: postData._id }).populate(
      "catogery"
    );
    return res
      .status(200)
      .json({ success: true, msg: "data posted successfully !", postDetails });
  } catch (error) {
    console.error("Error while updating permission:", error);
    return res.status(400).json({
      success: false,
      msg: error.message || "Something went wrong while updating permission",
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("catogery");
    return res
      .status(200)
      .json({ success: true, msg: "successfully gets all the posts", posts });
  } catch (error) {
    console.error("Error while updating permission:", error);
    return res.status(400).json({
      success: false,
      msg: error.message || "Something went wrong while updating permission",
    });
  }
};

const deltePosts = async (req, res) => {
  try {
    console.log(req.body.id);
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, msg: "Errors", errors: Errors.array() });
    }

    const { id } = req.body;
    const postisExist = await Post.findById(id);
    console.log(postisExist);
    if (!postisExist) {
      return res
        .status(404)
        .json({ success: false, msg: "post does not exist " });
    }

    await Post.findByIdAndDelete({ _id: id });

    return res
      .status(200)
      .json({ success: true, msg: "post deleted sussfully !" });
  } catch (error) {
    console.error("Error while updating permission:", error);
    return res.status(400).json({
      success: false,
      msg: error.message || "Something went wrong while updating permission",
    });
  }
};

const updatePosts = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }

    const { id, title, description, category } = req.body;
    const postExists = await Post.findById(id);

    if (!postExists) {
      return res.status(404).json({
        success: false,
        msg: "Post does not exist",
      });
    }

    // Update fields only if provided
    if (title) postExists.title = title;
    if (description) postExists.description = description;

    if (category) {
      // if it's an array, push; else replace
      if (Array.isArray(postExists.category)) {
        postExists.category.push(category);
      } else {
        postExists.category = category;
      }
    }

    const updatedPost = await postExists.save();

    return res.status(200).json({
      success: true,
      msg: "Post updated successfully",
      updatedPost,
    });
  } catch (error) {
    console.error("Error while updating post:", error);
    return res.status(500).json({
      success: false,
      msg: error.message || "Something went wrong while updating post",
    });
  }
};

export { createPost, getPosts, deltePosts, updatePosts };
