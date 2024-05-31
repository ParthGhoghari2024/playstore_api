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

router
  .route("/")
  .post(createCategoryMiddleware, createCategoryController)
  .put(editCategoryMiddleware, editCategoryByIdController)
  .delete(deleteCategoryMiddleware, deleteCategoryByIdController);

router.route("/all").get(getAllCategoryController);
router.route("/:id").get(getCategoryByIdController);

export default router;
