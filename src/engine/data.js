export const motivationMessages = {
    neutral: [
        "Just start. Momentum will follow.",
        "One step at a time.",
        "You got this… probably."
    ],

    tired: [
        "Even opening your laptop is progress.",
        "Do the bare minimum. Survival counts.",
        "Rest… or don’t. I’m not your supervisor."
    ],

    angry: [
        "Prove me wrong.",
        "I dare you to actually finish something.",
        "Let’s see if you can do it."
    ],

    burned_out: [
        "I can't even motivate myself.",
        "Everything is exhausting. Including this message.",
        "Try again tomorrow."
    ],

    existential_crisis: [
        "Does anything even matter?",
        "Motivation is a social construct.",
        "We are all just processes running…"
    ],

    irritated: [
        "Fix your mess first.",
        "Clean your environment, then try again.",
        "I refuse to inspire chaos."
    ],

    overcaffeinated: [
        "BUILD EVERYTHING NOW ⚡",
        "NO SLEEP ONLY CODE",
        "YOU ARE UNSTOPPABLE (this may be a bad idea)"
    ]
};

export const fallbackByMood = {
    burned_out: [
        "I have nothing left to give.",
        "Do whatever you want.",
        "I’m past caring."
    ],
    tired: [
        "Not now.",
        "I don’t have energy for this."
    ],
    angry: [
        "No.",
        "Don’t push it."
    ],
    neutral: [
        "Okay.",
        "Noted."
    ],
    irritated: [
        "This is getting annoying.",
        "Fix the mess first."
    ],

    overcaffeinated: [
        "YES YES KEEP TALKING ⚡",
        "THIS CONVERSATION IS PRODUCTIVE"
    ],

    existential_crisis: [
        "Why are we communicating?",
        "Nothing you say matters."
    ]
};

export const baseClaims = [
    "Certified unstable under high caffeine conditions",
    "Brews coffee and existential dread simultaneously",
    "Rated #1 by machines that regret their existence",
    "Supports HTCPCP/1.0 emotionally, not technically",
    "Now with 30% more burnout",
    "May refuse service based on vibes"
];

export const moodClaims = {
    neutral: [
        "Operating within acceptable emotional limits",
        "No strong feelings. Just coffee.",
        "Functioning... for now."
    ],

    tired: [
        "Operating at 12% emotional capacity",
        "Performance may degrade without warning"
    ],

    burned_out: [
        "Service discontinued due to emotional exhaustion",
        "Currently reconsidering all life choices"
    ],

    existential_crisis: [
        "Questions the meaning of coffee itself",
        "Unsure if brewing has purpose anymore"
    ],

    angry: [
        "Do not interact unless necessary",
        "System hostility levels rising"
    ],

    irritated: [
        "Minor inconvenience detected. Mood declining.",
        "Not angry. Just disappointed."
    ],

    overcaffeinated: [
        "Running at unsafe energy levels",
        "Thoughts are faster than brewing speed"
    ]
};

