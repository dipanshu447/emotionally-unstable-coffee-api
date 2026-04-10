import express from 'express';
import { brewCoffee, cleanMachine, getClaims, getStatus, motivateUser, refillMachine, therapySession } from './engine.js';

const router = express.Router();

router.get('/status', (req, res) => {
    const status = getStatus();
    res.status(status.status).send(status);
});

router.post('/brew', (req, res) => {
    // console.log(req.body)
    const brew = brewCoffee(req.body);
    res.status(brew.status).send(brew);
});

router.post('/refill', (req, res) => {
    const refill = refillMachine(req.body);
    res.status(refill.status).send(refill);
});

router.post('/clean', (req, res) => {
    const cleaning = cleanMachine(req.body.mode);
    res.status(cleaning.status).send(cleaning);
});

router.get('/motivate', (req, res) => {
    const motivate = motivateUser();
    res.status(motivate.status).send(motivate);
});

router.post('/therapy', (req, res) => {
    const therepyResponse = therapySession(req.body.message);
    res.status(therepyResponse.status).send(therepyResponse);
});

router.get('/claims', (req, res) => {
    const claims = getClaims(); 
    res.status(claims.status).send(claims);
});

export default router;