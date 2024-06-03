import db from "../models";
import User, { IUserAttributes } from "../models/userModel";
import { logger } from "../utils/pino";

const getAllUser = async (): Promise<User[] | undefined> => {
  try {
    return await db.User.findAll({
      attributes: [
        "id",
        "name",
        "email",
        [db.sequelize.col("country.country"), "country"],
      ],
      raw: true,
      include: [
        {
          model: db.Country,
          attributes: [],
        },
      ],
    });
  } catch (error) {
    logger.error(error);
  }
};

const insertUser = async (
  newUser: IUserAttributes
): Promise<User | undefined> => {
  try {
    return await db.User.create(newUser);
  } catch (error) {
    logger.error(error);
  }
};

const getUserIdIfExists = async (userId: number): Promise<User | null> => {
  try {
    return await db.User.findOne({
      where: {
        id: userId,
      },
      attributes: ["id"],
    });
  } catch (error) {
    logger.error(error);
    return null;
  }
};

const deleteUser = async (userId: number): Promise<number | undefined> => {
  try {
    return await db.User.destroy({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

const getRoleByUserId = async (uId: number): Promise<string | undefined> => {
  try {
    const userId: number = uId;
    const userRole: User | null = await db.User.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: db.Role,
        },
      ],
      raw: true,
      nest: true,
    });

    return userRole?.role.role;
  } catch (error) {
    logger.error(error);
  }
};

const updateUser = async (
  newUser: Partial<IUserAttributes>,
  userId: number
): Promise<number[] | undefined> => {
  try {
    return await db.User.update(newUser, {
      where: {
        id: userId,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};
export {
  getAllUser,
  insertUser,
  getUserIdIfExists,
  deleteUser,
  getRoleByUserId,
  updateUser,
};
