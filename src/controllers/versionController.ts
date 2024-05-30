import { Request, Response } from "express";
import { logger } from "../utils/pino";
import Version, { IVersionAttributes } from "../models/versionModel";
import { IVersionReqBody } from "../types/version";
import db from "../models";

const getAllVersionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allVersions: Version[] = await Version.findAll({
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
    await Version.create(newVersion);

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

    await Version.update(newVersion, {
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

    const versionRes: Version | null = await Version.findOne({
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

    await Version.destroy({
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
export {
  getAllVersionController,
  createVersionController,
  editVersionController,
  getVersionById,
  deleteVersionController,
};
