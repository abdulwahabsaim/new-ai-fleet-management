import axios from 'axios';

const PYTHON_API_URL = process.env.PYTHON_API_URL;

/**
 * Gets a maintenance prediction for a given vehicle.
 * @param {object} vehicle - The vehicle object from the database.
 * @returns {Promise<object>} - A promise that resolves to the prediction result.
 */
export const getMaintenancePrediction = async (vehicle) => {
    if (!PYTHON_API_URL) {
        console.warn('PYTHON_API_URL is not set. Skipping prediction.');
        return { prediction: 0, message: 'Prediction service not configured.' };
    }

    try {
        const vehicleData = {
            mileage: vehicle.mileage,
            age: new Date().getFullYear() - vehicle.year,
            vehicle_type: vehicle.type,
        };

        const response = await axios.post(`${PYTHON_API_URL}/predict`, vehicleData);
        return response.data;
    } catch (error) {
        console.error('Error contacting prediction service:', error.message);
        // Return a default "safe" prediction if the service fails
        return { prediction: 0, message: 'Could not retrieve AI prediction.' };
    }
};