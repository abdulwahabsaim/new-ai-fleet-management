import express from 'express';
import { showDashboard } from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All dashboard routes are protected
router.get('/', protect, showDashboard);

export default router;