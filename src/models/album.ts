import { IPhoto } from './photo';

export interface IAlbum {
  id?: number;
  userId: number;
  title: string;
  photos?: IPhoto[];
}
