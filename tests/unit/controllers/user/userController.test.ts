import { Request, Response } from 'express';
import {
  getLoggedUser,
  getUsers,
} from '../../../../src/controllers/user/userController';
import { IUser } from '../../../../src/models/user';
import { IRequestWithUserId } from '../../../../src/sharedTypes';
import { usersMock } from '../../../dataMock/users';

jest.mock('/src/services/userService', () => ({
  getAllUsers: async (): Promise<IUser[]> => {
    return usersMock;
  },
  getUserById: async (id: number): Promise<IUser> => {
    return { ...usersMock[0], id };
  },
}));

describe('User Controller', () => {
  it('should return the LoggedUser - getLoggedUser', async () => {
    const req = { id: 5 } as IRequestWithUserId;
    const res = {} as unknown as Response;
    res.send = jest.fn();
    res.status = jest.fn(() => res);
    const next = jest.fn();

    await getLoggedUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ ...usersMock[0], id: 5 });
  });

  it('should get all exist users - getUsers', async () => {
    const req = {} as Request;
    const res = {} as unknown as Response;
    res.send = jest.fn();
    res.status = jest.fn(() => res);
    const next = jest.fn();

    await getUsers(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(usersMock);
  });
});
