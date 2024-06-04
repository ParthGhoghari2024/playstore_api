import db from "../models";
import ApkFile, { IApkAttributes } from "../models/apkFileModel";
import { logger } from "../utils/pino";

const insertApkFileData = async (
  insertObj: IApkAttributes
): Promise<ApkFile | undefined> => {
  try {
    return await db.ApkFile.create(insertObj);
  } catch (error) {
    logger.error(error);
  }
};

const getApkFileIdByAppIdVersionId = async (
  appId: number,
  versionId: number
): Promise<ApkFile | null> => {
  try {
    return await db.ApkFile.findOne({
      where: {
        appId: appId,
        versionId: versionId,
      },
      attributes: ["id"],
    });
  } catch (error) {
    logger.error(error);
    return null;
  }
};
export { insertApkFileData, getApkFileIdByAppIdVersionId };
