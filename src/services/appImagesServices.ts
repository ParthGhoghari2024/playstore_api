import db from "../models";
import AppImages, { IAppImagesAttributes } from "../models/appImageModel";
import { logger } from "../utils/pino";

const insertAppImagesData = async (
  insertArray: IAppImagesAttributes[]
): Promise<AppImages[] | undefined> => {
  try {
    return await db.AppImages.bulkCreate(insertArray);
  } catch (error) {
    logger.error(error);
  }
};
const getAppImagesDataByAppId = async (
  appId: number
): Promise<AppImages[] | undefined> => {
  try {
    return db.AppImages.findAll({
      where: {
        appId: appId,
      },
      attributes: ["path", "new_filename"],
    });
  } catch (error) {
    logger.error(error);
  }
};
export { insertAppImagesData, getAppImagesDataByAppId };
