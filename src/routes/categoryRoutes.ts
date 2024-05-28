import express, { Router } from "express";
import {
  createCategoryController,
  deleteCategoryByIdController,
  editCategoryByIdController,
  getAllCategoryController,
  getCategoryByIdController,
} from "../controllers/categoryController";

const router: Router = express.Router();

router.route("/").post(createCategoryController);
router.route("/all").get(getAllCategoryController);
router.route("/:id").get(getCategoryByIdController);
router.route("/delete").post(deleteCategoryByIdController);
router.route("/edit").post(editCategoryByIdController);

export default router;
