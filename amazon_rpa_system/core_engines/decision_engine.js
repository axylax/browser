/**
 * Decision Engine
 * Выбирает поведенческий сценарий после результатов поиска.
 */
class DecisionEngine {
  constructor(rng, config) {
    this.rng = rng;
    this.config = config;
  }

  async runFlow(searchResult, behavior, browserAdapter) {
    if (searchResult.found) {
      await behavior.viewGallery();
      await behavior.readReviews();

      if (!this.config.safety.disableTransactionalActions) {
        await browserAdapter.addToCart();
        return { flow: 'target_found_flow', action: 'add_to_cart' };
      }

      return { flow: 'target_found_flow', action: 'engage_only' };
    }

    await behavior.randomExploration();
    return { flow: 'warmup_flow', action: 'no_purchase' };
  }
}

module.exports = { DecisionEngine };
