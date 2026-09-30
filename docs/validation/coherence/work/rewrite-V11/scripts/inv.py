import json
B='/home/user/maps-architecture/docs/validation/coherence'
c=json.load(open(B+'/canon.json')); u=c['units']['V11']
inv=json.load(open(B+'/inventory-vol-V11-V12.json'))
items=[x for x in inv['items'] if x['id'].startswith('V11-')]
role={x:'home' for x in u['state']}
for r in u['reference']: role[r['id']]='reference->%s %s'%(r['home_unit'],r['home_sec'])
for r in u['bcr_pointer']: role[r['id']]='bcr-pointer->item %s'%r['f_item']
for x in u['handoff_items']: role[x]='handoff'
for x in u['index_rows']: role[x]='index-row'
for x in u['glossary_items']: role[x]='glossary'
for x in u['history_out']: role[x]='history-out'
for q in u['owner_questions_answered']: pass
out=[]
for it in items:
    r=role.get(it['id'],'home?')
    st=it['statement'].replace('\t',' ').replace('\n',' ')
    out.append('\t'.join([it['id'],it['kind'],it['sec'],r,st]))
open('inv.tsv','w').write('\n'.join(out)+'\n')
from collections import Counter
print(len(items),Counter(x.split('\t')[3].split('->')[0] for x in out))
print(Counter(it['sec'] for it in items).most_common(80))
