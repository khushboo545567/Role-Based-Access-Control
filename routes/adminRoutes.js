import { Router } from "express";
import { permissionAddValidator } from "../validators/adminValidator.js";
import { addPermission } from "../controllers/admin/permissionController.js";

const router = Router();
router.route("/add-permission").post(permissionAddValidator(), addPermission);

export default router;
