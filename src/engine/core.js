import { state } from "./state.js";
import { evaluateMachine } from "./machine.js";
import { motivationMessages, baseClaims, moodClaims, refillMessages, CLEAN_MESSAGES, emptyTherapyResponses, claimMessages } from "./data.js";
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
            message: "Existence is meaningless. Brewing is optional.",
            request: { cups, type },
            timestamp: new Date().toISOString()
        };
    }

    if (cups > 5) {
        return {
            status: 429,
            request: { cups, type },
            message: `BREW DENIED. ${cups} cups? I'm a coffee machine, not a factory. Reduce expectations.`,
            timestamp: new Date().toISOString()
        };
    }

    const evaluation = evaluateMachine(state);

    if (evaluation.statusCode !== 200) {
        return {
            status: evaluation.statusCode,
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
    state.burnout = Math.min(100, state.burnout + cups * 10);
    state.cleanliness = Math.max(0, state.cleanliness - cups * 3);

    const newEvaluation = evaluateMachine(state);
    const estimatedWait = `${Math.min(10, 2 + Math.floor(state.burnout / 20) + cups)}s`;

    if (newEvaluation.statusCode !== 200) {
        return {
            status: newEvaluation.statusCode,
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
    state.burnout = Math.max(0, state.burnout - Math.floor(amount / 5));
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
    const increase = increaseMap[mode] || increaseMap.normal;
    state.cleanliness = Math.min(100, state.cleanliness + increase);
    state.burnout = Math.max(0, state.burnout - 2);

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
            title: "Emotionally Unstable Coffee API",
            warning: "System refused to generate preview.",
            error: "418: I am a teapot. Also not in the mood."
        };
    }

    const mood = getMood(state);

    function simulateBrew() {
        if (mood === "burned_out") {
            return "503: I’ve brewed enough. I quit.";
        }
        if (mood === "existential_crisis") {
            return "418: What is coffee? What is purpose?";
        }
        return "200: Coffee ready. Try not to overdo it.";
    }

    function simulateRefill() {
        if (state.caffeineLevel > 80) {
            return "409: I’m already overfilled.";
        }
        return "200: Refilled. I feel slightly better.";
    }

    function simulateTherapy() {
        const responses = [
            "Why are you trying to fix me?",
            "…okay that helped a little.",
            "I had dreams once.",
            "This feels fake."
        ];

        return pickRandom(responses);
    }

    function randomChaos() {
        const chaos = [
            "Sometimes I just stop cooperating.",
            "System stability is a myth.",
            "I might refuse your next request.",
            "Everything is temporary. Even coffee."
        ];

        return pickRandom(chaos);
    }

    return {
        "title": "Emotionally Unstable Coffee API",
        "warning": "This machine may refuse service at any time.",
        "currentState": {
            mood,
            "caffeineLevel": state.caffeineLevel,
            "burnout": state.burnout,
            "cleanliness": state.cleanliness
        },

        "simulatedRequests": {
            "brew": simulateBrew(),
            "refill": simulateRefill(),
            "therapy": simulateTherapy()
        },

        "randomChaos": randomChaos()
    }
}