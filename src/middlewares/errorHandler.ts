import { Request, Response } from 'express';
import { ApiError } from '../utils/errorHandler';

export const errorHandler = (error: unknown, _: Request, res: Response) => {
  console.error(error);
  const apiError = ApiError.handleError(error);
  const { statusCode, message } = apiError;
  res.status(statusCode).send(message);
};
