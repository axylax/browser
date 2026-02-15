import React from 'react';

const CONFIG_SAMPLE = `{
  "_comment": "Файл: config.sample.json. Скопируйте в config.json и заполните рабочими значениями.",
  "excel": "./examples/Amazon Import.xlsx",
  "keywords_random": "./examples/Keywords_random.txt",
  "start_amazon_url": "./examples/Start_amazon_url.txt",
  "telegram": {
    "enabled": true,
    "telegram_token": "123456:REPLACE_WITH_BOT_TOKEN",
    "telegram_chat_id": "-1001234567890"
  },
  "google_sheet": {
    "enabled": false,
    "spreadsheet_id": "REPLACE_ME",
    "sheet_name": "RPA_RESULTS",
    "credentials_path": "./secrets/google-service-account.json"
  },
  "search_depth": 6,
  "advanced_search": {
    "enabled": true,
    "pages": 3
  },
  "random_key_count": 5,
  "random_prod_num": 2,
  "random_prod_max_price": 35,
  "random_prod_ratio": 0.45,
  "random_prod_favcart": 0.35
}`;

export function SettingsPage() {
  return (
    <div>
      <h1>Settings Panel</h1>
      <h2>Редактирование config.json</h2>
      <textarea className="code-editor" value={CONFIG_SAMPLE} readOnly />
    </div>
  );
}
