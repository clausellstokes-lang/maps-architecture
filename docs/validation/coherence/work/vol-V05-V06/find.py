import json,sys,re
vol=sys.argv[1]; pats=sys.argv[2:]
for l in open('items.jsonl'):
    d=json.loads(l)
    if not d['id'].startswith(vol): continue
    s=d['statement']+' '+' '.join(d['keys'])
    if all(re.search(p,s) for p in pats): print(d['id'],d['sec'],d['kind'],d['statement'][:90])
