import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const veryJWT = async (req, res, next) => {
  const token =
    req.cookeis?.token || req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(400).json({ sucess: false, msg: "unauthrorized token" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password");
    if (!user) {
      return res.status(400).json({ sucess: false, msg: "invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ sucess: false, msg: error.message });
  }
};

export { veryJWT };
