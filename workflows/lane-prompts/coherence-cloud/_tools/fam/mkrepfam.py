# Render the family fix pass's repair briefs (round 7's "7v" pass): one per unit with work in adjudication-r7v.md's Part H.
# Usage: python3 mkrepfam.py LABEL PREV unit1,unit2,...   (7v 7, then 7w 7v, ...)   (run from the scratchpad copy, beside prompts.mjs and finalize.py)
# The workflow's repair prompt is rendered for round 8 (so that "the previous round" is 7: verify-*-r7 and assemble-r7),
# then renamed to the fix pass's files: repair-r7v-<unit>.md, coherence/repair-<unit>-r7v, famverify-*-r7.md, adjudication-r7v.md.
import json, os, re, subprocess, sys
SP = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) if os.path.basename(os.path.dirname(os.path.abspath(__file__))) == 'fam' else os.path.dirname(os.path.abspath(__file__))
LBL = sys.argv[1]; PREV = sys.argv[2]   # e.g. 7v 7  (checks famverify-*-r7), or 7w 7v (checks famverify-*-r7v)
UNITS = [u for u in sys.argv[3].split(',') if u]
RULINGS = f'docs/validation/coherence/adjudication-r{LBL}.md'
D = f'{SP}/rr{LBL}/rep'; os.makedirs(D, exist_ok=True)
FAM = '/home/user/maps-architecture/docs/validation/coherence/results'
issues_by_unit = {}
for lens in ['table', 'generation', 'epochs', 'hand', 'readers', 'tests']:
    p = f'{FAM}/coherence_famverify-{lens}-r{PREV}.json'
    if not os.path.exists(p): continue
    for i in json.load(open(p))['issues']:
        owner = re.split(r'[\s(]', i.get('owner', '').strip())[0]
        i2 = dict(i); i2['reported_by'] = [f'coherence/famverify-{lens}-r{PREV}']
        issues_by_unit.setdefault(owner, []).append(i2)
for u in UNITS:
    issues = issues_by_unit.get(u, [])
    a = {'unit': u, 'round': 8, 'issues': issues, 'rulingsFile': RULINGS}
    json.dump(a, open(f'{D}/{u}.json', 'w'))
    subprocess.run(['node', f'{SP}/prompts.mjs', 'repair', f'{D}/{u}.json', f'{D}/{u}.raw.txt'], check=True, capture_output=True)
    raw = open(f'{D}/{u}.raw.txt').read().rstrip('\n')
    raw = (raw.replace(f'coherence/repair-{u}-r8', f'coherence/repair-{u}-r{LBL}').replace('repair-r8', f'repair-r{LBL}')
              .replace('adjudication-r8.md', f'adjudication-r{LBL}.md').replace('verify-*-r7.md', f'famverify-*-r{PREV}.md')
              .replace('-r8.json', f'-r{LBL}.json').replace('assemble-r7', 'assemble-r' + ('7' if PREV == '7' else PREV)))
    note = f"""

FAMILY FIX PASS NOTES (orchestrator, 2026-10-02). (1) This is round 7's family fix pass ("{LBL}"), not round 8: the issue list above is every finding the six family-focused checks (docs/validation/coherence/famverify-<lens>-r{PREV}.md: table, generation, epochs, hand, readers, tests) routed to your unit by its `owner` field; their ids are VF7-* or VF7v-* (and later passes' letters). Read the reporting check's file for an issue's full evidence. (2) BINDING RULINGS: {RULINGS}. Its table and its Part H under your unit's heading give each finding's disposition (FIX, VALID CHOICE PICKED, VALID CHOICE LISTED, MERGED, INVALID) and every END line other units' findings ask of your text, with exact words: write every FIX and every END as stated; write nothing for a VALID CHOICE LISTED, MERGED or INVALID issue (note it in your report). An issue routed to you that {RULINGS} assigns to another unit is that unit's. docs/validation/coherence/adjudication-r7.md and every earlier adjudication stay binding except where {RULINGS} supersedes an entry by name. (3) The family's LAWS now live in the design at §2.7's support step (6) ("§2.7's laws"); every other site cites them by law and clause number and never restates them (adjudication-r7.md's Part H head). The owner's rules J144 and J146 – J151 (docs/PROGRESS.md) bind; J150's round-8 hand-offs (a lock's behaviour under undo, redo, a re-grade or a repair; the two-axis lock itself and its readers outside the family) get NO text now. Never mark the program's reading of an owner's words as the owner's. (4) The live files are the last assemble's output (assemble-r{'7' if PREV == '7' else PREV}). Write blocks only for your own unit's sections; prefer subsection blocks (REPLACE / INSERT AFTER / APPEND TO SECTION) over a whole-volume REPLACE, and check they apply cleanly to a copy before you land. Several units repair at the same time: where a fix needs another unit's text, cite it and list a HAND-OFF. (5) Keep each change to what the finding needs; this pass should be small."""
    open(f'{D}/{u}.full.txt', 'w').write(raw + note)
    r = subprocess.run(['python3', f'{SP}/finalize.py', f'coherence/repair-{u}-r{LBL}', f'{D}/{u}.full.txt'], check=True, capture_output=True, text=True)
    print(u, len(issues), r.stdout.strip().split()[-1])
