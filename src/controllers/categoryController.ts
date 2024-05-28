import { Request, Response } from "express";

import db from "../models";
import { ICategory } from "../types/category";
interface IError extends Error {
  parent: {
    sqlMessage: string;
  };
}

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
    console.log(error);
  }
};

export { createCategoryController };
