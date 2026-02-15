# Deployment Guide

## Local start

1. Validate config:
   - `node scripts/validate-config.js ./config/system.config.template.json`
2. Run backend:
   - `node backend/server.js`
3. Run frontend:
   - `cd frontend && npm install && npm run dev -- --host 0.0.0.0 --port 5173`
4. Open UI:
   - `http://localhost:5173`

## API usage

- Auth model:
  - Use `Authorization: Bearer <tenant_id>` for tenant scoping.
- Upload tasks/profiles and start automation via REST API.
- Monitor `/events` stream for live action/session updates.

## Production recommendations

- replace in-memory store with PostgreSQL/Redis,
- run orchestrator workers separately,
- terminate TLS at reverse proxy,
- integrate centralized metrics/logging stack,
- serve frontend static build from CDN/Nginx (`npm run build`).
