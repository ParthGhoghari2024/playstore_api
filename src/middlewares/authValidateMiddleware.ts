import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { logger } from "../utils/pino";
import { sendJoiErrorResonse } from "../utils/responseHandler";
const userSignupSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string().trim().required().max(255),
  email: Joi.string()
    .trim()
    .email()
    .required()
    .max(255)
    .message("invalid email"),
  country: Joi.string().trim().max(255).optional(),
  password: Joi.string().trim().required(),
});

const registerUserValidateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult = userSignupSchema.validate(
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

const userLoginSchema: Joi.ObjectSchema = Joi.object({
  email: Joi.string().trim().email().required().max(255),
  password: Joi.string().trim().required(),
});

const loginUserValidateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value }: Joi.ValidationResult = userLoginSchema.validate(
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
export { registerUserValidateMiddleware, loginUserValidateMiddleware };
