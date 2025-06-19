import { Router } from 'express';
import {
  createAlbum,
  deleteAlbum,
  getAlbumsByUser,
  updateAlbum,
} from '../controllers/album/albumController';
import { checkAuth } from '../middlewares/checkAuth';

const router = Router();
router.post('/', checkAuth, createAlbum);
router.get('/user/:userId', getAlbumsByUser);
router.put('/:id', updateAlbum);
router.delete('/:id', deleteAlbum);

export default router;
