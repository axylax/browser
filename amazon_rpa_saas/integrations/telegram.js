class TelegramIntegration {
  constructor(cfg) { this.cfg = cfg; }
  async send(text) {
    if (!this.cfg.enabled || !this.cfg.bot_token || !this.cfg.chat_id) return;
    await fetch(`https://api.telegram.org/bot${this.cfg.bot_token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: this.cfg.chat_id, text })
    });
  }
}

module.exports = { TelegramIntegration };
