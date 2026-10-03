#!/usr/bin/env python3
"""Self-test of tools/coherence_driver.py: drive the whole loop in a sandbox with fake seats (the same fake returns as
tools/dryrun-workflow.mjs with DRY_FAKE=1, plus one injected seat failure) and check that every loop seat's prompt,
model, phase and label is byte-identical to what the original script's own loop produces in its dry run.

  python3 tools/coherence_driver_selftest.py <scratch-dir>
"""
import glob, json, os, shutil, subprocess, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
T = os.path.abspath(sys.argv[1])
os.makedirs(T, exist_ok=True)
for d in ('tools', 'workflows/lane-prompts', 'docs/validation/coherence/results', 'home', 'scratch', 'prompts', 'base'):
    os.makedirs(os.path.join(T, d), exist_ok=True)
for f in ('tools/coherence_driver.py', 'tools/coherence_eval.mjs', 'workflows/18-coherence.js', 'tools/dryrun-workflow.mjs'):
    shutil.copy(os.path.join(REPO, f), os.path.join(T, f))
args = json.load(open(os.path.join(REPO, 'workflows/lane-prompts/coherence-cloud-args.json')))
args['scratch'] = os.path.join(T, 'scratch')
json.dump(args, open(os.path.join(T, 'workflows/lane-prompts/coherence-cloud-args.json'), 'w'))
units = ['model', 'kernel', 'pipeline', 'determinism', 'rendering', 'scope'] + [f'V{i:02d}' for i in range(1, 13)]
open(os.path.join(T, 'docs/lane-events.log'), 'w').write(''.join(f'2026-10-03 00:00 coherence/rewrite-{u} LANDED x\n' for u in units))
for u in units:
    open(os.path.join(T, f'docs/validation/coherence/results/coherence_rewrite-{u}.json'), 'w').write('{}')

# the reference: the original script's own dry run (its loop seats only)
env = dict(os.environ, DRY_FAKE='1', HOME=os.path.join(T, 'home'))
subprocess.run(['node', os.path.join(T, 'tools/dryrun-workflow.mjs'), os.path.join(T, 'workflows/18-coherence.js'), os.path.join(T, 'base'),
                '@' + os.path.join(T, 'workflows/lane-prompts/coherence-cloud-args.json')], env=env, check=True, capture_output=True)
LOOP = ('coherence_assemble', 'coherence_verify', 'coherence_repair', 'coherence_adjudicate', 'coherence_validate')
ref = {f: open(os.path.join(T, 'base', f)).read() for f in os.listdir(os.path.join(T, 'base')) if f.startswith(LOOP)}

FAKE = r'''
import fs from 'node:fs'; import vm from 'node:vm'; import path from 'node:path';
const [,, script, journal, pdir, failLabel, mode, argsFile] = process.argv;
const src = fs.readFileSync(script, 'utf8').replace(/^export const meta/m, 'const meta');
fs.mkdirSync(path.dirname(journal), { recursive: true });
const J = (o) => fs.appendFileSync(journal, JSON.stringify(o) + '\n');
J({ type: 'launched' });
let n = 0;
const fake = (sc) => sc.enum ? sc.enum[0] : sc.type === 'object' ? Object.fromEntries(Object.entries(sc.properties || {}).map(([k, v]) => [k, fake(v)])) : sc.type === 'array' ? [fake(sc.items), fake(sc.items)] : sc.type === 'number' ? 1 : sc.type === 'boolean' ? false : 'x';
// scenario B: per-label returns that walk every branch of the loop (see the docstring of scenario())
const issue = (owner, id) => ({ id, severity: 'minor', kind: 'TEST', claim: 'c ' + id, required_change: 'r ' + id, owner });
const scenario = (label, schema) => {
  let m
  if ((m = label.match(/^coherence\/verify-(.+)-r0s$/))) return { key: m[1], file: 'f', issues: [issue(m[1].startsWith('vol-') ? m[1].slice(4, 7) : m[1].startsWith('agree') || m[1].startsWith('edges') ? 'V' + (m[1].length % 12 + 1) : m[1], m[1] + '-1')] }
  if ((m = label.match(/^coherence\/verify-(.+)-r1s$/))) return { key: m[1], file: 'f', issues: m[1] === 'kernel' ? [issue('kernel geometry', 'K-1')] : [] }
  if ((m = label.match(/^coherence\/verify-(.+)-r\d+[st]$/))) return { key: m[1], file: 'f', issues: [] }
  if ((m = label.match(/^coherence\/repair-(.+)-r(\d+)$/))) return { unit: m[1], file: 'f', blocks: 1, ruling_requests: m[1] === 'kernel' && m[2] === '2' ? 1 : 0 }
  if (label === 'coherence/validate-v0') return { key: 'v', file: 'f', issues: [issue('V5', 'VAL-1'), issue('Scope §16', 'VAL-2')] }
  if (label === 'coherence/validate-v1') return { key: 'v', file: 'f', issues: [] }
  if (label.startsWith('coherence/adjudicate-')) return { file: 'docs/validation/coherence/adjudication-' + label.slice(-2) + '.md', rulings: 1 }
  return fake(schema)
};
const ctx = { args: argsFile ? JSON.parse(fs.readFileSync(argsFile, 'utf8')) : {}, console, phase: () => {}, log: () => {}, budget: { total: null, spent: () => 0, remaining: () => Infinity },
  parallel: async (t) => Promise.all(t.map((f) => f().catch(() => null))),
  agent: async (prompt, opts) => {
    const id = 'a' + (n++); J({ type: 'started', key: 'k' + id, agentId: id, label: opts.label, phase: opts.phase });
    fs.writeFileSync(path.join(pdir, opts.label.replace(/[:/]/g, '_') + '.prompt.txt'), `MODEL ${opts.model} | PHASE ${opts.phase} | LABEL ${opts.label}\n\n` + prompt);
    if (opts.label === failLabel) { J({ type: 'error', key: 'k' + id, agentId: id, error: 'injected' }); return null }
    const r = mode === 'scenario' ? scenario(opts.label, opts.schema) : fake(opts.schema); J({ type: 'result', key: 'k' + id, agentId: id, result: r }); return r } };
vm.createContext(ctx);
const out = await new vm.Script('(async () => {\n' + src + '\n})()').runInContext(ctx);
process.stdout.write(JSON.stringify(out));
'''
open(os.path.join(T, 'tools/fake_run.mjs'), 'w').write(FAKE)
drv = ['python3', os.path.join(T, 'tools/coherence_driver.py')]
run = lambda *a: subprocess.run(drv + list(a), env=env, check=True, capture_output=True, text=True).stdout
state = lambda: json.load(open(os.path.join(T, 'docs/validation/coherence/driver/state.json')))
k = 0


