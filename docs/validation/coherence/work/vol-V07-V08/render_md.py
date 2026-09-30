#!/usr/bin/env python3
import json
D='/Users/cstokes/Desktop/Maps/docs/validation/coherence'
d=json.load(open(D+'/inventory-vol-V07-V08.json'))
c=d['counts']; s=d['source']; rc=d['reference_census']['by_volume']
def esc(x): return str(x).replace('|','/').replace('\n',' ')
o=[]
o.append('# Inventory — design volumes V07 (village) and V08 (SettlementForge) (coherence/inventory-vol-V07-V08)\n')
o.append('PROGRESS')
o.append('- working store: docs/validation/coherence/work/vol-V07-V08/ (items.jsonl, findings.jsonl, add.py, refs.py, build.py, render_md.py); this file and inventory-vol-V07-V08.json are generated from it')
for v in ('V07','V08'):
    o.append('- source %s: %s (%d lines, %d words, md5 %s)'%(v,s[v]['file'],s[v]['lines'],s[v]['words'],s[v]['md5'][:8]))
o.append('- [x] V07 read whole and inventoried (§0-§13, W1-W73, the dossier trace, T-V7-1..57, J-V7.1..133, BCR-V7-1..38, integration notes, reconciliation rounds 1-6 with continuations, finalization): V07-0001..V07-0333')
o.append('- [x] V08 read whole and inventoried (§0-§13, the wiring table, T-V8-1..47, J-V8.1..115, BCR-V8-1..32, X1-X25, integration notes, reconciliation rounds 1-6 with continuations, finalization): V08-0001..V08-0165')
o.append('- [x] cross-reference census (script refs.py plus exact-label resolution in build.py; hand checks at destinations)')
o.append('- [x] restatements, internal conflicts, cross-part conflicts, wiring (incl. an orphan-cell scan of village.json and V08\'s interfaces), elegance, J121/J122 and g-item routing; every finding re-verified against the text before landing')
o.append('- [x] generated .json and .md; results file; LANDED\n')
o.append('## Summary\n')
o.append('%d inventory items (%d facts, 1 of them also a term item) and %d defined terms: V07 %d items, V08 %d. %d findings (%d major, %d minor): V07 %d, V08 %d. %d restatements of facts owned by the base, file f or another volume; %d internal conflicts; %d cross-part conflicts; %d broken reference. Both source files were unchanged from the start of the lane to the end (md5 checked by build.py); nothing in the volumes, the base or the rationale was edited.\n'%(
 c['items'],c['facts'],c['terms'],c['by_volume']['V07']['items'],c['by_volume']['V08']['items'],c['findings_total'],c['findings_major'],c['findings_total']-c['findings_major'],
 c['findings_by_volume'].get('V07',0),c['findings_by_volume'].get('V08',0),c['restatements'],c['internal_conflicts'],c['cross_part_conflicts'],c['broken_references']))
maj=[f for k in ('cross_part_conflicts','internal_conflicts','wiring_gaps','restatement_findings','deferral_wording','broken_references','narration','terminology','elegance_candidates','internal_duplications') for f in d[k] if f['severity']=='major']
o.append('The majors:\n')
for f in maj: o.append('- **%s** — %s'%(f['id'],esc(f['claim'])))
o.append('')
o.append('References: %d volume references in V07 and %d in V08 resolve to an exact heading or bold sub-label; every T- and J- id cited (V07 %d and %d, V08 %d and %d) is defined in the volume it names; every "file f item" citation exists (V07 %d, V08 %d). Own ids are complete and unique: T-V7-1..57, J-V7.1..133, BCR-V7-1..38, T-V8-1..47, J-V8.1..115, BCR-V8-1..32. The one broken reference is V07\'s smithy spacing ("spaced 200 m (above)": 200 m is v.bakehouse\'s spread; v.smithy has none).\n'%(
 rc['V07']['volume_refs'].get('resolve',0),rc['V08']['volume_refs'].get('resolve',0),rc['V07']['test_refs'].get('resolve',0),rc['V07']['decision_refs'].get('resolve',0),
 rc['V08']['test_refs'].get('resolve',0),rc['V08']['decision_refs'].get('resolve',0),rc['V07']['file_f_item_refs'].get('ok',0),rc['V08']['file_f_item_refs'].get('ok',0)))
o.append('Word counts and narration (inventory only; the NARR findings carry the defects):\n')
o.append('| volume | words | narration blocks (lines: words) | narration words | share |\n|---|---|---|---|---|')
for v in ('V07','V08'):
    o.append('| %s | %d | %s | %d | %.3f |'%(v,s[v]['words'],'; '.join('%s: %d (%s)'%(r['lines'],r['words'],r['what']) for r in s[v]['narration_ranges']),s[v]['narration_words'],s[v]['narration_share']))
