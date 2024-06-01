import { Request, Response } from "express";

import { logger } from "../utils/pino";
import { getCategoryIdByName } from "../helper/categoryHelper";
import db from "../models";
import Genre, { IGenreAttributes } from "../models/genreModel";
import Category from "../models/categoryModel";
import Application from "../models/applicationModel";
import { getGenreIdByName } from "../helper/genreHelper";
const createGenre = async (req: Request, res: Response): Promise<void> => {
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
    await db.Genre.create(newGenre);
    res.json({ success: 1 });
  } catch (error) {
    logger.error(error);
  }
};

const getAllGenre = async (req: Request, res: Response): Promise<void> => {
  try {
    const allGenres: Genre[] = await db.Genre.findAll({
      raw: true,
      attributes: [
        "genre",
        [db.sequelize.col("category.category"), "category"],
      ],
      include: [
        {
          model: db.Category,
          attributes: [],
        },
      ],
    });

    res.json({ success: 1, result: allGenres });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const editGenreById = async (req: Request, res: Response): Promise<void> => {
  try {
    let genre: string = req.body.genre;
    let category: string = req.body.category;
    const id: string = req.body.id;

    genre = genre.trim();
    category = category.trim();

    const findRes: Genre | null = await db.Genre.findOne({
      where: {
        id: id,
      },
      attributes: ["id"],
    });

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

    await db.Genre.update(newGenre, {
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
    const findRes: Genre | null = await db.Genre.findOne({
      where: {
        id: id,
      },
      attributes: ["id"],
    });

    if (!findRes) {
      res.json({ success: 0, error: "No genre to delete" });
      return;
    }
    await db.Genre.destroy({
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

const getGenresByCategory = async (
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

    const genres: Genre[] = await db.Genre.findAll({
      attributes: ["genre"],
      where: {
        categoryId: categoryId,
      },
    });

    res.json({ success: 1, result: genres });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

export {
  createGenre,
  getAllGenre,
  editGenreById,
  deleteGenereById,
  getGenresByCategory,
};
