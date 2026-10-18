import glob, json, os, re, sys
SP = os.path.dirname(os.path.abspath(__file__))
OUT = '/home/user/maps-architecture/workflows/lane-prompts/coherence-cloud'
REWRITE = {"key":"string","dir":"string","old_kb":"number","new_kb":"number","facts_mapped":"number","facts_unmapped":"number","f_applied":"array of strings","conflicts_resolved":"number","cross_notes":"array of strings"}
ASSEMBLE = {"file":"string","old_kb":"number","new_kb":"number","broken_references":"number","doc_check_hits":"number","unplaced":"array of strings"}
CHECK = {"key":"string","file":"string","issues":"array of {id: string, severity: 'blocker'|'major'|'minor', kind: string, claim: string, required_change: string, owner: string (one unit key)}"}
REPAIR = {"unit":"string","file":"string","blocks":"number","ruling_requests":"number"}
ADJ = {"file":"string","rulings":"number"}
def schema_for(label):
    k = label.split('/', 1)[1]
    if k.startswith('rewrite-'): return REWRITE
    if k.startswith('assemble-'): return ASSEMBLE
    if k.startswith('verify-') or k.startswith('validate-'): return CHECK
    if k.startswith('repair-'): return REPAIR
    if k.startswith('adjudicate-'): return ADJ
    return None
def addendum(label, schema):
    key = label
    res = key.replace('/', '_')
    return f"""

ORCHESTRATION NOTES (added 2026-09-30 by the orchestrating session; they change no design rule above):
- This seat belongs to the coherence pass continued in a CLOUD checkout at /home/user/maps-architecture (the paused run wf_4465b207-520 relaunched seat by seat by the orchestrating session, since the Workflow harness is not available here). Every seat runs on Opus (owner, 2026-09-30: "opus 5.5 running everything"); the stand-in notice above applies.
- Other seats run AT THE SAME TIME in this same folder. Write only your own outputs; append to docs/lane-events.log only with >> (one line at a time); never rewrite or truncate a shared file.
- Git: run NO git command that changes state (add, commit, stash, checkout, switch, reset, restore, clean, rebase, merge, pull, push); the orchestrator commits and pushes. Read-only git (status, diff, log, show) is fine.
- Do NOT run tools/progress.py or tools/lanes.py (in this checkout progress.py would rewrite docs/PROGRESS.md's tables from files that exist only on the owner's Mac); append hand-log lines to docs/PROGRESS.md's hand log by hand if your brief asks for one.
- The reference corpus kept on the owner's Mac (captures/, research/patreon, research/devlogs, research/ftg-docs, research/external) is absent here: docs/validation/bench/doc_checks.py then warns that its result is NOT authoritative; record that warning with the counts, and treat the result as provisional.
- Scratch: {SP}/coherence/ (make it). The Mac scratch paths named in earlier CHECKPOINT lines are gone; recompute anything you need from files in the repository.
- RETURN: save your structured result to docs/validation/coherence/results/{res}.json before the LANDED line (the brief's SAVE YOUR RETURN rule), and make your FINAL MESSAGE exactly that JSON object and nothing else. Its fields: {json.dumps(schema)}.
"""
os.makedirs(OUT, exist_ok=True)
n = 0
for p in sorted(glob.glob(os.path.join(SP, 'prompts', '*.prompt.txt'))):
    txt = open(p).read()
    head, body = txt.split('\n\n', 1)
    label = re.search(r'LABEL (\S+)', head).group(1)
    sc = schema_for(label)
    if sc is None: continue
    open(os.path.join(OUT, os.path.basename(p)), 'w').write(body.rstrip('\n') + addendum(label, sc))
    n += 1
print(n, 'briefs')
