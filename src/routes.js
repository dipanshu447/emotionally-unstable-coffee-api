import express from 'express';
import { brewCoffee, getStatus } from './engine.js';

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
    res.send({ message: "its refilling" });
});

router.post('/clean', (req, res) => {
    res.send({ message: "its cleaning" });
});

router.get('/motivate', (req, res) => {
    res.send({ message: "its cleaning" });
});

router.post('/therapy', (req, res) => {
    res.send({ message: "its threpy" });
});

router.get('/claims', (req, res) => {
    res.send({ message: "its claims" });
});

export default router;