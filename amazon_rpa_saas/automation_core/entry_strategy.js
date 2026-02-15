class EntryStrategyEngine {
  constructor(rng, cfg) { this.rng = rng; this.cfg = cfg; }
  choose() {
    return this.rng.weightedChoice([
      { value: 'google_organic', weight: this.cfg.entry_weights.google_organic },
      { value: 'direct_marketplace', weight: this.cfg.entry_weights.direct_marketplace }
    ]);
  }
}
module.exports = { EntryStrategyEngine };
