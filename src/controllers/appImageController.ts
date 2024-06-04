import { Request, Response } from "express";
import { logger } from "../utils/pino";
import { IReqFiles } from "../types/interface";
import AppImages, { IAppImagesAttributes } from "../models/appImageModel";
import {
  getAppImagesDataByAppId,
  insertAppImagesData,
} from "../services/appImagesServices";

const uploadAppImageController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (req.fileValidationError) {
      res.json({ success: 0, error: "File type invalid" });
      return;
    }
    const appId: number = Number(req.body.appId);
    if (!appId || isNaN(appId)) {
      res.json({ success: 0, error: "No app id provided" });
      return;
    }
    const reqFilesObj: IAppImagesAttributes[] = (
      req.files as Express.Multer.File[]
    ).map((file: Express.Multer.File) => {
      return {
        appId: appId,
        original_filename: file.originalname,
        new_filename: file.filename,
        path: file.path,
      };
    });

    const insertResult: AppImages[] | undefined = await insertAppImagesData(
      reqFilesObj
    );

    if (insertResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getAppImagesByAppIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const appId: number = Number(req.params.appId);
    if (!appId) {
      res.json({ success: 0, error: "No App id provided" });
      return;
    }

    const appImages = await getAppImagesDataByAppId(appId);

    if (appImages) res.json({ success: 1, result: appImages });
    else res.json({ succss: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

export { uploadAppImageController, getAppImagesByAppIdController };
