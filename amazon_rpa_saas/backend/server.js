const http = require('http');
const fs = require('fs');
const path = require('path');

const { parseAuth } = require('./auth');
const { RealtimeHub } = require('./realtime_hub');
const { EntropyRng } = require('../randomization_engine/entropy_rng');
const { SerialTaskReader } = require('../task_engine/serial_reader');
const { DistributionEngine } = require('../task_engine/distribution_engine');
const { IntegrationFacade } = require('../integrations');
const { Orchestrator } = require('../automation_core/orchestrator');
const { AdsPowerAdapter } = require('../automation_core/adspower_adapter');

const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/system.config.template.json'), 'utf-8'));
const hub = new RealtimeHub();
const reader = new SerialTaskReader();

const store = { tasks: {}, profiles: {}, sessions: {} };

function json(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

function body(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => data += c);
    req.on('end', () => resolve(data ? JSON.parse(data) : {}));
  });
}

const server = http.createServer(async (req, res) => {
  if (req.url === '/health') return json(res, 200, { ok: true });

  if (req.url === '/events') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    const unsub = hub.subscribe((event) => res.write(`data: ${JSON.stringify(event)}\n\n`));
    req.on('close', unsub);
    return;
  }

  const auth = parseAuth(req);
  if (!auth) return json(res, 401, { error: 'Unauthorized' });

  if (req.method === 'POST' && req.url === '/api/tasks/upload') {
    const b = await body(req);
    store.tasks[auth.tenant_id] = b.tasks || [];
    return json(res, 200, { count: store.tasks[auth.tenant_id].length });
  }

  if (req.method === 'POST' && req.url === '/api/profiles/upload') {
    const b = await body(req);
    store.profiles[auth.tenant_id] = b.profiles || [];
    return json(res, 200, { count: store.profiles[auth.tenant_id].length });
  }

  if (req.method === 'POST' && req.url === '/api/automation/start') {
    const rng = new EntropyRng(config.runtime.seed);
    const dist = new DistributionEngine(rng);
    const tasks = (store.tasks[auth.tenant_id] || []).map((t) => ({ ...t, tenant_id: auth.tenant_id }));
    const assigned = dist.assign(tasks, store.profiles[auth.tenant_id] || []);

    const integrations = new IntegrationFacade(config.integrations);
    const orch = new Orchestrator({ rng, config, integrations, realtimeHub: hub });
    store.sessions[auth.tenant_id] = orch;
    orch.run(assigned, () => new AdsPowerAdapter(rng));
    return json(res, 200, { started: true, assigned: assigned.length });
  }

  if (req.method === 'POST' && req.url === '/api/automation/pause') {
    store.sessions[auth.tenant_id]?.pause();
    return json(res, 200, { paused: true });
  }
  if (req.method === 'POST' && req.url === '/api/automation/resume') {
    store.sessions[auth.tenant_id]?.resume();
    return json(res, 200, { resumed: true });
  }
  if (req.method === 'POST' && req.url === '/api/automation/stop') {
    store.sessions[auth.tenant_id]?.stop();
    return json(res, 200, { stopped: true });
  }

  if (req.method === 'GET' && req.url === '/api/config') return json(res, 200, config);

  json(res, 404, { error: 'Not found' });
});

if (require.main === module) {
  server.listen(8080, () => console.log('Backend listening on :8080'));
}

module.exports = { server, store, reader };
