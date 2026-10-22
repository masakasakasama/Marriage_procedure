import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { ref, get, set, runTransaction, goOffline, goOnline } from 'firebase/database';
const host = process.env.FIREBASE_DATABASE_EMULATOR_HOST;
assert.match(host || '', /^(127\.0\.0\.1|localhost):\d+$/, 'Only a localhost emulator is allowed');
const [hostname, port] = host.split(':');
const rules = JSON.parse(readFileSync(new URL('../docs/realtime-database-rules-fragment.json', import.meta.url), 'utf8'));
const env = await initializeTestEnvironment({ projectId: 'demo-marriage-security', database: { host: hostname, port: Number(port), rules: JSON.stringify({rules:{'.read':false,'.write':false,...rules,'unrelated-app':{'.read':'auth != null && auth.uid == "other-owner"','.write':'auth != null && auth.uid == "other-owner"'}}}) } });
const google = { firebase: { sign_in_provider: 'google.com' } };
const path = 'marriage-procedure/v1/marriage-procedure-2f9d4c7a8e';
try {
  await env.withSecurityRulesDisabled(async context => {
    const db = context.database();
    await set(ref(db, 'approvedMarriageUsers'), { spouseA:true, spouseB:true });
    await set(ref(db, path), {json:JSON.stringify({checked:{existing:{v:true,t:1}},custom:[],dates:{},plan:{}}),at:1});
    await set(ref(db, 'unrelated-app'), {preserve:42});
  });
  const a = env.authenticatedContext('spouseA', google).database();
  const b = env.authenticatedContext('spouseB', google).database();
  const outsider = env.authenticatedContext('third-party', google).database();
  const anonymousApproved = env.authenticatedContext('spouseA', {firebase:{sign_in_provider:'anonymous'}}).database();
  for (const db of [outsider, anonymousApproved, env.unauthenticatedContext().database()]) {
    await assertFails(get(ref(db,path)));
    await assertFails(set(ref(db,path),{json:'malicious'}));
    await assertFails(set(ref(db,'approvedMarriageUsers/third-party'),true));
  }
  await assertSucceeds(get(ref(a,path))); await assertSucceeds(get(ref(b,path)));
  await assertFails(set(ref(a,'approvedMarriageUsers/third-party'),true));
  await assertFails(get(ref(a,'marriage-procedure/v1/unapproved-group')));
  // Two clients reconnect after distinct offline changes; transactions retain existing state.
  goOffline(a); goOffline(b);
  const edit = (db,id) => runTransaction(ref(db,path), current => {
    const doc = current?.json ? JSON.parse(current.json) : {checked:{},custom:[],dates:{},plan:{}};
    doc.checked[id]={v:true,t:123}; return {json:JSON.stringify(doc),at:123};
  }, {applyLocally:false});
  const pa = edit(a,'offline-A'), pb = edit(b,'offline-B'); goOnline(a); goOnline(b);
  await Promise.all([pa,pb]);
  const shared = JSON.parse((await get(ref(a,path))).val().json);
  assert.equal(shared.checked.existing.v,true); assert.equal(shared.checked['offline-A'].v,true); assert.equal(shared.checked['offline-B'].v,true);
  const other = env.authenticatedContext('other-owner', google).database();
  assert.equal((await assertSucceeds(get(ref(other,'unrelated-app')))).val().preserve,42);
  await assertFails(get(ref(a,'unrelated-app')));
  console.log('PASS: approved two users, unauthenticated/third-party/anonymous denial, two-client offline transaction merge, unrelated app rule preservation (emulator only)');
} finally { await env.cleanup(); }
