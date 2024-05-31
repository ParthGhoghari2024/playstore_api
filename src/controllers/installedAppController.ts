import { Request, Response } from "express";
import { logger } from "../utils/pino";
import db from "../models";
import InstalledApp, {
  IInstalledAttributes,
} from "../models/installedAppModel";
import { getCategoryIdByName } from "../helper/categoryHelper";
import { getGenreIdByName } from "../helper/genreHelper";
const insertInstalledApp = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const applicationId: number = req.body.applicationId;
    const userId: number = 1; //TODO:

    const createInstalledApp: IInstalledAttributes = {
      userId,
      applicationId,
    };
    const insertResult: InstalledApp = await db.InstalledApp.create(
      createInstalledApp
    );

    res.json({ success: 1 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getInstalledApps = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = 1;
    const installedApps: InstalledApp[] = await db.InstalledApp.findAll({
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

    res.json({ success: 1, result: installedApps });
  } catch (error) {
    logger.error(error);
    res.jsonp({ success: 0 });
  }
};

const isAppInstalled = async (req: Request, res: Response): Promise<void> => {
  try {
    const appId: string = req.params.appId;

    const userId: number = 1; //TODO:
    const result: InstalledApp | null = await db.InstalledApp.findOne({
      where: {
        applicationId: appId,
        userId: userId,
      },
    });

    if (!result) {
      res.json({ success: 1, result: { isAppInstalled: false } });
      return;
    }
    res.json({ success: 1, result: { isAppInstalled: true } });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getInstalledAppByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category: string = req.params.category;
    const userId: number = 1; //TODO:
    const categoryId: number | null = await getCategoryIdByName(category);
    if (!categoryId) {
      res.json({ sucess: 0, error: "No category found" });
    }
    const installedApps: InstalledApp[] = await db.InstalledApp.findAll({
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

    res.json({ success: 1, result: installedApps });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getInstalledAppByGenre = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const genre: string = req.params.genre;
    const userId: number = 1; //TODO:

    const genreId: number | null = await getGenreIdByName(genre);

    if (!genreId) {
      res.json({ success: 0, error: "No genre found" });
      return;
    }

    const installedApps: InstalledApp[] = await db.InstalledApp.findAll({
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

    res.json({ success: 1, result: installedApps });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};
export {
  insertInstalledApp,
  getInstalledApps,
  isAppInstalled,
  getInstalledAppByCategory,
  getInstalledAppByGenre,
};
