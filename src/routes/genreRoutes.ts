import express, { Router } from "express";
import {
  createGenreController,
  editGenreByIdController,
  getAllGenreController,
} from "../controllers/genreController";

const router: Router = express.Router();

router.route("/").post(createGenreController);
router.route("/all").get(getAllGenreController);
router.route("/edit").post(editGenreByIdController);

export default router;
