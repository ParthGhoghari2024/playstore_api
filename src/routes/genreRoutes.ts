import express, { Router } from "express";
import {
  createGenreController,
  deleteGenereById,
  editGenreByIdController,
  getAllGenreController,
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
  .delete(deleteGenreMiddleware, deleteGenereById);
router.route("/all").get(getAllGenreController);

export default router;
