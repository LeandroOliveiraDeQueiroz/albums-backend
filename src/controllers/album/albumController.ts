import { NextFunction, Request, Response } from 'express';
import { ApiError, BadRequestError } from '../../utils/errorHandler';
import {
  createAlbumSchema,
  deleteAlbumSchema,
  getAlbumsByUserSchema,
  updateAlbumSchema,
} from './albumValidators';
import {
  createAlbumService,
  deleteAlbumService,
  getAlbumsByUserId,
  updateAlbumService,
} from '../../services/albumService';
import { IRequestWithUserId } from '../../sharedTypes';

export const createAlbum = async (
  req: IRequestWithUserId,
  res: Response,
  next: NextFunction,
) => {
  const body = req.body;
  const data = {
    userId: req.id,
    ...body,
  };
  try {
    const { error, value } = createAlbumSchema.validate(data);
    if (error) {
      throw new BadRequestError('Invalid fields');
    }

    const savedAlbum = await createAlbumService(value);

    res.status(200).send(savedAlbum);
  } catch (error) {
    next(error);
  }
};

export const getAlbumsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const params = req.params;
    const data = { userId: parseInt(params.userId) };
    const { error, value } = getAlbumsByUserSchema.validate(data);
    if (error) {
      throw new BadRequestError('Invalid fields');
    }

    const { userId } = value;

    const albums = await getAlbumsByUserId(userId);

    res.status(200).send(albums);
  } catch (error) {
    next(error);
  }
};

export const updateAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const body = req.body;
  const params = req.params;
  try {
    const data = { id: parseInt(params.id), title: body.title as string };
    const { error, value } = updateAlbumSchema.validate(data);
    if (error) {
      console.log(error);
      throw new BadRequestError('Invalid fields');
    }

    const { id, title } = value;

    console.log('updatedAlbum', value);

    const updatedAlbum = await updateAlbumService(id, title);

    console.log('updatedAlbum', updatedAlbum);

    res.status(200).send(updatedAlbum);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const params = req.params;

  try {
    const data = { id: parseInt(params.id) };
    console.log('data', data);
    const { error, value } = deleteAlbumSchema.validate(data);
    if (error) {
      console.log('Error', error);

      throw new BadRequestError('Invalid fields');
    }

    const id: number = value.id;

    console.log('value', value);

    const status = await deleteAlbumService(id);
    console.log('status', status);

    if (status !== 200) throw new ApiError(status, `Couldn't delete`);

    console.log('ate o fim');
    res.status(200).send({ id });
  } catch (error) {
    console.log('Error:', error);
    next(error);
  }
};
