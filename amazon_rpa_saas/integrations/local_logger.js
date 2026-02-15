const fs = require('fs');
const path = require('path');

class LocalLogger {
  constructor(filePath) { this.filePath = filePath; }
  async write(event) {
    fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
    fs.appendFileSync(this.filePath, JSON.stringify({ ts: new Date().toISOString(), ...event }) + '\n');
  }
}

module.exports = { LocalLogger };
