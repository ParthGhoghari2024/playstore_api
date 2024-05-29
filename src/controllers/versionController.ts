import { Request, Response } from "express";
import { logger } from "../utils/pino";
import VersionModel, { IVersionAttributes } from "../models/versionModel";
import { IVersionReqBody } from "../types/version";
const getAllVersionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allVersions: VersionModel[] = await VersionModel.findAll({
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
    await VersionModel.create(newVersion);

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

    await VersionModel.update(newVersion, {
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

    const versionRes: VersionModel | null = await VersionModel.findOne({
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

    await VersionModel.destroy({
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
