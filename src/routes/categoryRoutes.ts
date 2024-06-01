import express, { Router } from "express";
import {
  createCategory,
  deleteCategoryById,
  editCategoryById,
  getAllCategory,
  getCategoryById,
} from "../controllers/categoryController";
import {
  createCategoryMiddleware,
  deleteCategoryMiddleware,
  editCategoryMiddleware,
} from "../middlewares/categoryMiddleware";

const router: Router = express.Router();

router
  .route("/")
  .post(createCategoryMiddleware, createCategory)
  .put(editCategoryMiddleware, editCategoryById)
  .delete(deleteCategoryMiddleware, deleteCategoryById);

router.route("/all").get(getAllCategory);
router.route("/:id").get(getCategoryById);

export default router;
