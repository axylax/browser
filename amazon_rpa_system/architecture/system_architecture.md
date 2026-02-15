# Архитектура системы

## 1. Data Input Engine (`core_engines/data_input_engine.js`)

**Ответственность:**
- Последовательное чтение задач (CSV/Excel-ready через адаптер).
- Загрузка пулов ключевых слов и входных URL.
- Валидация целостности данных.
- Детерминированное распределение задач между профилями.
- Обработка пропусков и fallback-переназначение.

**Контракт:**
- Вход: `config`, `seed`.
- Выход: `TaskBundle[]` с назначенными профилями.

---

## 2. Entry Strategy Engine (`core_engines/entry_strategy_engine.js`)

**Ответственность:**
- Взвешенный выбор стратегии входа:
  - `google_organic`
  - `direct_marketplace`

**Контракт:**
- Вход: профиль, задача, матрица весов.
- Выход: выбранная стратегия + URL входа.

---

## 3. Search Intelligence Engine (`core_engines/search_intelligence_engine.js`)

**Ответственность:**
- Поиск по целевым ключам.
- Сканирование выдачи по ASIN/идентификатору.
- Адаптивная глубина обхода страниц.
- Fallback в расширенный запрос:
  - `KEYWORDS_TARGET + PRODUCT_NAME + BRAND`

**Контракт:**
- Вход: поисковый контекст + поведенческий движок.
- Выход: `SearchResult` (найден/не найден + метаданные).

---

## 4. Human Behavior Engine (`behavior_modules/*`)

**Подмодули:**
- `mouse_engine.js` — траектории, jitter, ускорение/торможение.
- `scroll_engine.js` — вариативный скролл, ревёрс, паузы чтения.
- `interaction_engine.js` — вероятностный выбор действий.

**Цель:**
- Неповторяющиеся сессии для UX/нагрузочного моделирования.

---

## 5. Decision Engine (`core_engines/decision_engine.js`)

**Ветки:**
- `target_found_flow`: вовлечение карточки (безопасные действия, без транзакций по умолчанию).
- `warmup_flow`: исследование смежных карточек без покупки.

---

## 6. Randomization Engine (`core_engines/randomization_engine.js`)

**Ответственность:**
- Единый seeded RNG.
- Shuffle/weighted choice.
- Энтропийные метрики сессии.

---

## 7. Output & Integration Engine (`integrations/*`, `core_engines/output_engine.js`)

**Ответственность:**
- Локальный JSONL-лог.
- Google Sheets логирование.
- Telegram нотификации.
- Сохранение итогов сессии.

---

## Поток данных

1. `scripts/run.js` загружает конфиг и seed.
2. `data_input_engine` валидирует и распределяет задания.
3. Для каждой задачи `entry_strategy_engine` выбирает вход.
4. `search_intelligence_engine` выполняет поиск и fallback.
5. `decision_engine` выбирает сценарий поведения.
6. `output_engine` публикует результат в интеграции.
7. `logs/activity.jsonl` сохраняет детальный след.

---

## Масштабирование

- Горизонтально: запуск нескольких воркеров по шардированным профилям.
- Без дубликатов: `task_id + profile_id` lock-key.
- Идемпотентность: повторная обработка безопасна через `status_store`.
