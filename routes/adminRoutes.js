import { Router } from "express";
import {
  permissionAddValidator,
  permissionDeleteValidator,
} from "../validators/adminValidator.js";
import {
  addPermission,
  deletPermission,
  getPermission,
} from "../controllers/admin/permissionController.js";
import { veryJWT } from "../middlewares/authMiddleware.js";

const router = Router();
router
  .route("/add-permission")
  .post(permissionAddValidator(), veryJWT, addPermission);

router.route("/get-permission").get(veryJWT, getPermission);

router
  .route("/delte-permission")
  .post(permissionDeleteValidator(), veryJWT, deletPermission);
export default router;
