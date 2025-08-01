import express from 'express';
import {
    getVehicles,
    showNewVehicleForm,
    createVehicle,
    getVehicleDetails,
    showEditVehicleForm,
    updateVehicle,
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

router.get('/:id/edit', showEditVehicleForm);

router.route('/:id')
    .get(getVehicleDetails)
    .put(updateVehicle)
    .delete(deleteVehicle);

export default router;