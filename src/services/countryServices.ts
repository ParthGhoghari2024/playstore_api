import { Op } from "sequelize";
import db from "../models";
import { logger } from "../utils/pino";

const getCounryIdIfExists = async (
  country: string
): Promise<number | undefined> => {
  try {
    const countryId = await db.Country.findOne({
      where: db.sequelize.where(
        db.sequelize.fn("LOWER", db.sequelize.col("country")),
        {
          [Op.eq]: country.toLowerCase(),
        }
      ),
    });

    return countryId?.id;
  } catch (error) {
    logger.error(error);
  }
};

export { getCounryIdIfExists };
