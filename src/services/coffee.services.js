export function getMood(state) {
  if (state.burnout > 85) return "burned_out";
  if (state.caffeineLevel < 20) return "tired";
  if (state.cleanliness < 30) return "irritated";
  if (state.burnout > 60 && state.caffeineLevel < 40) return "angry";
  if (Math.random() < 0.1) return "existential_crisis";
  return "neutral";
}