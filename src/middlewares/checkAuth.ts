import { NextFunction, Response } from 'express';
import { IRequestWithUserId } from '../sharedTypes';

export const checkAuth = async (
  req: IRequestWithUserId,
  _: Response,
  next: NextFunction,
) => {
  try {
    //TODO get authorization header
    req.id = 1;
    next();
  } catch (error) {
    next(error);
  }
};
