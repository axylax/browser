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

