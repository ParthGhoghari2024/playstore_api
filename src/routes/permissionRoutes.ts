import express, { Router } from "express";
import {
  createPermissionController,
  getAllPermissionController,
} from "../controllers/permissionController";

const router: Router = express.Router();

router.route("/all").get(getAllPermissionController);
router.route("/").post(createPermissionController);

export default router;
