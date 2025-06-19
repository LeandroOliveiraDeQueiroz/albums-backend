import { Router } from 'express';
import { getLoggedUser, getUsers } from '../controllers/user/userController';
import { checkAuth } from '../middlewares/checkAuth';

const router = Router();
router.get('/login', checkAuth, getLoggedUser);
router.get('/all', getUsers);

export default router;
