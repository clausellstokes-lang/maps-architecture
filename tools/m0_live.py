#!/usr/bin/env python3
"""Probe for the filler run (owner 2026-10-05: "Give the idle agents other work").
Prints one JSON line: M0 live seats (latest 'started' per label with no result AND a transcript written in the
last 10 minutes), whether a steward/integration seat is live, available memory (MiB) and the 1-minute load."""
import json, os, sys, time
ROOT = '/home/cstokes111/Maps'
def probe():
    runs = json.load(open(os.path.join(ROOT, 'docs', 'ACTIVE-RUN.json'))).get('runs', [])
    live, now = [], time.time()
    for run in runs:
        j = run.get('journal')
        if not j or not os.path.exists(j):
            continue
        latest, done = {}, set()
        for line in open(j):
            try:
                e = json.loads(line)
            except Exception:
                continue
            if e.get('type') == 'started' and e.get('agentId'):
                latest[e.get('label', '?')] = e['agentId']
            elif e.get('type') == 'result' and e.get('agentId'):
                done.add(e['agentId'])
        d = os.path.dirname(j)
        for label, aid in latest.items():
            if aid in done:
                continue
            t = os.path.join(d, f'agent-{aid}.jsonl')
            if os.path.exists(t) and now - os.path.getmtime(t) < 600:
                live.append(label)
    mem = 0
    for line in open('/proc/meminfo'):
        if line.startswith('MemAvailable:'):
            mem = int(line.split()[1]) // 1024
    load = os.getloadavg()[0]
    steward = any(l.startswith('steward/') or l.startswith('check/integration') for l in live)
    return {'m0_live': len(live), 'labels': live, 'steward_or_integration': steward, 'mem_avail_mib': mem, 'load1': round(load, 2)}

arg = lambda k, d: type(d)(sys.argv[sys.argv.index(k) + 1]) if k in sys.argv else d
need, cap, wait = arg('--need', 0), arg('--cap', 5), arg('--wait', 0)
end = time.time() + wait
while True:
    r = probe()
    r['ok'] = r['m0_live'] + need <= cap and r['mem_avail_mib'] >= 4000 and r['load1'] < 14
    print(json.dumps(r), flush=True)
    if r['ok'] or time.time() >= end:
        break
    time.sleep(60)
