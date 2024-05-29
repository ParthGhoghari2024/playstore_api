import express, { Router } from "express";
import {
  createVersionController,
  deleteVersionController,
  editVersionController,
  getAllVersionController,
  getVersionById,
} from "../controllers/versionController";

const router: Router = express.Router();

router.route("/all").get(getAllVersionController);
router.route("/").post(createVersionController);
router.route("/:id").get(getVersionById);
router.route("/edit").post(editVersionController);
router.route("/delete").post(deleteVersionController);

export default router;
