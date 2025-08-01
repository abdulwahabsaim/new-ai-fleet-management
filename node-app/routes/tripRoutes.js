import express from 'express';
import {
    getTrips,
    showNewTripForm,
    createTrip,
    updateTripStatus,
    deleteTrip,
} from '../controllers/tripController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getTrips)
    .post(createTrip);

router.get('/new', showNewTripForm);

router.post('/:id/status', updateTripStatus);
router.delete('/:id', deleteTrip);

export default router;