import { Router } from 'express';
import HitController from '../controllers/HitController';

const router = Router();

router.get('/', HitController.getAll);
router.patch('/sort', HitController.sortHits);
router.get('/:page', HitController.getHitsByPage);

export default router;