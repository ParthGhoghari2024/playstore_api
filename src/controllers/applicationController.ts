import { Request, Response } from "express";
import { logger } from "../utils/pino";
import Application, {
  IApplicationAttributes,
} from "../models/applicationModel";
import { getCategoryIdByName } from "../helper/categoryHelper";
import { getGenreIdByName } from "../helper/genreHelper";
import { IApplicationReqBody } from "../types/application";

import db from "../models";
const getAllApplicationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allApplications: Application[] = await db.Application.findAll({
      attributes: ["name", "description", "categoryId", "genreId"],
    });
    res.json({ success: 1, result: allApplications });
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
    const { name, description, category, genre }: IApplicationReqBody =
      req.body;

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

    const createResult: Application = await db.Application.create(
      newApplication
    );

    res.json({ success: 1 });
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
    const { id, name, description, category, genre }: IApplicationReqBody =
      req.body;

    const categoryId: number | null = await getCategoryIdByName(category);
    const developerId: number = 1;
    if (!categoryId) {
      res.json({ success: 0, error: "Wrong Category" });
      return;
    }
    const genreId: number | null = await getGenreIdByName(genre);
    if (!genreId) {
      res.json({ success: 0, error: "Wrong Genre" });
      return;
    }

    const newApplication: IApplicationAttributes = {
      name: name,
      developerId: developerId,
      description: description,
      categoryId: categoryId,
      genreId: genreId,
    };
    const updateResult: number[] = await db.Application.update(newApplication, {
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

const getApplicationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const applicationDetail: Application | null = await db.Application.findOne({
      attributes: [
        "name",
        "description",
        "developerId",
        "categoryId",
        "genreId",
      ],
      where: {
        id: id,
      },
    });

    res.json({ success: 1, result: applicationDetail });
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
    const id: string = req.body.id;

    await db.Application.destroy({
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

const getApplicationByUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId: number = 1;
    const result: Application[] = await Application.findAll({
      attributes: [
        "name",
        "description",
        [db.sequelize.col("developer.name"), "developerName"],
        [db.sequelize.col("developer.email"), "developerEmail"],
        [db.sequelize.col("genre.genre"), "genre"],
        [db.sequelize.col("category.category"), "category"],
      ],
      where: {
        developerId: userId,
      },
      include: [
        {
          model: db.User,
          attributes: [],
        },
        { model: db.Genre, attributes: [] },
        { model: db.Category, attributes: [] },
      ],
      raw: true,
    });

    res.json({ success: 1, result: result });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};
const getApplicationByGenre = async (
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
    const applications: Application[] = await db.Application.findAll({
      attributes: ["name", "description"],
      where: {
        genreId: genreId,
      },
    });

    res.json({ success: 1, result: applications });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};
export {
  getAllApplicationController,
  createApplicationController,
  editApplicationController,
  getApplicationById,
  deleteApplicationController,
  getApplicationByUserController,
  getApplicationByGenre,
};
