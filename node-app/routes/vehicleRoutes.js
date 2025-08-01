import express from 'express';
import {
    getVehicles,
    showNewVehicleForm,
    createVehicle,
    getVehicleDetails,
    deleteVehicle
} from '../controllers/vehicleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All vehicle routes are protected
router.use(protect);

router.route('/')
    .get(getVehicles)
    .post(createVehicle);

router.get('/new', showNewVehicleForm);

router.route('/:id')
    .get(getVehicleDetails)
    .delete(deleteVehicle);

export default router;