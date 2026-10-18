import json
D='/Users/cstokes/Desktop/Maps/docs/validation/coherence'
j=json.load(open(D+'/inventory-vol-V11-V12.json'))
c=j['counts']; s=j['source']
esc=lambda x: str(x).replace('|','\\|').replace('\n',' ')
o=[]
o.append('# Inventory — design volumes V11 (content) and V12 (calibration) (coherence/inventory-vol-V11-V12)\n')
o.append('PROGRESS')
o.append('- working store: docs/validation/coherence/work/vol-V11-V12/ (items.jsonl, findings.jsonl, terms.py, add.py, build.py, render_md.py)')
o.append('- sources: %s (%d lines, %d words, md5 %s), %s (%d lines, %d words, md5 %s)'%(s['V11']['file'],s['V11']['lines'],s['V11']['words'],s['V11']['md5'][:8],s['V12']['file'],s['V12']['lines'],s['V12']['words'],s['V12']['md5'][:8]))
o.append('- [x] V11 read whole and inventoried: V11-0001..0647')
o.append('- [x] V12 read whole and inventoried: V12-0001..0403')
o.append('- [x] cross-reference census and resolution (scripts)')
o.append('- [x] restatements, internal conflicts, wiring gaps, elegance, edges')
o.append('- [x] generate .json and .md; results file; LANDED\n')
o.append('## Outcome\n')
o.append('%d normative items (V11 %d, V12 %d), %d defined terms, %d restatements, %d findings (%d major). No cited id or section dangles; the reference problems are form problems (bare own-section §, bare BCR-n). '
  'The largest gaps: g items 111-113 are absent from both volumes (F-MISSING, 5 findings), the J122 owner decisions are not recorded (V11 Q-V11-1; V12 Q-V12-1..3, sittings, staged order), and V12 §2.10 says evidence is outside the content hash while V11 hashes it.\n'
  %(c['facts'],c['by_volume']['V11']['items'],c['by_volume']['V12']['items'],c['terms'],c['restatements'],c['findings_total'],c['findings_major']))
o.append(j['confirmed_vs_plausible']+'\n')
o.append('| category | V11 | V12 | total |\n|---|---|---|---|')
for cat in ['missing_parts','cross_volume_conflicts','internal_conflicts','internal_duplications','restatement_findings','broken_references','wiring_gaps','edges_observed','elegance_candidates','terminology','deferral_wording','handoffs_to_canon','narration']:
    L=j[cat]; a=sum(1 for x in L if x['id'].startswith('V11')); b=len(L)-a
    o.append('| %s | %d | %d | %d |'%(cat.replace('_',' '),a,b,len(L)))
o.append('| restatement entries (cross-part facts) | %d | %d | %d |'%(sum(1 for r in j['restatements'] if r['item'].startswith('V11')),sum(1 for r in j['restatements'] if r['item'].startswith('V12')),len(j['restatements'])))
o.append('| terms | %d | %d | %d |\n'%(c['by_volume']['V11']['terms'],c['by_volume']['V12']['terms'],c['terms']))
o.append('Shrink estimate (narration outside the normative text): V11 %d words in %s; V12 %d words in %s; plus inline pass markers in normative text (V11: %s; V12: %s).\n'%(
  s['V11']['narration_words'],', '.join('lines '+x['lines'] for x in s['V11']['narration_ranges']),s['V12']['narration_words'],', '.join('lines '+x['lines'] for x in s['V12']['narration_ranges']),
  ', '.join('%s %d'%(k,v) for k,v in s['V11']['inline_pass_markers'].items()),', '.join('%s %d'%(k,v) for k,v in s['V12']['inline_pass_markers'].items())))
titles=[('missing_parts','Missing parts (F-MISSING for g items 111+; J122 decisions not recorded; content only in notes)'),('cross_volume_conflicts','Conflicts between volumes or with decision files'),
 ('internal_conflicts','Internal conflicts'),('internal_duplications','Internal duplications'),('restatement_findings','Restatements (a fact of another home stated with its value)'),
 ('broken_references','Broken or ambiguous references'),('wiring_gaps','Wiring gaps'),('edges_observed','Undefined edges'),('elegance_candidates','Elegance candidates'),
 ('terminology','Terminology'),('deferral_wording','Deferral wording and standing-rule breaches'),('handoffs_to_canon','Hand-offs left open'),('narration','Narration')]
for cat,t in titles:
    o.append('## %s\n'%t)
    o.append('| id | sev | items | where | claim | fix |\n|---|---|---|---|---|---|')
    for x in j[cat]:
        o.append('| %s%s | %s | %s | %s | %s | %s |'%(x['id'],' (F-MISSING)' if x.get('code') else '',x['severity'],esc(', '.join(x['items'])),esc(x['where']),esc(x['claim']),esc(x['hint'])))
    o.append('')
o.append('## Restatement entries\n\n| item | canonical home | fact |\n|---|---|---|')
for r in j['restatements']: o.append('| %s | %s | %s |'%(r['item'],esc(r['canonical_home']),esc(r['fact'])))
o.append('\n## Reference census\n')
rc=j['reference_census']
for v in ('V11','V12'):
    o.append('- %s section refs: %s'%(v,'; '.join('%s %d'%(k,n) for k,n in rc['section_refs'][v].items())))
    o.append('- %s bare own-only refs after continuation resolution: %s'%(v,'; '.join('%s %d'%(k,n) for k,n in rc['bare_own_only_refs'][v].items())))
    o.append('- %s id definitions: %s'%(v,', '.join('%s %d'%(k,n) for k,n in rc['id_definitions'][v].items())))
o.append('- '+rc['id_resolution'])
o.append('- '+rc['manual_review']+'\n')
o.append('## Routing notes\n')
o.append('- g items: '+j['g_items_routing']['note'])
o.append('- J121/J122: '+j['j122_routing']['note']+'\n')
o.append('## Terms (%d)\n\n| term | vol | defined at | definition | note |\n|---|---|---|---|---|'%len(j['terms']))
for t in j['terms']: o.append('| %s | %s | %s | %s | %s |'%(esc(t['term']),t['volume'],esc(t['defined_at']),esc(t['definition']),esc(t['note'])))
o.append('\nItems (V11-0001..0647, V12-0001..0403, each with kind, section, owner, statement, reads, used by and keys) are in inventory-vol-V11-V12.json.')
open(D+'/inventory-vol-V11-V12.md','w').write('\n'.join(o)+'\n')
print(len('\n'.join(o)))
