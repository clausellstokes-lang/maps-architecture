# fixall_verify_scope_r3_jsoncorpus.py — cost and yield of adding JSON string values under research/ and captures/ to §17.1 (2)'s pre-M-1 checks (lane fixall/verify-scope-r3, 2026-09-25; stdlib only; prints counts, never corpus content)
# PENDING FABLE REVIEW — Opus-produced (fixall/verify-scope-r3), not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md.
import json,glob,re,time,os
t0=time.time()
tok=lambda s: re.findall(r'[a-z]+', s.lower())
grams=set(); nfiles=0; nstr=0; bad=0
def walk(x,out):
    if isinstance(x,str): out.append(x)
    elif isinstance(x,dict):
        for k,v in x.items(): out.append(k); walk(v,out)
    elif isinstance(x,list):
        for v in x: walk(v,out)
for f in glob.glob('captures/**/*.json',recursive=True)+glob.glob('research/**/*.json',recursive=True):
    try: d=json.load(open(f,encoding='utf-8',errors='replace'))
    except Exception: bad+=1; continue
    out=[]; walk(d,out); nfiles+=1; nstr+=len(out)
    t=tok(' '.join(s for s in out if len(s)<200))
    grams.update(zip(t,t[1:],t[2:]))
print('files',nfiles,'unparsed',bad,'strings',nstr,'distinct 3grams',len(grams),'secs %.0f'%(time.time()-t0))
