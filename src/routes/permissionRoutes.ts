import express, { Router } from "express";
import {
  createPermissionController,
  deletePermissionController,
  editPermissionController,
  getAllPermissionController,
  getApplicationPermissionsController,
  getPermissionByIdConroller,
  getPermissionsByVersionController,
  getPermissionsTillVersionController,
} from "../controllers/permissionController";
import {
  createPermissionMiddleware,
  deletePermissionMiddleware,
  editPermissionMiddleware,
} from "../middlewares/permissionMiddleware";

const router: Router = express.Router();

router.route("/all").get(getAllPermissionController);
router
  .route("/")
  .post(createPermissionMiddleware, createPermissionController)
  .put(editPermissionMiddleware, editPermissionController)
  .delete(deletePermissionMiddleware, deletePermissionController);
router.route("/version/:versionId").get(getPermissionsByVersionController);
router.route("/application/:appId").get(getApplicationPermissionsController);
router.route("/version/till/").post(getPermissionsTillVersionController);

router.route("/:id").get(getPermissionByIdConroller);

export default router;
