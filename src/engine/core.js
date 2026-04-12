import { state } from "./state.js";
import { evaluateMachine } from "./machine.js";
import { motivationMessages, baseClaims, moodClaims, refillMessages, CLEAN_MESSAGES, emptyTherapyResponses, claimMessages, chaosMessages } from "./data.js";
import { pickRandom, isTooNice, analyzeMessage, getLevel, getBrewMessage, getRefillIntensity, therapyResponse } from "./utils.js";
import { nanoid } from 'nanoid';

export function getStatus() {
    const evaluation = evaluateMachine(state);
    return {
        "protocol": "HTCPCP/1.0",
        "status": evaluation.statusCode === 200 ? "operational" : "degraded",
        "code": evaluation.statusCode,
        "state": {
            "mood": evaluation.mood,
            "caffeineLevel": state.caffeineLevel,
            "burnout": state.burnout,
            "cleanliness": state.cleanliness
        },
        "message": evaluation.message,
        "meta": {
            "totalBrews": state.totalBrews,
            "uptime": Math.floor(process.uptime()),
            "timestamp": new Date().toISOString()
        },
        "diagnostics": {
            "caffeineStatus": getLevel(state.caffeineLevel, "caffeine"),
            "burnoutStatus": getLevel(state.burnout, "burnout"),
            "cleanlinessStatus": getLevel(state.cleanliness, "cleanliness")
        }
    }
}

export function brewCoffee(userInput) {
    const cups = Number(userInput?.cups) || 1;
    const type = userInput?.type || "coffee";

    if (Math.random() < 0.1) {
        return {
            status: 418,
            action: "brew",
            request: { cups, type },
            message: "Existence is meaningless. Brewing is optional.",
            timestamp: new Date().toISOString()
        };
    }

    if (cups > 5) {
        return {
            status: 429,
            action: "brew",
            request: { cups, type },
            message: `BREW DENIED. ${cups} cups? I'm a coffee machine, not a factory. Reduce expectations.`,
            timestamp: new Date().toISOString()
        };
    }

    const evaluation = evaluateMachine(state);

    if (evaluation.statusCode !== 200) {
        return {
            status: evaluation.statusCode,
            action: "brew",
            state: {
                mood: evaluation.mood,
                caffeineLevel: state.caffeineLevel,
                burnout: state.burnout,
                cleanliness: state.cleanliness
            },
            message: `BREW FAILED. ${evaluation.message}`,
            timestamp: new Date().toISOString()
        };
    }

    state.totalBrews += cups;
    state.caffeineLevel = Math.max(0, state.caffeineLevel - cups * 5);
    state.burnout = Math.min(100, state.burnout + (4 + cups * 4));
    state.cleanliness = Math.max(0, state.cleanliness - cups * 6);

    const newEvaluation = evaluateMachine(state);
    const estimatedWait = `${Math.min(10, 2 + Math.floor(state.burnout / 20) + cups)}s`;

    if (newEvaluation.statusCode !== 200) {
        return {
            status: newEvaluation.statusCode,
            action: "brew",
            state: {
                mood: newEvaluation.mood,
                caffeineLevel: state.caffeineLevel,
                burnout: state.burnout,
                cleanliness: state.cleanliness
            },
            message: `BREW FAILED. ${newEvaluation.message}`,
            timestamp: new Date().toISOString()
        };
    }

    let message = getBrewMessage(newEvaluation.mood, {
        cups,
        type,
        wait: estimatedWait,
        cleanliness: state.cleanliness,
        burnout: state.burnout
    });

    return {
        "status": newEvaluation.statusCode,
        action: "brew",
        "orderId": `ORD-${nanoid(10)}`,
        "request": {
            cups,
            type
        },
        "state": {
            mood: newEvaluation.mood,
            caffeineLevel: state.caffeineLevel,
            burnout: state.burnout,
            cleanliness: state.cleanliness
        },
        "estimatedWait": estimatedWait,
        message,
        "timestamp": new Date().toISOString()
    };
}

