const { LocalLogger } = require('./local_logger');
const { GoogleSheetsIntegration } = require('./google_sheets');
const { TelegramIntegration } = require('./telegram');

class IntegrationFacade {
  constructor(config) {
    this.logger = new LocalLogger(config.logging.activity_log);
    this.sheets = new GoogleSheetsIntegration(config.google_sheets);
    this.telegram = new TelegramIntegration(config.telegram);
  }

  async log(event) {
    await this.logger.write(event);
    await this.sheets.append(event);
  }

  async notify(event) {
    await this.telegram.send(`task=${event.task_id} profile=${event.profile_id} found=${event.found} trust=${event.trust_score}`);
  }
}

module.exports = { IntegrationFacade };
