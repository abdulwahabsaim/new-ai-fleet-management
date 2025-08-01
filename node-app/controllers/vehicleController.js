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

// @desc    Show form to edit a vehicle
// @route   GET /vehicles/:id/edit
export const showEditVehicleForm = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            req.flash('error_msg', 'Vehicle not found');
            return res.redirect('/vehicles');
        }
        res.render('vehicles/edit', {
            title: 'Edit Vehicle',
            vehicle,
        });
    } catch (error) {
        req.flash('error_msg', 'Could not load vehicle data for editing.');
        res.redirect('/vehicles');
    }
};

// @desc    Update a vehicle
// @route   PUT /vehicles/:id
export const updateVehicle = async (req, res) => {
    try {
        const { make, model, year, vin, licensePlate, type, mileage, status, latitude, longitude } = req.body;
        
        const updateData = {
            make, model, year, vin, licensePlate, type, mileage, status
        };

        // If location data is provided, update it in GeoJSON format
        if (latitude && longitude) {
            updateData.location = {
                type: 'Point',
                coordinates: [Number(longitude), Number(latitude)]
            };
        }

        await Vehicle.findByIdAndUpdate(req.params.id, updateData);

        req.flash('success_msg', 'Vehicle updated successfully!');
        res.redirect(`/vehicles/${req.params.id}`);
    } catch (error) {
        req.flash('error_msg', 'Failed to update vehicle. Check for duplicate VIN or License Plate.');
        res.redirect(`/vehicles/${req.params.id}/edit`);
    }
};

// @desc    Show a single vehicle's details
// @route   GET /vehicles/:id
export const getVehicleDetails = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id).populate({
            path: 'maintenanceRecords',
            options: { sort: { serviceDate: -1 } }
        });
        
        if (!vehicle) {
            return res.status(404).render('404', { title: 'Not Found' });
        }
        
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