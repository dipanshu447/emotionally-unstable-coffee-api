import express from 'express';
import { brewCoffee, cleanMachine, getClaims, getPreview, getStatus, motivateUser, refillMachine, therapySession } from './engine/core.js';

const router = express.Router();

router.get('/status', (req, res) => {
    const status = getStatus();
    res.set({
        "X-Protocol": "HTCPCP/1.0",
        "X-Coffee-Mood": status.state?.mood || "unknown",
        "X-System-Status": status.code === 200 ? "operational" : "degraded"
    })
    res.status(status.code).json(status);
});

router.post('/brew', (req, res) => {
    const { cups = 1, type = "coffee" } = req.body || {};
    const brew = brewCoffee({ cups, type });
    res.set({
        "X-Protocol": "HTCPCP/1.0",
        "X-Coffee-Mood": brew.state?.mood || "unknown",
        "X-Estimated-Wait": brew.estimatedWait || "instant",
        "X-Machine-Status": brew.status === 200 ? "operational" : "unstable"
    })
    res.status(brew.status).json(brew);
});

router.post('/refill', (req, res) => {
    const refill = refillMachine(req.body);
    res.set({
        "X-Protocol": "HTCPCP/1.0",
        "X-Coffee-Mood": refill.state?.mood || "unknown",
        "X-Machine-Status": refill.status === 200 ? "operational" : refill.status === 503 ? "degraded" : "unstable"
    })
    res.status(refill.status).json(refill);
});

router.post('/clean', (req, res) => {
    const cleaning = cleanMachine(req.body?.mode || "normal");
    res.set({
        "X-Protocol": "HTCPCP/1.0",
        "X-Coffee-Mood": cleaning.state?.mood || "unknown",
        "X-Machine-Status": cleaning.status === 200 ? "operational" : cleaning.status === 503 ? "degraded" : "unstable"
    })
    res.status(cleaning.status).json(cleaning);
});

router.get('/motivate', (req, res) => {
    const motivate = motivateUser();
    res.set({
        "X-Protocol": "HTCPCP/1.0",
        "X-Coffee-Mood": motivate.state?.mood || "unknown",
        "X-System-Status": motivate.status === 200 ? "operational" : motivate.status === 503 ? "degraded" : "unstable"
    })
    res.status(motivate.status).json(motivate);
});

router.post('/therapy', (req, res) => {
    const therapyResponse = therapySession(req.body?.message);
    res.set({
        "X-Protocol": "HTCPCP/1.0",
        "X-Coffee-Mood": therapyResponse.state?.mood || "unknown",
        "X-Machine-Status": therapyResponse.status === 200 ? "operational" : therapyResponse.status === 503 ? "degraded" : "unstable"
    })
    res.status(therapyResponse.status).json(therapyResponse);
});

router.get('/claims', (req, res) => {
    const claims = getClaims();
    res.set({
        "X-Protocol": "HTCPCP/1.0",
        "X-Coffee-Mood": claims.state?.mood || "unknown",
        "X-System-Status": claims.status === 200 ? "operational" : claims.status === 418  ? "philosophical_failure" : "unstable"
    })
    res.status(claims.status).json(claims);
});

router.get('/preview', (req, res) => {
    const preview = getPreview();
    res.status(200).json(preview);
});

router.get('/info', (req, res) => {
    const info = {
        "name": "Emotionally Unstable Coffee API",
        "version": "1.0.0",
        "protocol": "HTCPCP/1.0 (in spirit)",
        "description": "A REST API where a coffee machine behaves like a burned-out human.",
        "author": {
            "name": "Dipanshu Sahu",
            "github": "https://github.com/dipanshu447",
            "portfolio": "https://www.itsdipanshu.dev"
        },
        "repository": "https://github.com/dipanshu447/emotionally-unstable-coffee-api",
        "system": {
            "stateDriven": true,
            "variables": ["mood", "caffeineLevel", "burnout", "cleanliness"],
            "behavior": "Responses change based on internal emotional state"
        },
        "routes": [
            "GET /status",
            "POST /brew",
            "POST /refill",
            "POST /clean",
            "GET /motivate",
            "POST /therapy",
            "GET /claims",
            "GET /preview",
            "GET /info"
        ],
        "warning": "This machine may refuse service at any time.",
        "note": "Not responsible for emotional damage caused by coffee."
    };
    res.status(200).json(info);
});

export default router;