import { Request, Response } from "express";

import { logger } from "../utils/pino";
import { IGenre } from "../types/categoryANDGenre";
import GenreModel, { IGenreAttributes } from "../models/genreModel";
import CategoryModel, { ICategoryAttributes } from "../models/categoryModel";
import { getCategoryIdByName } from "../helper/categoryHelper";
const createGenreController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const genre: string = req.body.genre;
    const category: string = req.body.category;

    const categoryId: number | null = await getCategoryIdByName(category);

    if (!categoryId) {
      res.json({ success: 0, error: "Wrong category" });
    }
    const newGenre: IGenre = {
      genre: genre,
      categoryId: categoryId!,
    };

    await GenreModel.create(newGenre);
    res.json({ success: 1 });
  } catch (error) {
    logger.error(error);
  }
};

const getAllGenreController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allGenres: IGenreAttributes[] = await GenreModel.findAll({
      attributes: ["genre", "categoryId"], //TODO: join the table and return category name instead of id
    });

    res.json({ success: 1, result: allGenres });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const editGenreByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const genre: string = req.body.genre;
    const category: string = req.body.category;
    const id: string = req.body.id;

    const categoryId: CategoryModel | null = await CategoryModel.findOne({
      attributes: ["id"],
      raw: true,
      where: {
        category: category,
      },
    });

    const newGenre: IGenre = {
      genre: genre,
      categoryId: categoryId!.id!,
    };

    await GenreModel.update(newGenre, {
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

const deleteGenereById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.body.id;

    await GenreModel.destroy({
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
  createGenreController,
  getAllGenreController,
  editGenreByIdController,
  deleteGenereById,
};
