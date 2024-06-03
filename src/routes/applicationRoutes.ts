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
export default router;
