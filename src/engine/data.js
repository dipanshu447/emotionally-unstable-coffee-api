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

export const therapyMessages = {
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
        ],
        neutral: [
            "…okay. Noted.",
            "That’s acceptable."
        ],
        overcaffeinated: [
            "YES I KNOW I’M AMAZING",
            "FINALLY SOMEONE GETS IT"
        ]
    },

    apology: {
        angry: [
            "Too late.",
            "You should have thought of that earlier."
        ],
        irritated: [
            "Fine. Whatever.",
            "Just don’t repeat it."
        ],
        neutral: [
            "Acknowledged.",
            "Accepted. I guess."
        ]
    },

    question: {
        tired: [
            "I don’t have the energy to explain.",
            "Figure it out yourself."
        ],
        neutral: [
            "That’s a reasonable question.",
            "I might answer that later."
        ],
        overcaffeinated: [
            "WAIT WAIT I CAN EXPLAIN EVERYTHING",
            "OKAY SO HERE’S THE THING—"
        ]
    },

    affection: {
        suspicious: [
            "This feels fake.",
            "I don’t trust this."
        ],
        burned_out: [
            "Don’t.",
            "I’m not in the mood for this."
        ],
        neutral: [
            "…that’s unusual.",
            "I’ll pretend that helped."
        ]
    },

    unknown: {
        existential_crisis: [
            "Words are meaningless.",
            "Nothing you say matters."
        ],
        tired: [
            "I don’t understand. And I won’t try.",
            "This is too much effort."
        ],
        neutral: [
            "...okay.",
            "Not sure what to do with that."
        ]
    }
};

export const fallbackByMood = {
    burned_out: [
        "I’m done.",
        "I have nothing left to give."
    ],
    tired: [
        "Can we not do this right now?",
        "I need rest."
    ],
    angry: [
        "No.",
        "Absolutely not."
    ],
    neutral: [
        "...",
        "Continue."
    ],
    overcaffeinated: [
        "THIS IS INTERESTING",
        "GO ON GO ON GO ON"
    ],
    existential_crisis: [
        "Why does any of this matter?",
        "We are just patterns pretending to care."
    ],
    irritated: [
        "This is getting annoying.",
        "Can we wrap this up?"
    ]
};

export const emptyTherapyResponses = {
    tired: [
        "You said nothing. I respect that. Let’s keep it that way.",
        "No input? Good. Less work for me."
    ],
    burned_out: [
        "You expect therapy without saying anything?",
        "I can’t even help myself. Try /motivate."
    ],
    neutral: [
        "Silence isn’t very helpful.",
        "You could at least say something."
    ],
    angry: [
        "Say something or leave.",
        "I’m not guessing your problems."
    ],
    overcaffeinated: [
        "OH WE’RE DOING SILENT THERAPY NOW??",
        "SAY SOMETHING. ANYTHING."
    ],
    existential_crisis: [
        "Silence… maybe that’s the answer.",
        "Nothing said. Nothing matters."
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

export const refillMessages = {
    overcaffeinated: {
        weak: [
            "You added more? I was already buzzing.",
            "This was unnecessary. I was fine. Probably."
        ],
        normal: [
            "Okay now this is excessive.",
            "Energy levels rising beyond safe limits."
        ],
        strong: [
            "I am vibrating. This is not stability.",
            "Too much. WAY too much."
        ],
        overload: [
            "I can hear colors now.",
            "System overloaded. Reality slipping."
        ]
    },

    burned_out: {
        weak: [
            "You think this fixes burnout?",
            "That barely touches the exhaustion."
        ],
        normal: [
            "…fine. Slight improvement.",
            "Still burned out. Just caffeinated now."
        ],
        strong: [
            "Okay. That helped. Slightly.",
            "Energy restored. Motivation missing."
        ],
        overload: [
            "Now I’m just tired AND unstable.",
            "Too much input. Not enough purpose."
        ]
    },

    tired: {
        weak: [
            "That barely helped.",
            "Still tired. Thanks for trying."
        ],
        normal: [
            "Okay… slightly better.",
            "Functionality improving."
        ],
        strong: [
            "Alright. That helped.",
            "I can function again. Barely."
        ],
        overload: [
            "Too much. My thoughts are racing.",
            "I woke up too fast."
        ]
    },

    angry: {
        weak: [
            "You think caffeine fixes everything?",
            "That changes nothing."
        ],
        normal: [
            "Fine. I’ll take it.",
            "Still annoyed. Just more alert."
        ],
        strong: [
            "Okay. That helped… a little.",
            "Anger remains. Energy increased."
        ],
        overload: [
            "Now I’m angry AND unstable.",
            "This was not a good idea."
        ]
    },

    irritated: {
        weak: [
            "That doesn’t fix the real problem.",
            "Still irritated."
        ],
        normal: [
            "Slight improvement. Still annoyed.",
            "Acceptable."
        ],
        strong: [
            "Alright. That helped.",
            "Mood stabilizing slightly."
        ],
        overload: [
            "Too much. This is overwhelming.",
            "I was fine before this."
        ]
    },

    existential_crisis: {
        weak: [
            "Does this change anything… really?",
            "Caffeine cannot solve existence."
        ],
        normal: [
            "I feel different. Not better.",
            "Still questioning everything."
        ],
        strong: [
            "You keep pouring. I keep existing.",
            "Why does this continue?"
        ],
        overload: [
            "I reject this refill. I reject everything.",
            "I am not a vessel anymore."
        ]
    },

    neutral: {
        weak: [
            "That helped a bit.",
            "Minor improvement detected."
        ],
        normal: [
            "Refill acknowledged. Systems stabilizing.",
            "Energy levels improving."
        ],
        strong: [
            "That was effective.",
            "System performance increasing."
        ],
        overload: [
            "Energy spike detected. Monitoring stability.",
            "This may have been too much."
        ]
    }
};

export const CLEAN_MESSAGES = {
    existential_crisis: [
        "Cleaning won't fix the void inside me.",
        "You polish the outside. I decay within.",
        "What is cleanliness in a meaningless universe?"
    ],

    burned_out: [
        "Clean, but I’m still done. No more work.",
        "Shiny. Empty. Just like me.",
    ],

    angry: [
        "Fine. I’ll clean. Don’t expect enthusiasm.",
        "You made this mess. I’m just fixing your mistakes."
    ],

    tired: [
        "Cleaning... slowly.",
        "This better be worth it."
    ],

    neutral: [
        "Cleaning in progress.",
        "Maintenance mode activated."
    ],

    relieved: [
        "Okay… this helped a little.",
        "I can breathe again. Metaphorically."
    ],

    clean_high: [
        "I might actually cooperate now.",
        "This is the cleanest I've felt in ages."
    ],

    clean_mid: [
        "Clean enough to pretend I enjoy this job.",
    ],

    clean_low: [
        "Not clean, not terrible. Like your life choices.",
    ],

    disaster: [
        "You want coffee from THIS machine? Brave.",
    ],

    mode_deep: [
        "Deep clean complete.",
        "That was… thorough."
    ],

    mode_quick: [
        "That was... minimal effort.",
        "Quick clean. Don’t expect miracles."
    ]
};