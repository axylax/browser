class ActionLibrary {
  constructor(rng, config) {
    this.rng = rng;
    this.config = config;
  }

  chooseAction() {
    return this.rng.weightedChoice(this.config.behavior.action_matrix);
  }

  actionPlan() {
    const all = [
      'scroll_dynamic','gallery_interaction','review_reading','reviewer_profile_open',
      'video_watch','random_navigation','wishlist_or_cart_decision','anchor_navigation'
    ];
    return this.rng.shuffle(all).slice(0, this.rng.int(3, all.length));
  }
}

module.exports = { ActionLibrary };
