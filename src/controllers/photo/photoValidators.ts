import Joi from 'joi';

export const createPhotoSchema = Joi.object().keys({
  albumId: Joi.number().required(),
  title: Joi.string().required(),
  url: Joi.string().required(),
  thumbnailUrl: Joi.string().required(),
});

export const getPhotosByAlbum = Joi.object().keys({
  albumId: Joi.number().required(),
});

export const deletePhotoSchema = Joi.object().keys({
  id: Joi.number().required(),
});
