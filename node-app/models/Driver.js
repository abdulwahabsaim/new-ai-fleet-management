import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
    phone: { type: String },
    status: {
        type: String,
        enum: ['active', 'on_leave', 'inactive'],
        default: 'active',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
    // Add a virtual property for the full name
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

driverSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

const Driver = mongoose.model('Driver', driverSchema);
export default Driver;