import express, { Router } from "express";
import {
  createApplicationController,
  deleteApplicationController,
  editApplicationController,
  getAllApplicationController,
  getApplicationById,
  getApplicationByUserController,
} from "../controllers/applicationController";
import {
  createApplicationMiddleware,
  deleteApplicationMiddleware,
  editApplicationMiddleware,
} from "../middlewares/applicationMiddleware";

const router: Router = express.Router();

router
  .route("/")
  .post(createApplicationMiddleware, createApplicationController);
router.route("/all").get(getAllApplicationController);
router
  .route("/edit")
  .post(editApplicationMiddleware, editApplicationController);
router
  .route("/delete")
  .post(deleteApplicationMiddleware, deleteApplicationController);

router.route("/byUser").get(getApplicationByUserController);
router.route("/:id").get(getApplicationById);
export default router;
