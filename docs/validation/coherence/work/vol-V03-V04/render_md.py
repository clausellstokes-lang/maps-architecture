#!/usr/bin/env python3
import json
ROOT='/Users/cstokes/Desktop/Maps'
d=json.load(open(f'{ROOT}/docs/validation/coherence/inventory-vol-V03-V04.json'))
o=[]; A=o.append
A('# Inventory — design volumes V03 (interiors) and V04 (underground) (coherence/inventory-vol-V03-V04)\n')
A('PROGRESS')
A('- working store: docs/validation/coherence/work/vol-V03-V04/ (items.jsonl, findings.jsonl, add.py, fixf.py, decisions.py, refs.py, build.py, render_md.py); this file and inventory-vol-V03-V04.json are generated from it')
for v,s in d['source'].items(): A(f"- source {v}: {s['file']} ({s['lines']} lines, {s['words']} words, md5 {s['md5'][:8]})")
A('- [x] V03 read whole and inventoried (§0-§13, integration notes, reconciliation rounds 1-6, finalization)')
A('- [x] V04 read whole and inventoried (§0-§13, integration notes, reconciliation rounds 1-6 and continuations, finalization)')
A('- [x] cross-reference census and resolution (script: work/vol-V03-V04/refs.py)')
A('- [x] restatements, internal conflicts, wiring gaps, elegance, edges, g-item and J122 routing')
A('- [x] generated .json and .md; results file; LANDED\n')
c=d['counts']
A('## Summary\n')
A(f"{c['items']} inventory items ({c['facts']} facts, {c['terms']} defined terms): V03 {c['by_volume']['V03']['items']}, V04 {c['by_volume']['V04']['items']}. "
  f"{c['findings']} findings ({c['by_severity'].get('major',0)} major, {c['by_severity'].get('minor',0)} minor), {c['restatements']} restatements of facts owned elsewhere. "
  "Every volume, id, test, BCR and amendment reference resolves; the only misdirected references are V04's bare self-references (BREF V04-1). ")
A("The majors: V03 and V04 still present their owner questions as open although J122 decided them (MISSING V03-1, V04-2; DEFER V03-3, V04-1); g item 113 names V04 and V04 carries none of it (MISSING V04-1); the grade-face hook between V03 §3.12 (9) and V04's arch vaults has no producer (WGAP V04-4); V04's VTT export rule, its bar T-V4-28 and BCR-16 contradict each other on portals (ICONF V04-3); V04's access-closure edges lack bars (WGAP V04-2); the fate of L5's dug pieces when the dossier removes their institution is undefined (EDGE V04-1).\n")
A('Word counts and narration (the shrink goal\'s NARRATION source; inventory only, nothing was edited):\n')
A('| volume | words | narration ranges (lines: words) | narration words | share |'); A('|---|---|---|---|---|')
for v,s in d['source'].items():
    A(f"| {v} | {s['words']} | "+'; '.join(f"{x['lines']}: {x['words']} ({x['what']})" for x in s['narration_ranges'])+f" | {s['narration_words']} | {s['narration_share']} |")
A('\nBeyond these ranges, narration also sits inside normative text (seam and critique tags in rows, tests and decisions; amended-decision layers; stale totals) — see the NARR findings. Restatement (the other large shrink source) is listed below and in the DUP findings.\n')
A('## Item counts by kind\n')
A('| kind | V03 | V04 |'); A('|---|---|---|')
ks=sorted(set(c['by_volume']['V03']['by_kind'])|set(c['by_volume']['V04']['by_kind']))
for k in ks: A(f"| {k} | {c['by_volume']['V03']['by_kind'].get(k,0)} | {c['by_volume']['V04']['by_kind'].get(k,0)} |")
A('\n## Findings\n')
A('Severity follows the finding standard; majors first within each class. Each names its items (ids below).\n')
order=[('missing_parts','Missing parts (g items after the volumes pass; J122 decisions)'),('internal_conflicts','Internal conflicts'),('cross_part_conflicts','Conflicts and open hand-offs between units'),('wiring_gaps','Wiring gaps'),('edges_observed','Edges without a defined outcome or test'),('deferral_wording','Deferral wording'),('broken_references','Broken or misdirected references'),('internal_duplications','Internal duplications (principle (1))'),('restatement_findings','Restatement findings'),('elegance_candidates','Elegance candidates (principle (9))'),('terminology','Terminology (principle (2))'),('narration','Narration (principle (5))')]
for k,t in order:
    L=sorted(d[k],key=lambda f:(0 if f['severity']=='major' else 1,f['id']))
    A(f'### {t} ({len(L)})\n')
    for f in L:
        A(f"- **{f['id']}** ({f['severity']}) — where: {f['where']}. {f['claim']} *Required:* {f['hint']} Items: {', '.join(f['items']) or '—'}.")
    A('')
A('## Restatements (a fact stated here whose canonical home is elsewhere)\n')
A('| item | canonical home | fact |'); A('|---|---|---|')
for r in d['restatements']: A(f"| {r['item']} | {r['canonical_home']} | {r['fact']} |")
A('\n## Reference census\n')
A(d['reference_census']['method']+'\n')
for v,cc in d['reference_census']['by_volume'].items(): A(f"- {v}: "+', '.join(f'{k} {n}' for k,n in cc.items()))
A('\n'+d['reference_census']['bcr_to_f_items']+'\n')
A('## g items 111+ and J121/J122 routing\n'); A(d['g_items_routing']['note']+'\n')
A('## Items\n')
A('Each item: id (kind, § of the volume; owner — this volume, the base section it belongs to, or another volume) statement. **Reads/produced by:** … **Used by:** … (ids, volume sections as V0x-§, base sections as "base §"). Decisions carry their id and where the volume cites them; tests are grouped by table rows.\n')
cur=None
for it in d['items']:
    v=it['id'][:3]
    if v!=cur:
        cur=v; A(f"\n### {v}\n")
    A(f"- **{it['id']}** ({it['kind']}, §{it['sec']}; owner {it['owner']}) {it['statement']} **Reads:** {'; '.join(it['reads']) or '—'}. **Used by:** {'; '.join(it['used_by']) or '—'}.")
open(f'{ROOT}/docs/validation/coherence/inventory-vol-V03-V04.md','w').write('\n'.join(o)+'\n')
print('written', sum(len(x) for x in o))
