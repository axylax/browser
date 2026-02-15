/**
 * Browser Adapter
 * Заглушка-адаптер для AdsPower RPA Plus actions.
 * Здесь должны быть реальные вызовы узлов RPA/SDK AdsPower.
 */
class BrowserAdapter {
  constructor(rng, dryRun = false) {
    this.rng = rng;
    this.dryRun = dryRun;
  }

  async search(query) { return this._log(`search: ${query}`); }
  async scanPageForAsin(asin, page) {
    await this._log(`scan page ${page} for ${asin}`);
    return this.rng.float(0, 1) < 0.3;
  }
  async scroll(direction, distance, durationMs) {
    return this._log(`scroll ${direction} ${distance}px ${durationMs}ms`);
  }
  async wait(ms) { return this._log(`wait ${ms}ms`); }
  async galleryNext() { return this._log('gallery next'); }
  async openReviews() { return this._log('open reviews'); }
  async addToCart() { return this._log('add to cart'); }
  async perform(action) { return this._log(`action: ${action}`); }

  async _log(msg) {
    if (!this.dryRun) return;
    // В dry-run режиме не дергаем браузер, только эмулируем шаги.
    return Promise.resolve(msg);
  }
}

module.exports = { BrowserAdapter };
