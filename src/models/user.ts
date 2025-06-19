import { IAlbum } from './album';

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  albums?: IAlbum[];
}
