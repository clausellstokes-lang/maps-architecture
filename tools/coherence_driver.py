#!/usr/bin/env python3
"""Drive the verify → repair → validate loop of workflows/18-coherence.js one step at a time, from outside the script.

Why: the workflow harness runs at most (CPUs − 2) agents at once per run, so on a small machine one run of the whole
script crawls. Here each step of the loop is one or more Workflow runs side by side (each a copy of the script with that
step's args embedded, stage mode), and the loop's state lives on disk, so any session can pick it up.

The loop is the script's own (its `outer:` loop and `repairRound`): the same seats, prompts, labels, rounds, caps, stall
rule and ruling requests. The driver never re-implements the script's rules for units: owner normalisation, touched units,
MATERIAL and the caps come from the script itself through tools/coherence_eval.mjs. One deliberate difference: a seat that
fails (returns nothing) is re-run before the loop moves on, where the script would drop it silently.

  python3 tools/coherence_driver.py init            # check every rewrite LANDED; the loop starts at assemble round 0
  python3 tools/coherence_driver.py plan [--runs 3] # write the current step's run scripts; print their paths
  python3 tools/coherence_driver.py ingest RUNID …  # read those runs' journals; re-plan failed seats or advance
      [--operator FILE]                            # (verify steps) hand-confirmed findings no seat raised join the step
  python3 tools/coherence_driver.py peek RUNID …    # (verify steps) write the issues returned so far, for that review
  python3 tools/coherence_driver.py status          # where the loop stands
  python3 tools/coherence_driver.py stop REASON     # end the loop by a ruling before its own exit (J127)
"""
import glob, json, os, re, subprocess, sys

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPT = os.path.join(BASE, 'workflows', '18-coherence.js')
ARGS_FILE = os.path.join(BASE, 'workflows', 'lane-prompts', 'coherence-cloud-args.json')
DDIR = os.path.join(BASE, 'docs', 'validation', 'coherence', 'driver')
STATE = os.path.join(DDIR, 'state.json')
LOG = os.path.join(DDIR, 'log.md')
EVENTS = os.path.join(BASE, 'docs', 'lane-events.log')
JOURNAL_GLOB = os.path.expanduser('~/.claude/projects/*/*/subagents/workflows/{run}/journal.jsonl')
UNITS18 = ['model', 'kernel', 'pipeline', 'determinism', 'rendering', 'scope'] + [f'V{i:02d}' for i in range(1, 13)]
# relative cost of a seat, for spreading a step over runs (inventory sizes; seams and edge groups by their member count)
WEIGHT = {'scope': 1684, 'pipeline': 806, 'model': 609, 'determinism': 570, 'rendering': 560, 'kernel': 348,
          'vol-V01-V02': 1144, 'vol-V03-V04': 839, 'vol-V05-V06': 1020, 'vol-V07-V08': 497, 'vol-V09-V10': 1861,
          'vol-V11-V12': 1050, 'agree-fabric': 1100, 'agree-layers': 1000, 'agree-time': 1200, 'agree-host': 900,
          'agree-tools': 800, 'agree-proof': 1500, 'edges-world': 1400, 'edges-life': 1300}


