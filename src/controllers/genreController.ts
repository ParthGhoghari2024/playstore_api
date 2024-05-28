import { Request, Response } from "express";

import db from "../models";
import { logger } from "../utils/pino";
import { IGenre } from "../types/categoryANDGenre";
import { IGenreAttributes } from "../models/genreModel";
import { ICategoryAttributes } from "../models/categoryModel";

const createGenreController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const genre: string = req.body.genre;
    const category: string = req.body.category;

    const categoryId: ICategoryAttributes = await db.CategoryModel.findOne(
      {
        attributes: ["id"],
        raw: true,
      },
      {
        where: {
          category: category,
        },
      }
    );

    const newGenre: IGenre = {
      genre: genre,
      categoryId: categoryId.id!,
    };

    await db.GenreModel.create(newGenre);
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
    const allGenres: IGenreAttributes = await db.GenreModel.findAll({
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

    const categoryId: ICategoryAttributes = await db.CategoryModel.findOne({
      attributes: ["id"],
      raw: true,
      where: {
        category: category,
      },
    });

    const newGenre: IGenre = {
      genre: genre,
      categoryId: categoryId.id!,
    };

    await db.GenreModel.update(newGenre, {
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
};
