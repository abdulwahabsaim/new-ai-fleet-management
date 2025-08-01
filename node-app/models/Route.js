import mongoose from 'mongoose';

const waypointSchema = new mongoose.Schema({
    name: { type: String },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
}, { _id: false });

const routeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    waypoints: [waypointSchema],
    totalDistance: { type: Number }, // in meters
    totalDuration: { type: Number }, // in seconds
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

const Route = mongoose.model('Route', routeSchema);
export default Route;