import mongoose from "mongoose";

const userpermissionSchema = new mongoose.Schema(
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

export const Userpermission = mongoose.model(
  "Userpermission",
  userpermissionSchema
);
