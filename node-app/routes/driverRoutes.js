import express from 'express';
import {
    getDrivers,
    showNewDriverForm,
    createDriver,
    showEditDriverForm,
    updateDriver,
    deleteDriver,
} from '../controllers/driverController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All driver routes are protected
router.use(protect);

router.route('/')
    .get(getDrivers)
    .post(createDriver);

router.get('/new', showNewDriverForm);

// Routes for editing and updating
router.get('/:id/edit', showEditDriverForm);
router.put('/:id', updateDriver);

router.delete('/:id', deleteDriver);

export default router;