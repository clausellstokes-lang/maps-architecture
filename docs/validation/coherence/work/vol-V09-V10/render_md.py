import json
D='/Users/cstokes/Desktop/Maps/docs/validation/coherence'
d=json.load(open(D+'/inventory-vol-V09-V10.json'))
c=d['counts']; s=d['source']
def esc(x): return str(x).replace('|','/').replace('\n',' ')
o=[]
o.append('# Inventory — design volumes V09 (application) and V10 (clerk) (coherence/inventory-vol-V09-V10)\n')
o.append('PROGRESS')
o.append('- working store: docs/validation/coherence/work/vol-V09-V10/ (items.jsonl, findings.jsonl, add.py, tabitems.py, build.py, render_md.py); this file and inventory-vol-V09-V10.json are generated from it')
for v in ('V09','V10'):
    o.append('- source %s: %s (%d lines, %d words, md5 %s; unchanged start to end, checked by build.py)'%(v,s[v]['file'],s[v]['lines'],s[v]['words'],s[v]['md5'][:8]))
o.append('- [x] V09 read whole and inventoried (§0-§13, decisions, BCR-V9-1..36, XV-V9-1..31, owner questions, integration notes, reconciliation rounds 1-6 with continuations, finalization): V09-0001..%04d'%c['by_volume']['V09']['items'])
o.append('- [x] V10 read whole and inventoried (§0-§13, decisions, BCR-V10-1..23, CVR-V10-1..20, owner questions, integration notes, reconciliation rounds 1-6 with second briefs, V09 companion row, finalization): V10-0001..%04d'%c['by_volume']['V10']['items'])
o.append('- [x] cross-reference census (section refs, ids, unqualified § classes) by script')
o.append('- [x] restatements, internal conflicts, cross-volume agreement, wiring gaps, edges, elegance and equivalences, g items 111-113, J121/J122')
o.append('- [x] generated .json and .md; results file; LANDED\n')
o.append('## Summary\n')
o.append('%d inventory items (%d facts, %d defined terms): V09 %d, V10 %d. %d findings (%d major, %d minor); %d restatements of facts owned by the base, another volume or one home inside the pair; %d internal conflicts; %d broken-reference findings covering %d references. Nothing in the volumes was edited.\n'%(
 c['items'],c['facts'],c['terms'],c['by_volume']['V09']['items'],c['by_volume']['V10']['items'],c['findings_total'],c['findings_major'],c['findings_total']-c['findings_major'],c['restatements'],c['internal_conflicts'],c['broken_references'],
 sum(sum(x.values()) for x in c['broken_reference_instances'].values())))
o.append('The largest problems, in plain words:\n')
o.append('- **Owner decisions not carried in (J121, J122).** Both volumes still ask the owner questions that have been answered (V09 Q1-Q3, V10 Q1-Q5), and they present the provider, the key and the relay path as their own design where the ruling is "follows SettlementForge". V10 Q5 also gives a different evaluation budget (US$800-1 200 against the decided 790-1 190).')
o.append('- **New owner items missing (g 111-113).** Oases and the water pull, colour-blind variants with the game-master trial, and history-first generation with LOST voids name V09 and V10 as homes; neither volume mentions them yet.')
o.append('- **The two volumes disagree with their neighbours.** V09 and V11 describe the siting tables differently (key forms, the avoid cell, which rows take place/pin/split); V09\'s bend names differ from V02\'s; V09, V10 and V03 give three answers for a church crypt on wet ground; V09 says another church\'s crypt stops "just short" of the cathedral\'s while V03 caps it at a share; V01 still names its pulls SUNLIGHT/EMITS/SENSITIVE.')
o.append('- **Section references are ambiguous.** Both volumes say an unprefixed § means the base, then write lists like "V08 §5.1, §4.4" where the second number is meant for V08; 270 references read wrong or name nothing under the stated rule.')
o.append('- **Internal conflicts in V09**: "four" state classes over a five-row table; "exactly one home tool" per event kind while the table homes split, merge, delete and instance at several tools; a withdrawn refusal class still described as a refusal class; J-V9.40 still says refuse where §4.17.4 bends; two meanings of dashes in the link view.')
o.append('- **Undefined edges.** A raised course that would cut a sky island\'s hoist (J-VI.4 (f)) has no catalogue line or test in V09; replacing the untouched first town with an assistant-made town promises "the old one stays in Recent towns" although the empty-state town is not stored.')
o.append('- **Narration and length.** Banners, ledgers, round-by-round notes and inline seam ids make up about %d%% of V09 and %d%% of V10 in whole ranges alone.\n'%(round(100*s['V09']['narration_share']),round(100*s['V10']['narration_share'])))
o.append('Word counts and narration (shrink-goal source; inventory only):\n')
o.append('| volume | words | narration ranges (lines: words) | narration words | share |\n|---|---|---|---|---|')
for v in ('V09','V10'):
    o.append('| %s | %d | %s | %d | %.3f |'%(v,s[v]['words'],'; '.join('%s: %d (%s)'%(r['lines'],r['words'],r['what']) for r in s[v]['narration_ranges']),s[v]['narration_words'],s[v]['narration_share']))
