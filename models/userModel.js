import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user", //0-> normal user, 1-> admin, 2->subadmin 3->editor
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
