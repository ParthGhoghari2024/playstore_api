import express, { Router } from "express";
import {
  createPermissionController,
  deletePermissionController,
  editPermissionController,
  getAllPermissionController,
  getApplicationPermissions,
  getPermissionByIdConroller,
  getPermissionsByVersion,
  getPermissionsTillVersion,
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
router.route("/version/:versionId").get(getPermissionsByVersion);
router.route("/application/:appId").get(getApplicationPermissions);
router.route("/version/till/").post(getPermissionsTillVersion);

router.route("/:id").get(getPermissionByIdConroller);

export default router;
