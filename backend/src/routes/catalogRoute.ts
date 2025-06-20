import { Router } from 'express';
import { createCatalog } from '../controllers/catalogController';

const router = Router();

router.post('/', createCatalog);

export default router;
