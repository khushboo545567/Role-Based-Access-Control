import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    catogery: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
