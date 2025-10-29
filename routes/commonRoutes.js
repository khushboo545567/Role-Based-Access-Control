import { Router } from "express";
import { veryJWT } from "../middlewares/authMiddleware.js";
import {
  catogeryAddValidator,
  catogeryDeleteValidator,
  catogeryUpdateValidator,
  postCreateValidator,
} from "../validators/adminValidator.js";
import {
  addCatogery,
  deleteCatogery,
  getCatogery,
  updateCatogery,
} from "../controllers/catogeryController.js";
import { createPost, getPosts } from "../controllers/postController.js";

const router = Router();
router
  .route("/add-catogery")
  .post(veryJWT, catogeryAddValidator(), addCatogery);

router.route("/get-catogery").get(veryJWT, getCatogery);
router
  .route("/delete-catogery")
  .post(veryJWT, catogeryDeleteValidator(), deleteCatogery);

router
  .route("/update-catogery")
  .post(veryJWT, catogeryUpdateValidator(), updateCatogery);

// post routes
router.route("/create-post").post(veryJWT, postCreateValidator(), createPost);
router.route("/get-posts").get(veryJWT, getPosts);
export default router;
