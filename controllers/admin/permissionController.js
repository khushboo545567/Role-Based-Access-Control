import { validationResult } from "express-validator";

const addPermission = async (req, res) => {
  try {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, msg: "Errors", errors: Errors.array() });
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export { addPermission };
