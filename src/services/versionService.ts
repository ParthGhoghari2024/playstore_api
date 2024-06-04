import db from "../models";
import Version, { IVersionAttributes } from "../models/versionModel";
import { logger } from "../utils/pino";

const getAllVersions = async (): Promise<Version[] | undefined> => {
  try {
    return await db.Version.findAll({
      attributes: ["applicationId", "version", "description"],
    });
  } catch (error) {
    logger.error(error);
  }
};

const insertVersion = async (
  newVersion: IVersionAttributes
): Promise<Version | undefined> => {
  try {
    return await db.Version.create(newVersion);
  } catch (error) {
    logger.error(error);
  }
};

const getVersionIdIfExists = async (id: number): Promise<Version | null> => {
  try {
    return await db.Version.findOne({
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

const updateVersion = async (
  newVersion: Partial<IVersionAttributes>,
  id: number
): Promise<number[] | undefined> => {
  try {
    return await db.Version.update(newVersion, {
      where: {
        id: id,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

const getVersionById = async (id: number): Promise<Version | null> => {
  try {
    return await db.Version.findOne({
      attributes: ["applicationId", "version", "description"],
      where: {
        id: id,
      },
    });
  } catch (error) {
    logger.error(error);
    return null;
  }
};

const deleteVersion = async (id: number): Promise<number | undefined> => {
  try {
    return await db.Version.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

const getAppVersions = async (
  appId: number
): Promise<Version[] | undefined> => {
  try {
    return await db.Version.findAll({
      attributes: [
        "version",
        "description",
        [db.sequelize.col("application.name"), "appName"],
        [db.sequelize.col("application.description"), "appDescription"],
        [db.sequelize.col("application.category.category"), "category"],
        [db.sequelize.col("application.genre.genre"), "genre"],
      ],
      where: {
        applicationId: appId,
      },
      include: [
        {
          model: db.Application,
          foreignKey: "applicationId",
          attributes: [],
          include: [
            {
              model: db.Category,
              attributes: [],
            },
            {
              model: db.Genre,
              attributes: [],
            },
          ],
        },
      ],
      raw: true,
    });
  } catch (error) {
    logger.error(error);
  }
};

const getAppIdByVerstionId = async (
  versionId: number
): Promise<number | undefined> => {
  try {
    const result: Version | null = await db.Version.findOne({
      where: {
        id: versionId,
      },
      attributes: ["applicationId"],
    });

    return result?.applicationId;
  } catch (error) {
    logger.error(error);
  }
};
export {
  getAllVersions,
  insertVersion,
  getVersionIdIfExists,
  updateVersion,
  getVersionById,
  deleteVersion,
  getAppVersions,
  getAppIdByVerstionId,
};
