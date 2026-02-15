const fs = require('fs');
const path = require('path');
const { GoogleSheetsIntegration } = require('../integrations/google_sheets');
const { TelegramIntegration } = require('../integrations/telegram');

class OutputEngine {
  constructor(config) {
    this.config = config;
    this.sheets = new GoogleSheetsIntegration(config.integrations.googleSheets);
    this.telegram = new TelegramIntegration(config.integrations.telegram);
    this.logFile = path.resolve(config.logging.activityLog);
  }

  async publish(event) {
    const line = JSON.stringify({ ts: new Date().toISOString(), ...event });
    fs.mkdirSync(path.dirname(this.logFile), { recursive: true });
    fs.appendFileSync(this.logFile, line + '\n');

    if (this.config.integrations.googleSheets.enabled) {
      await this.sheets.appendRow(event);
    }

    if (this.config.integrations.telegram.enabled) {
      await this.telegram.send(`Profile ${event.profile_id}: ${event.status}`);
    }
  }
}

module.exports = { OutputEngine };
