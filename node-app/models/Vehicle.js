import mongoose from 'mongoose';

const maintenanceRecordSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    mileage: { type: Number, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true },
});

const vehicleSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    vin: { type: String, required: true, unique: true, uppercase: true },
    licensePlate: { type: String, required: true, unique: true, uppercase: true },
    type: {
        type: String,
        enum: ['sedan', 'truck', 'van', 'suv'],
        required: true,
    },
    mileage: { type: Number, required: true, default: 0 },
    status: {
        type: String,
        enum: ['active', 'in_maintenance', 'inactive'],
        default: 'active',
    },
    purchaseDate: { type: Date, default: Date.now },
    lastMaintenanceDate: { type: Date },
    // A simple prediction result stored with the vehicle
    maintenancePrediction: {
        isNeeded: { type: Boolean, default: false },
        message: { type: String, default: 'No prediction available.' },
        predictedAt: { type: Date },
    },
    // Simple maintenance history
    maintenanceHistory: [maintenanceRecordSchema],
}, {
    timestamps: true,
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;