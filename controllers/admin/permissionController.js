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
    const permissions = await Permission.find({});
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
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, msg: "Errors", errors: Errors.array() });
    }

    const { id } = req.body;
    await Permission.findByIdAndDelete({ _id: id });
    return res
      .status(200)
      .json({ status: true, msg: "Permission has deleted sussfully" });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

const updatePermission = async (req, res) => {
  try {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, msg: "Errors", errors: Errors.array() });
    }
    const { id, permission_name, is_Default } = req.body;

    const isExists = await Permission.findById(id);

    if (!isExists) {
      return res
        .status(400)
        .json({ success: false, msg: "permission is not found !" });
    }
    // finding the permission name in the db other than the current id
    const isNameAssigned = await Permission.findOne({
      _id: { $ne: id },
      permission_name,
    });
    if (isNameAssigned) {
      return res.status(400).json({
        success: false,
        msg: "permission name already assigned to another permission",
      });
    }

    // 3️⃣ Check if there is **actually any change**
    const isSame =
      isExists.permission_name === permission_name &&
      isExists.is_Default === (is_Default === "true" || is_Default === true);
    if (isSame) {
      return res.status(400).json({
        success: false,
        msg: "No changes detected — nothing to update.",
      });
    }

    // if the data is diffrent then perform the change
    isExists.permission_name = permission_name;
    if (is_Default !== undefined) {
      isExists.is_Default = is_Default === "true" || is_Default === true;
    }
    await isExists.save();

    return res.status(200).json({
      success: true,
      msg: "permission updated sussfully",
      data: isExists,
    });
  } catch (error) {
    console.error("Error while updating permission:", error);
    return res.status(500).json({
      success: false,
      msg: error.message || "Something went wrong while updating permission",
    });
  }
};

export { addPermission, getPermission, deletPermission, updatePermission };
