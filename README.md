# Emotionally Unstable Coffee Api

BEHAVIOR RULES (THIS IS THE MAGIC)

Define simple rules:

/brew → burnout +10
/refill → caffeine +30
/clean → cleanliness +40
high burnout (>80) → angry
low caffeine (<20) → tired
low cleanliness → irritated

src/
  app.js
  engine.js   ← ALL logic here
  routes.js   ← ALL endpoints here
server.js