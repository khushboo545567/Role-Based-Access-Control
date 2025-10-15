import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  permission_name: {
    type: String,
    required: true,
  },
  is_Default: {
    type: String,
    default: "not default ", //default
  },
});

export const Permission = mongoose.model("Permission", permissionSchema);
