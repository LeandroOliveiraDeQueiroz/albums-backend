import axios from 'axios';
import { IPhoto } from '../models/photo';

const EXTERNAL_API = 'https://jsonplaceholder.typicode.com';

export const getPhotoByAlbumId = async (albumId: number): Promise<IPhoto[]> => {
  const response = await axios.get(`${EXTERNAL_API}/albums/${albumId}/photos/`);
  const photos: IPhoto[] = response.data;
  return photos;
};

export const createPhotoService = async (photo: IPhoto): Promise<IPhoto> => {
  const response = await axios.post(`${EXTERNAL_API}/photos/`, {
    ...photo,
  });
  const savedPhoto: IPhoto = response.data;
  return savedPhoto;
};

export const deletePhotoService = async (id: number): Promise<number> => {
  const response = await axios.delete(`${EXTERNAL_API}/photos/${id}`);
  return response.status;
};
