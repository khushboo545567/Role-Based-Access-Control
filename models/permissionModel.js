import mongoose from "mongoose";
import { Types } from "mysql2";

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

export const Userpermission = mongoose.model("Permission", permissionSchema);
