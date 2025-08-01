import Vehicle from '../models/Vehicle.js';
import { getMaintenancePrediction } from '../services/predictionService.js';

// @desc    Show all vehicles
// @route   GET /vehicles
export const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find().sort({ createdAt: -1 });
        res.render('vehicles/index', {
            title: 'Vehicle Fleet',
            vehicles,
        });
    } catch (error) {
        req.flash('error_msg', 'Could not retrieve vehicles.');
        res.redirect('/dashboard');
    }
};

// @desc    Show form to add a new vehicle
// @route   GET /vehicles/new
export const showNewVehicleForm = (req, res) => {
    res.render('vehicles/new', {
        title: 'Add New Vehicle',
    });
};

// @desc    Create a new vehicle
// @route   POST /vehicles
export const createVehicle = async (req, res) => {
    const { make, model, year, vin, licensePlate, type, mileage } = req.body;
    try {
        await Vehicle.create({ make, model, year, vin, licensePlate, type, mileage });
        req.flash('success_msg', 'Vehicle added successfully!');
        res.redirect('/vehicles');
    } catch (error) {
        console.error('Error creating vehicle:', error);
        req.flash('error_msg', 'Failed to add vehicle. VIN and License Plate must be unique.');
        res.redirect('/vehicles/new');
    }
};

// @desc    Show a single vehicle's details and run prediction
// @route   GET /vehicles/:id
export const getVehicleDetails = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).render('404', { title: 'Not Found' });
        }

        // Get AI Prediction
        const prediction = await getMaintenancePrediction(vehicle);
        
        // Update vehicle's prediction fields
        vehicle.maintenancePrediction = {
            isNeeded: prediction.prediction === 1,
            message: prediction.message,
            predictedAt: new Date(),
        };
        await vehicle.save();
        
        res.render('vehicles/show', {
            title: `Vehicle Details | ${vehicle.make} ${vehicle.model}`,
            vehicle,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a vehicle
// @route   DELETE /vehicles/:id
export const deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            req.flash('error_msg', 'Vehicle not found.');
            return res.redirect('/vehicles');
        }
        await Vehicle.deleteOne({ _id: req.params.id });
        req.flash('success_msg', 'Vehicle deleted successfully.');
        res.redirect('/vehicles');
    } catch (error) {
        req.flash('error_msg', 'Could not delete vehicle.');
        res.redirect('/vehicles');
    }
};