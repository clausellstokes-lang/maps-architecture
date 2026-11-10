import { readFileSync } from 'node:fs';
const src = readFileSync(process.argv[2], 'utf8');
const i = src.indexOf('export const meta');
const j = src.indexOf('\n}\n', i) + 3;
const body = src.slice(0, i) + src.slice(j);
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const run = new AsyncFunction('args', 'agent', 'log', 'phase', body);
async function scenario(name, script, expect) {
  const calls = [];
  let k = 0;
  const agent = async (prompt, o) => {
    const step = script[k++];
    calls.push(`${o.label} [${o.phase}/${o.model}/${o.effort || '-'}]` + (/RE-ENTRY/.test(prompt) ? ' RE-ENTRY' : '') + (/FURTHER ROUND/.test(prompt) ? ' FURTHER' : '') + (/RE-CHECK/.test(prompt) ? ' RE-CHECK' : '') + (/You are the WAITER/.test(prompt) ? ' WAITER' : ''));
    if (step === undefined) throw new Error(`${name}: an agent call beyond the script (${o.label})`);
    return step;
  };
  const logs = [];
  const out = await run({ id: 'M0-x-00', briefs: '/tmp/b.json', from: 4, maxRounds: 3, seats: { check: { model: 'fable', effort: 'high' } } }, agent, (m) => logs.push(m), () => {});
  const got = JSON.stringify({ ok: out.ok, why: out.why, rounds: out.rounds, n: calls.length });
  const ok = got === JSON.stringify(expect) && k === script.length;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}: ${got}${ok ? '' : ' expected ' + JSON.stringify(expect) + ' used ' + k + '/' + script.length}`);
  for (const c of calls) console.log('     ' + c);
  if (!ok) process.exitCode = 1;
}
const B = (status, dir) => ({ item: 'x', status, ...(dir ? { wait: { dir } } : {}), files: [], landed_record: '', tests: { passed: 0, failed: 0 }, gates: [], choices_rows: [], notes: [] });
const C = (verdict, dir, lines = []) => ({ item: 'x', verdict, ...(dir ? { wait: { dir } } : {}), report: '', failing_lines: lines });
const W = (done) => ({ done, why: done ? 'chain.done exists' : 'gone' });
await scenario('A plain', [B('ready-for-check'), C('pass')], { ok: true, rounds: 1, n: 2 });
await scenario('B build waits once, check waits once', [B('waiting', '/d'), W(true), B('ready-for-check'), C('waiting', '/c'), W(true), C('pass')], { ok: true, rounds: 1, n: 6 });
await scenario('C build waits with no dir', [B('waiting'), B('ready-for-check'), C('pass')], { ok: true, rounds: 1, n: 3 });
await scenario('D build waits past the cap and again', [B('waiting', '/d'), W(true), B('waiting', '/d'), W(true), B('waiting', '/d'), W(true), B('waiting', '/d'), W(true), B('waiting', '/d'), W(true), B('waiting', '/d'), W(true), B('waiting', '/d'), B('waiting', '/d')], { ok: false, why: 'blocked', n: 14 });
await scenario('E build blocked', [B('blocked')], { ok: false, why: 'blocked', n: 1 });
await scenario('F fail, the fix build waits, re-check passes', [B('ready-for-check'), C('fail', null, [{ line: 'l', evidence: 'e', required_change: 'r' }]), B('waiting', '/d'), W(false), B('ready-for-check'), C('pass')], { ok: true, rounds: 2, n: 6 });
await scenario('G re-entry build ends blocked', [B('waiting', '/d'), W(true), B('blocked')], { ok: false, why: 'blocked', n: 3 });
