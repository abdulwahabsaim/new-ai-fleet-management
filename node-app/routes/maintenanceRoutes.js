import express from 'express';
import {
    addMaintenanceRecord,
    deleteMaintenanceRecord
} from '../controllers/maintenanceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

// Routes are nested under vehicles for context
// e.g., POST /vehicles/VEHICLE_ID/maintenance
router.post('/vehicles/:vehicleId/maintenance', addMaintenanceRecord);
router.delete('/vehicles/:vehicleId/maintenance/:maintId', deleteMaintenanceRecord);

export default router;