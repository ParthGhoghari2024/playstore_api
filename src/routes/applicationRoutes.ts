import express, { Router } from "express";
import {
  createApplication,
  deleteApplication,
  editApplication,
  getAllApplication,
  getApplicationByGenre,
  getApplicationById,
  getCountOfApplicationByCategory,
  searchApplication,
} from "../controllers/applicationController";
import {
  createApplicationMiddleware,
  deleteApplicationMiddleware,
  editApplicationMiddleware,
} from "../middlewares/applicationMiddleware";

const router: Router = express.Router();

router
  .route("/")
  .post(createApplicationMiddleware, createApplication)
  .put(editApplicationMiddleware, editApplication)
  .delete(deleteApplicationMiddleware, deleteApplication);
router.route("/all").get(getAllApplication);

router.route("/byGenre").post(getApplicationByGenre);
router.route("/search").get(searchApplication);
router.route("/count/category/:category").get(getCountOfApplicationByCategory);

router.route("/:id").get(getApplicationById);
export default router;
