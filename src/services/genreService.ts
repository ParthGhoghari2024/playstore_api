import { Op } from "sequelize";
import db from "../models";
import Genre, { IGenreAttributes } from "../models/genreModel";
import { logger } from "../utils/pino";

const insertGenre = async (
  newGenre: IGenreAttributes
): Promise<Genre | undefined> => {
  try {
    return await db.Genre.create(newGenre);
  } catch (error) {
    logger.error(error);
  }
};

const getAllGenre = async (): Promise<Genre[] | undefined> => {
  try {
    return await db.Genre.findAll({
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
  } catch (error) {
    logger.error(error);
  }
};

const updateGenre = async (
  newGenre: IGenreAttributes,
  id: number
): Promise<number[] | undefined> => {
  try {
    return await db.Genre.update(newGenre, {
      where: {
        id: id,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

const deleteGenre = async (id: number): Promise<number | undefined> => {
  try {
    return await db.Genre.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

const findGenreById = async (id: number): Promise<Genre | null> => {
  try {
    return await db.Genre.findOne({
      where: {
        id: id,
      },
      attributes: ["id"],
    });
  } catch (error) {
    logger.error(error);
    return null;
  }
};

const getGenreByCategory = async (
  categoryId: number
): Promise<Genre[] | undefined> => {
  try {
    return await db.Genre.findAll({
      attributes: ["genre"],
      where: {
        categoryId: categoryId,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

const getGenreIdByName = async (genre: string): Promise<number | null> => {
  try {
    const genreRes: Genre | null = await db.Genre.findOne({
      attributes: ["id"],
      raw: true,
      where: {
        genre: genre,
      },
    });

    if (genreRes && genreRes.id) {
      return genreRes.id;
    }
    return null;
  } catch (error) {
    logger.error(error);
    return null;
  }
};
export {
  insertGenre,
  getAllGenre,
  updateGenre,
  deleteGenre,
  findGenreById,
  getGenreByCategory,
  getGenreIdByName,
};
