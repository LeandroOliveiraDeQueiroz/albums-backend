import axios from 'axios';
import { IAlbum } from '../models/album';

const EXTERNAL_API = 'https://jsonplaceholder.typicode.com';

export const createAlbumService = async (album: IAlbum): Promise<IAlbum> => {
  const response = await axios.post(`${EXTERNAL_API}/albums/`, {
    ...album,
  });
  const savedAlbum: IAlbum = response.data;
  return savedAlbum;
};

export const getAlbumsByUserId = async (userId: number): Promise<IAlbum[]> => {
  const response = await axios.get(`${EXTERNAL_API}/users/${userId}/albums/`);
  const albums: IAlbum[] = response.data;
  return albums;
};

export const updateAlbumService = async (
  id: number,
  title: string,
): Promise<IAlbum> => {
  const response = await axios.put(`${EXTERNAL_API}/albums/${id}`, {
    title: title,
  });
  const updateAlbum: IAlbum = response.data;
  return updateAlbum;
};

export const deleteAlbumService = async (id: number): Promise<number> => {
  const response = await axios.delete(`${EXTERNAL_API}/albums/${id}`);
  return response.status;
};