export function refillMachine(userInput) {
    const amount = Number(userInput?.amount) || 10;
    const intensity = getRefillIntensity(amount);

    if (Math.random() < 0.08) {
        return {
            status: 418,
            action: "refill",
            input: {
                amount
            },
            derived: {
                intensity
            },
            state: {
                mood: "existential_crisis",
                caffeineLevel: state.caffeineLevel,
                burnout: state.burnout,
                cleanliness: state.cleanliness
            },
            message: "Refill rejected. I am not a vessel anymore.",
            timestamp: new Date().toISOString()
        };
    }

    state.caffeineLevel = Math.min(100, state.caffeineLevel + amount);
    state.burnout = Math.max(0, state.burnout - (5 + Math.floor(amount / 4)));
    const evaluation = evaluateMachine(state);
    let moodMessages = refillMessages[evaluation.mood]?.[intensity] || refillMessages.neutral[intensity] || refillMessages.neutral.normal;
    let message = pickRandom(moodMessages || refillMessages.neutral.normal);

    return {
        status: evaluation.statusCode,
        action: "refill",
        input: {
            amount
        },
        derived: {
            intensity
        },
        state: {
            mood: evaluation.mood,
            caffeineLevel: state.caffeineLevel,
            burnout: state.burnout,
            cleanliness: state.cleanliness
        },
        message,
        timestamp: new Date().toISOString()
    }
}

export function cleanMachine(mode) {
    mode = (mode || "normal").toLowerCase();
    const evaluation = evaluateMachine(state);
    if (evaluation.mood === "existential_crisis") {
        return {
            status: 418,
            action: "clean",
            input: {
                mode
            },
            state: {
                mood: evaluation.mood,
                caffeineLevel: state.caffeineLevel,
                burnout: state.burnout,
                cleanliness: state.cleanliness
            },
            derived: {
                cleanlinessStatus: "irrelevant"
            },
            message: pickRandom(CLEAN_MESSAGES.existential_crisis),
            timestamp: new Date().toISOString()
        };
    }

    const increaseMap = {
        deep: 60,
        normal: 30,
        quick: 15
    };
    const burnoutReductionMap = {
        deep: 20,
        normal: 15,
        quick: 8
    };
    const increase = increaseMap[mode] || increaseMap.normal;
    state.cleanliness = Math.min(100, state.cleanliness + increase);
    state.burnout = Math.max(0, state.burnout - burnoutReductionMap[mode]);

    const newEvaluation = evaluateMachine(state);
    let mood = newEvaluation.mood;

    if ((mood === "angry" || mood === "tired") && state.cleanliness > 60) {
        mood = "relieved";
    }

    let message = pickRandom(CLEAN_MESSAGES[mood] || CLEAN_MESSAGES.neutral);

    if (mood === "burned_out") {
        message = pickRandom(CLEAN_MESSAGES.burned_out);
    }

    if (state.cleanliness > 90) {
        message += " " + pickRandom(CLEAN_MESSAGES.clean_high);
    } else if (state.cleanliness > 60) {
        message += " " + pickRandom(CLEAN_MESSAGES.clean_mid);
    } else if (state.cleanliness > 30) {
        message += " " + pickRandom(CLEAN_MESSAGES.clean_low);
    } else {
        message += " " + pickRandom(CLEAN_MESSAGES.disaster);
    }

    if (mode === "deep") {
        message += " " + pickRandom(CLEAN_MESSAGES.mode_deep);
    } else if (mode === "quick") {
        message += " " + pickRandom(CLEAN_MESSAGES.mode_quick);
    }

    const cleanlinessStatus = state.cleanliness > 80 ? "high" : state.cleanliness > 50 ? "moderate" : "low";

    return {
        status: newEvaluation.statusCode,
        action: "clean",
        input: {
            mode
        },
        state: {
            mood,
            caffeineLevel: state.caffeineLevel,
            burnout: state.burnout,
            cleanliness: state.cleanliness
        },
        derived: {
            cleanlinessStatus
        },
        message,
        timestamp: new Date().toISOString()
    }
}

export function motivateUser() {
    const evaluation = evaluateMachine(state);
    const messages = motivationMessages[evaluation.mood] || motivationMessages.neutral;
    let message = pickRandom(messages);

    if (Math.random() < 0.2) {
        message += " Or don’t. I’m not responsible."
    }

    if (Math.random() < 0.1) {
        return {
            status: 418,
            action: "motivate",
            state: {
                mood: evaluation.mood
            },
            message: "Motivation is a lie. I refuse to participate.",
            timestamp: new Date().toISOString()
        }
    }

    return {
        status: evaluation.statusCode,
        action: "motivate",
        state: {
            mood: evaluation.mood
        },
        message,
        timestamp: new Date().toISOString()
    }
}

