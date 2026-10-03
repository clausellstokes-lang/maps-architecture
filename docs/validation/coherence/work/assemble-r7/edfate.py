#!/usr/bin/env python3
"""edfate.py (coherence/assemble-r7, P3b'; brief ROUND-7 NOTES (9) (f)) — read-only check, on the final copies (scratch
asm7/final), that §5.4's `reshaped` report entry, §7.1's `EditFate` (read by §7.3 and §11.2) and §2.7's law 4 (G2) agree
on the names the orchestrator accepted with determinism's RULING REQUEST E-D7: the entry's field is `reshape`, of type
`ReshapeChange`; `EditFate.change` is typed `ReshapeChange`; §2.7's "with `met` … and `change`, as §5.4's `reshaped`
entry's" stays (EditFate's field is `change`). Lists every other site of the set that names the `reshaped` entry's field
(a `change` or `reshape` within a sentence that names the `reshaped` entry). Writes edfate.json beside it."""
import glob, json, os, re
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm7/final'
W = os.path.dirname(os.path.abspath(__file__))
B = open(f'{SCR}/docs/ARCHITECTURE.md', encoding='utf-8').read().split('\n')
res = dict(checks={}, other_sites=[])
entry = [(i + 1, l) for i, l in enumerate(B) if "kind: 'reshaped'" in l]
rc = [(i + 1, l) for i, l in enumerate(B) if l.startswith('type ReshapeChange')]
ef = [(i + 1, l) for i, l in enumerate(B) if l.startswith('type EditFate')]
g2 = [(i + 1, l) for i, l in enumerate(B) if "`EditFate.fate` `'reshaped'`" in l]
c = res['checks']
c['entry'] = dict(lines=[n for n, _ in entry], field_reshape_typed=all('reshape: ReshapeChange' in l for _, l in entry) and len(entry) == 1,
                  no_change_field_in_variant=all(not re.search(r"\bchange\s*:", l.split("kind: 'reshaped'")[1]) for _, l in entry))
c['ReshapeChange'] = dict(lines=[n for n, _ in rc], defined_once=len(rc) == 1,
                          kinds=re.findall(r"'(\w+)'", rc[0][1].split('//')[0]) if rc else [])
c['EditFate'] = dict(lines=[n for n, _ in ef], change_typed=len(ef) == 1 and 'change?: ReshapeChange' in ef[0][1],
                     comment_points_at_reshape="entry's `reshape`" in ef[0][1] if ef else False, met_field='met?: Id' in ef[0][1] if ef else False)
g2txt = ' '.join(B[g2[0][0] - 1:g2[0][0] + 1]) if g2 else ''
c['law4_G2'] = dict(lines=[n for n, _ in g2], text=g2txt.strip()[:260],
                    names_met_and_change=('with `met`' in g2txt and 'and `change`, as §5.4' in g2txt))
# §5.4's ReportEntry common part still carries the dossier `change` (why the variant's field could not be `change`)
re_common = [(i + 1, l) for i, l in enumerate(B) if l.startswith('type ReportEntry')]
c['ReportEntry_common_change'] = dict(lines=[n for n, _ in re_common],
                                      next_line_dossier_change=bool(re_common) and 'change?: { changeId' in B[re_common[0][0]])
c['ok'] = (c['entry']['field_reshape_typed'] and c['entry']['no_change_field_in_variant'] and c['ReshapeChange']['defined_once']
           and c['EditFate']['change_typed'] and c['EditFate']['comment_points_at_reshape'] and c['law4_G2']['names_met_and_change'])
# other sites: any line of the set naming the `reshaped` entry with a field name (`change` / `reshape`) beside it
known = set(n for n, _ in entry + ef + g2)
for p in [f'{SCR}/docs/ARCHITECTURE.md'] + sorted(glob.glob(f'{SCR}/docs/volumes/*.md')):
    L = open(p, encoding='utf-8').read().split('\n')
    for i, l in enumerate(L):
        if 'reshaped' in l and re.search(r"`change`|`reshape`|\.change\b|change\?:|reshape:", l):
            rel = os.path.relpath(p, SCR)
            if rel == 'docs/ARCHITECTURE.md' and i + 1 in known: continue
            m = re.search(r".{0,140}(`change`|`reshape`).{0,120}", l)
            res['other_sites'].append(dict(file=rel, line=i + 1, text=(m.group(0) if m else l[:260])))
json.dump(res, open(f'{W}/edfate.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(json.dumps(c, ensure_ascii=False, indent=1)[:2500])
for s in res['other_sites']: print('OTHER SITE', s['file'], s['line'], '|', s['text'])
