import { Request, Response } from "express";
import { logger } from "../utils/pino";
import { IEditRatingsBody, IInsertRatingsBody } from "../types/interface";
import Rating, { IRatingAttributes } from "../models/ratingModel";
import {
  deleteRating,
  getRatingIdIfExists,
  getRatingIdIfExistsByAppId,
  getRatingsByAppId,
  insertRating,
  updateRating,
} from "../services/ratingServices";
import { getAppIdIfExists } from "../services/applicationService";
import Application from "../models/applicationModel";
import { isAppInstalled } from "../services/installedAppService";

const createRatingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let { appId, comment, rating }: IInsertRatingsBody = req.body;
    const userId: number = 1; //TODO:

    const appExists: Application | null = await getAppIdIfExists(appId);
    if (!appExists) {
      res.json({ success: 0, error: "Invalid App id" });
      return;
    }

    const isAppInstalledResult: boolean | null = await isAppInstalled(
      appId,
      userId
    );

    console.log(isAppInstalledResult);

    if (!isAppInstalledResult || !isAppInstalledResult) {
      res.json({
        success: 0,
        error: { message: "User haven't installed app", id: "notInstalledApp" },
      });
      return;
    }
    const newRating: IRatingAttributes = {
      appId: appId,
      rating: rating,
      userId: userId,
    };

    comment && (comment = comment.trim());
    comment && (newRating.comment = comment);

    const insertResult: Rating | undefined = await insertRating(newRating);

    if (insertResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getRatingsByAppIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const appId: number = Number(req.params.appId);

    if (!appId || isNaN(appId)) {
      res.json({ success: 0, error: "Invalid App id" });
      return;
    }

    const getResult: Rating[] | undefined = await getRatingsByAppId(appId);

    if (getResult) res.json({ success: 1, result: getResult });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const editRatingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let { id, comment, rating }: IEditRatingsBody = req.body;

    const userId: number = 1; //TODO:
    const newRating: Partial<IRatingAttributes> = {
      userId: userId,
    };

    const ratingExists: Rating | null = await getRatingIdIfExists(id);
    if (!ratingExists) {
      res.json({ success: 0, error: "Invalid rating id" });
      return;
    }

    comment && (comment = comment.trim());
    comment && (newRating.comment = comment);
    rating && (newRating.rating = rating);

    const updateResult: number[] | undefined = await updateRating(
      newRating,
      id
    );
    if (updateResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const deleteRatingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const appId: number = Number(req.body.appId);
    const userId: number = 1; //TODO:
    if (!appId || isNaN(appId)) {
      res.json({ success: 0, error: "Invalid application id" });
      return;
    }

    const ratingExists: Rating | null = await getRatingIdIfExistsByAppId(
      appId,
      userId
    );
    if (!ratingExists || !ratingExists.id) {
      res.json({ success: 0, error: "No rating to delete" });
      return;
    }

    const deleteResult: number | undefined = await deleteRating(
      ratingExists.id
    );
    if (deleteResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
  }
};
export {
  createRatingController,
  getRatingsByAppIdController,
  editRatingController,
  deleteRatingController,
};
