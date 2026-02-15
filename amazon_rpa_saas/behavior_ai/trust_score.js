class TrustScoreModel {
  constructor(rng) {
    this.rng = rng;
    this.score = 50;
  }

  apply({ entryMethod, actionsCount, durationSec, engagementDepth }) {
    const entryAdj = entryMethod === 'google_organic' ? 5 : 2;
    const durationAdj = Math.min(10, Math.floor(durationSec / 45));
    const engagementAdj = Math.min(12, engagementDepth * 2);
    const activityAdj = actionsCount > 3 ? 3 : -2;
    const noise = Math.round(this.rng.float(-4, 4));
    this.score = Math.max(0, Math.min(100, this.score + entryAdj + durationAdj + engagementAdj + activityAdj + noise));
    return this.score;
  }
}

module.exports = { TrustScoreModel };
