import db from "../models";
import { IId } from "../types/interface";
import { logger } from "../utils/pino";

const getGenreIdByName = async (genre: string): Promise<number | null> => {
  try {
    const genreRes: IId = await db.GenreModel.findOne({
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

export { getGenreIdByName };
