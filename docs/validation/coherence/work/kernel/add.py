import json,sys
P='/Users/cstokes/Desktop/Maps/docs/validation/coherence/work/kernel/items.jsonl'
def add(items):
    have=set()
    try:
        for l in open(P):
            if l.strip(): have.add(json.loads(l)['id'])
    except FileNotFoundError: pass
    n=0
    with open(P,'a') as f:
        for it in items:
            if it['id'] in have: continue
            for k in ('where','reads','used_by','keys'): it.setdefault(k,[])
            f.write(json.dumps(it,ensure_ascii=False)+'\n'); n+=1
    print('added',n,'total',len(have)+n)