def drive(mode, pdir, inject):
    """Run the loop through the driver with fake seats; returns (steps, failure re-planned)."""
    global k
    shutil.rmtree(os.path.join(T, 'docs/validation/coherence/driver'), ignore_errors=True)
    os.makedirs(pdir, exist_ok=True)
    run('init')
    failed_once, steps = False, 0
    while state()['pc'] != 'done' and steps < 400:
        steps += 1
        run('plan', '--runs', '3')
        ids = []
        for p in state()['step']['planned']:
            k += 1
            rid = f'wf_fake{k:04d}'
            fail = inject if not failed_once else ''
            subprocess.run(['node', os.path.join(T, 'tools/fake_run.mjs'), p, os.path.join(T, 'home/.claude/projects/p/s/subagents/workflows', rid, 'journal.jsonl'),
                            pdir, fail, mode], env=env, check=True, capture_output=True)
            ids.append(rid)
        before = state()['n']
        out = run('ingest', *ids)
        if 'returned nothing' in out:
            failed_once = True
            assert state()['n'] == before, 'a step with a failed seat must not advance'
    return steps, failed_once


def compare(name, got_dir, ref):
    got = {f: open(os.path.join(got_dir, f)).read() for f in os.listdir(got_dir)}
    ok = set(got) == set(ref) and all(got[f] == ref[f] for f in ref)
    print(f'[{name}] loop seats: driver {len(got)}, original {len(ref)}; missing {sorted(set(ref) - set(got))[:5]} extra {sorted(set(got) - set(ref))[:5]} different {[f for f in ref if f in got and got[f] != ref[f]][:5]}')
    return ok


# scenario A: the dry run's fakes (every seat finds two blockers for scope) to the repair cap, one seat failing once
steps, f1 = drive('fake', os.path.join(T, 'prompts'), 'coherence/verify-agree-proof-r1t')
okA = compare('A: repair cap', os.path.join(T, 'prompts'), ref) and f1
print(f'[A] driver steps {steps}; injected failure re-planned: {f1}')
print(open(os.path.join(T, 'docs/validation/coherence/driver/log.md')).read().splitlines()[-1])

# scenario B: many owners over three runs, a clean touched check turning into a full sweep, a ruling request and the
# adjudicator, validator findings sending the set back into the loop, then a clean finish
refB = os.path.join(T, 'refB'); os.makedirs(refB, exist_ok=True)
argsf = os.path.join(T, 'workflows/lane-prompts/coherence-cloud-args.json')
outB = subprocess.run(['node', os.path.join(T, 'tools/fake_run.mjs'), os.path.join(T, 'workflows/18-coherence.js'), os.path.join(T, 'refB.journal'), refB, '', 'scenario', argsf],
                      env=env, check=True, capture_output=True, text=True).stdout
refB_loop = {f: open(os.path.join(refB, f)).read() for f in os.listdir(refB) if f.startswith(LOOP)}
steps, f2 = drive('scenario', os.path.join(T, 'promptsB'), 'coherence/repair-V03-r1')
okB = compare('B: every branch', os.path.join(T, 'promptsB'), refB_loop) and f2
endB = json.loads(outB)
logB = open(os.path.join(T, 'docs/validation/coherence/driver/log.md')).read()
print(f'[B] driver steps {steps}; injected failure re-planned: {f2}; original returned repair_rounds {endB["repair_rounds"]}, history {endB["material_history"]}, validator rounds {endB["validator_rounds"]}')
print('\n'.join(l for l in logB.splitlines() if 'verify round' in l or 'validator' in l or 'adjudicated' in l or 'DONE' in l))
okB = okB and f'"repair_rounds": {endB["repair_rounds"]}' in logB and json.dumps(endB['material_history']) in logB
print('SELFTEST', 'PASS' if okA and okB else 'FAIL')
sys.exit(0 if okA and okB else 1)
