import { Request, Response } from 'express';
import {
  createAlbum,
  deleteAlbum,
  getAlbumsByUser,
  updateAlbum,
} from '../../../../src/controllers/album/albumController';
import { IRequestWithUserId } from '../../../../src/sharedTypes';
import { IAlbum } from '../../../../src/models/album';
import { albumsMock } from '../../../dataMock/albums';

jest.mock('/src/services/albumService', () => ({
  createAlbumService: async (album: IAlbum): Promise<IAlbum> => {
    return { ...album, id: 1 };
  },
  getAlbumsByUserId: async (userId: number): Promise<IAlbum[]> => {
    return albumsMock.map((album) => ({ ...album, userId }));
  },
  updateAlbumService: async (id: number, title: string): Promise<IAlbum> => {
    return { ...albumsMock[0], id, title };
  },
  deleteAlbumService: async (): Promise<number> => {
    return 200;
  },
}));

describe('Album Controller', () => {
  it('should create a photo and send it - createAlbum', async () => {
    const body: Partial<IAlbum> = { title: albumsMock[0].title };
    delete body.id;
    delete body.userId;

    const req = { body, id: 1 } as IRequestWithUserId;
    const res = {} as unknown as Response;
    res.send = jest.fn();
    res.status = jest.fn(() => res);
    const next = jest.fn();

    await createAlbum(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ ...body, id: 1 }),
    );

    const firstCallArgs = (res.send as jest.Mock).mock.calls[0];
    expect(firstCallArgs[0]).toBeInstanceOf(Object);

    const savedAlbum: IAlbum = firstCallArgs[0];
    expect(savedAlbum).toHaveProperty('id');
  });

  it('should get album by user - getAlbumsByUser', async () => {
    const req = { params: { userId: '5' } } as unknown as Request;
    const res = {} as unknown as Response;
    res.send = jest.fn();
    res.status = jest.fn(() => res);
    const next = jest.fn();

    await getAlbumsByUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);

    const firstCallArgs = (res.send as jest.Mock).mock.calls[0];
    expect(firstCallArgs[0]).toBeInstanceOf(Array);

    const sendPhotosArray: IAlbum[] = firstCallArgs[0];

    sendPhotosArray.forEach((photo) => {
      expect(photo).toEqual(expect.objectContaining({ userId: 5 }));
    });
  });

  it('should update a album title by id and send it - updateAlbum', async () => {
    const body: Partial<IAlbum> = { title: albumsMock[0].title };
    const req = { body, params: { id: '6' } } as unknown as Request;
    const res = {} as unknown as Response;
    res.send = jest.fn();
    res.status = jest.fn(() => res);
    const next = jest.fn();

    await updateAlbum(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ ...body, id: 6 }),
    );
  });

  it('should delete album by id - deleteAlbum', async () => {
    const req = { params: { id: '5' } } as unknown as Request;
    const res = {} as unknown as Response;
    res.send = jest.fn();
    res.status = jest.fn(() => res);
    const next = jest.fn();

    await deleteAlbum(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ id: 5 });
  });
});
