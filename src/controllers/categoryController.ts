import { Request, Response } from "express";

import db from "../models";
import { ICategory } from "../types/categoryANDGenre";
import { logger } from "../utils/pino";
import { ICategoryAttributes } from "../models/categoryModel";

const createCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newCategory: ICategory = {
      category: req.body.category,
    };

    await db.CategoryModel.create(newCategory);

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
    const allCategories = await db.CategoryModel.findAll({
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

    const category: ICategoryAttributes[] = await db.CategoryModel.findOne({
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
    const { id, category } = req.body;

    await db.CategoryModel.update(
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
    await db.CategoryModel.destroy({
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
