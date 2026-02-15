# Setup & Deployment Guide

## 1. Подготовка

1. Установить Node.js 18+.
2. Проверить доступ к AdsPower Local API/RPA Plus.
3. Создать рабочую директорию логов.

## 2. Конфигурация

1. Скопировать шаблон `config/system.config.template.json` в `config/system.config.json`.
2. Указать:
   - `entryWeights`
   - `paths.tasks`, `paths.profiles`
   - `integrations.googleSheets`, `integrations.telegram`
3. Для безопасного пилота оставить `safety.disableTransactionalActions=true`.

## 3. Привязка к AdsPower RPA Plus

1. Импортировать `process_json/adspower_process.template.json`.
2. Заменить script-node пути на реальные в проекте.
3. Привязать узел открытия профиля к `profile_id` из входного бандла.

## 4. Локальная валидация

```bash
node scripts/validate-config.js ./config/system.config.json
node scripts/run.js --config ./config/system.config.json --dry-run
```

## 5. Production rollout

- Шардировать профили по воркерам (например, 1000 профилей = 20 воркеров x 50).
- Использовать внешний lock-store (Redis/PostgreSQL advisory locks).
- Включить централизованный сбор логов (ELK/ClickHouse).
- Настроить алерты Telegram на аномалии (рост warmup-flow, ошибки интеграций).
