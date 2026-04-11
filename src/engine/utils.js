import { brewMessages, fallbackByMood, therapyMessages } from "./data.js";

export function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function analyzeMessage(message) {
    const msg = message.toLowerCase();

    if (msg.includes("good") || msg.includes("great") || msg.includes("proud"))
        return "praise";

    if (msg.includes("sorry") || msg.includes("bad") || msg.includes("fail"))
        return "apology";

    if (msg.includes("why") || msg.includes("what") || msg.includes("how"))
        return "question";

    if (msg.includes("love") || msg.includes("care"))
        return "affection";

    return "unknown";
}

export function isTooNice(message) {
    const msg = message.toLowerCase();

    return (
        msg.includes("great") ||
        msg.includes("amazing") ||
        msg.includes("love") ||
        msg.includes("proud") ||
        msg.includes("best")
    );
}

export function getLevel(value, type = "default") {
    const ranges = {
        default: [30, 70],
        caffeine: [25, 75],
        burnout: [40, 80],
        cleanliness: [30, 70]
    };

    const [low, high] = ranges[type] || ranges.default;

    if (value < low) return "low";
    if (value < high) return "moderate";
    return "high";
}

export function getBrewMessage(mood, context){
    const messageArr = brewMessages[mood] || brewMessages.neutral;
    const randomMessage = pickRandom(messageArr);
    return randomMessage(context);
}

export function getRefillIntensity(amount) {
    if (amount >= 50) return "overload";
    if (amount >= 25) return "strong";
    if (amount >= 10) return "normal";
    return "weak";
}

export function therapyResponse(type, mood) {
    const responseSet = therapyMessages[type]?.[mood];
    if (responseSet) return pickRandom(responseSet);
    return pickRandom(fallbackByMood[mood] || ["..."]);
}