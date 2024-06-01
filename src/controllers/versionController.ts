import { Request, Response } from "express";
import { logger } from "../utils/pino";
import Version, { IVersionAttributes } from "../models/versionModel";
import { IVersionReqBody } from "../types/version";
import db from "../models";

const getAllVersion = async (req: Request, res: Response): Promise<void> => {
  try {
    const allVersions: Version[] = await db.Version.findAll({
      attributes: ["applicationId", "version", "description"],
    });

    res.json({ success: 1, result: allVersions });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const createVersion = async (req: Request, res: Response): Promise<void> => {
  try {
    let { applicationId, version, description }: IVersionReqBody = req.body;
    version = version.trim();
    description = description.trim();

    const newVersion: IVersionAttributes = {
      applicationId: applicationId,
      version: version,
      description: description,
    };
    await db.Version.create(newVersion);

    res.json({ success: 1 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const editVersion = async (req: Request, res: Response): Promise<void> => {
  try {
    let { id, applicationId, version, description }: IVersionReqBody = req.body;

    version = version.trim();
    description = description.trim();

    const findRes: Version | null = await db.Version.findOne({
      where: {
        id: id,
      },
      attributes: ["id"],
    });

    if (!findRes) {
      res.json({ success: 0, error: "No version to edit" });
      return;
    }

    const newVersion: Partial<IVersionAttributes> = {
      applicationId: applicationId,
    };

    version && (newVersion.version = version);
    description && (newVersion.description = description);

    await db.Version.update(newVersion, {
      where: {
        id: id,
      },
    });

    res.json({ success: 1 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getVersionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;

    const versionRes: Version | null = await db.Version.findOne({
      attributes: ["applicationId", "version", "description"],
      where: {
        id: id,
      },
    });

    res.json({ success: 1, result: versionRes });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const deleteVersion = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.body.id;

    const findRes: Version | null = await db.Version.findOne({
      where: {
        id: id,
      },
      attributes: ["id"],
    });

    if (!findRes) {
      res.json({ success: 0, error: "No version to delete" });
      return;
    }
    await db.Version.destroy({
      where: {
        id: id,
      },
    });

    res.json({ success: 1 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getAppVersions = async (req: Request, res: Response): Promise<void> => {
  try {
    const appId: string = req.params.appId;
    const appVersions: Version[] = await db.Version.findAll({
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

    res.json({ success: 1, result: appVersions });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};
export {
  getAllVersion,
  createVersion,
  editVersion,
  getVersionById,
  deleteVersion,
  getAppVersions,
};
