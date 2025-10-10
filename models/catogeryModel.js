import mongoose from "mongoose";

const catogerySchema = new mongoose.Schema(
  {
    catName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Catogery = mongoose.model("Catogery", catogerySchema);
