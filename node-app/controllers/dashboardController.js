import Vehicle from '../models/Vehicle.js';
import Route from '../models/Route.js';

// @desc    Show the main dashboard
// @route   GET /dashboard
export const showDashboard = async (req, res) => {
    try {
        const totalVehicles = await Vehicle.countDocuments();
        const activeVehicles = await Vehicle.countDocuments({ status: 'active' });
        const maintenanceVehicles = await Vehicle.countDocuments({ status: 'in_maintenance' });
        const totalRoutes = await Route.countDocuments();

        // Get the 5 most recently added vehicles
        const recentVehicles = await Vehicle.find().sort({ createdAt: -1 }).limit(5);

        res.render('dashboard', {
            title: 'Dashboard',
            stats: {
                totalVehicles,
                activeVehicles,
                maintenanceVehicles,
                totalRoutes,
            },
            recentVehicles,
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        req.flash('error_msg', 'Could not load dashboard data.');
        res.render('dashboard', {
            title: 'Dashboard',
            stats: {},
            recentVehicles: []
        });
    }
};