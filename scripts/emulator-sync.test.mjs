import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { build } from 'esbuild';
import { chromium } from '@playwright/test';
const host = process.env.FIREBASE_DATABASE_EMULATOR_HOST || '127.0.0.1:9000';
assert.match(host, /^(127\.0\.0\.1|localhost):\d+$/, 'Only a local emulator is permitted');
const [hostname, port] = host.split(':');
const namespace = 'demo-marriage-' + randomUUID();
const base = `http://${host}`;
async function api(path, method='GET', body) {
  const response = await fetch(`${base}/${path}?ns=${namespace}`, {method,headers:{'Authorization':'Bearer owner','Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});
  assert.equal(response.ok,true,`Emulator HTTP ${response.status}: ${response.ok ? "" : await response.text()}`);
  return response.json();
}
const rules = write => api('.settings/rules.json','PUT',{rules:{'.read':true,'.write':write}});
const read = async () => { const value = await api('qa/fixture.json'); return value?.json ? JSON.parse(value.json) : {}; };
async function until(predicate) {
  const began=Date.now();
  while(!await predicate()) { if(Date.now()-began>15000)throw Error('Emulator condition timed out');await new Promise(r=>setTimeout(r,100)); }
}
await rules(true);
const sdk = await build({stdin:{contents:"import firebase from 'firebase/compat/app'; import 'firebase/compat/database'; window.firebase=firebase;",resolveDir:process.cwd()},bundle:true,format:'iife',write:false});
const original=readFileSync(new URL('../index.html',import.meta.url),'utf8');
assert.ok(original.includes('var ref = app.database().ref('));
const html=original.replace(/<script src="https:\/\/www.gstatic.com\/firebasejs\/[^\"]+"><\/script>/g,'')
  .replace('</head>','<script src="/sdk.js"></script></head>')
  .replace('var ref = app.database().ref(',`var database = app.database(); database.useEmulator(${JSON.stringify(hostname)},${Number(port)}); var ref = database.ref(`);
const config=`export const firebaseConfig=${JSON.stringify({apiKey:'fixture-only',projectId:namespace,databaseURL:`https://${namespace}.firebaseio.com`})}; export const GROUP_KEY='fixture'; export const DATA_PATH='qa';`;
const server=createServer((req,res)=>{
  const url=new URL(req.url,'http://127.0.0.1');
  if(url.pathname==='/sdk.js'){res.setHeader('Content-Type','text/javascript');res.end(sdk.outputFiles[0].text)}
  else if(url.pathname==='/firebase-config.js'){res.setHeader('Content-Type','text/javascript');res.end(config)}
  else if(url.pathname==='/favicon.ico'){res.writeHead(204);res.end()}
  else {res.setHeader('Content-Type','text/html');res.end(html)}
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const url=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE_PATH?{executablePath:process.env.CHROMIUM_EXECUTABLE_PATH}:{})});
const contexts=[];const blocked=[];const errors=[];
async function page() {
  const context=await browser.newContext();contexts.push(context);
  await context.route('**/*',route=>{const u=new URL(route.request().url());if(['127.0.0.1','localhost'].includes(u.hostname))return route.continue();blocked.push(u.hostname);return route.abort();});
  const page=await context.newPage();page.on('pageerror',e=>{errors.push(e.message);console.error('pageerror',e.message)});page.on('console',m=>{if(m.type()==='error'||m.type()==='warning')console.error(m.text())});page.on('websocket',ws=>assert.ok(['127.0.0.1','localhost'].includes(new URL(ws.url()).hostname),'No production WebSocket'));
  const response=await page.goto(url);console.log('fixture response',response.status(),await page.title());try{await page.waitForSelector('#syncChip.ok',{timeout:10000})}catch(e){console.error((await page.content()).slice(0,1500));throw e}return page;
}
try {
  const a=await page();await until(async()=>Boolean((await read()).checked));
  console.log('initial local emulator sync passed');
  await rules(false);await a.locator('label:has(input[data-id="ta1"])').click();
  await a.waitForSelector('#syncChip.err');
  assert.equal((await read()).checked.ta1?.v,undefined);
  assert.equal(await a.evaluate(()=>JSON.parse(localStorage.getItem('marriage_checklist_v2')).checked.ta1.v),true);
  await rules(true);await a.evaluate(()=>window.dispatchEvent(new Event('online')));
  await until(async()=>Boolean((await read()).checked.ta1?.v));
  console.log('permission failure -> online retry retained and saved local changes');
  const b=await page();
  await Promise.all([a.evaluate(()=>firebase.database().goOffline()),b.evaluate(()=>firebase.database().goOffline())]);
  await a.locator('label:has(input[data-id="ta2"])').click();await b.locator('label:has(input[data-id="ta3"])').click();
  await new Promise(r=>setTimeout(r,900));
  assert.equal(await a.locator('#syncChip').getAttribute('class'),'sync-chip work','Queued offline writes must not claim synced');
  await Promise.all([a.evaluate(()=>firebase.database().goOnline()),b.evaluate(()=>firebase.database().goOnline())]);
  await until(async()=>{const d=await read();return d.checked.ta2?.v&&d.checked.ta3?.v});
  await a.reload();await a.waitForSelector('#syncChip.ok');
  assert.equal(await a.locator('[data-id="ta1"]').isChecked(),true);
  assert.equal(await a.locator('[data-id="ta2"]').isChecked(),true);
  assert.equal(await a.locator('[data-id="ta3"]').isChecked(),true);
  console.log('concurrent offline edits converge and reload retains all three fixture checks');
  await rules(false);await a.locator('label:has(input[data-id="ta4"])').click();await a.waitForSelector('#syncChip.err');
  await a.reload();await a.waitForSelector('#syncChip.err');
  assert.equal(await a.locator('[data-id="ta4"]').isChecked(),true,'Failed change restored from local storage after restart');
  assert.equal((await read()).checked.ta4?.v,undefined);
  await rules(true);await a.evaluate(()=>window.dispatchEvent(new Event('online')));
  await until(async()=>Boolean((await read()).checked.ta4?.v));await a.waitForSelector('#syncChip.ok');
  console.log('unsaved change survives restart and is retried after permission recovery');
  const beforeQuota=await a.evaluate(()=>localStorage.getItem('marriage_checklist_v2'));
  await rules(false);
  await a.evaluate(()=>{window.fixtureQuota=true;const original=Storage.prototype.setItem;Storage.prototype.setItem=function(key,value){if(window.fixtureQuota&&key==='marriage_checklist_v2')throw new DOMException('Fixture full','QuotaExceededError');return original.call(this,key,value)}});
  await a.locator('label:has(input[data-id="ta5"])').click();await a.waitForSelector('#localSaveError');await a.waitForSelector('#syncChip.err');
  assert.equal(await a.evaluate(()=>localStorage.getItem('marriage_checklist_v2')),beforeQuota);
  assert.ok(!(await a.locator('#syncChipText').innerText()).includes('端末に保存'));
  await a.locator('[data-lang="de"]').click();assert.ok((await a.locator('#localSaveErrorText').innerText()).includes('Auf diesem Gerät'));
  const downloadPromise=a.waitForEvent('download');await a.locator('#exportUnsaved').click();const exported=JSON.parse(readFileSync(await (await downloadPromise).path(),'utf8'));assert.equal(exported.checked.ta5.v,true);
  await a.evaluate(()=>window.fixtureQuota=false);await rules(true);await a.locator('#retryLocalSave').click();await a.waitForSelector('#localSaveError',{state:'hidden'});
  await until(async()=>Boolean((await read()).checked.ta5?.v));
  assert.equal(await a.evaluate(()=>JSON.parse(localStorage.getItem('marriage_checklist_v2')).checked.ta5.v),true);
  console.log('quota + cloud failure: visible localized warning, unchanged prior storage, export, local retry and cloud recovery passed');
  assert.deepEqual(blocked,[],'All Firebase traffic must stay on localhost');assert.deepEqual(errors,[]);
  console.log('PASS: emulator sync recovery; no production requests or real checklist data used');
} finally {
  for(const context of contexts)await context.close();await browser.close();await new Promise(r=>server.close(r));
  await api('.json','DELETE');
}
