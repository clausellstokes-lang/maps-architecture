import json,sys
vol=sys.argv[1]; bad=sys.argv[2:]
L=[json.loads(l) for l in open('items.jsonl')]
L=[d for d in L if d['id'] not in bad]
n=0
for d in L:
    if d['id'].startswith(vol):
        n+=1; d['id']=f'{vol}-{n:04d}'
open('items.jsonl','w').writelines(json.dumps(d,ensure_ascii=False)+'\n' for d in L)
print('now',n)
