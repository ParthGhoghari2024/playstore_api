import { Request, Response } from "express";
import { logger } from "../utils/pino";
import InstalledApp, {
  IInstalledAttributes,
} from "../models/installedAppModel";

import {
  getInstalledAppByAppIdUserId,
  getInstalledAppByCategoryId,
  getInstalledAppByGenreId,
  getInstalledApps,
  insertInstalledApp,
} from "../services/installedAppService";
import { getCategoryIdByName } from "../services/categoryService";
import { getGenreIdByName } from "../services/genreService";
const insertInstalledAppController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const applicationId: number = Number(req.body.applicationId);
    const userId: number = req.cookies.userId || 1; //TODO:

    if (!applicationId || isNaN(applicationId)) {
      res.json({ success: 0, error: "Invalid application id" });
      return;
    }

    const createInstalledApp: IInstalledAttributes = {
      userId,
      applicationId,
    };
    const insertResult: InstalledApp | undefined = await insertInstalledApp(
      createInstalledApp
    );

    if (insertResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

const getInstalledAppsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.cookies.userId || 1; //TODO:

    const installedApps: InstalledApp[] | undefined = await getInstalledApps(
      userId
    );

    if (installedApps) res.json({ success: 1, result: installedApps });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

const isAppInstalledController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const appId: number = Number(req.params.appId);

    if (!appId || isNaN(appId)) {
      res.json({ success: 0, error: "No App id found" });
      return;
    }
    const userId: number = req.cookies.userId || 1; //TODO:
    const result: InstalledApp | null = await getInstalledAppByAppIdUserId(
      appId,
      userId
    );

    if (!result) {
      res.json({ success: 1, result: { isAppInstalledController: false } });
      return;
    }
    res.json({ success: 1, result: { isAppInstalledController: true } });
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

const getInstalledAppByCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let category: string = req.params.category;
    if (!category) {
      res.json({ success: 0, error: "Invalid category" });
      return;
    }
    category && (category = category.trim());

    const userId: number = req.cookies.userId || 1; //TODO:
    const categoryId: number | null = await getCategoryIdByName(category);
    if (!categoryId) {
      res.json({ sucess: 0, error: "No category found" });
      return;
    }
    const installedApps: InstalledApp[] | undefined =
      await getInstalledAppByCategoryId(userId, categoryId);

    if (installedApps) res.json({ success: 1, result: installedApps });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

const getInstalledAppByGenreController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let genre: string = req.params.genre;
    genre = genre.trim();
    const userId: number = req.cookies.userId || 1; //TODO:

    const genreId: number | null = await getGenreIdByName(genre);

    if (!genreId) {
      res.json({ success: 0, error: "No genre found" });
      return;
    }

    const installedApps: InstalledApp[] | undefined =
      await getInstalledAppByGenreId(userId, genreId);

    if (installedApps) res.json({ success: 1, result: installedApps });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};

export {
  insertInstalledAppController,
  getInstalledAppsController,
  isAppInstalledController,
  getInstalledAppByCategoryController,
  getInstalledAppByGenreController,
};
