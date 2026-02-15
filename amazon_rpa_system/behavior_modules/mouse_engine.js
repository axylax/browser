/**
 * Mouse Engine
 * Генерация человекоподобных траекторий (Bezier + jitter).
 */
class MouseEngine {
  constructor(rng) {
    this.rng = rng;
  }

  bezierPath(from, to, steps = 30) {
    const cp1 = { x: from.x + this.rng.int(-80, 80), y: from.y + this.rng.int(-80, 80) };
    const cp2 = { x: to.x + this.rng.int(-80, 80), y: to.y + this.rng.int(-80, 80) };
    const path = [];

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const x = Math.pow(1 - eased, 3) * from.x +
        3 * Math.pow(1 - eased, 2) * eased * cp1.x +
        3 * (1 - eased) * Math.pow(eased, 2) * cp2.x +
        Math.pow(eased, 3) * to.x;
      const y = Math.pow(1 - eased, 3) * from.y +
        3 * Math.pow(1 - eased, 2) * eased * cp1.y +
        3 * (1 - eased) * Math.pow(eased, 2) * cp2.y +
        Math.pow(eased, 3) * to.y;

      path.push({ x: x + this.rng.float(-1.2, 1.2), y: y + this.rng.float(-1.2, 1.2) });
    }

    return path;
  }
}

module.exports = { MouseEngine };
