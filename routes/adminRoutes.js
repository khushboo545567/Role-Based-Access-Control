import { Router } from "express";
import {
  permissionAddValidator,
  permissionDeleteValidator,
  permissionUpdateValidator,
} from "../validators/adminValidator.js";
import {
  addPermission,
  deletPermission,
  getPermission,
  updatePermission,
} from "../controllers/admin/permissionController.js";
import { veryJWT } from "../middlewares/authMiddleware.js";
import { roleAccess } from "../middlewares/adminMiddleware.js";

const router = Router();
router
  .route("/add-permission")
  .post(veryJWT, roleAccess("admin"), permissionAddValidator(), addPermission);

router
  .route("/get-permission")
  .get(veryJWT, roleAccess("admin"), getPermission);

router
  .route("/delte-permission")
  .post(
    veryJWT,
    roleAccess("admin"),
    permissionDeleteValidator(),
    deletPermission
  );
router
  .route("/update-permission")
  .post(
    veryJWT,
    roleAccess("admin"),
    permissionUpdateValidator(),
    updatePermission
  );
export default router;
