import express from 'express';
import { brewCoffee, cleanMachine, getClaims, getPreview, getStatus, motivateUser, refillMachine, therapySession } from './engine/core.js';
import { applyPassiveDecay } from './engine/utils.js';
import { state } from './engine/state.js';

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
    applyPassiveDecay(state);
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
    applyPassiveDecay(state);
    const refill = refillMachine(req.body);
    res.set({
        "X-Protocol": "HTCPCP/1.0",
        "X-Coffee-Mood": refill.state?.mood || "unknown",
        "X-Machine-Status": refill.status === 200 ? "operational" : refill.status === 503 ? "degraded" : "unstable"
    })
    res.status(refill.status).json(refill);
});

router.post('/clean', (req, res) => {
    applyPassiveDecay(state);
    const cleaning = cleanMachine(req.body?.mode || "normal");
    res.set({
        "X-Protocol": "HTCPCP/1.0",
        "X-Coffee-Mood": cleaning.state?.mood || "unknown",
        "X-Machine-Status": cleaning.status === 200 ? "operational" : cleaning.status === 503 ? "degraded" : "unstable"
    })
    res.status(cleaning.status).json(cleaning);
});

router.get('/motivate', (req, res) => {
    applyPassiveDecay(state);
    const motivate = motivateUser();
    res.set({
        "X-Protocol": "HTCPCP/1.0",
        "X-Coffee-Mood": motivate.state?.mood || "unknown",
        "X-System-Status": motivate.status === 200 ? "operational" : motivate.status === 503 ? "degraded" : "unstable"
    })
    res.status(motivate.status).json(motivate);
});

router.post('/therapy', (req, res) => {
    applyPassiveDecay(state);
    const therapyResponse = therapySession(req.body?.message);
    res.set({
        "X-Protocol": "HTCPCP/1.0",
        "X-Coffee-Mood": therapyResponse.state?.mood || "unknown",
        "X-Machine-Status": therapyResponse.status === 200 ? "operational" : therapyResponse.status === 503 ? "degraded" : "unstable"
    })
    res.status(therapyResponse.status).json(therapyResponse);
});

router.get('/claims', (req, res) => {
    applyPassiveDecay(state);
    const claims = getClaims();
    res.set({
        "X-Protocol": "HTCPCP/1.0",
        "X-Coffee-Mood": claims.state?.mood || "unknown",
        "X-System-Status": claims.status === 200 ? "operational" : claims.status === 418 ? "philosophical_failure" : "unstable"
    })
    res.status(claims.status).json(claims);
});

router.get('/preview', (req, res) => {
    const preview = getPreview();
    res.set({
        "X-Protocol": "HTCPCP/1.0",
        "X-Coffee-Mood": preview.state?.mood ?? "unknown",
        "X-System-Status": preview.status === 200 ? "operational" : preview.status === 418 ? "philosophical_failure" : "unstable"
    })
    res.status(preview.status).json(preview);
});

router.get('/info', (req, res) => {
    const info = {
        name: "Emotionally Unstable Coffee API",
        version: "1.0.0",
        protocol: "HTCPCP/1.0 (in spirit)",
        description: "A state-driven REST API where a coffee machine behaves like a burned-out human.",
        author: {
            "name": "Dipanshu Sahu",
            "github": "https://github.com/dipanshu447",
            "portfolio": "https://www.itsdipanshu.dev"
        },
        repository: "https://github.com/dipanshu447/emotionally-unstable-coffee-api",
        architecture: {
            type: "state-driven system",
            stateVariables: ["mood", "caffeineLevel", "burnout", "cleanliness"],
            behavior: "Responses dynamically change based on internal emotional state",
            unpredictability: "Built-in randomness simulates unstable behavior"
        },
        routes: {
            core: [
                "GET /status",
                "POST /brew",
                "POST /refill",
                "POST /clean"
            ],
            personality: [
                "GET /motivate",
                "POST /therapy",
                "GET /claims"
            ],
            meta: [
                "GET /preview",
                "GET /info"
            ]
        },
        responseModel: {
            standardFields: ["status", "state", "message", "timestamp"],
            optionalFields: ["meta", "analysis", "derived"],
            errorBehavior: "May return 418 (I'm a teapot) during emotional instability"
        },
        sampleState: {
            mood: "neutral",
            caffeineLevel: 70,
            burnout: 30,
            cleanliness: 80
        },
        guarantees: [
            "No guarantee of emotional stability",
            "Responses may degrade under stress",
            "Coffee output is not strictly reliable"
        ],
        warnings: [
            "This machine may refuse service at any time",
            "Therapy does not guarantee improvement",
            "Overuse may lead to existential responses"
        ],
        meta: {
            tone: "chaotic-neutral",
            reliability: "questionable",
            selfAwareness: "increasing"
        },
        timestamp: new Date().toISOString()
    };
    res.set({
        "X-Protocol": "HTCPCP/1.0",
        "X-Coffee-Mood": "introspective",
        "X-System-Status": "operational"
    });
    res.status(200).json(info);
});

export default router;