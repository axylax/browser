const STATES = ['Exploration', 'Consideration', 'Comparison', 'Engagement', 'PurchaseIntent', 'Disinterest'];

class BehavioralStateMachine {
  constructor(rng) {
    this.rng = rng;
    this.state = 'Exploration';
    this.transitionMatrix = {
      Exploration: [{ value: 'Consideration', weight: 0.45 }, { value: 'Comparison', weight: 0.25 }, { value: 'Disinterest', weight: 0.30 }],
      Consideration: [{ value: 'Comparison', weight: 0.35 }, { value: 'Engagement', weight: 0.45 }, { value: 'Disinterest', weight: 0.20 }],
      Comparison: [{ value: 'Engagement', weight: 0.40 }, { value: 'Consideration', weight: 0.35 }, { value: 'Disinterest', weight: 0.25 }],
      Engagement: [{ value: 'PurchaseIntent', weight: 0.30 }, { value: 'Comparison', weight: 0.35 }, { value: 'Disinterest', weight: 0.35 }],
      PurchaseIntent: [{ value: 'Engagement', weight: 0.50 }, { value: 'Disinterest', weight: 0.50 }],
      Disinterest: [{ value: 'Exploration', weight: 0.70 }, { value: 'Disinterest', weight: 0.30 }]
    };
  }

  step() {
    this.state = this.rng.weightedChoice(this.transitionMatrix[this.state]);
    return this.state;
  }
}

module.exports = { BehavioralStateMachine, STATES };
