import { WhereOptions } from "sequelize";
import db from "../models";
import Application, {
  IApplicationAttributes,
} from "../models/applicationModel";
import { logger } from "../utils/pino";

const getApplicationsByWhere = async (
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
const insertApplication = async (
  newApplication: IApplicationAttributes
): Promise<Application | undefined> => {
  try {
    return await db.Application.create(newApplication);
  } catch (error) {
    logger.error(error);
  }
};

const updateApplicationById = async (
  newApplication: IApplicationAttributes,
  id: number
): Promise<number[] | undefined> => {
  try {
    return await db.Application.update(newApplication, {
      where: {
        id: id,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

const getApplicationById = async (id: number): Promise<Application | null> => {
  try {
    return await db.Application.findOne({
      attributes: [
        "id",
        "name",
        "description",
        [db.sequelize.col("genre"), "genre"],
        [db.sequelize.col("category"), "category"],
      ],
      where: {
        id: id,
      },
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
  } catch (error) {
    logger.error(error);
    return null;
  }
};

const deleteApplication = async (id: number): Promise<number | undefined> => {
  try {
    return await db.Application.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

const getApplicationsByGenreId = async (
  genreId: number
): Promise<Application[] | undefined> => {
  try {
    return await db.Application.findAll({
      attributes: ["name", "description"],
      where: {
        genreId: genreId,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

const getApplicationsByDeveloperId = async (
  developerId: number
): Promise<Application[] | undefined> => {
  try {
    return await db.Application.findAll({
      attributes: [
        "name",
        "description",
        [db.sequelize.col("genre.genre"), "genre"],
        [db.sequelize.col("category.category"), "category"],
      ],
      where: {
        developerId: developerId,
      },
      include: [
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
  } catch (error) {
    logger.error(error);
  }
};

const getCountOfApplicationByCategoryId = async (
  categoryId: number
): Promise<Application | null> => {
  try {
    return await db.Application.findOne({
      raw: true,
      group: ["Application.categoryId"],
      nest: true,
      attributes: [
        [db.sequelize.fn("count", db.sequelize.col("Application.id")), "count"],
      ],
      where: {
        categoryId: categoryId,
      },
    });
  } catch (error) {
    logger.error(error);
    return null;
  }
};
export {
  getApplicationsByWhere,
  insertApplication,
  updateApplicationById,
  getApplicationById,
  deleteApplication,
  getApplicationsByGenreId,
  getApplicationsByDeveloperId,
  getCountOfApplicationByCategoryId,
};
