#!/usr/bin/env node
const fs = require('fs');
const cfg = JSON.parse(fs.readFileSync(process.argv[2], 'utf-8'));
const keys = ['runtime','entry_weights','search_depth','advanced_search','random_key_count','random_prod_num','random_prod_max_price','random_prod_ratio','random_prod_favcart','behavior','integrations'];
const miss = keys.filter((k) => !(k in cfg));
if (miss.length) {
  console.error(`Missing keys: ${miss.join(', ')}`);
  process.exit(2);
}
console.log('Config OK');
