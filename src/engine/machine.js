import { moodMessages } from "./data.js";
import { pickRandom } from "./utils.js";

export function evaluateMachine(state) {
    let mood;

    if (Math.random() < 0.08) {
        mood = "existential_crisis";
    }
    else if (state.burnout > 70) {
        mood = "burned_out";
    }
    else if (state.cleanliness < 25 && state.burnout > 50) {
        mood = "angry";
    }
    else if (state.caffeineLevel < 20 && state.burnout > 40) {
        mood = "tired";
    }
    else if (state.caffeineLevel > 85 && state.burnout < 40) {
        mood = "overcaffeinated";
    }
    else if (state.cleanliness < 30) {
        mood = "irritated";
    }
    else if (state.caffeineLevel < 25) {
        mood = "tired";
    }
    else {
        mood = "neutral";
    }

    let statusCode = 200;

    if (mood === "existential_crisis" || (state.burnout > 90 || state.caffeineLevel <= 0)) {
        statusCode = 418;
    } else if (mood === "burned_out" || state.burnout > 70) {
        statusCode = 503;
    } else if (mood === "angry" && state.cleanliness < 20) {
        statusCode = 503;
    }

    return {
        mood,
        statusCode,
        message: pickRandom(moodMessages[mood] || moodMessages.neutral)
    };
}