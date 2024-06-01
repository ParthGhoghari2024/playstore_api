import express, { Router } from "express";
import {
  createPermission,
  deletePermission,
  editPermission,
  getAllPermission,
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

router.route("/all").get(getAllPermission);
router
  .route("/")
  .post(createPermissionMiddleware, createPermission)
  .put(editPermissionMiddleware, editPermission)
  .delete(deletePermissionMiddleware, deletePermission);
router.route("/version/:versionId").get(getPermissionsByVersion);
router.route("/application/:appId").get(getApplicationPermissions);
router.route("/version/till/").post(getPermissionsTillVersion);

router.route("/:id").get(getPermissionByIdConroller);

export default router;
