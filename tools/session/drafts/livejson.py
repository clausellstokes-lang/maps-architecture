#!/usr/bin/env python3
"""Edit the watch table keeping its one-child-per-line layout.
usage: livejson.py remove CY,DP | add '<json object>'"""
import json,sys
p='/home/user/maps-architecture/workflows/lane-prompts/session-seats/children/live.json'
d=json.load(open(p,encoding='utf-8'))
if sys.argv[1]=='remove':
    gone=set(sys.argv[2].split(','))
    d['children']=[c for c in d['children'] if c['letter'] not in gone]
elif sys.argv[1]=='add':
    c=json.loads(sys.argv[2]); assert c['letter'] not in [x['letter'] for x in d['children']]
    d['children'].append(c)
head={k:v for k,v in d.items() if k!='children'}
out='{\n'+''.join(' %s: %s,\n'%(json.dumps(k),json.dumps(v,ensure_ascii=False)) for k,v in head.items())
out+=' "children": [\n'+',\n'.join('  '+json.dumps(c,ensure_ascii=False) for c in d['children'])+'\n ]\n}\n'
json.loads(out)
open(p,'w',encoding='utf-8').write(out)
print([c['letter'] for c in d['children']])
