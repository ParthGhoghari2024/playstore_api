import { FindOptions, WhereOptions } from "sequelize";
import { logger } from "../utils/pino";
import Application from "../models/applicationModel";
import db from "../models";
import { Op } from "sequelize";

const getApplications = async (
  where?: WhereOptions
): Promise<Application[] | null> => {
  try {
    const result: Application[] = await db.Application.findAll({
      attributes: [
        "name",
        "description",
        [db.sequelize.col("genre"), "genre"],
        [db.sequelize.col("category"), "category"],
      ],
      where: where,
      include: [
        {
          model: db.User,
          as: "developer",
          attributes: ["name", "email"],
        },
        {
          model: db.Genre,
          attributes: [],
        },
        {
          model: db.Category,
          attributes: [],
        },
      ],
      raw: true,
      nest: true,
    });

    return result;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export { getApplications };
