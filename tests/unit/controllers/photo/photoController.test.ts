import { Request, Response } from 'express';
import {
  createPhoto,
  deletePhoto,
  getPhotoByAlbum,
} from '../../../../src/controllers/photo/photoController';
import { IPhoto } from '../../../../src/models/photo';
import { photosMock } from '../../../dataMock/photos';

jest.mock('/src/services/photoService', () => ({
  createPhotoService: async (photo: IPhoto): Promise<IPhoto> => {
    return { ...photo, id: 1 };
  },
  deletePhotoService: async (): Promise<number> => {
    return 200;
  },
  getPhotoByAlbumId: async (albumId: number): Promise<IPhoto[]> => {
    return photosMock.map((photo) => ({ ...photo, albumId }));
  },
}));

describe('Photo Controller', () => {
  it('should create a photo and send it - createPhoto', async () => {
    const body: IPhoto = { ...photosMock[0] };
    delete body.id;

    const req = { body } as Request;
    const res = {} as unknown as Response;
    res.send = jest.fn();
    res.status = jest.fn(() => res);
    const next = jest.fn();

    await createPhoto(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ ...body, id: 1 });
  });

  it('should get photos by album - getPhotoByAlbum', async () => {
    const req = { params: { albumId: '5' } } as unknown as Request;
    const res = {} as unknown as Response;
    res.send = jest.fn();
    res.status = jest.fn(() => res);
    const next = jest.fn();

    await getPhotoByAlbum(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);

    const firstCallArgs = (res.send as jest.Mock).mock.calls[0];
    expect(firstCallArgs[0]).toBeInstanceOf(Array);

    const sendPhotosArray: IPhoto[] = firstCallArgs[0];

    sendPhotosArray.forEach((photo) => {
      expect(photo).toEqual(expect.objectContaining({ albumId: 5 }));
    });
  });

  it('should delete photo by id - deletePhoto', async () => {
    const req = { params: { id: '5' } } as unknown as Request;
    const res = {} as unknown as Response;
    res.send = jest.fn();
    res.status = jest.fn(() => res);
    const next = jest.fn();

    await deletePhoto(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ id: 5 });
  });
});
