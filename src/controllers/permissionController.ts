import { Request, Response } from "express";
import { logger } from "../utils/pino";
import { IAppIdVersionId, IPermissionReqBody } from "../types/permission";
import Permission, { IPermissionAttributes } from "../models/permissionModel";
import {
  deletePermission,
  getAllPermission,
  getApplicationPermissions,
  getPermissionById,
  getPermissionIdIfExists,
  getPermissionsByVersion,
  getPermissionsTillVersion,
  insertPermission,
  updatePermission,
} from "../services/permissionService";
import { IReducedPermission } from "../types/interface";
const getAllPermissionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allPermissions: Permission[] | undefined = await getAllPermission();

    /*
      {
        versionId : 1
        permission:{
          id,name,description
        }
      },
      {

      }..
    */

    const reducedPermissions = allPermissions?.reduce(
      (prev: IReducedPermission[], cur: Permission) => {
        const index = prev.findIndex((ele) => ele.versionId === cur.versionId);
        if (index === -1) {
          prev.push({
            versionId: cur.versionId,
            permission: [
              {
                id: cur.id,
                name: cur.name,
                description: cur.description,
              },
            ],
          });
        } else {
          prev[index].permission.push({
            id: cur.id,
            name: cur.name,
            description: cur.description,
          });
        }
        return prev;
      },
      []
    );

    if (allPermissions) res.json({ success: 1, result: reducedPermissions });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const createPermissionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let { name, versionId, description }: IPermissionReqBody = req.body;
    name = name.trim();
    description = description.trim();

    const newPermission: IPermissionAttributes = {
      name: name,
      versionId: versionId,
      description: description,
    };

    const createResult: Permission | undefined = await insertPermission(
      newPermission
    );

    if (createResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const editPermissionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let { id, name, versionId, description }: IPermissionReqBody = req.body;
    if (!id) {
      res.json({ success: 0, error: "No id to edit" });
      return;
    }
    name && (name = name.trim());
    description && (description = description.trim());

    const findRes: Permission | null = await getPermissionIdIfExists(id);

    if (!findRes) {
      res.json({ success: 0, error: "No permission to edit" });
      return;
    }

    const newPermission: Partial<IPermissionAttributes> = {
      versionId: versionId,
    };

    name && (newPermission.name = name);
    description && (newPermission.description = description);

    const updateResult: number[] | undefined = await updatePermission(
      newPermission,
      id!
    );

    if (updateResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};
const deletePermissionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: number = Number(req.body.id);
    if (!id || isNaN(id)) {
      res.json({ success: 0, error: "No proper id" });
      return;
    }

    const findRes: Permission | null = await getPermissionIdIfExists(id);

    if (!findRes) {
      res.json({ success: 0, error: "No permission to delete" });
      return;
    }

    const deleteResult: number | undefined = await deletePermission(id);

    if (deleteResult) res.json({ success: 1 });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};
const getPermissionByIdConroller = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: number = Number(req.params.id);
    if (!id || isNaN(id)) {
      res.json({ success: 0, error: "No proper id" });
      return;
    }
    const permission: Permission | null = await getPermissionById(id);

    if (permission) res.json({ success: 1, result: permission });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getPermissionsByVersionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const versionId: number = Number(req.params.versionId);
    if (!versionId || isNaN(versionId)) {
      res.json({ success: 0, error: "Invalid version id" });
      return;
    }
    const permisions: Permission[] | undefined = await getPermissionsByVersion(
      versionId
    );

    if (permisions) res.json({ success: 1, result: permisions });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getApplicationPermissionsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const appId: number = Number(req.params.appId);
    if (!appId || isNaN(appId)) {
      res.json({ success: 0, error: "Invalid app id" });
      return;
    }

    const permisions: Permission[] | undefined =
      await getApplicationPermissions(appId);

    if (permisions) res.json({ success: 1, result: permisions });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};

const getPermissionsTillVersionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { appId, versionId }: IAppIdVersionId = req.body;
    if (!appId || !versionId) {
      res.json({ success: 0, error: "App id and version id is required" });
      return;
    }
    const permisions: Permission[] | undefined =
      await getPermissionsTillVersion(appId, versionId);

    if (permisions) res.json({ success: 1, result: permisions });
    else res.json({ success: 0 });
  } catch (error) {
    logger.error(error);
    res.json({ success: 0 });
  }
};
export {
  createPermissionController,
  getAllPermissionController,
  editPermissionController,
  deletePermissionController,
  getPermissionByIdConroller,
  getPermissionsByVersionController,
  getApplicationPermissionsController,
  getPermissionsTillVersionController,
};
