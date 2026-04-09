export var state = {
    mood: "neutral",          // baseline personality
    caffeineLevel: 70,        // 0–100
    burnout: 20,              // 0–100
    cleanliness: 80,          // 0–100
    totalBrews: 0             // usage tracking
};

// high burnout (>80) → angry
// low caffeine (<20) → tired
// low cleanliness → irritated

// 20% chance of unexpected response
// 10% chance of “existential crisis”

export function getStatus(req, res) {
    const mood = getMood(state);
    const isDead = state.burnout >= 100;
    decideStatus(req);
    res.json({
        status: isDead ? "dead" : "alive",
        mood,
        ...state
    });
}

export function brewCoffee(req, res) {


    res.json({ 
        message: "coffeee brewinggg"
     });
}

export function refillMachine(req, res) {
    res.json({ message: "machine is getting refilled" });
}

export function cleanMachine(req, res) {
    res.json({ message: "machine is getting cleaned" });
}

export function motivateUser(req, res) {
    res.json({ message: "not in the mood to motivate" });
}

export function therapySession(req, res) {
    res.json({ message: "im fine nw" });
}

export function getClaims(req, res) {
    res.json({ message: "coffeee is so good" });
}

export function getMood(state) {
  if (Math.random() < 0.1) return "existential_crisis";
  if (state.burnout > 85) return "burned_out";
  if (state.burnout > 60 && state.caffeineLevel < 40) return "angry";
  if (state.caffeineLevel < 20) return "tired";
  if (state.cleanliness < 30) return "irritated";
  if (state.caffeineLevel > 85 && state.burnout < 40) return "overcaffeinated";
  return "neutral";
}

export function decideStatus(req) {
  const { path, method } = req;
  checkRouteandMethod(path, method);
}

function checkRouteandMethod(path, method) {
  const ROUTES = {
    "/status": ["GET"],
    "/brew": ["POST"],
    "/refill": ["POST"],
    "/clean": ["POST"],
    "/motivate": ["GET"],
    "/therapy": ["POST"],
    "/claims": ["GET"],
    "/preview": ["GET"]
  };
  const allowedMethod = ROUTES[path];

  if(!allowedMethod){
    return {
      
    }
  }
}

// 1. Is request valid?
//    → NO → 400

// 2. Is system capable?
//    → NO → 503

// 3. Is there a conflict?
//    → YES → 409

// 4. Does mood refuse?
//    → angry → 403
//    → tired → 202

// 5. Is there chaos override?
//    → existential → 418

// 6. Otherwise
//    → 200