// Seeded random number generator (mulberry32)
function mulberry32(seed: number): () => number {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// Fisher-Yates shuffle with seeded RNG
export function seededShuffle<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  const rng = mulberry32(seed);

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

// Get daily seed
export function getDailySeed(): number {
  return Math.floor(Date.now() / (1000 * 60 * 60 * 24));
}
