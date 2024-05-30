import { Request, Response } from "express";

import { logger } from "../utils/pino";
import db from "../models";
import Category, { ICategoryAttributes } from "../models/categoryModel";
import { ICategory } from "../types/categoryANDGenre";

const createCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category: string = req.body.category;
    const newCategory: ICategoryAttributes = {
      category,
    };
    await db.Category.create(newCategory);

    res.json({ success: 1 });
  } catch (error) {
    logger.error(error);
  }
};
const getAllCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allCategories: Category[] = await db.Category.findAll({
      attributes: ["category"],
    });

    res.json({ success: 1, result: allCategories });
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
    const id: string = req.params.id;

    const category: Category | null = await db.Category.findOne({
      attributes: ["category"],
      where: {
        id: id,
      },
    });

    res.json({ success: 1, result: category });
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
    const { id, category }: ICategory = req.body;

    await db.Category.update(
      {
        category: category,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({ sucess: 1 });
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
    const id: string = req.body.id;
    await db.Category.destroy({
      where: {
        id: id,
      },
    });

    res.json({ success: 1 });
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
