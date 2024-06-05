import db from "../models";
import Rating, { IRatingAttributes } from "../models/ratingModel";
import { logger } from "../utils/pino";

const insertRating = async (
  newRating: IRatingAttributes
): Promise<Rating | undefined> => {
  try {
    return await db.Rating.create(newRating);
  } catch (error) {
    logger.error(error);
  }
};

const getRatingsByAppId = async (appId: number) => {
  try {
    return await db.Rating.findAll({
      where: {
        appId: appId,
      },
      attributes: ["appId", "comment", "rating"],
      raw: true,
      nest: true,
      include: [
        {
          model: db.User,
          attributes: ["name", "email"],
        },
      ],
    });
  } catch (error) {
    logger.error(error);
  }
};

const updateRating = async (
  newRating: Partial<IRatingAttributes>,
  appId: number,
  userId: number
): Promise<number[] | undefined> => {
  try {
    return await db.Rating.update(newRating, {
      where: {
        appId: appId,
        userId: userId,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

const getRatingIdIfExists = async (id: number) => {
  try {
    return await db.Rating.findOne({
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

const getRatingIdIfExistsByAppId = async (appId: number, userId: number) => {
  try {
    return await db.Rating.findOne({
      where: {
        appId: appId,
        userId: userId,
      },
      attributes: ["id"],
    });
  } catch (error) {
    logger.error(error);
    return null;
  }
};
const deleteRating = async (id: number): Promise<number | undefined> => {
  try {
    return await db.Rating.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

export {
  insertRating,
  getRatingsByAppId,
  updateRating,
  getRatingIdIfExists,
  deleteRating,
  getRatingIdIfExistsByAppId,
};
