import express, { Router } from "express";
import {
  createPermissionController,
  deletePermissionController,
  editPermissionController,
  getAllPermissionController,
  getPermissionByIdConroller,
} from "../controllers/permissionController";

const router: Router = express.Router();

router.route("/all").get(getAllPermissionController);
router.route("/").post(createPermissionController);
router.route("/edit").post(editPermissionController);
router.route("/delete").post(deletePermissionController);
router.route("/:id").get(getPermissionByIdConroller);

export default router;
