class EntropyRng {
  constructor(seed = Date.now()) { this.state = seed >>> 0; }
  next() {
    let x = this.state;
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
    this.state = x >>> 0;
    return this.state / 0xffffffff;
  }
  int(min, max) { return Math.floor(this.next() * (max - min + 1)) + min; }
  float(min, max) { return this.next() * (max - min) + min; }
  weightedChoice(items) {
    const total = items.reduce((s, i) => s + i.weight, 0);
    let roll = this.float(0, total);
    for (const i of items) { roll -= i.weight; if (roll <= 0) return i.value; }
    return items[items.length - 1].value;
  }
  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = this.int(0, i); [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  gaussian(mean = 0, stdev = 1) {
    const u = 1 - this.next();
    const v = 1 - this.next();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * stdev + mean;
  }
}
module.exports = { EntropyRng };
