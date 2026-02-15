/**
 * Search Intelligence Engine
 * Реализует обычный и fallback-поиск.
 */
class SearchIntelligenceEngine {
  constructor(rng, config) {
    this.rng = rng;
    this.config = config;
  }

  async execute(task, browserAdapter, behavior) {
    const maxPages = this.rng.int(this.config.search.minPages, this.config.search.maxPages);

    for (let page = 1; page <= maxPages; page++) {
      await behavior.readingPause();
      const found = await browserAdapter.scanPageForAsin(task.asin, page);
      if (found) return { found: true, mode: 'primary', page };
      await behavior.scrollPattern();
    }

    const fallbackQuery = `${this.rng.choice(task.keywords_target)} ${task.product_name} ${task.brand}`;
    await browserAdapter.search(fallbackQuery);
    await behavior.readingPause();
    const fallbackFound = await browserAdapter.scanPageForAsin(task.asin, 1);

    return { found: fallbackFound, mode: 'fallback', page: fallbackFound ? 1 : null };
  }
}

module.exports = { SearchIntelligenceEngine };
