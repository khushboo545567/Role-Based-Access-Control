import { Router } from "express";
import { loginValidator, userResgisterValidator } from "../validators/index.js";
import { login, userRegsiter } from "../controllers/authController.js";
const router = Router();

router.route("/register").post(userResgisterValidator(), userRegsiter);
router.route("/login").post(loginValidator(), login);
export default router;
