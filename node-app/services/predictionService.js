import axios from 'axios';

const PYTHON_API_URL = process.env.PYTHON_API_URL;

export const getMaintenancePrediction = async (vehicle) => {
    if (!PYTHON_API_URL) {
        console.warn('PYTHON_API_URL not set. Skipping prediction.');
        return { healthScore: 100, message: 'Prediction service not configured.' };
    }

    try {
        const daysSinceService = vehicle.lastMaintenanceDate 
            ? Math.floor((new Date() - vehicle.lastMaintenanceDate) / (1000 * 60 * 60 * 24))
            : 365; // Default to 1 year if no service record

        const vehicleData = {
            mileage: vehicle.mileage,
            age: new Date().getFullYear() - vehicle.year,
            days_since_service: daysSinceService,
        };

        const response = await axios.post(`${PYTHON_API_URL}/predict`, vehicleData);
        return response.data;
    } catch (error) {
        console.error('Error contacting prediction service:', error.message);
        return { healthScore: 100, message: 'Could not retrieve AI prediction.' };
    }
};