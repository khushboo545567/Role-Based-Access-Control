import { validationResult } from "express-validator";
import { Role } from "../models/roleModel.js";

const storeRoles = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Validation errors",
        errors: errors.array(),
      });
    }

    const { role_name, value } = req.body;
    const role = await Role.create({ role_name, value });

    return res
      .status(201)
      .json({ success: true, msg: "Role created successfully", role });
  } catch (error) {
    console.error("Error while creating role:", error);
    return res
      .status(500)
      .json({ success: false, msg: error.message || "Something went wrong" });
  }
};

const getRoles = async (req, res) => {
  // DO NOT GET THE ADMIN DATA
  try {
    const roles = await Role.find();
    return res
      .status(200)
      .json({ success: true, msg: "roles fetched successfully !", roles });
  } catch (error) {
    console.error("Error while creating role:", error);
    return res
      .status(500)
      .json({ success: false, msg: error.message || "Something went wrong" });
  }
};
export { storeRoles, getRoles };
