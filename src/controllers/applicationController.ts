import { Request, Response } from "express";
import { logger } from "../utils/pino";
import ApplicationModel from "../models/applicationModel";
import { getCategoryIdByName } from "../helper/categoryHelper";
import { getGenreIdByName } from "../helper/genreHelper";
import { IApplicationReqBody } from "../types/application";
import { InferAttributes, InferCreationAttributes, Optional } from "sequelize";
const getAllApplicationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allApplications: ApplicationModel[] = await ApplicationModel.findAll({
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

    const newApplication: InferCreationAttributes<ApplicationModel> = {
      id: undefined,
      name: name,
      developerId: developerId,
      description: description,
      categoryId: categoryId,
      genreId: genreId,
    };

    await ApplicationModel.create(newApplication);

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

    const newApplication: InferCreationAttributes<ApplicationModel> = {
      id: undefined,
      name: name,
      developerId: developerId,
      description: description,
      categoryId: categoryId,
      genreId: genreId,
    };

    await ApplicationModel.update(newApplication, {
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
    const applicationDetail: ApplicationModel | null =
      await ApplicationModel.findOne({
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

    await ApplicationModel.destroy({
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
  getAllApplicationController,
  createApplicationController,
  editApplicationController,
  getApplicationById,
  deleteApplicationController,
};
