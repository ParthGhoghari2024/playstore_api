import { Response } from "express";
import Joi from "joi";

const sendJoiErrorResonse = (error: Joi.ValidationError, res: Response) => {
  res.json({
    success: 0,
    error: {
      message: error?.details.map((err) => err.message),
      path: error?.details.map((err) => err.path).flat(),
    },
  });
};

export { sendJoiErrorResonse };
