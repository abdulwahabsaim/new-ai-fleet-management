import express from 'express';
import {
    getUsers,
    showNewUserForm,
    createUser,
    deleteUser
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes in this file are protected and require admin access
router.use(protect);
router.use(admin);

router.route('/')
    .get(getUsers)
    .post(createUser);

router.get('/new', showNewUserForm);

router.delete('/:id', deleteUser);

export default router;