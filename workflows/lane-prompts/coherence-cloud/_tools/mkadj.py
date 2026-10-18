# Render coherence/adjudicate-r2's brief: the workflow's adjudicate template (prompts.mjs) with a compact work index,
# the full per-unit issue files copied into the repo for the seat to read.
import json, glob, os, subprocess, shutil, sys
SP = os.path.dirname(os.path.abspath(__file__))
ROOT = '/home/user/maps-architecture'
W = f'{ROOT}/docs/validation/coherence/work/round2-work'
os.makedirs(W, exist_ok=True)
for f in glob.glob(f'{SP}/repair-in-r2/*.json'): shutil.copy(f, W)
work = []
for f in sorted(glob.glob(f'{W}/*.json')):
    for i in json.load(open(f)):
        work.append({'id': i['id'], 'owner': i['owner'], 'severity': i.get('severity'), 'kind': i.get('kind'), 'reported_by': i.get('reported_by','')[:60]})
raw1 = int(sys.argv[1])
args = {'round': 2, 'history': [501, raw1], 'work': work}
json.dump(args, open(f'{SP}/rr2/adj-args.json', 'w'))
subprocess.run(['node', f'{SP}/prompts.mjs', 'adjudicate', f'{SP}/rr2/adj-args.json', f'{SP}/rr2/adjudicate-r2.raw.txt'], check=True)
note = f"""

ROUND-2 NOTES (orchestrator, 2026-10-01): (1) THE WORK LIST ABOVE IS AN INDEX. Each issue's full text (claim, required change, every reporter's version under `also_reported`, any `orchestrator_note`) is in docs/validation/coherence/work/round2-work/<unit>.json — read the files of every issue you rule on, whole. Identical (owner, id) pairs from several verifiers are merged there; issues with different ids describing one defect are not, so look for ping-pong and duplicates across units. (2) The history: round 0's verify found 501 issues; round 1's verify (all twenty seats: the six base parts, the six volume pairs, six agreement seams and two edge groups, files verify-*-r1t.md) found {raw1} before merging. The adjudication runs this round because round 1's repair files carry RULING REQUESTS: VDC0-33 (repair-r1-determinism.md), VAT-20 (repair-r1-V10.md) and VV78-21 (repair-r1-V07.md); V02 also asks you to confirm J-V2.109 as the shed ruling E-27 left open (VV12-08, repair-r1-V02.md HAND-OFFS). Rule each INVALID (closed for good) or FIX (the required change). (3) Look especially for: issues that recur from round 0 at a new home (a hand-off one repair made that its receiver did not carry — rule which unit states the fact and who references it); a canon ruling that cannot be satisfied as written; and the round-1 verifiers' findings that touch owner rules — VEW-r1-05 (item 116's zoom-out limit at the METROPOLIS cap: the program's interpretation \"the whole bounds visible\" cannot hold on a small window; the owner's own words were \"set a ceiling to the maximum zoom, or a ceiling to the amount of total land to render\"; you may rule within the program's interpretation under J122, never against the owner's words) and VV56-r1-05 (item 124: arid land gets \"definetly no snow\" — the owner's words, which win over a viewer's `snow`). (4) The owner rules filed after round 0's verify — file g items 120–126 (J133–J140), each routed by a dated ruling at the end of canon.md — are new design, not defects; their parts appear as G120–G126 issues per unit. Item 126 (no map view on a phone; tablets and desktops only) supersedes the phone clauses of items 120 (j) and 124 (g) and of any issue that asks for a phone sheet, a phone default or a phone viewport fixture: rule those clauses moot. (5) Write BINDING RULINGS for the repair round to apply, one entry per ruling, each naming the issue ids it governs, the single correct text or decision, the unit that states it and what the others reference; append any canon change to canon.md as a dated ruling. Keep the file practical for eighteen repair seats: a table of contents by unit at the top."""
raw = open(f'{SP}/rr2/adjudicate-r2.raw.txt').read().rstrip('\n') + note
open(f'{SP}/rr2/adjudicate-r2.full.txt', 'w').write(raw)
subprocess.run(['python3', f'{SP}/finalize.py', 'coherence/adjudicate-r2', f'{SP}/rr2/adjudicate-r2.full.txt'], check=True)
print('work', len(work))
