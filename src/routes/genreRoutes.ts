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

router.route("/").post(createGenreMiddleware, createGenreController);
router.route("/all").get(getAllGenreController);
router.route("/edit").post(editGenreMiddleware, editGenreByIdController);
router.route("/delete").post(deleteGenreMiddleware, deleteGenereById);

export default router;
