import { validationResult } from "express-validator";
import { User } from "../../models/userModel";
import bcrypt from "bcrypt";
import Randomstring from "randomstring";

const createUser = async (req, res) => {
  try {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, msg: "Errors", errors: Errors.array() });
    }

    const { name, email } = req.body;
    const isExists = await User.findOne({ email });
    if (isExists) {
      return res
        .status(400)
        .json({ success: true, msg: "user already exists" });
    }
    const passowrd = Randomstring.generate(6);
    const hashPassowrd = await bcrypt.hash(passowrd, 10);

    let obj = { name, email, passowrd: hashPassowrd };
    if (req.body.role && req.body.role == "admin") {
      return res
        .status(400)
        .json({ success: false, msg: "you can not create this role " });
    } else if (req.body.role) {
      obj.role = req.body.role;
    }

    const user = await User.create(obj);
    return res
      .status(200)
      .json({ success: true, msg: "user created successfully ", user });
  } catch (error) {
    console.error("Error while updating permission:", error);
    return res.status(400).json({
      success: false,
      msg: error.message || "Something went wrong while updating permission",
    });
  }
};
export { createUser };
