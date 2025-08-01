import User from '../models/User.js';

// @desc    Show login page
// @route   GET /auth/login
export const showLoginPage = (req, res) => {
    res.render('auth/login', {
        title: 'Login',
    });
};

// @desc    Authenticate user & get session
// @route   POST /auth/login
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        req.flash('error_msg', 'Please fill in all fields.');
        return res.redirect('/auth/login');
    }

    try {
        const user = await User.findOne({ username });

        if (user && (await user.matchPassword(password))) {
            req.session.userId = user._id; // Set user ID in session
            req.flash('success_msg', 'You are now logged in.');
            res.redirect('/dashboard');
        } else {
            req.flash('error_msg', 'Invalid username or password.');
            res.redirect('/auth/login');
        }
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Something went wrong. Please try again.');
        res.redirect('/auth/login');
    }
};

// @desc    Logout user and destroy session
// @route   GET /auth/logout
export const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error:', err);
            return res.redirect('/dashboard');
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.redirect('/auth/login');
    });
};