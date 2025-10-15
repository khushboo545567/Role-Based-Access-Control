import { Router } from "express";
import { userResgisterValidator } from "../validators/index.js";
import { userRegsiter } from "../controllers/authController.js";
const router = Router();

router.route("/register").post(userResgisterValidator(), userRegsiter);

export default router;
