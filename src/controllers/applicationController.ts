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
import { getApplications } from "../helper/applicationHelper";
import { Op, WhereOptions } from "sequelize";
import { getCategoryById } from "./categoryController";
const getAllApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allApplications: Application[] | null = await getApplications({});
    res.json({ success: 1, result: allApplications });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const createApplication = async (
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

    const createResult: Application = await db.Application.create(
      newApplication
    );

    res.json({ success: 1 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const editApplication = async (req: Request, res: Response): Promise<void> => {
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
        "id",
        "name",
        "description",
        [db.sequelize.col("genre"), "genre"],
        [db.sequelize.col("category"), "category"],
      ],
      where: {
        id: id,
      },
      include: [
        {
          model: db.User,
          as: "developer",
          attributes: ["name", "email"],
        },
        {
          model: db.Genre,
          attributes: [],
        },
        {
          model: db.Category,
          attributes: [],
        },
      ],
      raw: true,
      nest: true,
    });
    res.json({ success: 1, result: applicationDetail });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const deleteApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.body.id;
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

const getApplicationsByDeveloper = async (
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

    const applications: Application[] | null = await db.Application.findAll({
      attributes: [
        "name",
        "description",
        [db.sequelize.col("genre.genre"), "genre"],
        [db.sequelize.col("category.category"), "category"],
      ],
      where: {
        developerId: developerId,
      },
      include: [
        {
          model: db.Genre,
          attributes: [],
        },
        {
          model: db.Category,
          attributes: [],
        },
      ],
      raw: true,
      nest: true,
    });

    res.json({ success: 1, result: applications });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const searchApplication = async (req: Request, res: Response) => {
  try {
    const appQuery: string = req.query.app as string;

    if (!appQuery || appQuery === "") {
      res.json({ success: 0, error: "No query found" });
      return;
    }

    const applications: Application[] | null = await getApplications({
      name: {
        [Op.like]: `%${appQuery}%`,
      },
    });

    res.json({ success: 1, result: applications });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getCountOfApplicationByCategory = async (
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

    const appCounts: Application[] = await db.Application.findAll({
      raw: true,
      group: ["Application.categoryId"],
      nest: true,
      attributes: [
        [db.sequelize.fn("count", db.sequelize.col("Application.id")), "count"],
      ],
      where: {
        categoryId: categoryId,
      },
    });

    res.json({ success: 1, result: appCounts });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};
export {
  getAllApplication,
  createApplication,
  editApplication,
  getApplicationById,
  deleteApplication,
  getApplicationByGenre,
  getApplicationsByDeveloper,
  searchApplication,
  getCountOfApplicationByCategory,
};
