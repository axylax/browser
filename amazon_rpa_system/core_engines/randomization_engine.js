/**
 * Randomization Engine
 * Единый детерминированный RNG и утилиты вероятностей.
 */
class SeededRandom {
  constructor(seed = Date.now()) {
    this.state = seed >>> 0;
  }

  next() {
    // Xorshift32: быстрый и воспроизводимый генератор.
    let x = this.state;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    this.state = x >>> 0;
    return this.state / 0xffffffff;
  }

  int(min, max) {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  float(min, max) {
    return this.next() * (max - min) + min;
  }

  choice(items) {
    return items[this.int(0, items.length - 1)];
  }

  weightedChoice(weightedItems) {
    const total = weightedItems.reduce((s, i) => s + i.weight, 0);
    const roll = this.float(0, total);
    let acc = 0;
    for (const item of weightedItems) {
      acc += item.weight;
      if (roll <= acc) return item.value;
    }
    return weightedItems[weightedItems.length - 1].value;
  }

  shuffle(list) {
    const arr = [...list];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = this.int(0, i);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}

module.exports = { SeededRandom };
