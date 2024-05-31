import GenreModel from "../models/genreModel";
import { logger } from "../utils/pino";

const getGenreIdByName = async (genre: string): Promise<number | null> => {
  try {
    const genreRes: GenreModel | null = await GenreModel.findOne({
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
