import json
B='/home/user/maps-architecture/docs/validation/coherence'
W=B+'/work/rewrite-V10'
c=json.load(open(B+'/canon.json')); u=c['units']['V10']
a=json.load(open(B+'/agreement.json'))
hm={h['id']:h for h in a['handoffs']}
o=['# handoffs routed to V10 (%d)'%len(u['handoffs_to_close'])]
for hid in u['handoffs_to_close']:
    h=hm.get(hid)
    if not h: o.append('\n### %s (NOT FOUND)'%hid); continue
    o.append('\n### %s from %s to %s stated=%s line=%s\naction: %s\n%s'%(hid,h['from'],h['to'],h['stated'],h['line'],h['action'],h['text']))
# also handoffs from V09 (V09:*)
o.append('\n\n# handoffs FROM V10 (V10:*)')
for h in a['handoffs']:
    if h['from']=='V10': o.append('\n### %s to %s stated=%s line=%s\naction: %s\n%s'%(h['id'],h['to'],h['stated'],h['line'],h['action'],h['text']))
open(W+'/handoffs.md','w').write('\n'.join(o))
# pairs involving V10 with disagreements
o=[]
for p in a['pairs']:
    if 'V10' in p['pair']:
        o.append('## pair %s shared=%d disagree=%d'%(p['pair'],p['shared_subjects'],p['disagree']))
        for s in p['subjects']:
            if s['verdict']!='agree': o.append('- '+json.dumps(s,ensure_ascii=False))
for ct in a['contracts']:
    if 'V10' in ct['units']: o.append('CONTRACT '+json.dumps(ct,ensure_ascii=False))
open(W+'/agree-pairs.md','w').write('\n'.join(o))
e=json.load(open(B+'/edges.json'))
mm={m['id']:m for m in e['mechanisms']}
o=['# edges for V10']
o.append('general_rules: '+json.dumps(e['general_rules'],ensure_ascii=False)[:3000])
n=0
for m in e['mechanisms']:
    if m['unit']!='V10': continue
    eds=[x for x in e['edges'] if x['mechanism']==m['id'] and x['status']!='DEFINED']
    if not eds: continue
    o.append('\n## %s %s %s (line %s)'%(m['id'],m['section'],m['title'],m['line']))
    for x in eds:
        n+=1
        o.append('- [%s] %s %s | %s | tests=%s | rung=%s'%(x['status'],x['id'].split('-')[-2]+'-'+x['id'].split('-')[-1],x['edge'],x['outcome_evidence'],x['tests'],x['rung_evidence']))
o.append('\n# combinations owned by V10 (non-DEFINED)')
for cb in e['combinations']:
    if cb['owner']=='V10' and cb['status']!='DEFINED':
        o.append('- %s %s(%s) x %s(%s) rungs=%s status=%s ev=%s'%(cb['id'],cb['a']['feature'],cb['a']['unit'],cb['b']['feature'],cb['b']['unit'],cb['rungs'],cb['status'],cb['evidence']))
o.append('\n# combinations involving V10 (any owner, non-DEFINED)')
for cb in e['combinations']:
    if cb['owner']!='V10' and 'V10' in (cb['a']['unit'],cb['b']['unit']) and cb['status']!='DEFINED':
        o.append('- %s owner=%s %s(%s) x %s(%s) status=%s'%(cb['id'],cb['owner'],cb['a']['feature'],cb['a']['unit'],cb['b']['feature'],cb['b']['unit'],cb['status']))
o.append('\n# named combinations')
for cb in e['named_combinations']:
    o.append('- '+json.dumps(cb,ensure_ascii=False))
open(W+'/edges-v10.md','w').write('\n'.join(o))
print('edges',n)
