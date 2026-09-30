import json,os
B='/home/user/maps-architecture/docs/validation/coherence'
W=B+'/work/rewrite-V09'
c=json.load(open(B+'/canon.json'))
u=c['units']['V09']
out=[]
def P(*a): out.append(' '.join(str(x) for x in a))
P('# V09 rulings (extracted from canon.json)')
P('\n## shrink', json.dumps(u['shrink']))
P('\n## conflicts')
cm={x['id']:x for x in c['conflicts']}
for cid in u['conflicts']:
    x=cm[cid]; P('\n###',cid,x['severity'],x['verdict'],'units',x['units']); P('where:',x['where']); 
    for s in x['statements']: P('-',s)
    P('proposed:',x['proposed']); P('RULING:',x['ruling']); P('basis:',x['basis'])
P('\n## elegance')
em={x['id']:x for x in c['elegance']}
for eid in u['elegance']:
    x=em[eid]; P('\n###',eid,x['verdict'],x['subject']); P('unified_form:',x['unified_form']); P('home:',x['home'],'units',x['units'])
    for e in (x['equivalence'] or []): P('- EQ:',json.dumps(e,ensure_ascii=False) if not isinstance(e,str) else e)
    P('nuance:',x['separating_nuance'])
P('\n## wiring')
wm={x['id']:x for x in c['wiring_gaps']}
for wid in u['wiring']:
    x=wm.get(wid)
    if x: P('\n###',wid,x['class'],x['severity'],x['units']); P('piece:',x['piece']); P('link:',x['link']); P('RULING:',x['ruling'])
    else: P('\n###',wid,'(not in wiring_gaps)')
P('\n## id rulings')
im={x['id']:x for x in c['id_hygiene']}
for iid in u['id_rulings']:
    x=im[iid]; P('\n###',iid,x['subject']); P('RULING:',x['ruling']); P('renumber:',json.dumps(x['renumber'],ensure_ascii=False)[:3000])
P('\n## g parts')
for g in c['g_routing']:
    if g['item']>=111:
        P('\n### g item',g['item'],g['class'])
        for p in g['parts']: P('-',json.dumps(p,ensure_ascii=False))
P('\n## owner questions')
for q in c['owner_questions']:
    if q['unit']=='V09': P('-',json.dumps(q,ensure_ascii=False))
P(json.dumps(u['owner_questions_answered'],ensure_ascii=False))
P('\n## cohesion'); 
for x in u['cohesion']: P('-',x)
P('\n## canon decisions')
for x in c['canon_decisions']: P('-',json.dumps(x,ensure_ascii=False))
P('\n## requests_in_f')
for r in u['requests_in_f']: P('-',r['request'],'->','item',r['f_item'],'|',r['base_section'][:80])
P('\n## bcr_pointer')
for r in u['bcr_pointer']: P('-',r['id'],r['bcr'],'-> item',r['f_item'])
P('\n## history_out',u['history_out'])
P('\n## terms')
for t in u['terms']: P('-',json.dumps(t,ensure_ascii=False))
P('\n## agreement_disagreements')
for t in u['agreement_disagreements']: P('-',json.dumps(t,ensure_ascii=False))
open(W+'/rulings.md','w').write('\n'.join(out))
# open findings full
of={x['id']:x for x in c['open_findings']}
o=[]
for fid in u['open_findings']:
    x=of[fid]; o.append('### %s [%s; %s]\n%s\nREQUIRED: %s\nCLOSURE: %s\n'%(fid,x['list'],x['severity'],x['text'],x['required'],x['closure']))
open(W+'/findings.md','w').write('\n'.join(o))
print(len(out),len(o))
