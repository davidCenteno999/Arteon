import { Router } from 'express';
import { createCatalog,getCatalogs } from '../controllers/catalogController';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', createCatalog);
router.get('/', authenticateUser, getCatalogs); // Asegúrate de que el usuario esté autenticado antes de obtener los catálogos

export default router;
