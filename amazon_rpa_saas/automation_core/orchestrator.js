const { EntryStrategyEngine } = require('./entry_strategy');
const { SearchIntelligenceEngine } = require('./search_engine');
const { BehavioralStateMachine } = require('../behavior_ai/state_machine');
const { TrustScoreModel } = require('../behavior_ai/trust_score');
const { EntropyModel } = require('../behavior_ai/entropy_model');
const { ActionLibrary } = require('../behavior_ai/action_library');

class Orchestrator {
  constructor({ rng, config, integrations, realtimeHub }) {
    this.rng = rng;
    this.config = config;
    this.integrations = integrations;
    this.realtimeHub = realtimeHub;
    this.paused = false;
    this.stopped = false;
  }

  pause() { this.paused = true; }
  resume() { this.paused = false; }
  stop() { this.stopped = true; }

  async run(tasks, adapterFactory) {
    const entry = new EntryStrategyEngine(this.rng, this.config);
    const search = new SearchIntelligenceEngine(this.rng, this.config);

    for (const task of tasks) {
      if (this.stopped) break;
      while (this.paused) await new Promise((r) => setTimeout(r, 100));

      const adapter = adapterFactory(task.profile_id);
      const sm = new BehavioralStateMachine(this.rng);
      const trust = new TrustScoreModel(this.rng);
      const entropy = new EntropyModel(this.rng, this.config);
      const actions = new ActionLibrary(this.rng, this.config);

      const entryMethod = entry.choose();
      const searchResult = await search.locate(task, adapter);
      const plan = actions.actionPlan();

      for (const action of plan) {
        await adapter.perform(action, entropy.nextDelayMs());
        this.realtimeHub.emit({ type: 'action', profile_id: task.profile_id, action, state: sm.step() });
      }

      const trustScore = trust.apply({
        entryMethod,
        actionsCount: plan.length,
        durationSec: this.rng.int(45, 320),
        engagementDepth: this.rng.int(1, 6)
      });

      const result = {
        tenant_id: task.tenant_id,
        profile_id: task.profile_id,
        task_id: task.task_id,
        asin: task.asin,
        found: searchResult.found,
        search_mode: searchResult.mode,
        trust_score: trustScore
      };

      this.realtimeHub.emit({ type: 'session_result', ...result });
      await this.integrations.log(result);
      await this.integrations.publishFound(result);
    }
  }
}

module.exports = { Orchestrator };
