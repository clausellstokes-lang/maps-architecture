#!/usr/bin/env python3
"""Report workflow seats that started but have written nothing for a while (a silent stall).

Reads docs/ACTIVE-RUN.json (the runs tools/lanes.py tracks), finds every agent a run's journal started without a result,
and prints `STALL <run> <label> <minutes>` when that agent's transcript (agent-<id>.jsonl beside the journal) has not
been written for --minutes (default 25). A long test run inside a seat keeps a child process busy but writes nothing,
so a seat whose transcript is silent is reported only when no process of this machine names its scratch folder or its
lane key either; the report is a prompt to look, not a verdict. Exit 0 always.
"""
import json, os, subprocess, sys, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIMIT = 25
if '--minutes' in sys.argv:
    LIMIT = int(sys.argv[sys.argv.index('--minutes') + 1])

try:
    runs = json.load(open(os.path.join(ROOT, 'docs', 'ACTIVE-RUN.json'))).get('runs', [])
except Exception:
    runs = []
try:
    ps = subprocess.run(['ps', '-axo', 'command'], capture_output=True, text=True).stdout
except Exception:
    ps = ''
now = time.time()
for run in runs:
    journal = run.get('journal')
    if not journal or not os.path.exists(journal):
        continue
    started, done = {}, set()
    for line in open(journal):
        try:
            e = json.loads(line)
        except Exception:
            continue
        if e.get('type') == 'started' and e.get('agentId'):
            started[e['agentId']] = e.get('label', '?')
        elif e.get('type') == 'result' and e.get('agentId'):
            done.add(e['agentId'])
    # a stop and resumeFromRunId re-starts a killed seat under the same label: only the latest agent per label is live
    latest = {label: aid for aid, label in started.items()}
    for aid, label in started.items():
        if aid in done or latest.get(label) != aid:
            continue
        t = os.path.join(os.path.dirname(journal), f'agent-{aid}.jsonl')
        if not os.path.exists(t):
            continue
        age = (now - os.path.getmtime(t)) / 60
        if age < LIMIT:
            continue
        slug = label.split('/')[-1]
        if slug and slug in ps:
            continue  # a process still names the seat (a long command in flight)
        print(f'STALL {run.get("runId", "?")} {label} {int(age)} min silent (agent {aid})')
