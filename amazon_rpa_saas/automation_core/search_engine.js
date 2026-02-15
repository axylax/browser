class SearchIntelligenceEngine {
  constructor(rng, cfg) { this.rng = rng; this.cfg = cfg; }

  buildAdvancedQuery(task) {
    return `${task.keywords_target} ${task.product_name} ${task.brand}`.trim();
  }

  async locate(task, adapter) {
    for (let p = 1; p <= this.cfg.search_depth; p++) {
      const found = await adapter.scanAsin(task.asin, p);
      if (found) return { found: true, page: p, mode: 'primary' };
    }
    if (!this.cfg.advanced_search) return { found: false, page: null, mode: 'primary' };
    await adapter.search(this.buildAdvancedQuery(task));
    const found = await adapter.scanAsin(task.asin, 1);
    return { found, page: found ? 1 : null, mode: 'advanced' };
  }
}

module.exports = { SearchIntelligenceEngine };
