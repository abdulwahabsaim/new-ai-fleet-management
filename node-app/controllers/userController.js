import User from '../models/User.js';

// @desc    Show all users
// @route   GET /users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        res.render('users/index', {
            title: 'User Management',
            users,
        });
    } catch (error) {
        req.flash('error_msg', 'Could not retrieve users.');
        res.redirect('/dashboard');
    }
};

// @desc    Show form to add a new user
// @route   GET /users/new
export const showNewUserForm = (req, res) => {
    res.render('users/new', {
        title: 'Create New User',
    });
};

// @desc    Create a new user
// @route   POST /users
export const createUser = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            req.flash('error_msg', 'User with that username already exists.');
            return res.redirect('/users/new');
        }

        await User.create({ username, password, role });
        req.flash('success_msg', 'User created successfully!');
        res.redirect('/users');
    } catch (error) {
        console.error('Error creating user:', error);
        req.flash('error_msg', 'Failed to create user.');
        res.redirect('/users/new');
    }
};

// @desc    Delete a user
// @route   DELETE /users/:id
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            req.flash('error_msg', 'User not found.');
            return res.redirect('/users');
        }
        // Prevent admin from deleting themselves
        if (user._id.toString() === req.user._id.toString()) {
            req.flash('error_msg', 'You cannot delete your own admin account.');
            return res.redirect('/users');
        }

        await User.deleteOne({ _id: req.params.id });
        req.flash('success_msg', 'User deleted successfully.');
        res.redirect('/users');
    } catch (error) {
        req.flash('error_msg', 'Could not delete user.');
        res.redirect('/users');
    }
};