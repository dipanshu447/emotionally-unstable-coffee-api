import express from 'express';

const router = express.Router();

router.get('/status', (req, res) => {
    res.send({ message: "its status"});
});

router.post('/brew', (req, res) => {
    res.send({ message: "its brewing"});
});

router.post('/refill', (req, res) => {
    res.send({ message: "its refilling"});
});

router.post('/clean', (req, res) => {
    res.send({ message: "its cleaning"});
});

router.get('/motivate', (req, res) => {
    res.send({ message: "its cleaning"});
});

router.post('/therapy', (req, res) => {
    res.send({ message: "its threpy"});
});

router.get('/claims', (req, res) => {
    res.send({ message: "its claims"});
});

export default router;