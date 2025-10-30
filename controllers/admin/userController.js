import { validationResult } from "express-validator";
import { User } from "../../models/userModel.js";
import bcrypt from "bcrypt";
import Randomstring from "randomstring";
import { sendMail } from "../../utils/mail.js";

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
    const password = Randomstring.generate(6);
    const hashPassowrd = await bcrypt.hash(password, 10);

    ///////////////////////
    console.log(name, email, password);

    let obj = { name, email, password: hashPassowrd };
    if (req.body.role && req.body.role == "admin") {
      return res
        .status(400)
        .json({ success: false, msg: "you can not create this role " });
    } else if (req.body.role) {
      obj.role = req.body.role;
    }

    const user = await User.create(obj);

    // send the mail
    const content = `<p>Hii <b>${user.name}</b> your account is created below is your details to login in to the app.</p> <p>Name: ${user.name}</p>  <p>Email: ${user.email}</p> <p>Password: ${password}</p>`;

    sendMail(user.email, "account created", content);

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
