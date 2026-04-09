export var state = {
    mood: "neutral",          // baseline personality
    caffeineLevel: 70,        // 0–100
    burnout: 20,              // 0–100
    cleanliness: 80,          // 0–100
    totalBrews: 0             // usage tracking
};

// high burnout (>80) → angry
// low caffeine (<20) → tired
// low cleanliness → irritated

// 20% chance of unexpected response
// 10% chance of “existential crisis”

export function getStatus() {
    const mood = getMood(state);
    const status = decideStatus(state, mood);
    return {
        "protocol": "HTCPCP/1.0",
        "status": status.statusCode,
        "state": {
            "mood": status.mood,
            "caffeineLevel": state.caffeineLevel,
            "burnout": state.burnout,
            "cleanliness": state.cleanliness
        },
        "message": status.message
    }
}

export function brewCoffee(userInput) {
    const mood = getMood(state);
    const status = decideStatus(state, mood);
    if (status.statusCode !== 200) {
        return {
            protocol: "HTCPCP/1.0",
            status: status.statusCode,
            state: {
                mood,
                caffeineLevel: state.caffeineLevel,
                burnout: state.burnout,
                cleanliness: state.cleanliness
            },
            message: `BREW FAILED. ${status.message}`
        };
    }
    state.totalBrews += userInput.cups;
    state.caffeineLevel -= userInput.cups * 5;
    state.caffeineLevel = Math.max(0, state.caffeineLevel);
    state.burnout += userInput.cups * 10;
    state.burnout = Math.min(100, state.burnout);

    const newmood = getMood(state);
    const newstatus = decideStatus(state, newmood);
    let message = newstatus.message;

    if (newstatus.statusCode === 200) {
        message = `BREW OK. Serving ${userInput.cups} ${userInput.type}. ${newstatus.message}`;
    } else if (newstatus.statusCode === 503) {
        message = `BREW FAILED. ${newstatus.message}`;
    } else if (newstatus.statusCode === 418) {
        message = `HTCPCP ERROR 418: I am a teapot. ${newstatus.message}`;
    }
    return {
        "protocol": "HTCPCP/1.0",
        "status": newstatus.statusCode,
        "state": {
            mood: newmood,
            caffeineLevel: state.caffeineLevel,
            burnout: state.burnout,
            cleanliness: state.cleanliness
        },
        message
    };
}

export function refillMachine(userInput) {
    state.caffeineLevel += userInput.amount;
    state.caffeineLevel = Math.min(100, state.caffeineLevel);

    const mood = getMood(state);
    const status = decideStatus(state, mood);
    let message = "Refill acknowledged.";

    if (state.caffeineLevel > 80) {
        message = "Energy restored. I feel... unstable.";
    } else if (state.caffeineLevel > 50) {
        message = "Refill accepted. Functionality improving.";
    } else {
        message = "That barely helped.";
    }

    return {
        "protocol": "HTCPCP/1.0",
        "status": status.statusCode,
        mood,
        message
    }
}

export function cleanMachine() {

}

export function motivateUser() {

}

export function therapySession() {

}

export function getClaims() {

}

export function getMood(state) {
    if (Math.random() < 0.1) return "existential_crisis";
    if (state.burnout > 85) return "burned_out";
    if (state.burnout > 60 && state.caffeineLevel < 40) return "angry";
    if (state.caffeineLevel < 20) return "tired";
    if (state.cleanliness < 30) return "irritated";
    if (state.caffeineLevel > 85 && state.burnout < 40) return "overcaffeinated";
    return "neutral";
}

export function decideStatus(state, mood) {
    if (mood === "existential_crisis") {
        return {
            statusCode: 418,
            mood,
            message: "System failure. Brewing is meaningless."
        };
    } else if (state.burnout > 90 || state.caffeineLevel <= 0) {
        return {
            statusCode: 418,
            mood,
            message: "I have nothing left to give."
        };
    } else if (state.burnout > 70 || state.cleanliness < 20) {
        return {
            statusCode: 503,
            mood,
            message: "I’m exhausted. Try later."
        };
    } else if (state.burnout < 30 && state.caffeineLevel > 60 && state.cleanliness > 70) {
        return {
            statusCode: 200,
            mood,
            message: "Operating at peak performance. Suspicious."
        };
    } else {
        return {
            statusCode: 200,
            mood,
            message: "Still functioning."
        };
    }
}

// 1. Is request valid?
//    → NO → 400

// 2. Is system capable?
//    → NO → 503

// 3. Is there a conflict?
//    → YES → 409

// 4. Does mood refuse?
//    → angry → 403
//    → tired → 202

// 5. Is there chaos override?
//    → existential → 418

// 6. Otherwise
//    → 200