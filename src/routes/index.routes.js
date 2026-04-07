import express from 'express';
import coffeeRoutes from './coffee.routes.js';

const router = express.Router();

router.use('/', coffeeRoutes);

export default router;

