import express, { Router } from "express";
import {
  createVersionController,
  deleteVersionController,
  editVersionController,
  getAllVersionController,
  getAppVersionsController,
  getVersionById,
} from "../controllers/versionController";
import {
  createVersionMiddleware,
  deleteVersionMiddleware,
  editVersionMiddleware,
} from "../middlewares/versionMiddleware";

const router: Router = express.Router();

router.route("/all").get(getAllVersionController);
router.route("/").post(createVersionMiddleware, createVersionController);
router.route("/:id").get(getVersionById);
router.route("/edit").post(editVersionMiddleware, editVersionController);
router.route("/delete").post(deleteVersionMiddleware, deleteVersionController);
router.route("/app/").post(getAppVersionsController);

export default router;
