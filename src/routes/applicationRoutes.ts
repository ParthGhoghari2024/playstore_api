import express, { Router } from "express";
import {
  createApplicationController,
  deleteApplicationController,
  editApplicationController,
  getAllApplicationController,
  getApplicationByGenre,
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
  .post(createApplicationMiddleware, createApplicationController)
  .put(editApplicationMiddleware, editApplicationController)
  .delete(deleteApplicationMiddleware, deleteApplicationController);
router.route("/all").get(getAllApplicationController);

router.route("/byUser").get(getApplicationByUserController);
router.route("/byGenre").post(getApplicationByGenre);

router.route("/:id").get(getApplicationById);
export default router;
