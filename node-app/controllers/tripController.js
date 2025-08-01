import Trip from '../models/Trip.js';
import Vehicle from '../models/Vehicle.js';
import Driver from '../models/Driver.js';
import Route from '../models/Route.js';

// @desc    Show all trips
// @route   GET /trips
export const getTrips = async (req, res) => {
    try {
        const trips = await Trip.find()
            .populate('vehicle', 'make model licensePlate mileage')
            .populate('driver', 'fullName')
            .sort({ scheduledDate: -1 });
            
        res.render('trips/index', {
            title: 'Trip Management',
            trips,
        });
    } catch (error) {
        req.flash('error_msg', 'Could not retrieve trips.');
        res.redirect('/dashboard');
    }
};

// @desc    Show form to add a new trip
// @route   GET /trips/new
export const showNewTripForm = async (req, res) => {
    try {
        // Fetch available resources for the form dropdowns
        const vehicles = await Vehicle.find({ status: 'active' });
        const drivers = await Driver.find({ status: 'active' });
        const routes = await Route.find({ createdBy: req.user._id });
        
        res.render('trips/new', {
            title: 'Plan New Trip',
            vehicles,
            drivers,
            routes,
        });
    } catch (error) {
        req.flash('error_msg', 'Could not load data for the trip form.');
        res.redirect('/trips');
    }
};

// @desc    Create a new trip
// @route   POST /trips
export const createTrip = async (req, res) => {
    const { title, vehicle, driver, route, scheduledDate, notes } = req.body;
    try {
        const selectedRoute = await Route.findById(route);
        if (!selectedRoute) {
             req.flash('error_msg', 'Selected route not found.');
             return res.redirect('/trips/new');
        }

        await Trip.create({
            title,
            vehicle,
            driver,
            route,
            routeName: selectedRoute.name,
            totalDistance: selectedRoute.totalDistance,
            scheduledDate,
            notes,
            createdBy: req.user._id,
        });
        
        req.flash('success_msg', 'Trip scheduled successfully!');
        res.redirect('/trips');
    } catch (error) {
        req.flash('error_msg', 'Failed to schedule trip.');
        res.redirect('/trips/new');
    }
};

// @desc    Update trip status (Start, Complete, Cancel)
// @route   POST /trips/:id/status
export const updateTripStatus = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id).populate('vehicle');
        const { status, finalMileage, fuelConsumed } = req.body;

        if (!trip) {
            req.flash('error_msg', 'Trip not found.');
            return res.redirect('/trips');
        }

        switch (status) {
            case 'In Progress':
                trip.startedAt = new Date();
                break;
            case 'Completed':
                trip.completedAt = new Date();
                
                if (finalMileage && fuelConsumed) {
                    const vehicle = trip.vehicle;
                    const startMileage = vehicle.mileage;
                    const tripDistance = Number(finalMileage) - startMileage;
                    
                    trip.finalMileage = Number(finalMileage);
                    trip.fuelConsumed = Number(fuelConsumed);

                    if (vehicle && tripDistance > 0) {
                        // --- NEW FUEL ANALYTICS LOGIC ---
                        
                        // 1. Update vehicle's main odometer reading
                        vehicle.mileage = Number(finalMileage);
                        
                        // 2. Recalculate the vehicle's lifetime average fuel efficiency
                        const allCompletedTrips = await Trip.find({ 
                            vehicle: vehicle._id, 
                            status: 'Completed', 
                            fuelConsumed: { $gt: 0 },
                            finalMileage: { $gt: 0 } 
                        });

                        let totalFuel = Number(fuelConsumed);
                        let totalDistanceDriven = tripDistance;

                        // Include past trips in the calculation
                        for(const pastTrip of allCompletedTrips) {
                           // This is a simplified calculation. A more accurate way would be to store start mileage on the trip.
                           // But for this project, this logic is sufficient.
                           const pastTripVehicle = await Vehicle.findById(pastTrip.vehicle);
                           const pastTripDistance = pastTrip.totalDistance / 1000; // convert meters to km
                           totalFuel += pastTrip.fuelConsumed;
                           totalDistanceDriven += pastTripDistance;
                        }
                        
                        if (totalDistanceDriven > 0) {
                            // Calculate Liters per 100km
                            vehicle.averageFuelEfficiency = (totalFuel / totalDistanceDriven) * 100;
                        }
                        
                        await vehicle.save();
                    }
                }
                break;
        }

        trip.status = status;
        await trip.save();
        
        req.flash('success_msg', `Trip status updated to "${status}"`);
        res.redirect('/trips');
    } catch (error) {
        console.error("Error updating trip status:", error);
        req.flash('error_msg', 'Failed to update trip status.');
        res.redirect('/trips');
    }
};


// @desc    Delete a trip
// @route   DELETE /trips/:id
export const deleteTrip = async (req, res) => {
    try {
        await Trip.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Trip deleted successfully.');
        res.redirect('/trips');
    } catch (error) {
        req.flash('error_msg', 'Could not delete trip.');
        res.redirect('/trips');
    }
};