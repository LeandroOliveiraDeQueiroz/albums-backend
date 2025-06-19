import Joi from 'joi';

export const createAlbumSchema = Joi.object().keys({
  userId: Joi.number().required(),
  title: Joi.string().required(),
});

export const getAlbumsByUserSchema = Joi.object().keys({
  userId: Joi.number().required(),
});

export const updateAlbumSchema = Joi.object().keys({
  id: Joi.number().required(),
  title: Joi.string().required(),
});

export const deleteAlbumSchema = Joi.object().keys({
  id: Joi.number().required(),
});
