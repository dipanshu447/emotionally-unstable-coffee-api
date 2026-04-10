import express from 'express';
import { brewCoffee, cleanMachine, getClaims, getStatus, motivateUser, refillMachine, therapySession } from './engine.js';

const router = express.Router();

router.get('/status', (req, res) => {
    const status = getStatus();
    res.status(status.status).json(status);
});

router.post('/brew', (req, res) => {
    const { cups = 1, type = "coffee" } = req.body || {};
    const brew = brewCoffee({ cups, type });
    res.status(brew.status).json(brew);
});

router.post('/refill', (req, res) => {
    const refill = refillMachine(req.body);
    res.status(refill.status).json(refill);
});

router.post('/clean', (req, res) => {
    const cleaning = cleanMachine(req.body?.mode || "normal");
    res.status(cleaning.status).json(cleaning);
});

router.get('/motivate', (req, res) => {
    const motivate = motivateUser();
    res.status(motivate.status).json(motivate);
});

router.post('/therapy', (req, res) => {
    const therepyResponse = therapySession(req.body.message);
    res.status(therepyResponse.status).json(therepyResponse);
});

router.get('/claims', (req, res) => {
    const claims = getClaims(); 
    res.status(claims.status).json(claims);
});

export default router;