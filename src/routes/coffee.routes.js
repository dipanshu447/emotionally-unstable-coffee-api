import express from 'express';
import { brewCoffee, cleanMachine, getClaims, getStatus, motivateUser, refillMachine, therapySession } from '../controllers/coffee.controller.js';

const router = express.Router();

router.get('/status', getStatus);
router.get('/brew', brewCoffee);
router.get('/refill', refillMachine);
router.get('/clean', cleanMachine);
router.get('/motivate', motivateUser);
router.get('/therapy', therapySession);
router.get('/claims', getClaims);

export default router;