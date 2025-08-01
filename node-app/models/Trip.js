import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
    title: { type: String, required: true },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true,
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true,
    },
    route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route',
        required: true,
    },
    // We'll store route details for historical purposes, in case the original route is deleted
    routeName: { type: String, required: true },
    totalDistance: { type: Number, required: true }, // in meters
    
    // Trip Status and Timing
    status: {
        type: String,
        enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Scheduled',
    },
    scheduledDate: { type: Date, required: true },
    startedAt: { type: Date },
    completedAt: { type: Date },
    
    // Data collected after the trip
    finalMileage: { type: Number },
    notes: { type: String },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;