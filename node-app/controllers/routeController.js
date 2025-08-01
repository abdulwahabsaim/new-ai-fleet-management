import axios from 'axios';
import Route from '../models/Route.js';

const OSRM_API_URL = 'http://router.project-osrm.org';

// @desc    Show all saved routes
// @route   GET /routes
export const getRoutes = async (req, res) => {
    try {
        const routes = await Route.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
        res.render('routes/index', {
            title: 'Saved Routes',
            routes,
        });
    } catch (error) {
        req.flash('error_msg', 'Could not retrieve routes.');
        res.redirect('/dashboard');
    }
};

// @desc    Show the route planning page
// @route   GET /routes/new
export const showNewRoutePage = (req, res) => {
    res.render('routes/new', {
        title: 'Plan a New Route',
    });
};

// @desc    Optimize and save a new route
// @route   POST /routes
export const createRoute = async (req, res) => {
    const { name, description, waypoints } = req.body;
    
    if (!name || !waypoints || waypoints.length < 2) {
        req.flash('error_msg', 'Route name and at least two waypoints are required.');
        return res.redirect('/routes/new');
    }

    // Waypoints are sent as a string, so we need to parse them
    const parsedWaypoints = JSON.parse(waypoints);

    const coordinates = parsedWaypoints.map(wp => `${wp.lng},${wp.lat}`).join(';');
    const url = `${OSRM_API_URL}/route/v1/driving/${coordinates}?overview=full&geometries=geojson`;

    try {
        const osrmResponse = await axios.get(url);
        const osrmRoute = osrmResponse.data.routes[0];

        if (!osrmRoute) {
            req.flash('error_msg', 'Could not find a route for the given waypoints.');
            return res.redirect('/routes/new');
        }

        const newRoute = new Route({
            name,
            description,
            waypoints: parsedWaypoints,
            totalDistance: osrmRoute.distance, // in meters
            totalDuration: osrmRoute.duration, // in seconds
            createdBy: req.user._id,
        });

        await newRoute.save();
        req.flash('success_msg', 'Route saved successfully!');
        res.redirect('/routes');
    } catch (error) {
        console.error('Error creating route:', error.message);
        req.flash('error_msg', 'Failed to optimize and save the route.');
        res.redirect('/routes/new');
    }
};

// @desc    Delete a route
// @route   DELETE /routes/:id
export const deleteRoute = async (req, res) => {
    try {
        await Route.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
        req.flash('success_msg', 'Route deleted successfully.');
        res.redirect('/routes');
    } catch (error) {
        req.flash('error_msg', 'Could not delete route.');
        res.redirect('/routes');
    }
};