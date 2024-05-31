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
router
  .route("/")
  .post(createVersionMiddleware, createVersionController)
  .put(editVersionMiddleware, editVersionController)
  .delete(deleteVersionMiddleware, deleteVersionController);
router.route("/app/:appId").get(getAppVersionsController);
router.route("/:id").get(getVersionById);

export default router;
