import express, { Router } from "express";
import {
  createPermissionController,
  deletePermissionController,
  editPermissionController,
  getAllPermissionController,
  getPermissionByIdConroller,
} from "../controllers/permissionController";
import {
  createPermissionMiddleware,
  editPermissionMiddleware,
} from "../middlewares/permissionMiddleware";

const router: Router = express.Router();

router.route("/all").get(getAllPermissionController);
router.route("/").post(createPermissionMiddleware, createPermissionController);
router.route("/edit").post(editPermissionMiddleware, editPermissionController);
router
  .route("/delete")
  .post(editPermissionMiddleware, deletePermissionController);
router.route("/:id").get(getPermissionByIdConroller);

export default router;
