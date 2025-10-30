import { Router } from "express";
import { veryJWT } from "../middlewares/authMiddleware.js";
import {
  catogeryAddValidator,
  catogeryDeleteValidator,
  catogeryUpdateValidator,
  createUserValidator,
  postCreateValidator,
  postDeleteValidator,
  postUpdateValidator,
} from "../validators/adminValidator.js";
import {
  addCatogery,
  deleteCatogery,
  getCatogery,
  updateCatogery,
} from "../controllers/catogeryController.js";
import {
  createPost,
  deltePosts,
  getPosts,
  updatePosts,
} from "../controllers/postController.js";

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
router.route("/delete-posts").post(veryJWT, postDeleteValidator(), deltePosts);
router.route("/update-posts").post(veryJWT, postUpdateValidator(), updatePosts);

// create user
router.route("/create-user").post(veryJWT, createUserValidator, createUser);
export default router;
