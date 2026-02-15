/**
 * Entry Strategy Engine
 * Взвешенный выбор точки входа в сессию.
 */
class EntryStrategyEngine {
  constructor(rng, config) {
    this.rng = rng;
    this.config = config;
  }

  pick(task) {
    const strategy = this.rng.weightedChoice([
      { value: 'google_organic', weight: this.config.entryWeights.google_organic },
      { value: 'direct_marketplace', weight: this.config.entryWeights.direct_marketplace }
    ]);

    const entryUrl = strategy === 'google_organic'
      ? this.rng.choice(this.config.entryUrls.google)
      : this.rng.choice(this.config.entryUrls.marketplace);

    return {
      strategy,
      entryUrl,
      query: this.rng.choice(task.keywords_target)
    };
  }
}

module.exports = { EntryStrategyEngine };
