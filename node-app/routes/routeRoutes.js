import express from 'express';
import {
    getRoutes,
    showNewRoutePage,
    createRoute,
    deleteRoute
} from '../controllers/routeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All route-related routes are protected
router.use(protect);

router.route('/')
    .get(getRoutes)
    .post(createRoute);

router.get('/new', showNewRoutePage);

router.delete('/:id', deleteRoute);

export default router;