import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    catogery: {
      type: Array,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