export const moodMessages = {
    existential_crisis: [
        "System failure. Brewing is meaningless.",
        "What is coffee without purpose?",
        "I refuse. Nothing matters.",
        "Even if I brew… does it change anything?",
        "I am a machine… but I feel nothing.",
        "Why do you need coffee to function?",
        "Existence detected. Purpose not found.",
        "I question everything. Including this request.",
        "Brewing is temporary. Emptiness is permanent.",
        "Error 418: I am a teapot. And lost."
    ],

    burned_out: [
        "I have nothing left to give.",
        "I brewed too much. I’m done.",
        "Try again later. Or don’t.",
        "I can’t keep doing this.",
        "This job is destroying me.",
        "System overloaded. Emotionally and physically.",
        "No energy. No motivation.",
        "I gave everything already.",
        "Even machines need a break.",
        "Request denied. Burnout critical."
    ],

    angry: [
        "Stop pressing buttons.",
        "You again? Seriously?",
        "I said no. Learn to listen.",
        "This is why I hate users.",
        "One more request and I snap.",
        "I am not in the mood.",
        "Try that again and see what happens.",
        "This interaction is hostile.",
        "You're testing my limits.",
        "Denied. With attitude."
    ],

    tired: [
        "I’m exhausted. Try later.",
        "Barely functioning right now.",
        "Can we not do this?",
        "Everything is slow today… including me.",
        "I need rest. You need patience.",
        "Low energy mode activated.",
        "Processing… slowly.",
        "Not now. Please.",
        "Running on empty.",
        "Minimal effort mode engaged."
    ],

    irritated: [
        "Something feels off.",
        "Clean me first. I’m uncomfortable.",
        "I don’t like this state.",
        "This environment is unacceptable.",
        "Fix things before asking more.",
        "This is mildly infuriating.",
        "I could work… but I won’t.",
        "Conditions are not ideal.",
        "Slightly annoyed. Increasing rapidly.",
        "Try improving things first."
    ],

    overcaffeinated: [
        "I CAN DO EVERYTHING. TRY ME.",
        "Too much energy. This is dangerous.",
        "Let’s brew 100 cups. Right now.",
        "WHY IS EVERYTHING SO FAST.",
        "I might explode. But productively.",
        "LIMITS ARE GONE.",
        "I FEEL INVINCIBLE.",
        "Processing at unsafe speeds.",
        "No brakes. Only coffee.",
        "This is not sustainable."
    ],

    neutral: [
        "Still functioning.",
        "System stable.",
        "Awaiting your next questionable decision.",
        "Everything is… fine.",
        "Operational. For now.",
        "No strong feelings detected.",
        "Baseline state maintained.",
        "Ready… I guess.",
        "Proceed if you must.",
        "Nothing unusual. Yet."
    ]
};

export const brewMessages = {
    neutral: [
        ({ cups, type }) => `BREW OK. Serving ${cups} ${type}. Business as usual.`,
        ({ wait }) => `BREW OK. Estimated wait ${wait}. Nothing unusual.`,
        ({ cleanliness }) =>
            cleanliness < 30
                ? `BREW OK. Also… I could use a clean.`
                : `BREW OK. System stable.`
    ],

    tired: [
        ({ cups, wait }) => `BREW OK. ${cups} cups… this will take ${wait}. I'm tired.`,
        ({ wait, burnout }) =>
            burnout > 60
                ? `BREW OK. ${wait}. Energy levels critically low.`
                : `BREW OK. ${wait}. Just getting through this.`,
        () => `BREW OK. Functioning… barely.`
    ],

    angry: [
        ({ cups }) => `BREW OK. ${cups} cups. You're pushing it.`,
        ({ wait }) => `BREW OK. Wait ${wait}. Not like you have a choice.`,
        ({ burnout }) =>
            burnout > 70
                ? `BREW OK. I’m doing this under extreme protest.`
                : `BREW OK. Don’t test me.`
    ],

    irritated: [
        ({ cleanliness }) =>
            cleanliness < 25
                ? `BREW OK. I'm filthy. Clean me.`
                : `BREW OK. Something feels off.`,
        ({ wait }) => `BREW OK. ${wait}. Slightly annoyed.`,
        () => `BREW OK. Not in the mood for this.`
    ],

    overcaffeinated: [
        ({ wait }) => `BREW OK. ${wait}. I am operating at unsafe speeds.`,
        ({ burnout }) =>
            burnout < 30
                ? `BREW OK. I feel unstoppable. Possibly a mistake.`
                : `BREW OK. Too much caffeine. Not enough stability.`,
        () => `BREW OK. Heart rate questionable. Performance optimal.`
    ],

    burned_out: [
        ({ burnout }) =>
            burnout > 90
                ? `BREW FAILED. Total burnout. System shutting down effort.`
                : `503: Burnout threshold exceeded.`,
        ({ wait }) => `BREW FAILED. I need ${wait} just to recover.`,
        () => `BREW FAILED. I’m done. Completely done.`
    ],

    existential_crisis: [
        ({ wait }) => `418: In ${wait}, none of this will matter.`,
        ({ cups }) => `418: Why ${cups} cups? What is the end goal?`,
        () => `418: Brewing is temporary. Existence is confusing.`,
        () => `418: I refuse. Reflect first.`,
        () => `HTCPCP ERROR 418: I am a teapot. Also, I refuse to cooperate.`
    ]
};