def evaluate(stage):
    out = subprocess.run(['node', os.path.join(BASE, 'tools', 'coherence_eval.mjs'), json.dumps(stage)], capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


def load():
    return json.load(open(STATE))


def save(st):
    os.makedirs(DDIR, exist_ok=True)
    tmp = STATE + '.tmp'
    json.dump(st, open(tmp, 'w'), indent=1, ensure_ascii=False)
    os.replace(tmp, STATE)


def log(st, msg):
    print(msg)
    os.makedirs(DDIR, exist_ok=True)
    with open(LOG, 'a') as f:
        f.write(f'- step {st["n"]}: {msg}\n')


def landed(key):
    pat = re.compile(r'\s' + re.escape(key) + r' LANDED\b')
    return any(pat.search(l) for l in open(EVENTS))


# ── the step the loop is at ─────────────────────────────────────────────────────────────────────────────────────────

def seats(st):
    """(label, unit) of every seat the current step runs."""
    pc, r = st['pc'], st['round']
    if pc == 'assemble':
        return [(f'coherence/assemble-r{r}', None)]
    if pc == 'verify':
        tag = 's' if st['sweep'] else 't'
        return [(f'coherence/verify-{u}-r{r}{tag}', u) for u in st['units']]
    if pc == 'adjudicate':
        return [(f'coherence/adjudicate-r{r}', None)]
    if pc == 'repair':
        return [(f'coherence/repair-{o}-r{r}', o) for o in st['owners']]
    if pc == 'validate':
        return [(f'coherence/validate-v{st["vround"]}', None)]
    return []


def stage_args(st, units):
    pc, r = st['pc'], st['round']
    if pc == 'assemble':
        return {'kind': 'assemble', 'round': r}
    if pc == 'verify':
        return {'kind': 'verify', 'round': r, 'tag': 's' if st['sweep'] else 't', 'units': units}
    if pc == 'adjudicate':
        return {'kind': 'adjudicate', 'round': r, 'history': st['history'], 'work': st['work']}
    if pc == 'repair':
        return {'kind': 'repair', 'round': r, 'owners': units, 'rulingsFile': st['rulingsFile'],
                'work': [i for i in st['work'] if i['owner'] in units]}
    if pc == 'validate':
        return {'kind': 'validate', 'vround': st['vround'], 'material': st['material'], 'rulingsFile': st['rulingsFile']}
    raise SystemExit(f'nothing to plan at pc={pc}')


def split(st, todo, runs):
    """Spread the seats over runs, heaviest first, each to the lightest run (only verify and repair have several)."""
    if st['pc'] not in ('verify', 'repair') or len(todo) <= 1:
        return [todo]
    w = (lambda u: WEIGHT.get(u, 1000)) if st['pc'] == 'verify' else (lambda u: sum(1 for i in st['work'] if i['owner'] == u))
    bins = [[] for _ in range(min(runs, len(todo)))]
    load_ = [0] * len(bins)
    for u in sorted(todo, key=lambda u: (-w(u), todo.index(u))):
        k = load_.index(min(load_))
        bins[k].append(u)
        load_[k] += w(u)
    return [b for b in bins if b]


def describe_step(st):
    pc = st['pc']
    if pc == 'verify':
        return f'verify round {st["round"]} ({"full sweep" if st["sweep"] else "repaired units"})'
    if pc == 'validate':
        return f'validator round {st["vround"]}'
    return f'{pc} round {st["round"]}'


def plan(st, runs):
    if st['pc'] == 'done':
        raise SystemExit('the loop is done')
    have = st['step'].setdefault('results', {})
    todo = [u for (label, u) in seats(st) if label not in have]
    if not todo:
        raise SystemExit('every seat of this step has a result: run ingest')
    src = open(SCRIPT).read()
    head, body = src.split('\nconst ARGS = ', 1)
    body = 'const ARGS = ' + body
    assert body.startswith("const ARGS = (typeof args === 'object' && args) ? args : {}\n")
    body = body.replace("const ARGS = (typeof args === 'object' && args) ? args : {}\n", 'const ARGS = __STEP_ARGS\n', 1)
    base = json.load(open(ARGS_FILE))
    scratch = base['scratch']
    sdir = os.path.join(scratch, 'driver-steps')
    os.makedirs(sdir, exist_ok=True)
    groups = split(st, todo, runs)
    phase_title = {'assemble': 'Assemble', 'verify': 'Verify', 'adjudicate': 'Adjudicate', 'repair': 'Repair', 'validate': 'Validate'}[st['pc']]
    paths = []
    st['step']['attempt'] = st['step'].get('attempt', 0) + 1
    for k, g in enumerate(groups):
        a = dict(base)
        a['maxLanes'] = 2
        a['stage'] = stage_args(st, [u for u in g if u is not None])
        what = ', '.join(u for u in g if u) or 'one seat'
        desc = f'Coherence pass, driver step {st["n"]} ({describe_step(st)}), run {k + 1} of {len(groups)}: {what}'
        meta = ('export const meta = {\n  name: ' + json.dumps(f'coherence-step-{st["n"]}-{k + 1}') + ',\n  description: ' + json.dumps(desc)
                + ',\n  phases: [{ title: ' + json.dumps(phase_title) + ' }],\n}\n')
        p = os.path.join(sdir, f'step-{st["n"]:03d}-a{st["step"]["attempt"]}-{k + 1}.js')
        open(p, 'w').write(meta + 'const __STEP_ARGS = ' + json.dumps(a, ensure_ascii=False) + '\n' + body)
        paths.append(p)
    st['step']['planned'] = paths
    save(st)
    print(f'step {st["n"]}: {describe_step(st)} — {len(todo)} seat(s) in {len(paths)} run(s)')
    for p, g in zip(paths, groups):
        print(f'  {p}  ({", ".join(u for u in g if u) or "one seat"})')


# ── reading what the runs returned ──────────────────────────────────────────────────────────────────────────────────

def journal_results(run):
    files = glob.glob(JOURNAL_GLOB.format(run=run))
    if not files:
        raise SystemExit(f'no journal for {run}')
    started, out = {}, {}
    for line in open(files[0]):
        e = json.loads(line)
        if e.get('type') == 'started':
            started[e.get('key')] = e.get('label')
            started[e.get('agentId')] = e.get('label')
        elif e.get('type') not in ('launched', 'started'):
            label = e.get('label') or started.get(e.get('key')) or started.get(e.get('agentId'))
            if not label:
                continue
            val = None
            for k in ('result', 'value', 'output', 'returnValue'):
                if k in e:
                    val = e[k]
                    break
            if isinstance(val, str):
                try:
                    val = json.loads(val)
                except ValueError:
                    pass
            if val or label not in out:   # an error line never overwrites a result
                out[label] = val
    return out


def collect(st, runs):
    have = st['step'].setdefault('results', {})
    want = [label for (label, _) in seats(st)]
    for run in runs:
        for label, val in journal_results(run).items():
            if label in want and val:
                have[label] = val
    return have, want


def peek(st, runs):
    """Write every issue the current verify step's seats have returned so far (nothing advances) for review."""
    have, want = collect(st, runs)
    issues = [dict(i, reported_by=have[l].get('key')) for l in want if l in have for i in (have[l].get('issues') or []) if i]
    out = os.path.join(DDIR, f'peek-step{st["n"]:03d}.json')
    json.dump(issues, open(out, 'w'), indent=1, ensure_ascii=False)
    print(f'{len([l for l in want if l in have])}/{len(want)} seats returned; {len(issues)} issues → {out}')


def ingest(st, runs, operator=None):
    have, want = collect(st, runs)
    missing = [l for l in want if l not in have]
    st['step'].setdefault('runs', []).extend(runs)
    if missing:
        save(st)
        log(st, f'{describe_step(st)}: {len(missing)} seat(s) returned nothing ({", ".join(missing)}) — plan again to re-run only those')
        return
    results = [have[l] for l in want]
    if operator:
        # findings the session confirmed by hand that no seat raised (docs/validation/coherence/driver/watch.md): they join
        # this verify step's issues as one more check, reported by 'operator', so the zero bar covers them
        if st['pc'] != 'verify':
            raise SystemExit('operator findings join a verify step only')
        ops = json.load(open(operator))
        for i in ops:
            assert all(k in i for k in ('id', 'severity', 'kind', 'claim', 'required_change', 'owner')), i
        results.append({'key': 'operator', 'file': os.path.relpath(operator, BASE), 'issues': ops})
        log(st, f'{len(ops)} operator finding(s) from {os.path.relpath(operator, BASE)} join {describe_step(st)}: {", ".join(i["id"] for i in ops)}')
    advance(st, results, [u for (_, u) in seats(st)])


def begin_repair(st, work):
    """The script's repairRound up to its seats: round + 1, owners normalised, adjudicate when ruled so."""
    st['round'] += 1
    owners_norm = evaluate({'kind': 'describe', 'owners': [i.get('owner') for i in work]})['owners']
    work = [dict(i, owner=o) for i, o in zip(work, owners_norm)]
    st['work'] = work
    st['owners'] = list(dict.fromkeys(i['owner'] for i in work))
    h = st['history']
    st['pc'] = 'adjudicate' if (st['pendingRequests'] > 0 or (len(h) >= 3 and h[-1] >= h[-3])) else 'repair'


def next_step(st):
    st['n'] += 1
    st['step'] = {}


def advance(st, results, units):
    rules = evaluate({'kind': 'describe'})
    cap, vcap = rules['cap'], rules['vcap']
    pc = st['pc']
    if pc == 'assemble':
        st['asm'] = results[0]
        a = results[0]
        log(st, f'assembled round {st["round"]}: {round(a.get("old_kb", 0))} KB → {round(a.get("new_kb", 0))} KB; broken references {a.get("broken_references")}; doc-check hits {a.get("doc_check_hits")}; unplaced {len(a.get("unplaced") or [])}')
        if st['round'] == 0:
            st['units'], st['sweep'] = [u['key'] for u in rules['units']], True
        else:
            st['units'], st['sweep'] = evaluate({'kind': 'describe', 'touched': st['owners']})['touched'], False
        st['pc'] = 'verify'
    elif pc == 'verify':
        issues = [dict(i, reported_by=c.get('key')) for c in results for i in (c.get('issues') or []) if i]
        mat_flags = evaluate({'kind': 'describe', 'issues': issues})['material']
        material = [i for i, m in zip(issues, mat_flags) if m]
        st['issues'], st['material'] = issues, material
        st['history'].append(len(material))
        sev = ', '.join(f'{sum(1 for i in issues if i.get("severity") == x)} {x}' for x in ('blocker', 'major', 'minor'))
        log(st, f'verify round {st["round"]} ({"full sweep" if st["sweep"] else "repaired units"}): {len(issues)} issues, {len(material)} material ({sev})')
        if not material:
            if st['sweep']:
                st['pc'] = 'validate'
            else:
                st['units'], st['sweep'] = [u['key'] for u in rules['units']], True
        elif st['round'] >= cap:
            log(st, f'CAP of {cap} repair rounds reached with {len(material)} material issues left — they go to the validator and the owner summary, not silently dropped')
            st['pc'] = 'validate'
        else:
            begin_repair(st, material + [i for i, m in zip(issues, mat_flags) if not m])
    elif pc == 'adjudicate':
        if results[0] and results[0].get('file'):
            st['rulingsFile'] = results[0]['file']
        log(st, f'adjudicated round {st["round"]}: rulings in {st["rulingsFile"]}')
        st['pc'] = 'repair'
    elif pc == 'repair':
        st['pendingRequests'] = sum((r or {}).get('ruling_requests') or 0 for r in results)
        log(st, f'repair round {st["round"]}: {len(results)} unit(s) repaired ({", ".join(units)}); {st["pendingRequests"]} ruling request(s)')
        st['pc'] = 'assemble'
    elif pc == 'validate':
        fin = results[0] or {}
        vissues = [i for i in (fin.get('issues') or []) if i]
        flags = evaluate({'kind': 'describe', 'issues': vissues})['material']
        vmat = [i for i, m in zip(vissues, flags) if m]
        log(st, f'validator round {st["vround"]}: {len(vmat)} material issues')
        if not vmat:
            st['pc'] = 'done'
        elif st['vround'] >= vcap or st['round'] >= cap:
            log(st, f'validator still finds {len(vmat)} material issues at the caps (validator {vcap}, repair {cap}) — reported for the owner')
            st['material'] = vmat
            st['pc'] = 'done'
        else:
            st['vround'] += 1
            begin_repair(st, vmat)   # the outer loop's re-entry: repair the validator's findings, then verify the touched units
    next_step(st)
    save(st)
    if st['pc'] == 'done':
        summary = {'repair_rounds': st['round'], 'material_history': st['history'], 'validator_rounds': st['vround'] + 1,
                   'material_left': len(st['material']), 'minors_left': sum(1 for i in st['issues'] if not i)}
        log(st, f'DONE: {json.dumps(summary)}')
    else:
        print(f'next: step {st["n"]} — {describe_step(st)}')


def init():
    if os.path.exists(STATE):
        raise SystemExit(f'{STATE} exists: the loop has started (use status)')
    missing = [u for u in UNITS18 if not landed(f'coherence/rewrite-{u}')]
    nores = [u for u in UNITS18 if not os.path.exists(os.path.join(BASE, 'docs', 'validation', 'coherence', 'results', f'coherence_rewrite-{u}.json'))]
    if missing or nores:
        raise SystemExit(f'not every unit was rewritten — no LANDED line: {missing}; no results file: {nores}')
    st = {'n': 1, 'pc': 'assemble', 'round': 0, 'sweep': True, 'units': [], 'owners': [], 'work': [], 'history': [],
          'issues': [], 'material': [], 'rulingsFile': '', 'pendingRequests': 0, 'vround': 0, 'asm': None, 'step': {}}
    save(st)
    log(st, 'driver started: every rewrite LANDED; the loop begins at assemble round 0')


def stop(st, reason):
    """End the loop by the owner's word before its own exit (e.g. J127: one repair round, then build)."""
    if st['pc'] == 'done':
        raise SystemExit('the loop is already done')
    was = describe_step(st)
    st['pc'] = 'done'
    st['stopped'] = {'at_step': st['n'], 'next_was': was, 'reason': reason}
    save(st)
    summary = {'repair_rounds': st['round'], 'material_history': st['history'], 'validator_rounds': st['vround'],
               'stopped_before': was, 'reason': reason}
    log(st, f'STOPPED by ruling before {was}: {reason} — {json.dumps(summary, ensure_ascii=False)}')


def status(st):
    print(json.dumps({k: (v if k not in ('work', 'issues', 'material') else len(v)) for k, v in st.items() if k != 'step'}, ensure_ascii=False))
    print('step:', describe_step(st), '| results so far:', sorted(st['step'].get('results', {})), '| planned:', st['step'].get('planned'))


if __name__ == '__main__':
    cmd = sys.argv[1] if len(sys.argv) > 1 else 'status'
    if cmd == 'init':
        init()
    elif cmd == 'plan':
        runs = int(sys.argv[sys.argv.index('--runs') + 1]) if '--runs' in sys.argv else 3
        plan(load(), runs)
    elif cmd in ('ingest', 'peek'):
        rest = sys.argv[2:]
        op = None
        if '--operator' in rest:
            k = rest.index('--operator'); op = rest[k + 1]; rest = rest[:k] + rest[k + 2:]
        if cmd == 'peek':
            peek(load(), rest)
        else:
            ingest(load(), rest, op)
    elif cmd == 'stop':
        stop(load(), ' '.join(sys.argv[2:]) or 'stopped by the owner')
    else:
        status(load())
