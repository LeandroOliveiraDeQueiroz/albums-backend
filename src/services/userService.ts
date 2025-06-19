import axios from 'axios';
import { IUser } from '../models/user';

const EXTERNAL_API = 'https://jsonplaceholder.typicode.com';

export const getUserById = async (id: number): Promise<IUser> => {
  const response = await axios.get(`${EXTERNAL_API}/users/${id}`);
  const user: IUser = response.data;
  return user;
};

export const getAllUsers = async (): Promise<IUser[]> => {
  const response = await axios.get(`${EXTERNAL_API}/users/`);
  const users: IUser[] = response.data;
  return users;
};
