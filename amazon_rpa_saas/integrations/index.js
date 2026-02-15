const { LocalLogger } = require('./local_logger');
const { GoogleSheetsIntegration } = require('./google_sheets');
const { TelegramIntegration } = require('./telegram');

class IntegrationFacade {
  constructor(config) {
    this.config = config;
    this.logger = new LocalLogger(config.logging.activity_log);
    this.sheets = new GoogleSheetsIntegration(config.google_sheets);
    this.telegram = new TelegramIntegration(config.telegram);
  }

  async log(event) {
    await this.logger.write(event);
  }

  async publishFound(event) {
    const foundOnly = this.config.on_found_only !== false;
    if (foundOnly && !event.found) return;

    await this.sheets.append(event);
    await this.telegram.send(`FOUND: task=${event.task_id} profile=${event.profile_id} asin=${event.asin} trust=${event.trust_score}`);
  }
}

module.exports = { IntegrationFacade };
