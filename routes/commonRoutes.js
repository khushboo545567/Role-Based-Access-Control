import { Router } from "express";
import { veryJWT } from "../middlewares/authMiddleware.js";

const router = Router();
router.route("/add-catogery").post(veryJWT);
export default router;
