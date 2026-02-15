# Deployment Guide

1. Validate config:
   - `node scripts/validate-config.js ./config/system.config.template.json`
2. Run backend:
   - `node backend/server.js`
3. Auth model:
   - Use `Authorization: Bearer <tenant_id>` for tenant scoping.
4. Upload tasks/profiles and start automation via REST API.
5. Monitor `/events` stream for live action/session updates.
6. Production recommendations:
   - replace in-memory store with PostgreSQL/Redis,
   - run orchestrator workers separately,
   - terminate TLS at reverse proxy,
   - integrate centralized metrics/logging stack.
