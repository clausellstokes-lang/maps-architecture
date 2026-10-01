# Render round-R repair briefs (R >= 3) from repair-in-rR/<unit>.json via prompts.mjs + finalize.py.
# Usage: python3 mkrep.py R [rulings-file]
import json, glob, os, subprocess, sys
SP = os.path.dirname(os.path.abspath(__file__))
R = int(sys.argv[1]); P = R - 1
RULINGS = sys.argv[2] if len(sys.argv) > 2 else f'docs/validation/coherence/adjudication-r{R}.md'
D = f'{SP}/rr{R}/rep'; os.makedirs(D, exist_ok=True)
EXTRA = [x for x in (sys.argv[3].split(',') if len(sys.argv) > 3 else []) if x]
for x in EXTRA:
    q = f'{SP}/repair-in-r{R}/{x}.json'
    if not os.path.exists(q): json.dump([], open(q, 'w'))
for f in sorted(glob.glob(f'{SP}/repair-in-r{R}/*.json')):
    u = os.path.basename(f)[:-5]
    issues = json.load(open(f))
    a = {'unit': u, 'round': R, 'issues': issues, 'rulingsFile': RULINGS}
    json.dump(a, open(f'{D}/{u}.json', 'w'))
    subprocess.run(['node', f'{SP}/prompts.mjs', 'repair', f'{D}/{u}.json', f'{D}/{u}.raw.txt'], check=True, capture_output=True)
    note = f"""

ROUND-{R} NOTES (orchestrator, 2026-10-01): (1) The issue list above is every finding of verify round {P} routed to your unit (files docs/validation/coherence/verify-<key>-r{P}t.md — the brief's 'verify-*-r{P}.md' are these, with the `t` tag); each issue's `reported_by` names its sources. Identical ids from several verifiers are merged: an issue's `also_reported` holds the other verifiers' versions — satisfy every one of them. Different ids may describe one defect: fix it once and list every id it closes in your report. Read the reporting verifier's file for an issue's full evidence where the claim is short. (2) BINDING RULINGS: {RULINGS} (written by the adjudicator before this round) — its PART H lists, under your unit's heading, the disposition of every issue routed to you (FIX, MERGED or INVALID: an issue ruled INVALID or MERGED is closed — note it in your report, write no block for it) and the END lines other units' issues ask of your text: write every END as stated, they are part of your work. The earlier adjudication files (docs/validation/coherence/adjudication-r2.md … adjudication-r{P}.md) stay binding except where {RULINGS} supersedes an entry by name. Where a ruling concerns your unit it overrides a verifier's required change. A verifier's required change that contradicts a ruling or an owner rule is not applied: say so in your report. (3) OWNER RULES FIRST: file g items 120–126 (docs/AMENDMENTS-2026-09-28g.md) and their dated canon routings decide; an issue about an owner-item part asks you to complete or correct that part as the item states it — an addition, never a change of another decision. Item 125: the dossier is the only SettlementForge data input; anything the dossier does not give, the map code supplies. Item 126 (a2): no map view on a phone at all — write no phone screen, notice, sheet, default or fixture. (4) An `orchestrator_note` on an issue is binding. (5) Several units repair at the same time: write blocks only for your own unit's sections; where the fix needs another unit's text, cite it and list a HAND-OFF; where two units each claim one fact and the rulings do not settle it, write a RULING REQUEST instead of a guess. Prefer subsection blocks (REPLACE / INSERT AFTER / APPEND TO SECTION) over a whole-volume REPLACE. The live files are assemble-r{P}'s output; check your blocks apply cleanly to them on a copy before you land. (6) This is a converging pass: fix the root cause so the finding cannot recur at a new home, and keep each change to what the finding needs."""
    raw = open(f'{D}/{u}.raw.txt').read().rstrip('\n') + note
    open(f'{D}/{u}.full.txt', 'w').write(raw)
    r = subprocess.run(['python3', f'{SP}/finalize.py', f'coherence/repair-{u}-r{R}', f'{D}/{u}.full.txt'], check=True, capture_output=True, text=True)
    print(u, len(issues), r.stdout.strip().split()[-1])
