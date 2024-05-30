import { Request, Response } from "express";
import { logger } from "../utils/pino";
import Version, { IVersionAttributes } from "../models/versionModel";
import { IVersionReqBody } from "../types/version";
import db from "../models";
import Application from "../models/applicationModel";
import Category from "../models/categoryModel";
import Genre from "../models/genreModel";

const getAllVersionController = async (
  req: Request,
  res: Response
): Promise<void> => {
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

const createVersionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { applicationId, version, description }: IVersionReqBody = req.body;

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

const editVersionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, applicationId, version, description }: IVersionReqBody =
      req.body;

    const newVersion: IVersionAttributes = {
      applicationId: applicationId,
      version: version,
      description: description,
    };

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

const deleteVersionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.body.id;

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

const getAppVersionsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const appId: string = req.params.appId;
    const appVersions = await db.Version.findAll({
      attributes: ["version", "description"],
      where: {
        applicationId: appId,
      },
      include: [
        {
          model: db.Application,
          foreignKey: "applicationId",
          attributes: ["name", "description"],
          include: [
            {
              model: db.Category,
              attributes: ["category"],
            },
            {
              model: db.Genre,
              attributes: ["genre"],
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
  getAllVersionController,
  createVersionController,
  editVersionController,
  getVersionById,
  deleteVersionController,
  getAppVersionsController,
};
