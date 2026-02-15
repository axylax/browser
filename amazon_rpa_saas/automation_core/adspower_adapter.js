class AdsPowerAdapter {
  constructor(rng) { this.rng = rng; }
  async search(_query) { return true; }
  async scanAsin(_asin, _page) { return this.rng.float(0, 1) < 0.35; }
  async perform(_action, delayMs) { return new Promise((r) => setTimeout(r, Math.min(delayMs, 5))); }
}

module.exports = { AdsPowerAdapter };
