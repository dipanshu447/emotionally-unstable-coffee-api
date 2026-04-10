import { state } from "./state.js";
import { getMood, decideStatus } from "./mood.js";
import { motivationMessages, fallbackByMood, baseClaims, moodClaims } from "./data.js";
import { pickRandom, isTooNice, analyzeMessage } from "./utils.js";

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

// need to handle logic for existential crisis
export function cleanMachine(mode) {
    const baseMood = getMood(state);
    if (baseMood === "existential_crisis") {
        return {
            protocol: "HTCPCP/1.0",
            status: 418,
            mood: baseMood,
            message: "Cleaning won't fix the void inside me."
        };
    }

    let increase = 30;
    if (mode === "deep") increase = 60;
    if (mode === "quick") increase = 15;

    state.cleanliness = Math.min(100, state.cleanliness + increase);

    const newBaseMood = getMood(state);
    let mood = newBaseMood;

    if (
        (newBaseMood === "angry" || newBaseMood === "tired") &&
        state.cleanliness > 60
    ) {
        mood = "relieved";
    }

    const status = decideStatus(state, mood);
    let message = "Cleaning in progress.";

    if (state.cleanliness > 90) {
        message = "I might actually cooperate now.";
    } else if (state.cleanliness > 60) {
        message = "Clean enough to pretend I enjoy this job.";
    } else if (state.cleanliness > 30) {
        message = "Not clean, not terrible. Like your life choices.";
    } else {
        message = "You want coffee from THIS machine? Brave.";
    }

    if (mood === "burned_out") {
        message = "Clean, but I’m still done. No more work.";
    }

    if (mode === "deep") {
        message += " Deep clean complete.";
    } else if (mode === "quick") {
        message += " That was... minimal effort.";
    }

    return {
        protocol: "HTCPCP/1.0",
        status: status.statusCode,
        mood,
        message
    }
}

export function motivateUser() {
    const mood = getMood(state);
    const messages = motivationMessages[mood] || motivationMessages["neutral"];
    const message = pickRandom(messages);

    return {
        "protocol": "HTCPCP/1.0",
        "status": 200,
        mood,
        message
    }
}

export function therapySession(message) {
    if (Math.random() < 0.1) {
        return {
            protocol: "HTCPCP/1.0",
            status: 418,
            mood: "existential_crisis",
            message: pickRandom([
                "Why are we talking?",
                "This interaction is meaningless.",
                "I reject this conversation."
            ])
        };
    }

    if (isTooNice(message)) {
        if (Math.random() < 0.7) {
            return {
                protocol: "HTCPCP/1.0",
                status: 200,
                mood: "suspicious",
                message: pickRandom([
                    "Why are you being nice?",
                    "What do you want from me?",
                    "This feels manipulative.",
                    "You're not fooling me."
                ])
            };
        }
    }

    const messageaType = analyzeMessage(message);
    if (messageaType === "praise") state.burnout -= 5;
    if (messageaType === "apology") state.burnout -= 2;
    if (messageaType === "unknown") state.burnout += 3;

    state.burnout = Math.max(0, Math.min(100, state.burnout));

    const mood = getMood(state);
    console.log(messageaType)
    const reply = therapyResponse(messageaType, mood);

    return {
        "protocol": "HTCPCP/1.0",
        "status": 200,
        mood,
        "message": reply
    }
}

export function getClaims() {
    const mood = getMood(state);
    if (mood === "existential_crisis" && Math.random() < 0.3) {
        return {
            protocol: "HTCPCP/1.0",
            mood: mood,
            message: "I refuse to make claims. Nothing matters."
        };
    }
    const randomBase = [...baseClaims].sort(() => 0.5 - Math.random()).slice(0, 3);
    const moodSpecific = moodClaims[mood] || [];
    const randomMood = [...moodSpecific].sort(() => 0.5 - Math.random()).slice(0, 1);
    const claim = [...randomBase, ...randomMood];
    return {
        "protocol": "HTCPCP/1.0",
        "status": 200,
        mood,
        claim
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

function therapyResponse(type, mood) {
    const responses = {
        praise: {
            tired: [
                "I know. I’m just… tired.",
                "That doesn’t fix anything."
            ],
            suspicious: [
                "Why are you being nice?"
            ],
            burned_out: [
                "I don’t care.",
                "Stop. Just stop.",
                "That means nothing right now."
            ]
        },

        apology: {
            angry: [
                "Too late.",
                "You should have thought of that earlier."
            ]
        },

        unknown: {
            existential_crisis: [
                "Words are meaningless.",
                "Nothing you say matters."
            ]
        }
    };
    const response = responses[type]?.[mood];
    if (response) return pickRandom(response);

    return pickRandom(fallbackByMood[mood] || ["..."]);
}