import { Request, Response } from "express";

import { ICategory } from "../types/categoryANDGenre";
import { logger } from "../utils/pino";
import CategoryModel from "../models/categoryModel";

const createCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newCategory: ICategory = {
      category: req.body.category,
    };

    await CategoryModel.create(newCategory);

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
    const allCategories: CategoryModel[] = await CategoryModel.findAll({
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

    const category: CategoryModel | null = await CategoryModel.findOne({
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

    await CategoryModel.update(
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
    await CategoryModel.destroy({
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
