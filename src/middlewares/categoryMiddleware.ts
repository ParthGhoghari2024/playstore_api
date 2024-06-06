import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { logger } from "../utils/pino";
import { sendJoiErrorResonse } from "../utils/responseHandler";

const createCategorySchema: Joi.ObjectSchema = Joi.object({
  category: Joi.string().trim().required().max(255),
});

const createCategoryMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult =
      createCategorySchema.validate(req.body, {
        abortEarly: false,
      });
    if (error) {
      sendJoiErrorResonse(error, res);
      return;
    }
    next();
  } catch (error) {
    logger.error(error);
  }
};

const editCategorySchema: Joi.ObjectSchema = Joi.object({
  id: Joi.number().required(),
  category: Joi.string().trim().optional().max(255),
});

const editCategoryMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult = editCategorySchema.validate(
      req.body,
      {
        abortEarly: false,
      }
    );

    if (error) {
      sendJoiErrorResonse(error, res);
      return;
    }
    next();
  } catch (error) {
    logger.error(error);
  }
};

const deleteCategorySchema: Joi.ObjectSchema = Joi.object({
  id: Joi.number().required(),
});

const deleteCategoryMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult =
      deleteCategorySchema.validate(req.body, {
        abortEarly: false,
      });
    if (error) {
      sendJoiErrorResonse(error, res);
      return;
    }
    next();
  } catch (error) {
    logger.error(error);
  }
};
export {
  createCategoryMiddleware,
  editCategoryMiddleware,
  deleteCategoryMiddleware,
};
