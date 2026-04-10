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