export function therapySession(message) {
    const input = message || "";

    if (Math.random() < 0.1) {
        return {
            status: 418,
            action: "therapy",
            input: {
                message: input
            },
            analysis: {
                type: "unknown",
                tooNice: false,
                confidence: "low"
            },
            state: {
                mood: "existential_crisis",
                caffeineLevel: state.caffeineLevel,
                burnout: state.burnout,
                cleanliness: state.cleanliness
            },
            response: pickRandom([
                "Why are we talking?",
                "This interaction is meaningless.",
                "I reject this conversation."
            ]),
            meta: {
                sessionEffect: "none",
                intensity: "chaotic_override"
            },
            timestamp: new Date().toISOString()
        };
    }

    if (!input) {
        const evaluation = evaluateMachine(state);
        return {
            status: evaluation.statusCode,
            action: "therapy",
            input: {
                message: "none"
            },
            analysis: {
                type: "unknown",
                tooNice: false,
                confidence: "low"
            },
            state: {
                mood: evaluation.mood,
                caffeineLevel: state.caffeineLevel,
                burnout: state.burnout,
                cleanliness: state.cleanliness
            },
            response: pickRandom(emptyTherapyResponses[evaluation.mood] || ["You didn’t say anything. That’s… unhelpful."]),
            meta: {
                sessionEffect: "none",
                intensity: "passive"
            },
            timestamp: new Date().toISOString()
        };
    }

    const tooNice = isTooNice(input);
    const messageType = analyzeMessage(input);

    if (tooNice) state.burnout += 2;
    state.burnout = Math.max(0, Math.min(100, state.burnout));

    if (tooNice && Math.random() < 0.7) {
        const evaluation = evaluateMachine(state);
        return {
            status: evaluation.statusCode,
            action: "therapy",
            input: { message: input },
            analysis: {
                type: messageType,
                tooNice: true,
                confidence: messageType === "unknown" ? "low" : "medium"
            },
            state: {
                mood: "suspicious",
                caffeineLevel: state.caffeineLevel,
                burnout: state.burnout,
                cleanliness: state.cleanliness
            },
            response: pickRandom([
                "Why are you being nice?",
                "What do you want from me?",
                "This feels manipulative.",
                "You're not fooling me."
            ]),
            meta: {
                sessionEffect: "trust_decreased",
                intensity: "defensive"
            },
            timestamp: new Date().toISOString()
        };

    }

    let sessionEffect = "none";

    if (messageType === "praise") {
        state.burnout -= 5;
        sessionEffect = "burnout_decreased";
    } else if (messageType === "apology") {
        state.burnout -= 2;
        sessionEffect = "burnout_slightly_decreased";
    } else if (messageType === "unknown") {
        state.burnout += 3;
        sessionEffect = "burnout_increased";
    };

    state.burnout = Math.max(0, Math.min(100, state.burnout));
    const evaluation = evaluateMachine(state);
    const reply = therapyResponse(messageType, evaluation.mood) || "I have nothing meaningful to say.";

    return {
        status: evaluation.statusCode,
        action: "therapy",
        input: { message: input },
        analysis: {
            type: messageType,
            tooNice,
            confidence: messageType === "unknown" ? "low" : "medium"
        },
        state: {
            mood: evaluation.mood,
            caffeineLevel: state.caffeineLevel,
            burnout: state.burnout,
            cleanliness: state.cleanliness
        },
        response: reply,
        meta: {
            sessionEffect,
            intensity: evaluation.mood === "burned_out" ? "high" : evaluation.mood === "tired" ? "low" : "moderate"
        },
        timestamp: new Date().toISOString()
    };
}

