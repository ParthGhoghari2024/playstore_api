import db from "../models";
import User from "../models/userModel";
import { logger } from "../utils/pino";

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

export { getRoleByUserId };
