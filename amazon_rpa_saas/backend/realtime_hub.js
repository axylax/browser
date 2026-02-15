class RealtimeHub {
  constructor() { this.listeners = new Set(); }
  subscribe(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  emit(event) { this.listeners.forEach((fn) => fn(event)); }
}
module.exports = { RealtimeHub };
