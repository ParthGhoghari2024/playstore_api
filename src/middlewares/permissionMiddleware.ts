import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";
import { logger } from "../utils/pino";
import db from "../models";

const createPermissionSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string().trim().required().max(255),
  versionId: Joi.number().required(),
  description: Joi.string().trim().required(),
});

const createPermissionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult =
      createPermissionSchema.validate(req.body, {
        abortEarly: false,
      });
    if (error) {
      res.json({ success: 0, error: error?.details });
      return;
    }
    next();
  } catch (error) {
    logger.error(error);
  }
};

const editPermissionSchema: Joi.ObjectSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().trim().max(255).optional(),
  versionId: Joi.number().required(),
  description: Joi.string().trim().optional(),
});

const editPermissionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult =
      editPermissionSchema.validate(req.body, {
        abortEarly: false,
      });
    if (error) {
      res.json({ success: 0, error: error?.details });
      return;
    }
    next();
  } catch (error) {
    logger.error(error);
  }
};

const deletePermissionSchema: Joi.ObjectSchema = Joi.object({
  id: Joi.number().required(),
});

const deletePermissionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult =
      deletePermissionSchema.validate(req.body, {
        abortEarly: false,
      });
    if (error) {
      res.json({ success: 0, error: error?.details });
      return;
    }
    next();
  } catch (error) {
    logger.error(error);
  }
};

export {
  createPermissionMiddleware,
  editPermissionMiddleware,
  deletePermissionMiddleware,
};
