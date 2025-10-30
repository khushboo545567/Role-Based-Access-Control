import { validationResult } from "express-validator";
const storeRoles = async (req, res) => {
  try {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, msg: "Errors", errors: Errors.array() });
    }
  } catch (error) {
    console.error("Error while updating permission:", error);
    return res.status(400).json({
      success: false,
      msg: error.message || "Something went wrong while updating permission",
    });
  }
};

const getRoles = async (req, res) => {
  try {
  } catch (error) {}
};
export { storeRoles, getRoles };
