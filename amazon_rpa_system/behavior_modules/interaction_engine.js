/**
 * Interaction Engine
 * Вероятностный выбор действия и задержек.
 */
class InteractionEngine {
  constructor(rng, config) {
    this.rng = rng;
    this.config = config;
  }

  pickAction() {
    return this.rng.weightedChoice(this.config.behavior.actionMatrix);
  }

  delayRange() {
    return this.rng.int(this.config.behavior.delayMs.min, this.config.behavior.delayMs.max);
  }
}

module.exports = { InteractionEngine };
