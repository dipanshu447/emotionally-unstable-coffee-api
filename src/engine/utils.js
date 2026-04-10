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