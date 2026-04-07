import { getMood } from "../services/coffee.services.js";
import { state } from "../services/state.services.js";

export function getStatus(req, res) {
    const mood = getMood(state);
    const isDead = state.burnout >= 100;

    res.json({
        status: isDead ? "dead" : "alive",
        mood,
        ...state
    });
}