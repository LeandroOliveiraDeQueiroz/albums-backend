import { NextFunction, Request, Response } from 'express';
import { IRequestWithUserId } from '../../sharedTypes';
import { getAllUsers, getUserById } from '../../services/userService';
import { BadRequestError } from '../../utils/errorHandler';

export const getLoggedUser = async (
  req: IRequestWithUserId,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.id) throw new BadRequestError('No user Id');

    const { id } = req;

    const user = await getUserById(id);

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await getAllUsers();

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
