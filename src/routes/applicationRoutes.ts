import express, { Router } from "express";
import {
  createApplicationController,
  deleteApplicationController,
  editApplicationController,
  getAllApplicationController,
  getApplicationById,
} from "../controllers/applicationController";

const router: Router = express.Router();

router.route("/").post(createApplicationController);
router.route("/all").get(getAllApplicationController);
router.route("/edit").post(editApplicationController);
router.route("/:id").get(getApplicationById);
router.route("/delete").post(deleteApplicationController);
export default router;
