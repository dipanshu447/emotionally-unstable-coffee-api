export var state = {
    mood: "neutral",          // baseline personality
    caffeineLevel: 70,        // 0–100
    burnout: 20,              // 0–100
    cleanliness: 80,          // 0–100
    lastBrewAt: null,         // timestamp
    totalBrews: 0             // usage tracking
};

// high burnout (>80) → angry
// low caffeine (<20) → tired
// low cleanliness → irritated

// 20% chance of unexpected response
// 10% chance of “existential crisis”