o.append('\n'+d['shrink_estimate']['note']+' (PLAUSIBLE)\n')
o.append('## Item counts by kind\n')
kinds=sorted(set(c['by_volume']['V09']['by_kind'])|set(c['by_volume']['V10']['by_kind']))
o.append('| kind | V09 | V10 |\n|---|---|---|')
for k in kinds: o.append('| %s | %d | %d |'%(k,c['by_volume']['V09']['by_kind'].get(k,0),c['by_volume']['V10']['by_kind'].get(k,0)))
o.append('\nEach item in the JSON carries id, kind, section, owner (this volume, the base section it should cite, or another volume), the statement with its values and source line, reads (produced by), used_by (consumers, hooks, tests), keys, and for identifier keys the base sections and volumes that also name them (outside_mentions).\n')
o.append('## Defined terms (%d)\n'%len(d['terms']))
o.append('| id | term |\n|---|---|')
for t in d['terms']: o.append('| %s | %s |'%(t['id'],esc(t['term'])))
o.append('\n## Restatements (facts owned elsewhere, stated with their values here)\n')
o.append('| item | canonical home | fact |\n|---|---|---|')
for r in d['restatements']: o.append('| %s | %s | %s |'%(r['item'],esc(r['canonical_home']),esc(r['fact'])))
o.append('\n## Equivalences (one concept, several names or texts)\n')
o.append('| concept | other names or texts | finding |\n|---|---|---|')
for e in d['equivalences']: o.append('| %s | %s | %s |'%(esc(e['concept']),esc(e['other_names']),esc(e['finding'])))
SECT=[('standing_rule_conflicts','Owner rulings not carried in (J121, J122)'),('missing_parts','Missing parts (F-MISSING, g items 111-113)'),('cross_part_conflicts','Cross-part conflicts and disagreements'),('internal_conflicts','Internal conflicts'),('undefined_edges','Undefined edges'),('broken_references','Broken references'),('wiring_gaps','Wiring gaps'),('deferral_wording','Deferral wording'),('internal_duplications','Internal duplications'),('restatement_findings','Restatement findings'),('terminology','Terminology'),('elegance_candidates','Elegance candidates'),('handoffs_to_canon','Hand-offs to the canon'),('narration','Narration')]
for k,t in SECT:
    L=d[k]
    o.append('\n## %s (%d)\n'%(t,len(L)))
    if not L: o.append('None.'); continue
    o.append('| id | sev | items | where | claim | hint |\n|---|---|---|---|---|---|')
    for f in L: o.append('| %s | %s | %s | %s | %s | %s |'%(f['id'],f['severity'],', '.join(f['items']),esc(f['where']),esc(f['claim']),esc(f['hint'])))
rc=d['reference_census']
o.append('\n## Reference census\n')
o.append('| volume | section references (resolved) | id references (resolved) | unqualified § classes |\n|---|---|---|---|')
for v in ('V09','V10'):
    o.append('| %s | %s | %s | %s |'%(v,', '.join('%s %d'%x for x in rc['section_references'][v].items()),', '.join('%s %d'%x for x in rc['id_references'][v].items()),', '.join('%s %d'%x for x in rc['bare_section_sign_classes'][v].items())))
o.append('\nOwn ids: V09 '+rc['own_ids']['V09']+'; V10 '+rc['own_ids']['V10']+'.\n')
o.append(rc['method'])
o.append('\n'+rc['result'])
o.append('\n## g items, owner decisions and file f\n')
for k in ('carried','new_items','owner_decisions'): o.append('- '+d['g_items_routing'][k])
o.append('- Every V09 and V10 BCR maps to file f items that exist or to the pre-applied/recorded sets (bcr_to_file_f in the JSON, %d BCRs mapped).'%len(d['bcr_to_file_f']))
o.append('\n## CONFIRMED versus PLAUSIBLE\n')
o.append('CONFIRMED (read or executed in this lane): both volumes read completely; the section, id and unqualified-§ censuses executed by script; own-id completeness and uniqueness by script; each hand-off\'s state checked at its destination text (V01, V02, V03, V04, V05, V07, V11); J121/J122 answers read in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md; g items 111-113 read in docs/AMENDMENTS-2026-09-28g.md with 0 mentions in either volume; source md5s unchanged. PLAUSIBLE: severity grading, the equivalence and shrink suggestions, and the reading that bare § references naming an existing base section are meant for the base.')
open(D+'/inventory-vol-V09-V10.md','w').write('\n'.join(o)+'\n')
print(len(o))
