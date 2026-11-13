import json, sys, collections
n=collections.Counter(); dis=[]; named=[]
for path in sys.argv[1:]:
    try: f=open(path)
    except FileNotFoundError: continue
    for line in f:
        d=json.loads(line)
        if d['where']=='waterFaces':
            n['water-batch refusals']+=1
            if d['rx'] is not None or d['fieldName'] is not None: n['named by regex or field']+=1
            if not d['agree']: dis.append(d)
        else:
            n['naming-line visits']+=1
            if d['named'] is not None: named.append(d)
print(dict(n)); print('disagreements', len(dis))
for d in dis[:10]: print(' ', d)
print('naming-line visits with a name', len(named))
for d in named[:10]: print(' ', d['tag'], d['detail'][:200], d['named'])
