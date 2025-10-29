import { Router } from "express";
import { veryJWT } from "../middlewares/authMiddleware.js";
import { catogeryAddValidator } from "../validators/adminValidator.js";
import { addCatogery, getCatogery } from "../controllers/catogeryController.js";

const router = Router();
router
  .route("/add-catogery")
  .post(veryJWT, catogeryAddValidator(), addCatogery);

router.route("/get-catogery").get(veryJWT, getCatogery);
export default router;
