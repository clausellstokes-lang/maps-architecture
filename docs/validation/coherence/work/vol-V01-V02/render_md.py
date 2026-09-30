import json
D='/Users/cstokes/Desktop/Maps/docs/validation/coherence'
d=json.load(open(D+'/inventory-vol-V01-V02.json'))
c=d['counts']; s=d['source']
def esc(x): return str(x).replace('|','/').replace('\n',' ')
o=[]
o.append('# Inventory — design volumes V01 (neighbourhoods) and V02 (buildings) (coherence/inventory-vol-V01-V02)\n')
o.append('PROGRESS')
o.append('- working store: docs/validation/coherence/work/vol-V01-V02/ (items.jsonl, findings.jsonl, add.py, build.py, render_md.py, bcrmap.json); this file and inventory-vol-V01-V02.json are generated from it')
o.append('- source V01: %s (%d lines, %d words, md5 %s)'%(s['V01']['file'],4454,s['V01']['words'],s['V01']['md5'][:8]))
o.append('- source V02: %s (%d lines, %d words, md5 %s)'%(s['V02']['file'],4829,s['V02']['words'],s['V02']['md5'][:8]))
o.append('- [x] V01 read whole and inventoried (§0-§13, cross-volume notes (1)-(39), integration notes and their continuation, reconciliation rounds 1-6 with continuations and counterpart edits)')
o.append('- [x] V02 read whole and inventoried (§0-§13 with X1-X33, integration notes, reconciliation rounds 1-5 with continuations, finalization)')
o.append('- [x] cross-reference census and resolution (script: scratchpad refs.py; manual review of every mechanical miss)')
o.append('- [x] restatements, internal conflicts, wiring gaps, elegance, g-item and J121/J122 routing')
o.append('- [x] generated .json and .md; results file; LANDED\n')
o.append('## Summary\n')
o.append('%d inventory items (%d facts, %d defined terms): V01 %d, V02 %d. %d findings (%d major, %d minor); %d restatements of facts owned by the base or another volume; %d internal conflicts; %d broken references. Both source files were unchanged from the start of the lane to the end (md5 checked by build.py); nothing in the volumes was edited.\n'%(
 c['items'],c['facts'],c['terms'],c['by_volume']['V01']['items'],c['by_volume']['V02']['items'],c['findings_total'],c['findings_major'],c['findings_total']-c['findings_major'],c['restatements'],c['internal_conflicts'],c['broken_references']))
maj=[f for k in ('cross_part_conflicts','missing_parts','narration','internal_conflicts','deferral_wording','broken_references','wiring_gaps') for f in d[k] if f['severity']=='major']
o.append('The majors: '+'; '.join('%s — %s'%(f['id'],esc(f['claim'])[:260]) for f in maj)+'.\n')
o.append('Every section, volume, id, test, BCR, f/g item and seam reference resolves (after reading each mechanical miss in context); the two broken references are V01\'s pointer to V1-4.6 for the clerk (it is V1-4.5) and V02\'s 26 receipt paths that exist only in a session scratchpad outside the project. Own ids are complete and unique: J-V1.1-101, T-V1-1-54, BCR-1-46, J-V2.1-108, T-V2-1-53, BCR-V2-01-42, X1-X33. Every BCR maps to file f items that exist (bcr_to_file_f in the JSON).\n')
o.append('Word counts and narration (the shrink goal\'s NARRATION source; inventory only):\n')
o.append('| volume | words | narration ranges (lines: words) | narration words | share |\n|---|---|---|---|---|')
for v in ('V01','V02'):
    o.append('| %s | %d | %s | %d | %.3f |'%(v,s[v]['words'],'; '.join('%s: %d (%s)'%(r['lines'],r['words'],r['what']) for r in s[v]['narration_ranges']),s[v]['narration_words'],s[v]['narration_share']))
o.append('\nBeyond these ranges narration also sits inside normative text (revision layers in decisions, BCR extension histories, "Landed" rows in V02\'s X table, V01\'s cross-volume notes (1)-(39)) — see the NARR findings.\n')
o.append('## Item counts by kind\n')
kinds=sorted(set(c['by_volume']['V01']['by_kind'])|set(c['by_volume']['V02']['by_kind']))
o.append('| kind | V01 | V02 |\n|---|---|---|')
for k in kinds: o.append('| %s | %d | %d |'%(k,c['by_volume']['V01']['by_kind'].get(k,0),c['by_volume']['V02']['by_kind'].get(k,0)))
o.append('\nEach item in the JSON carries id, kind, section, owner (this volume, the base section it should cite, or another volume), statement with values, reads (produced by) and used_by (consumers, hooks, tests), keys, and for identifier keys the base sections and volumes that also name them (outside_mentions).\n')
o.append('## Restatements (facts owned elsewhere, stated with their values here)\n')
o.append('| item | canonical home | fact |\n|---|---|---|')
for r in d['restatements']: o.append('| %s | %s | %s |'%(r['item'],esc(r['canonical_home']),esc(r['fact'])))
SECT=[('missing_parts','Missing parts'),('cross_part_conflicts','Cross-part conflicts'),('internal_conflicts','Internal conflicts'),('broken_references','Broken references'),('deferral_wording','Deferral wording'),('wiring_gaps','Wiring gaps'),('internal_duplications','Internal duplications'),('restatement_findings','Restatement findings'),('terminology','Terminology'),('ambiguous_text','Ambiguous text'),('elegance_candidates','Elegance candidates'),('handoffs_to_canon','Hand-offs to the canon'),('narration','Narration')]
for k,t in SECT:
    L=d[k]
    o.append('\n## %s (%d)\n'%(t,len(L)))
    if not L: o.append('None.'); continue
    o.append('| id | sev | where | claim | hint |\n|---|---|---|---|---|')
    for f in L: o.append('| %s | %s | %s | %s | %s |'%(f['id'],f['severity'],esc(f['where']),esc(f['claim']),esc(f['hint'])))
o.append('\n## Reference census\n')
o.append('| volume | kind:status counts |\n|---|---|')
for v,cc in sorted(d['reference_census']['by_volume'].items()): o.append('| %s | %s |'%(v,', '.join('%s %d'%(k,n) for k,n in sorted(cc.items()))))
o.append('\n'+d['reference_census']['method'])
o.append('\n'+d['reference_census']['manual_review'])
o.append('\n## g items and owner decisions\n')
o.append(d['g_items_routing']['note'])
o.append('\n## CONFIRMED versus PLAUSIBLE\n')
o.append('CONFIRMED (read or executed in this lane): both volumes read completely; the reference census executed by script with every miss read in context; own-id completeness and uniqueness by script; the f-item map of all 88 BCRs; the scratchpad receipts\' location (all 26 exist only under a session scratchpad); J122 answers read in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md; character.anchorSigma at base §4.5; f item 540\'s either/or; V1-4.5 versus V1-4.6 headings. PLAUSIBLE: the severity grading, the elegance and shrink suggestions, and the reading that T-V2-36\'s "seed wings" equal the ground wings over a derived crypt\'s ring.')
open(D+'/inventory-vol-V01-V02.md','w').write('\n'.join(o)+'\n')
print(len(o))
