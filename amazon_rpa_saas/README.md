# Amazon RPA SaaS Platform (Compliance-Safe)

> Платформа предназначена для **разрешенной автоматизации, QA, нагрузочного тестирования и исследовательского моделирования поведения**.
> Не предназначена для обхода защит, мошенничества, скрытия нарушений правил площадок или несанкционированных действий.

## Возможности
- Веб-панель (frontend) с управлением задачами, конфигурацией и мониторингом.
- Backend SaaS Core (REST + real-time events hub).
- Оркестратор автоматизации профилей и задач.
- Поведенческий AI-модуль: энтропия, state machine, trust score simulation.
- Централизованный randomization engine с seed.
- Интеграции: Google Sheets, Telegram, локальные JSONL-логи.
- Шаблон AdsPower process JSON.

## Структура

```text
/amazon_rpa_saas
    /frontend
    /backend
    /automation_core
    /behavior_ai
    /randomization_engine
    /task_engine
    /integrations
    /config
    /logs
    README.md
```

## Как запускать всё

### 1) Backend

```bash
cd amazon_rpa_saas
node backend/server.js
```

Проверка health:

```bash
curl http://127.0.0.1:8080/health
```

### 2) Frontend

```bash
cd amazon_rpa_saas/frontend
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

Открыть: `http://localhost:5173`

### 3) Базовая валидация

```bash
cd amazon_rpa_saas
node scripts/validate-config.js ./config/system.config.template.json
node scripts/smoke-test.js
```

## API quick start (multi-tenant demo)

В текущем шаблоне tenant определяется через `Authorization: Bearer <tenant_id>`.

```bash
# upload tasks
curl -X POST http://127.0.0.1:8080/api/tasks/upload \
  -H 'Authorization: Bearer tenantA' \
  -H 'Content-Type: application/json' \
  --data '{"tasks":'"$(cat config/tasks.sample.json)"'}'

# upload profiles
curl -X POST http://127.0.0.1:8080/api/profiles/upload \
  -H 'Authorization: Bearer tenantA' \
  -H 'Content-Type: application/json' \
  --data '{"profiles":[{"profile_id":"P-01"},{"profile_id":"P-02"},{"profile_id":"P-03"}]}'

# start automation
curl -X POST http://127.0.0.1:8080/api/automation/start \
  -H 'Authorization: Bearer tenantA'

# watch realtime stream
curl -N http://127.0.0.1:8080/events
```


## Google Sheets + Telegram при FOUND

События в локальный лог пишутся всегда, а во внешние интеграции отправляются только при `found=true` (по флагу `integrations.on_found_only=true`).

Заполните перед запуском:
- `integrations.google_sheets.webhook_url`
- `integrations.telegram.bot_token`
- `integrations.telegram.chat_id`

Файл: `config/system.config.template.json`.
