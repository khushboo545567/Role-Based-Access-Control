import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  permission_name: {
    type: String,
    required: true,
  },
  is_Default: {
    type: Boolean,
    default: false, // better than string
  },
});

export const Permission = mongoose.model("Permission", permissionSchema);
