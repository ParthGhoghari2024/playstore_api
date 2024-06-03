import express, { Router } from "express";
import {
  createGenreController,
  deleteGenereByIdController,
  editGenreByIdController,
  getAllGenreController,
  getGenresByCategoryController,
} from "../controllers/genreController";
import {
  createGenreMiddleware,
  deleteGenreMiddleware,
  editGenreMiddleware,
} from "../middlewares/genreMiddleware";

const router: Router = express.Router();

router
  .route("/")
  .post(createGenreMiddleware, createGenreController)
  .put(editGenreMiddleware, editGenreByIdController)
  .delete(deleteGenreMiddleware, deleteGenereByIdController);

router.route("/category/:category").get(getGenresByCategoryController);
router.route("/all").get(getAllGenreController);

export default router;
