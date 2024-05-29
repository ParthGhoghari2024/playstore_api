import express, { Router } from "express";
import {
  createCategoryController,
  deleteCategoryByIdController,
  editCategoryByIdController,
  getAllCategoryController,
  getCategoryByIdController,
} from "../controllers/categoryController";
import {
  createCategoryMiddleware,
  deleteCategoryMiddleware,
  editCategoryMiddleware,
} from "../middlewares/categoryMiddleware";

const router: Router = express.Router();

router.route("/").post(createCategoryMiddleware, createCategoryController);
router.route("/all").get(getAllCategoryController);
router.route("/:id").get(getCategoryByIdController);
router
  .route("/delete")
  .post(deleteCategoryMiddleware, deleteCategoryByIdController);
router.route("/edit").post(editCategoryMiddleware, editCategoryByIdController);

export default router;
