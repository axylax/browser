#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { EntropyRng } = require('../randomization_engine/entropy_rng');
const { DistributionEngine } = require('../task_engine/distribution_engine');
const { BehavioralStateMachine } = require('../behavior_ai/state_machine');

const tasks = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/tasks.sample.json'), 'utf-8'));
const profiles = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/profiles.sample.json'), 'utf-8'));

const rng = new EntropyRng(7);
const dist = new DistributionEngine(rng);
const assigned = dist.assign(tasks, profiles);
if (!assigned.length) throw new Error('No assignments produced');

const sm = new BehavioralStateMachine(rng);
for (let i = 0; i < 5; i++) sm.step();
console.log('Smoke test OK', { assigned: assigned.length, state: sm.state });
