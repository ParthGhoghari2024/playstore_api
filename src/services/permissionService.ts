import { Op } from "sequelize";
import db from "../models";
import Permission, { IPermissionAttributes } from "../models/permissionModel";
import { logger } from "../utils/pino";

const getAllPermission = async (): Promise<Permission[] | undefined> => {
  try {
    return await db.Permission.findAll({
      attributes: ["id", "name", "versionId", "description"],
    });
  } catch (error) {
    logger.error(error);
  }
};

const insertPermission = async (
  newPermission: IPermissionAttributes
): Promise<Permission | undefined> => {
  try {
    return await db.Permission.create(newPermission);
  } catch (error) {
    logger.error(error);
  }
};

const updatePermission = async (
  newPermission: Partial<IPermissionAttributes>,
  id: number
): Promise<number[] | undefined> => {
  try {
    return await db.Permission.update(newPermission, {
      where: {
        id: id,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

const deletePermission = async (id: number): Promise<number | undefined> => {
  try {
    return await db.Permission.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

const getPermissionById = async (id: number): Promise<Permission | null> => {
  try {
    return await db.Permission.findOne({
      attributes: ["name", "versionId", "description"],
      where: {
        id: id,
      },
    });
  } catch (error) {
    logger.error(error);
    return null;
  }
};

const getPermissionsByVersion = async (
  versionId: number
): Promise<Permission[] | undefined> => {
  try {
    return await db.Permission.findAll({
      raw: true,
      attributes: [
        "name",
        "description",
        [db.sequelize.col("version.version"), "versionName"],
        [db.sequelize.col("version.description"), "versionDescription"],
      ],
      where: {
        versionId: versionId,
      },
      include: {
        model: db.Version,
        attributes: [],
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

const getApplicationPermissions = async (appId: number) => {
  try {
    return await db.Permission.findAll({
      raw: true,
      attributes: [
        "name",
        "description",
        [db.sequelize.col("version.id"), "versionId"],
      ],
      include: [
        {
          model: db.Version,
          attributes: [],
          include: [
            {
              model: db.Application,
              attributes: [],
            },
          ],
          where: {
            applicationId: appId,
          },
        },
      ],
    });
  } catch (error) {
    logger.error(error);
  }
};
const getPermissionsTillVersion = async (
  appId: number,
  versionId: number
): Promise<Permission[] | undefined> => {
  try {
    return await db.Permission.findAll({
      raw: true,
      attributes: [
        "name",
        "description",
        [db.sequelize.col("version.id"), "versionId"],
        [db.sequelize.col("version.application.id"), "appId"],
      ],
      include: [
        {
          model: db.Version,
          attributes: [],
          include: [
            {
              model: db.Application,
              attributes: [],
            },
          ],
          where: {
            applicationId: appId,
          },
        },
      ],
      where: {
        versionId: {
          [Op.lte]: versionId,
        },
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

const getPermissionIdIfExists = async (
  id: number
): Promise<Permission | null> => {
  try {
    return await db.Permission.findOne({
      where: {
        id: id,
      },
      attributes: ["id"],
    });
  } catch (error) {
    logger.error(error);
    return null;
  }
};
export {
  getAllPermission,
  insertPermission,
  updatePermission,
  deletePermission,
  getPermissionById,
  getPermissionsByVersion,
  getApplicationPermissions,
  getPermissionsTillVersion,
  getPermissionIdIfExists,
};
