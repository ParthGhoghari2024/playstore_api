import express, { Router } from "express";
import {
  createGenre,
  deleteGenereById,
  editGenreById,
  getAllGenre,
  getGenresByCategory,
} from "../controllers/genreController";
import {
  createGenreMiddleware,
  deleteGenreMiddleware,
  editGenreMiddleware,
} from "../middlewares/genreMiddleware";

const router: Router = express.Router();

router
  .route("/")
  .post(createGenreMiddleware, createGenre)
  .put(editGenreMiddleware, editGenreById)
  .delete(deleteGenreMiddleware, deleteGenereById);

router.route("/category/:category").get(getGenresByCategory);
router.route("/all").get(getAllGenre);

export default router;
