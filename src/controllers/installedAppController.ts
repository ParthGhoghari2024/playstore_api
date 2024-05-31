import { Request, Response } from "express";
import { logger } from "../utils/pino";
import db from "../models";
import InstalledApps, {
  IInstalledAttributes,
} from "../models/installedAppModel";
import Application from "../models/applicationModel";
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
    const insertResult = await db.InstalledApps.create(createInstalledApp);

    res.json({ success: 1 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getInstalledApps = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = 1;
    const installedApps: InstalledApps[] = await db.InstalledApps.findAll({
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

export { insertInstalledApp, getInstalledApps };
