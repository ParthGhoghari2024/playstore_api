import { Request, Response } from "express";

import { logger } from "../utils/pino";
import { getCategoryIdByName } from "../helper/categoryHelper";
import db from "../models";
import Genre, { IGenreAttributes } from "../models/genreModel";
import Category from "../models/categoryModel";
import Application from "../models/applicationModel";
import { getGenreIdByName } from "../helper/genreHelper";
import {
  deleteGenre,
  findGenreById,
  getAllGenre,
  getGenreByCategory,
  insertGenre,
  updateGenre,
} from "../services/genreService";
const createGenreController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let genre: string = req.body.genre;
    let category: string = req.body.category;

    genre = genre.trim();
    category = category.trim();

    const categoryId: number | null = await getCategoryIdByName(category);

    if (!categoryId) {
      res.json({ success: 0, error: "Wrong category" });
      return;
    }
    const newGenre: IGenreAttributes = {
      genre: genre,
      categoryId: categoryId!,
    };
    const insertResult = await insertGenre(newGenre);
    if (insertResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getAllGenreController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allGenres: Genre[] | undefined = await getAllGenre();

    if (allGenres) res.json({ success: 1, result: allGenres });
    else res.json({ success: 0 });
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
    let genre: string = req.body.genre;
    let category: string = req.body.category;
    const id: number = Number(req.body.id);

    if (!id || isNaN(id)) {
      res.json({ success: 0, error: "No id found" });
      return;
    }
    genre = genre.trim();
    category = category.trim();

    const findRes: Genre | null = await findGenreById(id);

    if (!findRes) {
      res.json({ success: 0, error: "No genre to edit" });
      return;
    }
    const categoryId: Category | null = await db.Category.findOne({
      attributes: ["id"],
      raw: true,
      where: {
        category: category,
      },
    });

    const newGenre: IGenreAttributes = {
      genre: genre,
      categoryId: categoryId!.id!,
    };

    const updateResult = await updateGenre(newGenre, id);

    if (updateResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const deleteGenereByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: number = Number(req.body.id);
    if (!id || isNaN(id)) {
      res.json({ success: 0, error: "No id found" });
      return;
    }
    const findRes: Genre | null = await findGenreById(id);

    if (!findRes) {
      res.json({ success: 0, error: "No genre to delete" });
      return;
    }
    const deleteResult = await deleteGenre(id);

    if (deleteResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getGenresByCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category: string = req.params.category;

    const categoryId: number | null = await getCategoryIdByName(category);

    if (!categoryId) {
      res.json({ success: 0, error: "No category found" });
      return;
    }

    const genres: Genre[] | undefined = await getGenreByCategory(categoryId);

    if (genres) res.json({ success: 1, result: genres });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

export {
  createGenreController,
  getAllGenreController,
  editGenreByIdController,
  deleteGenereByIdController,
  getGenresByCategoryController,
};
