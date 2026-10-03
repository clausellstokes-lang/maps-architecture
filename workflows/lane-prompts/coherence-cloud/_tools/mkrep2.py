# Render the round-2 repair briefs (one per unit with issues) from repair-in-r2/<unit>.json via prompts.mjs + finalize.py.
import json, glob, os, subprocess
SP = os.path.dirname(os.path.abspath(__file__))
R = 2
RULINGS = 'docs/validation/coherence/adjudication-r2.md'
os.makedirs(f'{SP}/rr2/rep', exist_ok=True)
for f in sorted(glob.glob(f'{SP}/repair-in-r2/*.json')):
    u = os.path.basename(f)[:-5]
    issues = json.load(open(f))
    gids = [i['id'] for i in issues if i['id'].startswith('G1')]
    a = {'unit': u, 'round': R, 'issues': issues, 'rulingsFile': RULINGS}
    json.dump(a, open(f'{SP}/rr2/rep/{u}.json', 'w'))
    subprocess.run(['node', f'{SP}/prompts.mjs', 'repair', f'{SP}/rr2/rep/{u}.json', f'{SP}/rr2/rep/{u}.raw.txt'], check=True, capture_output=True)
    note = f"""

ROUND-2 NOTES (orchestrator, 2026-10-01): (1) The issue list above is every finding of verify round 1 (all twenty seats; files docs/validation/coherence/verify-<key>-r1t.md — the brief's 'verify-*-r1.md' are these, with the `t` tag) routed to your unit; each issue's `reported_by` names its sources. Identical ids from several verifiers are merged: an issue's `also_reported` holds the other verifiers' versions — satisfy every one of them. Different ids may describe one defect: fix it once and list every id it closes in your report. (2) BINDING RULINGS: docs/validation/coherence/adjudication-r2.md (written by the adjudicator before this round) rules round 1's ruling requests and every recurring or ping-pong issue; where a ruling concerns your unit it overrides a verifier's required change, and an issue it rules INVALID is closed — note it in your report, write no block for it. (3) OWNER ITEMS. Your G-issues ({', '.join(gids) if gids else 'none'}) are new design, not defects: write your unit's part of each at build depth as the dated canon ruling routes it and as the item's text in docs/AMENDMENTS-2026-09-28g.md states it (read the item whole: 120 Find; 121 the resolution adjuster; 122 crisis looks, with 122 (h)–(i) forces and framing; 123 ruined plans amended, never redrawn; 124 intermittent light weather; 125 the dossier the only data input; 126 the map on tablets and desktops only) — an addition, never a change of another decision; cite a shape another unit owns, never restate it; give each part its wiring, lifecycle, edge, test and decision rows where your unit keeps such rows. (4) Item 126 (no map view on a phone) supersedes every phone clause: drop a phone bottom sheet, a phone default or a phone-viewport fixture from any required change you apply. (5) An `orchestrator_note` on an issue is binding (an owner rule decides it). (6) Several units repair at the same time: write blocks only for your own unit's sections; prefer subsection blocks (REPLACE / INSERT AFTER / APPEND TO SECTION) over a whole-volume REPLACE, which is for a change to the head text only. Check your blocks apply cleanly to the live files (assemble-r1's output) on a copy before you land."""
    raw = open(f'{SP}/rr2/rep/{u}.raw.txt').read().rstrip('\n') + note
    open(f'{SP}/rr2/rep/{u}.full.txt', 'w').write(raw)
    r = subprocess.run(['python3', f'{SP}/finalize.py', f'coherence/repair-{u}-r{R}', f'{SP}/rr2/rep/{u}.full.txt'], check=True, capture_output=True, text=True)
    print(u, len(issues), r.stdout.strip().split()[-1])
