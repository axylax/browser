class GoogleSheetsIntegration {
  constructor(cfg) { this.cfg = cfg; }
  async append(event) {
    if (!this.cfg.enabled || !this.cfg.webhook_url) return;
    await fetch(this.cfg.webhook_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });
  }
}

module.exports = { GoogleSheetsIntegration };
