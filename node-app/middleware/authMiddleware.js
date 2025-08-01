import User from '../models/User.js';

// Middleware to check if user is authenticated
export const protect = async (req, res, next) => {
    if (req.session.userId) {
        try {
            req.user = await User.findById(req.session.userId).select('-password');
            if (req.user) {
                next();
            } else {
                req.flash('error_msg', 'Not authorized, user not found.');
                res.redirect('/auth/login');
            }
        } catch (error) {
            req.flash('error_msg', 'Not authorized, token failed.');
            res.redirect('/auth/login');
        }
    } else {
        req.flash('error_msg', 'Please log in to view this page.');
        res.redirect('/auth/login');
    }
};

// Middleware to check if user is an admin
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        req.flash('error_msg', 'Not authorized as an admin.');
        res.status(403).redirect('/dashboard');
    }
};

// Middleware to set user details for all views
export const setUser = async (req, res, next) => {
    if (req.session.userId) {
        res.locals.user = await User.findById(req.session.userId).select('-password');
        res.locals.isAuthenticated = true;
    } else {
        res.locals.user = null;
        res.locals.isAuthenticated = false;
    }
    next();
};