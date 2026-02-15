class TelegramIntegration {
  constructor(config) {
    this.config = config;
  }

  async send(text) {
    if (!this.config.botToken || !this.config.chatId) return;
    const url = `https://api.telegram.org/bot${this.config.botToken}/sendMessage`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: this.config.chatId, text })
    });
  }
}

module.exports = { TelegramIntegration };
