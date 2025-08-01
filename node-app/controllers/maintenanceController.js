import Maintenance from '../models/Maintenance.js';
import Vehicle from '../models/Vehicle.js';

// @desc    Create a new maintenance record for a vehicle
// @route   POST /vehicles/:vehicleId/maintenance
export const addMaintenanceRecord = async (req, res) => {
    const { vehicleId } = req.params;
    const { serviceDate, mileage, description, cost } = req.body;
    try {
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            req.flash('error_msg', 'Vehicle not found.');
            return res.redirect('/vehicles');
        }

        await Maintenance.create({
            vehicle: vehicleId,
            serviceDate,
            mileage,
            description,
            cost,
            createdBy: req.user._id,
        });

        // Optional: Update the vehicle's last maintenance date
        vehicle.lastMaintenanceDate = serviceDate;
        await vehicle.save();

        req.flash('success_msg', 'Maintenance record added successfully!');
        res.redirect(`/vehicles/${vehicleId}`);
    } catch (error) {
        console.error("Error adding maintenance record:", error);
        req.flash('error_msg', 'Failed to add maintenance record.');
        res.redirect(`/vehicles/${vehicleId}`);
    }
};

// @desc    Delete a maintenance record
// @route   DELETE /vehicles/:vehicleId/maintenance/:maintId
export const deleteMaintenanceRecord = async (req, res) => {
    const { vehicleId, maintId } = req.params;
    try {
        await Maintenance.findByIdAndDelete(maintId);
        req.flash('success_msg', 'Maintenance record deleted.');
        res.redirect(`/vehicles/${vehicleId}`);
    } catch (error) {
        req.flash('error_msg', 'Failed to delete maintenance record.');
        res.redirect(`/vehicles/${vehicleId}`);
    }
};