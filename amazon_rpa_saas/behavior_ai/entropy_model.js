class EntropyModel {
  constructor(rng, config) {
    this.rng = rng;
    this.config = config;
  }

  nextDelayMs() {
    const { min, max } = this.config.behavior.delay_ms;
    const jitter = this.rng.gaussian(0, this.config.behavior.noise_sigma_ms);
    return Math.max(min, Math.min(max, Math.round(this.rng.float(min, max) + jitter)));
  }

  attentionShiftProbability() {
    return this.rng.float(this.config.behavior.attention_shift_min, this.config.behavior.attention_shift_max);
  }
}

module.exports = { EntropyModel };
