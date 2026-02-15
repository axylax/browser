/**
 * Google Sheets Integration (webhook/proxy mode)
 * В production рекомендуется вызывать внутренний API-шлюз,
 * который пишет в Sheets от сервисного аккаунта.
 */
class GoogleSheetsIntegration {
  constructor(config) {
    this.config = config;
  }

  async appendRow(payload) {
    if (!this.config.webhookUrl) return;
    await fetch(this.config.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }
}

module.exports = { GoogleSheetsIntegration };
