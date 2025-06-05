import { Router } from 'express';
import { registerUser, loginUser, verifyUser, logoutUser } from '../controllers/userController';

const router = Router();

// Route for user registration
router.post('/register', registerUser);
// Route for user login
router.post('/login', loginUser);
// Route for verifying user
router.get('/verify', verifyUser);
// Route for user logout
router.post('/logout', logoutUser);

export default router;