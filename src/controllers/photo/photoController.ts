import { NextFunction, Request, Response } from 'express';
import { ApiError, BadRequestError } from '../../utils/errorHandler';
import {
  createPhotoSchema,
  deletePhotoSchema,
  getPhotosByAlbum,
} from './photoValidators';
import {
  createPhotoService,
  deletePhotoService,
  getPhotoByAlbumId,
} from '../../services/photoService';

export const createPhoto = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const body = req.body;

  try {
    const { error, value } = createPhotoSchema.validate(body);
    if (error) {
      throw new BadRequestError('Invalid fields');
    }

    const savedPhoto = await createPhotoService(value);

    res.status(200).send(savedPhoto);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getPhotoByAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const params = req.params;
    const data = { albumId: parseInt(params.albumId) };
    const { error, value } = getPhotosByAlbum.validate(data);
    if (error) {
      throw new BadRequestError('Invalid fields');
    }

    const { albumId } = value;

    const photos = await getPhotoByAlbumId(albumId);

    res.status(200).send(photos);
  } catch (error) {
    next(error);
  }
};

export const deletePhoto = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const params = req.params;

  try {
    const data = { id: parseInt(params.id) };
    const { error, value } = deletePhotoSchema.validate(data);
    if (error) {
      throw new BadRequestError('Invalid fields');
    }

    const id: number = value.id;

    const status = await deletePhotoService(id);

    if (status !== 200) throw new ApiError(status, '');

    res.status(200).send({ id });
  } catch (error) {
    next(error);
  }
};
