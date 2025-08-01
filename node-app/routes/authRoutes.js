import express from 'express';
import { showLoginPage, loginUser, logoutUser } from '../controllers/authController.js';

const router = express.Router();

router.get('/login', showLoginPage);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

export default router;