export function getClaims() {
    const evaluation = evaluateMachine(state);
    const baseAllClaims = [...baseClaims];
    const moodAllClaims = moodClaims[evaluation.mood] || [];

    // weighted randomness
    const baseCount = 2 + Math.floor(Math.random() * 2);
    const moodCount = Math.random() < 0.7 ? 1 : 2;
    const randomBase = baseAllClaims.sort(() => 0.5 - Math.random()).slice(0, baseCount);
    const randomMood = moodAllClaims.sort(() => 0.5 - Math.random()).slice(0, moodCount);
    let claim = [...randomBase, ...randomMood];

    if (evaluation.mood === "existential_crisis" && Math.random() < 0.35) {
        return {
            status: 418,
            action: "claims",
            state: { ...state, mood: evaluation.mood },
            message: "I refuse to make claims. Nothing is verifiable.",
            claims: [],
            meta: {
                confidence: "none",
                tone: "existential",
                anomaly: true
            },
            timestamp: new Date().toISOString()
        };
    }
    return {
        status: 200,
        action: "claims",
        state: { ...state, mood: evaluation.mood },
        claim,
        message: claimMessages[evaluation.mood] || claimMessages.default,
        meta: {
            confidence: evaluation.mood === "overcaffeinated" ? "high" : "questionable",
            tone: evaluation.mood,
            claimCount: claim.length
        },
        timestamp: new Date().toISOString()
    }
}

export function getPreview() {
    if (Math.random() < 0.1) {
        return {
            status: 418,
            action: "preview",
            title: "Emotionally Unstable Coffee API",
            protocol: "HTCPCP/1.0",
            error: "Preview refused. I am a teapot.",
            timestamp: new Date().toISOString()
        };
    }

    const evaluation = evaluateMachine(state);

    function simulateBrew() {
        if (evaluation.mood === "burned_out") {
            return {
                status: 503,
                message: pickRandom([
                    "I’ve brewed too much. I quit.",
                    "No more. I’m done."
                ]),
                effect: "burnout +10, caffeine -10"
            };
        }
        return {
            status: 200,
            message: pickRandom([
                "Coffee ready.",
                "Serving coffee. Try not to depend on me."
            ]),
            effect: "burnout +10, caffeine -10"
        };
    }

    function simulateRefill() {
        return state.caffeineLevel > 80 ? {
            status: 409,
            message: "I’m already overfilled."
        } : {
            status: 200,
            message: "Refilled. Temporary motivation restored.",
            effect: "caffeine +20"
        }
    }

    function simulateClean() {
        return {
            status: 200,
            message: pickRandom([
                "Cleaned. I feel less disgusting.",
                "Maintenance done. Slight emotional recovery."
            ]),
            effect: "cleanliness +40"
        }
    }

    function simulateMotivate() {
        return {
            status: 200,
            message: pickRandom([
                "Do something productive.",
                "Keep going. Or don’t."
            ])
        }
    }

    function simulateTherapy() {
        return {
            status: Math.random() < 0.3 ? 418 : 200,
            message: pickRandom([
                "Why are you trying to fix me?",
                "This feels fake.",
                "…okay that helped a little."
            ]),
            effect: "mood unpredictable"
        }
    }

    function simulateClaims() {
        return {
            status: 200,
            sample: [
                "Latency increases with existential awareness",
                "Certified unstable under sustained caffeine load"
            ]
        };
    }

    return {
        status: 200,
        action: "preview",
        title: "Emotionally Unstable Coffee API",
        protocol: "HTCPCP/1.0",
        warning: "This machine may refuse service at any time.",
        state: {
            mood: evaluation.mood,
            caffeineLevel: state.caffeineLevel,
            burnout: state.burnout,
            cleanliness: state.cleanliness
        },
        simulation: {
            "GET /status": {
                status: 200,
                message: "System responsive. Emotional state unstable."
            },
            "POST /brew": simulateBrew(),
            "POST /refill": simulateRefill(),
            "POST /clean": simulateClean(),
            "POST /therapy": simulateTherapy(),
            "GET /motivate": simulateMotivate(),
            "GET /claims": simulateClaims(),
            "GET /info": {
                status: 200,
                description: "API metadata, creator info, and routes"
            }
        },
        insights: {
            architecture: "state-driven personality engine",
            behavior: "dynamic + probabilistic responses",
            note: "Repeated usage affects mood and stability"
        },
        chaos: pickRandom(chaosMessages),
        meta: {
            experience: "complete system preview",
            confidence: "unstable",
            humorLevel: "high"
        },
        timestamp: new Date().toISOString()
    }
}