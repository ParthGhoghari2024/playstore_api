import db from "../models";
import Application from "../models/applicationModel";
import InstalledApp, {
  IInstalledAttributes,
} from "../models/installedAppModel";
import { logger } from "../utils/pino";

const insertInstalledApp = async (
  createInstalledApp: IInstalledAttributes
): Promise<InstalledApp | undefined> => {
  try {
    const installedAppResult = await db.InstalledApp.create(createInstalledApp);

    const updateDownloadCount: [
      affectedRows: Application[],
      affectedCount?: number | undefined
    ] = await db.Application.increment("downloads", {
      by: 1,
      where: {
        id: createInstalledApp.applicationId,
      },
    });

    return installedAppResult;
  } catch (error) {
    logger.error(error);
  }
};
const getInstalledApps = async (
  userId: number
): Promise<InstalledApp[] | undefined> => {
  try {
    return await db.InstalledApp.findAll({
      raw: true,
      attributes: [
        [db.sequelize.col("application.name"), "name"],
        [db.sequelize.col("application.description"), "description"],
        [db.sequelize.col("application.category.category"), "category"],
        [db.sequelize.col("application.genre.genre"), "genre"],
      ],
      where: {
        userId: userId,
      },
      include: [
        {
          model: db.Application,
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
    });
  } catch (error) {
    logger.error(error);
  }
};

const getInstalledAppByAppIdUserId = async (
  appId: number,
  userId: number
): Promise<InstalledApp | null> => {
  try {
    return await db.InstalledApp.findOne({
      where: {
        applicationId: appId,
        userId: userId,
      },
    });
  } catch (error) {
    logger.error(error);
    return null;
  }
};

const getInstalledAppByCategoryId = async (
  userId: number,
  categoryId: number
): Promise<InstalledApp[] | undefined> => {
  try {
    return await db.InstalledApp.findAll({
      raw: true,
      where: {
        userId: userId,
      },
      attributes: [
        [db.sequelize.col("application.name"), "name"],
        [db.sequelize.col("application.category.category"), "category"],
        [db.sequelize.col("application.genre.genre"), "genre"],
      ],
      include: [
        {
          model: db.Application,
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
          where: {
            categoryId: categoryId,
          },
        },
      ],
    });
  } catch (error) {
    logger.error(error);
  }
};

const getInstalledAppByGenreId = async (
  userId: number,
  genreId: number
): Promise<InstalledApp[] | undefined> => {
  try {
    return await db.InstalledApp.findAll({
      raw: true,
      where: {
        userId: userId,
      },
      attributes: [
        [db.sequelize.col("application.name"), "name"],
        [db.sequelize.col("application.genre.genre"), "genre"],
      ],
      include: [
        {
          model: db.Application,
          attributes: [],
          include: [
            {
              model: db.Genre,
              attributes: [],
            },
          ],
          where: {
            genreId: genreId,
          },
        },
      ],
    });
  } catch (error) {
    logger.error(error);
  }
};
export {
  insertInstalledApp,
  getInstalledApps,
  getInstalledAppByAppIdUserId,
  getInstalledAppByCategoryId,
  getInstalledAppByGenreId,
};
