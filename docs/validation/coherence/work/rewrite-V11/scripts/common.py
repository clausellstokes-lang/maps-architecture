import re,json,os
W='/home/user/maps-architecture/docs/validation/coherence/work/rewrite-V11'
R=json.load(open(os.path.join(W,'req2f.json')))
def items_of(req):
    v=R.get(req)
    if not v: return None
    ns=[]
    for n,_ in v:
        if n not in ns: ns.append(n)
    return ns
def fmt(ns):
    if len(ns)==1: return 'item %d'%ns[0]
    return 'items '+', '.join(str(n) for n in ns[:-1])+' and %d'%ns[-1]
def bcr(t):
    # "BCR-V9-8 = file f item 516" -> "item 516"
    t=re.sub(r'BCR-V\d+-\d+ = (?:file f )?item (\d+)',r'item \1',t)
    t=re.sub(r"(?:V\d\d['’]s |V\d\d )?BCR-V(\d+)-(\d+)(?:['’]s)?(?:, file f item \d+)?",lambda m: (fmt(items_of('BCR-V%s-%s'%(m.group(1),m.group(2))))+("'s" if m.group(0).endswith(("'s","’s")) else '')) if items_of('BCR-V%s-%s'%(m.group(1),m.group(2))) else m.group(0),t)
    t=re.sub(r"V01['’]s BCR-(\d+)",lambda m: fmt(items_of('V01 BCR-%s'%m.group(1))) if items_of('V01 BCR-%s'%m.group(1)) else m.group(0),t)
    t=re.sub(r"V04['’]?s? BCR-(\d+)",lambda m: fmt(items_of('V04 BCR-%s'%m.group(1))) if items_of('V04 BCR-%s'%m.group(1)) else m.group(0),t)
    t=re.sub(r'\bfile f (items? \d)',r'\1',t)
    t=re.sub(r'\bitem (\d+) \(item \1\)',r'item \1',t)
    t=re.sub(r'\bitem (\d+)(?:,| and|;) item \1\b',r'item \1',t)
    t=re.sub(r'\(item (\d+)\) \(item \1\)',r'(item \1)',t)
    return t
NARR=re.compile(r"\b(SCC-R\dC-\d+|SCC-\d+|SS-\d+|SR\d-\d+|V1\dC-\d+|V\dC-\d+|RV-pc-\d+|reconciliation round|round \d|revise-V11|reconcile-V\d+)")
def narr_report(t,label=''):
    hits=[(m.group(0),t.count('\n',0,m.start())+1) for m in NARR.finditer(t)]
    if hits: print(label,'NARR left:',len(hits),hits[:40])
    b=re.findall(r'BCR-[\w-]+',t)
    if b: print(label,'BCR left:',sorted(set(b)))
