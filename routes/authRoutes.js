import { Router } from "express";
import { loginValidator, userResgisterValidator } from "../validators/index.js";
import {
  getProfile,
  login,
  userRegsiter,
} from "../controllers/authController.js";
import { veryJWT } from "../middlewares/authMiddleware.js";
const router = Router();

router.route("/register").post(userResgisterValidator(), userRegsiter);
router.route("/login").post(loginValidator(), login);
router.route("/profile").get(veryJWT, getProfile);

export default router;
