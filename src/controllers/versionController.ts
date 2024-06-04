import { Request, Response } from "express";
import { logger } from "../utils/pino";
import Version, { IVersionAttributes } from "../models/versionModel";
import { IVersionReqBody } from "../types/version";
import {
  deleteVersion,
  getAllVersions,
  getAppVersions,
  getVersionById,
  getVersionIdIfExists,
  insertVersion,
  updateVersion,
} from "../services/versionService";

const getAllVersionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allVersions: Version[] | undefined = await getAllVersions();
    if (allVersions) res.json({ success: 1, result: allVersions });
    else res.json({ success: 0 });
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
    let { applicationId, version, description }: IVersionReqBody = req.body;
    version = version.trim();
    description = description.trim();

    const newVersion: IVersionAttributes = {
      applicationId: applicationId,
      version: version,
      description: description,
    };
    const insertResult: Version | undefined = await insertVersion(newVersion);

    if (insertResult) res.json({ success: 1 });
    else res.json({ success: 0 });
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
    let { id, applicationId, version, description }: IVersionReqBody = req.body;
    version && (version = version.trim());
    description && (description = description.trim());

    const findRes: Version | null = await getVersionIdIfExists(id!);

    if (!findRes) {
      res.json({ success: 0, error: "No version to edit" });
      return;
    }

    const newVersion: Partial<IVersionAttributes> = {
      applicationId: applicationId,
    };

    version && (newVersion.version = version);
    description && (newVersion.description = description);

    const updateResult: number[] | undefined = await updateVersion(
      newVersion,
      id!
    );

    if (updateResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getVersionByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: number = Number(req.params.id);
    if (!id || isNaN(id)) {
      res.json({ success: 0, error: "Invalid id" });
      return;
    }
    const versionRes: Version | null = await getVersionById(id);

    if (versionRes) res.json({ success: 1, result: versionRes });
    else res.json({ success: 0 });
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
    const id: number = Number(req.body.id);
    if (!id || isNaN(id)) {
      res.json({ success: 0, error: "Invalid id" });
      return;
    }
    const findRes: Version | null = await getVersionIdIfExists(id);

    if (!findRes) {
      res.json({ success: 0, error: "No version to delete" });
      return;
    }
    const deleteResult: number | undefined = await deleteVersion(id);

    if (deleteResult) res.json({ success: 1 });
    else res.json({ success: 0 });
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
    const appId: number = Number(req.params.appId);
    if (!appId || isNaN(appId)) {
      res.json({ success: 0, error: "Invalid id" });
      return;
    }
    const appVersions: Version[] | undefined = await getAppVersions(appId);

    if (appVersions) res.json({ success: 1, result: appVersions });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};
export {
  getAllVersionController,
  createVersionController,
  editVersionController,
  getVersionByIdController,
  deleteVersionController,
  getAppVersionsController,
};
