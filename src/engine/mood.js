import { moodMessages } from "./data.js";
import { pickRandom } from "./utils.js";

export function getMood(state) {
    if (Math.random() < 0.08) return "existential_crisis";
    if (state.burnout > 85) return "burned_out";
    if (state.cleanliness < 25 && state.burnout > 50) return "angry";
    if (state.caffeineLevel < 20 && state.burnout > 40) return "tired";
    if (state.cleanliness < 30) return "irritated";
    if (state.caffeineLevel < 25) return "tired";
    if (state.caffeineLevel > 85 && state.burnout < 40) {
        return "overcaffeinated";
    }
    return "neutral";
}

export function decideStatus(state, mood) {
    let statusCode = 200;

    if (mood === "existential_crisis" || (state.burnout > 90 || state.caffeineLevel <= 0)) {
        statusCode = 418;
    } else if (state.cleanliness < 20 && mood === "angry") {
        return {
            statusCode: 503,
            mood,
            message: pickRandom([
                "I’m dirty AND angry. Fix that.",
                "Clean me first. Then we talk.",
                "This is unacceptable. I refuse."
            ])
        };
    } else if (state.burnout > 70 || state.cleanliness < 20) {
        statusCode = 503;
    } else if (state.burnout < 30 && state.caffeineLevel > 60 && state.cleanliness > 70) {
        statusCode = 200;
    }

    return {
        statusCode,
        mood,
        message: pickRandom(moodMessages[mood] || moodMessages.neutral)
    };
}