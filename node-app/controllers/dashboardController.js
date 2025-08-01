import Vehicle from '../models/Vehicle.js';
import Route from '../models/Route.js';
import Trip from '../models/Trip.js';
import { getMaintenancePrediction } from '../services/predictionService.js';

// @desc    Show the main dashboard and run predictions
// @route   GET /dashboard
export const showDashboard = async (req, res) => {
    try {
        // --- Run Batch Predictions ---
        // In a production app, this might be a separate background job
        const allVehicles = await Vehicle.find();
        const maintenanceAlerts = [];

        for (const vehicle of allVehicles) {
            const prediction = await getMaintenancePrediction(vehicle);
            vehicle.maintenancePrediction = {
                isNeeded: prediction.prediction === 1,
                message: prediction.message,
                predictedAt: new Date(),
            };
            await vehicle.save(); // Save the updated prediction to the DB
            
            if (vehicle.maintenancePrediction.isNeeded) {
                maintenanceAlerts.push(vehicle);
            }
        }

        // --- Fetch Stats for Dashboard ---
        const totalVehicles = allVehicles.length;
        const activeVehicles = allVehicles.filter(v => v.status === 'active').length;
        const maintenanceVehicles = allVehicles.filter(v => v.status === 'in_maintenance').length;
        const totalRoutes = await Route.countDocuments();

        const recentTrips = await Trip.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('vehicle', 'make model')
            .populate('driver', 'fullName');

        res.render('dashboard', {
            title: 'Dashboard',
            stats: {
                totalVehicles,
                activeVehicles,
                maintenanceVehicles,
                totalRoutes,
            },
            maintenanceAlerts, // Pass the alerts to the view
            recentTrips,
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        req.flash('error_msg', 'Could not load dashboard data.');
        res.render('dashboard', {
            title: 'Dashboard',
            stats: {},
            maintenanceAlerts: [],
            recentTrips: []
        });
    }
};