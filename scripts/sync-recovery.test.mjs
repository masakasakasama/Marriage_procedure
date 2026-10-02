import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const source = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const start = source.indexOf('  function resumeSync(){');
const code = source.slice(start, source.indexOf('  /* ---------- init ---------- */', start));
function fixture({ ready, dirty, hidden = false }) {
  const listeners = new Map(); let connections = 0; let pushes = 0;
  const context = { fbReady: ready, dirty, startFirebase: () => connections++, schedulePush: () => pushes++,
    document: { hidden, addEventListener: (name, callback) => listeners.set(name, callback) },
    window: { addEventListener: (name, callback) => listeners.set(name, callback) } };
  vm.runInNewContext(code, context);
  return { listeners, result: () => ({ connections, pushes }) };
}
test('online return flushes failed pending changes through an existing Firebase connection', () => {
  const f = fixture({ ready: true, dirty: true });
  f.listeners.get('online')();
  assert.deepEqual(f.result(), { connections: 0, pushes: 1 });
});
test('visible return flushes pending changes but a hidden page does not', () => {
  const f = fixture({ ready: true, dirty: true }); f.listeners.get('visibilitychange')();
  assert.equal(f.result().pushes, 1);
  const hidden = fixture({ ready: true, dirty: true, hidden: true }); hidden.listeners.get('visibilitychange')();
  assert.equal(hidden.result().pushes, 0);
});
test('clean sessions do not rewrite shared data and unconnected sessions reconnect', () => {
  const clean = fixture({ ready: true, dirty: false }); clean.listeners.get('online')();
  assert.deepEqual(clean.result(), { connections: 0, pushes: 0 });
  const offline = fixture({ ready: false, dirty: true }); offline.listeners.get('online')();
  assert.deepEqual(offline.result(), { connections: 1, pushes: 0 });
});
