// This model is simplified. The core maintenance data is now embedded
// within the Vehicle model in `maintenanceHistory` for this version.
// This file is kept as a placeholder for future expansion if you decide
// to build a more complex, standalone maintenance module.

/*
Example of a more complex Maintenance model for future use:

import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true,
    },
    scheduledDate: { type: Date, required: true },
    completedDate: { type: Date },
    type: {
        type: String,
        enum: ['preventive', 'corrective', 'inspection'],
        required: true,
    },
    description: { type: String, required: true },
    cost: { type: Number },
    status: {
        type: String,
        enum: ['scheduled', 'in_progress', 'completed', 'cancelled'],
        default: 'scheduled',
    },
    technician: { type: String },
}, { timestamps: true });

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);
export default Maintenance;

*/