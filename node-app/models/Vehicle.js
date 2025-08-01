import mongoose from 'mongoose';

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
    // New field for storing vehicle location
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            default: [-74.0060, 40.7128] // Default to NYC
        }
    },
    purchaseDate: { type: Date, default: Date.now },
    lastMaintenanceDate: { type: Date },
    healthScore: { type: Number, default: 100 },
    healthScoreMessage: { type: String, default: 'No prediction available.' },
    healthScoreLastUpdated: { type: Date },
    averageFuelEfficiency: { type: Number }, // In L/100km

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual populate for maintenance records
vehicleSchema.virtual('maintenanceRecords', {
    ref: 'Maintenance',
    localField: '_id',
    foreignField: 'vehicle'
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;