import Vehicle from '../models/Vehicle.js';
import Route from '../models/Route.js';
import Trip from '../models/Trip.js';
import { getMaintenancePrediction } from '../services/predictionService.js';

// @desc    Show the main dashboard and run predictions
// @route   GET /dashboard
export const showDashboard = async (req, res) => {
    try {
        // --- Run Batch Predictions ---
        const allVehicles = await Vehicle.find();
        const maintenanceAlerts = [];

        for (const vehicle of allVehicles) {
            const prediction = await getMaintenancePrediction(vehicle);
            
            vehicle.healthScore = prediction.healthScore;
            vehicle.healthScoreMessage = prediction.message;
            vehicle.healthScoreLastUpdated = new Date();
            
            await vehicle.save();
            
            if (vehicle.healthScore < 75) {
                maintenanceAlerts.push(vehicle);
            }
        }

        // --- Fetch Stats for Dashboard ---
        const totalVehicles = allVehicles.length;
        const activeVehicles = allVehicles.filter(v => v.status === 'active').length;
        const maintenanceVehicles = allVehicles.filter(v => v.status === 'in_maintenance').length;
        const totalRoutes = await Route.countDocuments();

        // Get active vehicles to display on the map
        const vehiclesForMap = await Vehicle.find({ status: 'active' }).select('make model licensePlate location');

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
            maintenanceAlerts,
            recentTrips,
            vehiclesForMap: JSON.stringify(vehiclesForMap) // Pass locations as a JSON string
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        req.flash('error_msg', 'Could not load dashboard data.');
        res.render('dashboard', {
            title: 'Dashboard',
            stats: {},
            maintenanceAlerts: [],
            recentTrips: [],
            vehiclesForMap: '[]' // Pass an empty array string on error
        });
    }
};