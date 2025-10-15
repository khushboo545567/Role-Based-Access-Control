import { validationResult } from "express-validator";
import { Permission } from "../../models/permissionModel.js";

const addPermission = async (req, res) => {
  try {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, msg: "Errors", errors: Errors.array() });
    }
    const { permission_name } = req.body;
    const isExist = await Permission.findOne({ permission_name });
    if (isExist) {
      return res
        .status(400)
        .json({ success: false, msg: "permission name already exists" });
    }

    let obj = {
      permission_name,
    };
    if (req.body.is_Default) {
      obj.is_Default = req.body.is_Default;
    }

    const newPermission = await Permission.create(obj);
    return res.status(200).json({
      success: true,
      msg: "permission name is added sussfully",
      data: newPermission,
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

const getPermission = async (req, res) => {
  try {
    const permissions = await Permission.findById({});
    return res.status(200).json({
      success: true,
      permissions,
      msg: "permissions fetched successfully !",
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

const deletPermission = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};
export { addPermission, getPermission, deletPermission };
