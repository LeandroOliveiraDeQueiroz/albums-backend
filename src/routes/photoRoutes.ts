import { Router } from 'express';
import {
  createPhoto,
  deletePhoto,
  getPhotoByAlbum,
} from '../controllers/photo/photoController';

const router = Router();
router.post('/', createPhoto);
router.get('/album/:albumId', getPhotoByAlbum);
router.delete('/:id', deletePhoto);
export default router;
