import express, { Router } from "express";
import {
  createApplicationController,
  deleteApplicationController,
  editApplicationController,
  getAllApplicationController,
  getApplicationByGenreController,
  getApplicationByIdController,
  getCountOfApplicationByCategoryController,
  searchApplicationController,
} from "../controllers/applicationController";
import {
  createApplicationMiddleware,
  deleteApplicationMiddleware,
  editApplicationMiddleware,
} from "../middlewares/applicationMiddleware";
import { uploadAppImageMiddleware } from "../middlewares/uploadAppImagesMiddleware";
import {
  getAppImagesByAppIdController,
  uploadAppImageController,
} from "../controllers/appImageController";

const router: Router = express.Router();

router
  .route("/")
  .post(createApplicationMiddleware, createApplicationController)
  .put(editApplicationMiddleware, editApplicationController)
  .delete(deleteApplicationMiddleware, deleteApplicationController);
router.route("/all").get(getAllApplicationController);

router.route("/byGenre").post(getApplicationByGenreController);
router.route("/search").get(searchApplicationController);
router
  .route("/count/category/:category")
  .get(getCountOfApplicationByCategoryController);

router.route("/:id").get(getApplicationByIdController);

router
  .route("/images")
  .post(uploadAppImageMiddleware, uploadAppImageController);

router.route("/images/:appId").get(getAppImagesByAppIdController);
export default router;
