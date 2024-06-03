import { Request, Response } from "express";

import User, { IUserAttributes } from "../models/userModel";
import { logger } from "../utils/pino";
import { INameEmailCountry, IUpdateUserBody } from "../types/interface";
import {
  deleteUser,
  getAllUser,
  getUserIdIfExists,
  insertUser,
  updateUser,
} from "../services/userService";
import { getCounryIdIfExists } from "../services/countryServices";

interface IError extends Error {
  parent: {
    sqlMessage: string;
  };
}

const getAllUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users: User[] | undefined = await getAllUser();

    if (users) res.json({ success: 1, result: users });
    else res.json({ success: 0 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const IErrorInstance = error as IError;
      if (error.name === "SequelizeDatabaseError") {
        logger.error(IErrorInstance.parent.sqlMessage);
      }
    }
  }
};

const createUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let { name, email, country }: INameEmailCountry = req.body;
    name = name.trim();
    email = email.trim();
    const roleId: number = 1; //TODO:

    let countryId: number | undefined = 1; //default country
    if (country) {
      countryId = await getCounryIdIfExists(country);
    }

    if (!countryId) {
      res.json({ success: 0, error: "No country found" });
      return;
    }

    const newUser: IUserAttributes = {
      name: name,
      email: email,
      roleId: roleId,
      countryId: countryId,
    };

    const insertResult: User | undefined = await insertUser(newUser);

    if (insertResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //TODO: email cant be update
    let { id, name, country }: IUpdateUserBody = req.body;
    name && (name = name!.trim());
    country && (country = country!.trim());
    let countryId: number | undefined = 1; //default country
    if (country) {
      countryId = await getCounryIdIfExists(country);
    }

    if (!countryId) {
      res.json({ success: 0, error: "No country found" });
      return;
    }
    const userIdExists = await getUserIdIfExists(id);
    if (!userIdExists) {
      res.json({ success: 0, error: "no user found with id" });
      return;
    }

    const newUser: Partial<IUserAttributes> = {};

    name && (newUser.name = name);
    country && (newUser.countryId = countryId);

    const updateUserResult = await updateUser(newUser, id);

    if (updateUserResult) res.json({ success: 1 });
    else res.json({ succss: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId: number = Number(req.body.id);
    if (!userId || isNaN(userId)) {
      res.json({ success: 0, error: "Invalid user id" });
      return;
    }
    const findRes: User | null = await getUserIdIfExists(userId);

    if (!findRes) {
      res.json({ success: 0, error: "No user to delete" });
      return;
    }
    const deleteResult: number | undefined = await deleteUser(userId);

    if (deleteResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};
export {
  getAllUserController,
  createUserController,
  deleteUserController,
  updateUserController,
};
