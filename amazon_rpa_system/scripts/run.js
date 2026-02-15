#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const { SeededRandom } = require('../core_engines/randomization_engine');
const { DataInputEngine } = require('../core_engines/data_input_engine');
const { EntryStrategyEngine } = require('../core_engines/entry_strategy_engine');
const { SearchIntelligenceEngine } = require('../core_engines/search_intelligence_engine');
const { DecisionEngine } = require('../core_engines/decision_engine');
const { OutputEngine } = require('../core_engines/output_engine');
const { BrowserAdapter } = require('../integrations/browser_adapter');
const { BehaviorOrchestrator } = require('../behavior_modules/behavior_orchestrator');

function argValue(name, fallback = null) {
  const idx = process.argv.indexOf(name);
  return idx >= 0 ? process.argv[idx + 1] : fallback;
}

(async function main() {
  const configPath = path.resolve(argValue('--config', '../config/system.config.template.json'));
  const seedArg = argValue('--seed');
  const dryRun = process.argv.includes('--dry-run');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

  const seed = seedArg ? Number(seedArg) : config.runtime.seed;
  const rng = new SeededRandom(seed);
  const dataInput = new DataInputEngine(rng);
  const output = new OutputEngine(config);

  const tasks = dataInput.loadJson(path.resolve(path.dirname(configPath), config.paths.tasks.replace('./config/', '')));
  const profiles = dataInput.loadJson(path.resolve(path.dirname(configPath), config.paths.profiles.replace('./config/', '')));
  dataInput.validate(tasks, profiles);

  const assignedTasks = dataInput.assignSerial(tasks, profiles);
  const entryEngine = new EntryStrategyEngine(rng, config);
  const searchEngine = new SearchIntelligenceEngine(rng, config);
  const decisionEngine = new DecisionEngine(rng, config);

  for (const task of assignedTasks) {
    const browser = new BrowserAdapter(rng, dryRun || config.runtime.dryRun);
    const behavior = new BehaviorOrchestrator(rng, config, browser);

    const entry = entryEngine.pick(task);
    await browser.search(entry.query);

    const result = await searchEngine.execute(task, browser, behavior);
    const decision = await decisionEngine.runFlow(result, behavior, browser);

    await output.publish({
      profile_id: task.profile_id,
      task_id: task.task_id,
      asin: task.asin,
      entry_strategy: entry.strategy,
      status: decision.action,
      found: result.found,
      search_mode: result.mode
    });
  }

  console.log('Run complete.');
})();
