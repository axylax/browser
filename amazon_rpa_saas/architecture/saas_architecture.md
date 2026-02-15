# SaaS Architecture

## Layer 1 — Frontend Web Panel
- React-based panel (`frontend/src`) with pages for Task Manager, Automation Control, Configuration, Monitoring, Analytics, Logs.
- Real-time updates consume backend event stream abstraction (`LiveMonitor`).

## Layer 2 — Backend SaaS Core
- Node.js HTTP API (`backend/server.js`) + event hub (`backend/realtime_hub.js`).
- Multi-tenant isolation via `tenant_id` in requests and stores.
- Token-based auth middleware (template).

## Layer 3 — Automation Orchestrator
- `automation_core/orchestrator.js` handles queue lifecycle: start/stop/pause/resume, retries, profile locks.

## Layer 4 — Data Processing Engine
- `task_engine/serial_reader.js` reads serial task sources (CSV-first, Excel adapter-ready).
- `task_engine/distribution_engine.js` enforces:
  - same ASIN -> different profiles where possible,
  - no duplicate per profile,
  - balanced distribution.

## Layer 5 — Entry Strategy Engine
- `automation_core/entry_strategy.js` chooses route by configurable weighted probability:
  - google_organic
  - direct_marketplace

## Layer 6 — Search Intelligence Engine
- `automation_core/search_engine.js` supports keyword scan, page depth, ASIN radar, advanced fallback query.

## Layer 7 — Human Behavior AI Engine
- `behavior_ai/entropy_model.js` controls timing noise and interaction entropy.
- `behavior_ai/trust_score.js` simulates session trust with dynamic adjustments.
- `behavior_ai/state_machine.js` models states:
  Exploration, Consideration, Comparison, Engagement, PurchaseIntent, Disinterest.
- `behavior_ai/action_library.js` defines probability/timing/randomized actions.

## Layer 8 — Randomization Engine
- `randomization_engine/entropy_rng.js`: seeded RNG, weighted choice, shuffle, gaussian noise.

## Layer 9 — Integration Engine
- `integrations/google_sheets.js`, `integrations/telegram.js`, `integrations/local_logger.js`.

## Data Flow
1. Frontend uploads tasks/config.
2. Backend validates and stores tenant-scoped entities.
3. Orchestrator pulls tasks and assigns to profiles via distribution engine.
4. Execution session uses behavior AI + randomization + search pipeline.
5. Outputs stream to real-time monitor and integrations.
