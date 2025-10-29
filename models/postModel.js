import mongoose from "mongoose";
import { Catogery } from "./catogeryModel";

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
    catogery: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Catogery,
      },
    ],
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
