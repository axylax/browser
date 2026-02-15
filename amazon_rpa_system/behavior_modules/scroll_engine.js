/**
 * Scroll Engine
 * Случайные паттерны прокрутки с паузами чтения и ревёрсом.
 */
class ScrollEngine {
  constructor(rng) {
    this.rng = rng;
  }

  generatePattern() {
    const segments = this.rng.int(3, 7);
    const pattern = [];

    for (let i = 0; i < segments; i++) {
      const direction = this.rng.weightedChoice([
        { value: 'down', weight: 0.82 },
        { value: 'up', weight: 0.18 }
      ]);
      pattern.push({
        direction,
        distance: this.rng.int(120, 900),
        durationMs: this.rng.int(200, 1500),
        pauseAfterMs: this.rng.int(150, 1800)
      });
    }

    return pattern;
  }
}

module.exports = { ScrollEngine };
