import { Request, Response } from "express";
import { logger } from "../utils/pino";
import Application, {
  IApplicationAttributes,
} from "../models/applicationModel";
import { getCategoryIdByName } from "../helper/categoryHelper";
import { getGenreIdByName } from "../helper/genreHelper";
import { IApplicationReqBody } from "../types/application";

import db from "../models";
import { getRoleByUserId } from "../helper/userHelper";
import { Op, WhereOptions } from "sequelize";
import {
  deleteApplication,
  getApplicationById,
  getApplicationsByDeveloperId,
  getApplicationsByGenreId,
  getApplicationsByWhere,
  getCountOfApplicationByCategoryId,
  insertApplication,
  updateApplicationById,
} from "../services/applicationService";
const getAllApplicationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allApplications: Application[] | null = await getApplicationsByWhere(
      {}
    );
    if (allApplications) res.json({ success: 1, result: allApplications });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const createApplicationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let { name, description, category, genre }: IApplicationReqBody = req.body;

    name = name.trim();
    description = description.trim();
    category = category.trim();
    genre = genre.trim();

    const developerId: number = 1;

    const categoryId: number | null = await getCategoryIdByName(category);
    if (!categoryId) {
      res.json({ success: 0, error: "Wrong category" });
      return;
    }

    const genreId: number | null = await getGenreIdByName(genre);
    if (!genreId) {
      res.json({ success: 0, error: "Wrong genre" });
      return;
    }

    const newApplication: IApplicationAttributes = {
      name: name,
      developerId: developerId,
      description: description,
      categoryId: categoryId,
      genreId: genreId,
    };

    const createResult: Application | undefined = await insertApplication(
      newApplication
    );

    if (createResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const editApplicationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let { id, name, description, category, genre }: IApplicationReqBody =
      req.body;
    name = name.trim();
    description = description.trim();
    category = category.trim();
    genre = genre.trim();
    const categoryId: number | null = await getCategoryIdByName(category);
    const developerId: number = 1;

    const findRes: Application | null = await db.Application.findOne({
      where: {
        id: id,
      },
      attributes: ["id"],
    });

    if (!findRes) {
      res.json({ success: 0, error: "No application to edit" });
      return;
    }
    if (category && !categoryId) {
      res.json({ success: 0, error: "Wrong Category" });
      return;
    }
    const genreId: number | null = await getGenreIdByName(genre);
    if (genre && !genreId) {
      res.json({ success: 0, error: "Wrong Genre" });
      return;
    }

    const newApplication: IApplicationAttributes = {
      developerId: developerId,
    };

    name && (newApplication.name = name);
    description && (newApplication.description = description);
    category && (newApplication.categoryId = categoryId!);
    genre && (newApplication.genreId = genreId!);

    const updateResult: number[] | undefined = await updateApplicationById(
      newApplication,
      id!
    );

    if (updateResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getApplicationByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: number = Number(req.params.id);
    if (!id || isNaN(id)) {
      res.json({ success: 0, error: "No id found" });
      return;
    }
    const applicationDetail: Application | null = await getApplicationById(id);

    if (applicationDetail)
      res.json({
        success: 1,
        result: applicationDetail,
      });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const deleteApplicationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: number = Number(req.body.id);
    if (!id || isNaN(id)) {
      res.json({ success: 0, error: "No id found" });
      return;
    }
    const findRes: Application | null = await db.Application.findOne({
      where: {
        id: id,
      },
      attributes: ["id"],
    });

    if (!findRes) {
      res.json({ success: 0, error: "No application to delete" });
      return;
    }
    const deleteResult: number | undefined = await deleteApplication(id);
    if (deleteResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getApplicationByGenreController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const genre: string = req.body.genre;
    const genreId: number | null = await getGenreIdByName(genre);

    if (!genreId) {
      res.json({ success: 0, error: "Wrong Genre" });
      return;
    }
    const applications: Application[] | undefined =
      await getApplicationsByGenreId(genreId);

    if (applications) res.json({ success: 1, result: applications });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getApplicationsByDeveloperController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const developerId: number = req.body.developerId;

    const userRole: string | undefined = await getRoleByUserId(developerId);
    if (!userRole) {
      res.json({ success: 0, error: "No Developer found" });
      return;
    }

    if (userRole !== "developer") {
      res.json({ success: 0, error: "User is not developer" });
      return;
    }

    const applications: Application[] | undefined =
      await getApplicationsByDeveloperId(developerId);
    if (applications) res.json({ success: 1, result: applications });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const searchApplicationController = async (req: Request, res: Response) => {
  try {
    const appQuery: string = req.query.app as string;

    if (!appQuery || appQuery === "") {
      res.json({ success: 0, error: "No query found" });
      return;
    }

    const applications: Application[] | null = await getApplicationsByWhere({
      name: {
        [Op.like]: `%${appQuery}%`,
      },
    });

    if (applications) res.json({ success: 1, result: applications });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getCountOfApplicationByCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let category: string = req.params.category;

    category = category.trim();

    const categoryId: number | null = await getCategoryIdByName(category);

    if (!categoryId) {
      res.json({ success: 0, error: "No Category Found" });
      return;
    }

    const appCounts: Application | null =
      await getCountOfApplicationByCategoryId(categoryId);
    categoryId;

    if (appCounts) res.json({ success: 1, result: appCounts });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};
export {
  getAllApplicationController,
  createApplicationController,
  editApplicationController,
  getApplicationByIdController,
  deleteApplicationController,
  getApplicationByGenreController,
  getApplicationsByDeveloperController,
  searchApplicationController,
  getCountOfApplicationByCategoryController,
};
