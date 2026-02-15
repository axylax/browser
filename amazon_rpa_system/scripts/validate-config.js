#!/usr/bin/env node
const fs = require('fs');

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/validate-config.js <config.json>');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(file, 'utf-8'));
const required = [
  'runtime',
  'entryWeights',
  'entryUrls',
  'search',
  'behavior',
  'safety',
  'paths',
  'logging',
  'integrations'
];

const missing = required.filter((k) => !(k in config));
if (missing.length) {
  console.error(`Missing keys: ${missing.join(', ')}`);
  process.exit(2);
}

console.log('Config validation passed.');
