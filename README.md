# Emotionally Unstable Coffee Api

BEHAVIOR RULES (THIS IS THE MAGIC)

Define simple rules:

/brew → burnout +10
/refill → caffeine +30
/clean → cleanliness +40
high burnout (>80) → angry
low caffeine (<20) → tired
low cleanliness → irritated

Mental model (lock this in)
state/ → data
services/ → brain (logic like getMood)
controllers/ → decision layer
routes/ → HTTP wiring