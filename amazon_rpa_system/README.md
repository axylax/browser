# Amazon RPA System (Compliance-Safe Edition)

> ⚠️ Данный проект предназначен для QA/исследовательской автоматизации и моделирования пользовательского поведения.
> Он **не предназначен** для обхода защит, мошеннических действий, несанкционированных покупок или нарушения правил площадок.

## Что внутри

- Слоистая архитектура (7 движков).
- Конфигурационно-управляемый пайплайн.
- Детерминированный генератор случайности с seed.
- Библиотека поведенческого моделирования (мышь/скролл/взаимодействия).
- Интеграции: Google Sheets, Telegram, локальные логи.
- Шаблон процесса AdsPower RPA Plus (`process_json/adspower_process.template.json`).

## Быстрый старт

1. Установите Node.js 18+.
2. Скопируйте шаблон конфига:
   ```bash
   cp config/system.config.template.json config/system.config.json
   ```
3. Заполните `config/system.config.json`.
4. Запустите:
   ```bash
   node scripts/run.js --config ./config/system.config.json --seed 42
   ```

## Структура

```text
/amazon_rpa_system
    /architecture
    /core_engines
    /behavior_modules
    /integrations
    /config
    /process_json
    /scripts
    /logs
    README.md
```

## Ограничения безопасности

- Транзакционные действия (например, `add_to_cart`) по умолчанию выключены флагом `safety.disableTransactionalActions=true`.
- Система не использует Amazon API.
- Никакие данные не отправляются без явно настроенных интеграций.

## Проверка

```bash
node scripts/validate-config.js ./config/system.config.template.json
node scripts/run.js --config ./config/system.config.template.json --dry-run
```
