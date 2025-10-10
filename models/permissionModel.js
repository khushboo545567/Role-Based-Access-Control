import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    permissions: [
      {
        permissionName: String,
        permissionValue: [String], //0->create , 1->read, 2->edit , 3->delete
      },
    ],
  },
  { timestamps: true }
);

export const Permission = mongoose.model("Permission", permissionSchema);
