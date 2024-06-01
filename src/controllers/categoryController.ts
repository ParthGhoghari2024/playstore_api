import { Request, Response } from "express";

import { logger } from "../utils/pino";
import db from "../models";
import Category, { ICategoryAttributes } from "../models/categoryModel";
import { ICategory } from "../types/categoryANDGenre";

const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    let category: string = req.body.category;
    category = category.trim();

    const newCategory: ICategoryAttributes = {
      category,
    };
    await db.Category.create(newCategory);

    res.json({ success: 1 });
  } catch (error) {
    logger.error(error);
  }
};
const getAllCategory = async (req: Request, res: Response): Promise<void> => {
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

const getCategoryById = async (req: Request, res: Response): Promise<void> => {
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

const editCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    let { id, category }: ICategory = req.body;

    category = category.trim();
    const findRes: Category | null = await db.Category.findOne({
      where: {
        id: id,
      },
      attributes: ["id"],
    });

    if (!findRes) {
      res.json({ success: 0, error: "No category to edit" });
      return;
    }

    if (!category) {
      category = findRes.category;
    }
    const editResult: number[] = await db.Category.update(
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

const deleteCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.body.id;

    const findRes: Category | null = await db.Category.findOne({
      where: {
        id: id,
      },
      attributes: ["id"],
    });

    if (!findRes) {
      res.json({ success: 0, error: "No category to delete" });
      return;
    }
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
  createCategory,
  getAllCategory,
  getCategoryById,
  deleteCategoryById,
  editCategoryById,
};
