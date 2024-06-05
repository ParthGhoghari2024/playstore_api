import { Request, Response } from "express";
import ApkFile, { IApkAttributes } from "../models/apkFileModel";
import {
  getApkFileIdByAppIdVersionId,
  insertApkFileData,
} from "../services/apkFileServices";
import { logger } from "../utils/pino";
import { getAppIdByVerstionId } from "../services/versionService";
const uploadApkFileController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const appId: number = Number(req.body.appId);
    const versionId: number = Number(req.body.versionId);

    const reqFile: Express.Multer.File | undefined = req.file;
    if (!appId || isNaN(appId)) {
      res.json({ success: 0, error: "app id not provided" });
      return;
    }

    if (req.fileValidationError) {
      res.json({ success: 0, error: "File type invalid" });
      return;
    }

    if (!versionId || isNaN(versionId)) {
      res.json({ success: 0, error: "Version id not provided" });
      return;
    }

    const appIdFetched: number | undefined = await getAppIdByVerstionId(
      versionId
    );

    if (appIdFetched !== appId) {
      res.json({ success: 0, error: "App and version missed matched" });
      return;
    }

    const apkIdIfExists: ApkFile | null = await getApkFileIdByAppIdVersionId(
      appId,
      versionId
    );
    if (apkIdIfExists && apkIdIfExists.id) {
      res.json({ success: 0, error: "Apk already present for this version" });
      return;
    }

    const reqFilesObj: IApkAttributes = {
      appId: appId,
      versionId: versionId,
      original_filename: reqFile!.originalname,
      new_filename: reqFile!.filename,
      path: reqFile!.path,
    };

    const insertResult: ApkFile | undefined = await insertApkFileData(
      reqFilesObj
    );

    if (insertResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

export { uploadApkFileController };
