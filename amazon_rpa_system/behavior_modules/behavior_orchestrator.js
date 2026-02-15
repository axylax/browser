const { MouseEngine } = require('./mouse_engine');
const { ScrollEngine } = require('./scroll_engine');
const { InteractionEngine } = require('./interaction_engine');

class BehaviorOrchestrator {
  constructor(rng, config, browserAdapter) {
    this.rng = rng;
    this.browser = browserAdapter;
    this.mouse = new MouseEngine(rng);
    this.scroll = new ScrollEngine(rng);
    this.interaction = new InteractionEngine(rng, config);
  }

  async readingPause() {
    await this.browser.wait(this.interaction.delayRange());
  }

  async scrollPattern() {
    const pattern = this.scroll.generatePattern();
    for (const seg of pattern) {
      await this.browser.scroll(seg.direction, seg.distance, seg.durationMs);
      await this.browser.wait(seg.pauseAfterMs);
    }
  }

  async viewGallery() {
    const clicks = this.rng.int(2, 6);
    for (let i = 0; i < clicks; i++) {
      await this.browser.galleryNext();
      await this.readingPause();
    }
  }

  async readReviews() {
    await this.browser.openReviews();
    await this.scrollPattern();
  }

  async randomExploration() {
    const actions = ['open_related', 'open_brand_store', 'back_to_results', 'open_filters'];
    const ordered = this.rng.shuffle(actions).slice(0, this.rng.int(1, actions.length));
    for (const action of ordered) {
      await this.browser.perform(action);
      await this.readingPause();
    }
  }
}

module.exports = { BehaviorOrchestrator };
