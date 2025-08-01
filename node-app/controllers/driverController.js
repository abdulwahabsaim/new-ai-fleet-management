import Driver from '../models/Driver.js';

// @desc    Show all drivers
// @route   GET /drivers
export const getDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find().sort({ lastName: 1 });
        res.render('drivers/index', {
            title: 'Driver Management',
            drivers,
        });
    } catch (error) {
        req.flash('error_msg', 'Could not retrieve drivers.');
        res.redirect('/dashboard');
    }
};

// @desc    Show form to add a new driver
// @route   GET /drivers/new
export const showNewDriverForm = (req, res) => {
    res.render('drivers/new', {
        title: 'Add New Driver',
    });
};

// @desc    Create a new driver
// @route   POST /drivers
export const createDriver = async (req, res) => {
    const { firstName, lastName, licenseNumber, phone, status } = req.body;
    try {
        await Driver.create({ firstName, lastName, licenseNumber, phone, status, createdBy: req.user._id });
        req.flash('success_msg', 'Driver added successfully!');
        res.redirect('/drivers');
    } catch (error) {
        console.error('Error creating driver:', error);
        req.flash('error_msg', 'Failed to add driver. License Number must be unique.');
        res.redirect('/drivers/new');
    }
};

// @desc    Show form to edit a driver
// @route   GET /drivers/:id/edit
export const showEditDriverForm = async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);
        if (!driver) {
            req.flash('error_msg', 'Driver not found.');
            return res.redirect('/drivers');
        }
        res.render('drivers/edit', {
            title: 'Edit Driver',
            driver,
        });
    } catch (error) {
        req.flash('error_msg', 'Could not load driver data for editing.');
        res.redirect('/drivers');
    }
};

// @desc    Update a driver
// @route   PUT /drivers/:id
export const updateDriver = async (req, res) => {
    try {
        const { firstName, lastName, licenseNumber, phone, status } = req.body;
        await Driver.findByIdAndUpdate(req.params.id, {
            firstName, lastName, licenseNumber, phone, status
        });
        req.flash('success_msg', 'Driver updated successfully!');
        res.redirect('/drivers');
    } catch (error) {
        req.flash('error_msg', 'Failed to update driver. Check for duplicate License Number.');
        res.redirect(`/drivers/${req.params.id}/edit`);
    }
};


// @desc    Delete a driver
// @route   DELETE /drivers/:id
export const deleteDriver = async (req, res) => {
    try {
        await Driver.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Driver deleted successfully.');
        res.redirect('/drivers');
    } catch (error) {
        req.flash('error_msg', 'Could not delete driver.');
        res.redirect('/drivers');
    }
};