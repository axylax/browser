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

  }
}

module.exports = { IntegrationFacade };
