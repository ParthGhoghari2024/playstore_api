import { Request, Response } from "express";

import { logger } from "../utils/pino";
import Category, { ICategoryAttributes } from "../models/categoryModel";
import { ICategory } from "../types/categoryANDGenre";
import {
  deleteCategory,
  getAllCategory,
  getCategoryById,
  getCategoryIdIfExists,
  insertCategory,
  updateCategory,
} from "../services/categoryService";

const createCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let category: string = req.body.category;

    category = category.trim();

    const newCategory: ICategoryAttributes = {
      category,
    };
    const insertResult: Category | undefined = await insertCategory(
      newCategory
    );
    if (insertResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};
const getAllCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allCategories: Category[] | undefined = await getAllCategory();

    if (allCategories) res.json({ success: 1, result: allCategories });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getCategoryByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: number = Number(req.params.id);
    if (!id || isNaN(id)) {
      res.json({ success: 0, error: "No id found" });
      return;
    }
    const category: Category | null = await getCategoryById(id);

    if (category) res.json({ success: 1, result: category });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const editCategoryByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let { id, category }: ICategory = req.body;

    category && (category = category.trim());
    const findRes: Category | null = await getCategoryIdIfExists(id!);

    if (!findRes) {
      res.json({ success: 0, error: "No category to edit" });
      return;
    }

    if (!category) {
      category = findRes.category;
    }
    const editResult: number[] | undefined = await updateCategory(
      category,
      id!
    );

    if (editResult) res.json({ sucess: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ sucess: 0 });
  }
};

const deleteCategoryByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: number = Number(req.body.id);

    if (!id || isNaN(id)) {
      res.json({ success: 0, error: "No id found" });
      return;
    }

    const findRes: Category | null = await getCategoryIdIfExists(id);

    if (!findRes) {
      res.json({ success: 0, error: "No category to delete" });
      return;
    }
    const deleteResult: number | null = await deleteCategory(id);

    if (deleteResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};
export {
  createCategoryController,
  getAllCategoryController,
  getCategoryByIdController,
  deleteCategoryByIdController,
  editCategoryByIdController,
};
