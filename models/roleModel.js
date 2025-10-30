import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    role_name: { type: String, required: true }, //user, admin , subadmin, admin
    value: { type: String, required: true }, // create , read , update , delete
  },
  { timestamps: true }
);

export const Role = mongoose.model("Role", roleSchema);
