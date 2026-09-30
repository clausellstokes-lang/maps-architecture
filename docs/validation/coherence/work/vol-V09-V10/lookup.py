import json,sys
# usage: lookup.py 'substring' ... -> ids whose statement contains substring
pats=sys.argv[1:]
for l in open('items.jsonl'):
    d=json.loads(l)
    for p in pats:
        if p in d['statement']: print(p,'->',d['id'],d['sec'],d['statement'][:70])
