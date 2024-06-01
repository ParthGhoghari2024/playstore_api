import express, { Router } from "express";
import {
  createVersion,
  deleteVersion,
  editVersion,
  getAllVersion,
  getAppVersions,
  getVersionById,
} from "../controllers/versionController";
import {
  createVersionMiddleware,
  deleteVersionMiddleware,
  editVersionMiddleware,
} from "../middlewares/versionMiddleware";
const router: Router = express.Router();

router.route("/all").get(getAllVersion);
router
  .route("/")
  .post(createVersionMiddleware, createVersion)
  .put(editVersionMiddleware, editVersion)
  .delete(deleteVersionMiddleware, deleteVersion);
router.route("/app/:appId").get(getAppVersions);
router.route("/:id").get(getVersionById);

export default router;
