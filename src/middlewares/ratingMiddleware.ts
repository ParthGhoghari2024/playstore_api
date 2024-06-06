import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { logger } from "../utils/pino";
import { sendJoiErrorResonse } from "../utils/responseHandler";
const insertRatingSchema: Joi.ObjectSchema = Joi.object({
  appId: Joi.number().required(),
  comment: Joi.string().trim().optional(),
  rating: Joi.number().required().min(0).max(5),
});

const createRatingMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult = insertRatingSchema.validate(
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

const updateRatingSchema: Joi.ObjectSchema = Joi.object({
  appId: Joi.number().required(),
  comment: Joi.string().trim().optional(),
  rating: Joi.number().optional().min(0).max(5),
});

const updateRatingMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult = updateRatingSchema.validate(
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

export { createRatingMiddleware, updateRatingMiddleware };