o.append('\nNarration also sits inside normative text (revision layers in decision rows, BCR headers, V07 §1 dependencies (8)-(13), V08\'s X table and §8.2 total row) — see the NARR findings.\n')
o.append('## Item counts by kind\n')
kinds=sorted(set(c['by_volume']['V07']['by_kind'])|set(c['by_volume']['V08']['by_kind']))
o.append('| kind | V07 | V08 |\n|---|---|---|')
for k in kinds: o.append('| %s | %d | %d |'%(k,c['by_volume']['V07']['by_kind'].get(k,0),c['by_volume']['V08']['by_kind'].get(k,0)))
o.append('| owned by the base, file f, another volume or the owner | %d | %d |'%(c['by_volume']['V07']['owned_elsewhere'],c['by_volume']['V08']['owned_elsewhere']))
o.append('\nEach item in the JSON carries id, kind, section, owner (this volume, the base section to cite, or another volume), the statement with its values, reads (produced by), used_by (consumers: stages, renders, exports, tests, base hooks), keys, and for identifier keys the base sections and volumes that also name them (outside_mentions). Wiring rows (V07 W1-W73; V08\'s unnumbered rows) are items of kind "wiring".\n')
o.append('## Defined terms (%d)\n'%len(d['defined_terms']))
o.append('| volume | term | defined at | owner |\n|---|---|---|---|')
for t in d['defined_terms']: o.append('| %s | %s | %s | %s |'%(t['volume'],esc(t['term']),t['defined_at'],esc(t['owner'])))
o.append('\n## Restatements (facts owned elsewhere, stated with their values here)\n')
o.append('| item | canonical home | fact |\n|---|---|---|')
for r in d['restatements']: o.append('| %s | %s | %s |'%(r['item'],esc(r['canonical_home']),esc(r['fact'])))
SECT=[('cross_part_conflicts','Cross-part conflicts'),('internal_conflicts','Internal conflicts'),('broken_references','Broken references'),('wiring_gaps','Wiring gaps'),('restatement_findings','Restatement findings'),('internal_duplications','Internal duplications'),('deferral_wording','Deferral wording and open fix lists'),('terminology','Terminology'),('elegance_candidates','Elegance candidates'),('narration','Narration'),('edges_observed','Edges observed')]
for k,t in SECT:
    L=d[k]
    o.append('\n## %s (%d)\n'%(t,len(L)))
    if not L: o.append('None found. The edges read (empty dossier, the ladder hand-off both ways, the band ends, refusals, stale saves, the V08 failure rows B1-B20 and the V07 F-V ladders) each state an outcome.'); continue
    o.append('| id | sev | items | where | claim | hint |\n|---|---|---|---|---|---|')
    for f in L: o.append('| %s | %s | %s | %s | %s | %s |'%(f['id'],f['severity'],', '.join(f['items']),esc(f['where']),esc(f['claim']),esc(f['hint'])))
o.append('\n## Reference census\n')
o.append('| volume | volume refs | test refs | decision refs | file f item refs | critique-id citations (distinct) | own ids |\n|---|---|---|---|---|---|---|')
for v in ('V07','V08'):
    r=rc[v]; oi=r['own_ids']
    o.append('| %s | %s | %s | %s | %s | %d (%d) | T 1-%d, J 1-%d, BCR 1-%d, no gaps |'%(v,r['volume_refs'],r['test_refs'],r['decision_refs'],r['file_f_item_refs'],r['critique_id_citations'],r['critique_ids_distinct'],oi['tests']['last'],oi['decisions']['last'],oi['bcrs']['last']))
o.append('\n'+d['reference_census']['method'])
o.append('\n'+d['reference_census']['manual_review'])
o.append('\n## Owner decisions and g items\n')
o.append(d['owner_decisions_and_g_items'])
o.append('\n## CONFIRMED versus PLAUSIBLE\n')
o.append('CONFIRMED (read or executed in this lane): both volumes read completely; the reference census executed by script with exact-label resolution; own-id completeness by script; the orphan-cell scan (density.bandWeight, network.slack, network.emptyDensity have no reader); the neighbourTracks and ends-cap arithmetic (4 from about 227 people, 6 from about 563); the J121/J122 answers read in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md; V04 blockedBy carrying \'rung\', V06 §3.19.2, V11 §3.16.1 and §3.19.2, V02 §3.10.10 at their destinations; f item 201 STAGED. Three draft findings failed re-verification and were corrected before landing (V08\'s V11 §3.19.2 link resolves, so that finding became an input conflict; the tent-cluster wiring exists through the base\'s S11 informal clusters and V08\'s conditions row, so it was dropped; IN-V07-4 agrees in substance with §3.4, so it became a cohesion finding). PLAUSIBLE: the severity grading and the elegance and shrink suggestions.')
open(D+'/inventory-vol-V07-V08.md','w').write('\n'.join(o)+'\n')
print(len(o))
