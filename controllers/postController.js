import { validationResult } from "express-validator";
import { Post } from "../models/postModel";

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
    return res
      .status(200)
      .json({ success: true, msg: "data posted successfully !", postData });
  } catch (error) {
    console.error("Error while updating permission:", error);
    return res.status(400).json({
      success: false,
      msg: error.message || "Something went wrong while updating permission",
    });
  }
};

export { createPost };
