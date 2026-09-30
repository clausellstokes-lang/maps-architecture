# -*- coding: utf-8 -*-
# V09 transform: citation forms (G-cite, BREF-3 list continuation), DR ids (ID-DR), BCR -> applied f items (ID-BCR / S1),
# retired terms, provenance narration ids (NARR-3/5)
import re,sys,os,json
H=os.path.dirname(os.path.abspath(__file__)); W=os.path.join(H,'..')
R=json.load(open(os.path.join(W,'req2f.json')))
S=json.load(open(os.path.join(W,'secsets.json')))
SETS={k:set(v) for k,v in S.items() if not k.endswith('_src')}
# V09's own set from the source
SETS['V10']=set(SETS['V10'])
def fitem(req):
    v=R.get(req); return v[0][0] if v else None
SEC=r'(?:\d+[a-z]?(?:\.\d+[a-z]?)*|II(?:\.\d+)+)'
def conv(t):
    # citation forms
    t=re.sub(r'(?<![\w\-./])V([1-9])-(\d+(?:\.\d+)+)',lambda m:'V0%s §%s'%(m.group(1),m.group(2)),t)
    t=re.sub(r'(?<![\w\-./])V([1-9])(?=\s+§|[\'’]s\b| \(|W\d)',lambda m:'V0'+m.group(1),t)
    t=re.sub(r"the(\s+)base['’]s(\s+)§",r'§',t)
    t=re.sub(r'\bV(\d\d) V\1 §',r'V\1 §',t)
    # list continuation: "Vnn §a, §b" / "Vnn §a and §b" -> "Vnn §a, Vnn §b" when §b exists in Vnn
    pat=re.compile(r'(V(\d\d)\s+§'+SEC+r'(?:\s\((?:[a-z0-9]{1,3}|[a-z0-9]{1,3}′)\))*(?:(?:,\s|\sand\s|,\sand\s)(?:V\2\s)?§'+SEC+r'(?:\s\([a-z0-9]{1,3}\))*)*)((?:,\s|\sand\s|,\sand\s))§('+SEC+r')\b')
    def rep(m):
        v='V'+m.group(2); sec=m.group(4)
        if sec in SETS.get(v,set()): return m.group(1)+m.group(3)+v+' §'+sec
        return m.group(0)
    for _ in range(8):
        t2=pat.sub(rep,t)
        if t2==t: break
        t=t2
    # DR aliases (ID-DR)
    for a,b in [('DR-V6.1','DR28'),('DR-V8.6','DR28'),('DR-V8.1','DR29'),('DR-V8.2','DR30'),('DR-V8.3','DR31'),('DR-V8.4','DR32'),('DR-V8.5','DR33'),('DR-V8.7','DR34'),('DR-V8.8','DR35'),('DR-V1.1','DR26'),('DR-SKY','DR27')]:
        t=t.replace(a,b)
    # retired terms
    t=re.sub(r'\bfirst paint\b','first map',t)
    t=t.replace('`LayerSpec.showUnexcavated`','the view key `showUnexcavated`')
    t=re.sub(r'\bClerkHarness\b','ClerkHandle',t)
    # provenance ids (narration): (C8-01), (SR2-24 (a)), SS-10, V9C-53 ...
    ONE=r'(?:critique-V\d+(?:[\'’]s)? |critique |seam |seam-[a-z-]+-r\d+(?:[\'’]s)? )?(?:C\d+|ST|TR|TT|TU|TV|TW|TX|SS|SR\d|SLR\d|SCC(?:-R\dC)?|C4-110|V\dC|V1\dC|I110R|CVR-V\d+|RC\d|FL|SR|VD\d|S23R\d)-\d+(?:\s?\((?:[a-z]|\d+|[a-z]′|\d[a-z]?)\))*(?:\s?[–-]\s?(?:C\d+-|C4-110-|ST-|TR-|SR\d-|SS-|V\dC-|SR-)?\d+)?(?:\s?\((?:[a-z]|\d+)\))*(?:[\'’]s (?:V\d\d |V0\d |volume \d+ )?(?:half|row|part|reading|companion|clause))?'
    LIST=ONE+r'(?:(?:,\s*|\s(?:and|with)\s|;\s*)'+ONE+r')*'
    RR=r'(?:the )?reconciliation round \d(?:[\'’]s continuation)?(?:,? ?(?:'+LIST+r'))?|the finalization|the second revision|the first revision|reconcile-[A-Za-z0-9-]+(?:[\'’]s continuation)?'
    for _ in range(3):
        t=re.sub(r'\s*\((?:'+LIST+r'|'+RR+r')\)','',t)
        t=re.sub(r'[;,]\s*(?:'+LIST+r'|'+RR+r')(?=\s*[);\]])','',t)
        t=re.sub(r'\((?:'+LIST+r'|'+RR+r')[;,]\s*','(',t)
    return t
def bcr(t):
    def f(m):
        pre=m.group(1) or ''; req=m.group(2)
        n=fitem(req)
        return 'item %d'%n if n else m.group(0)
    t=re.sub(r'()(BCR-V\d+-\d+)',f,t)
    t=re.sub(r'item (\d+)(?:,| and|;) item \1\b',r'item \1',t)
    return t
if __name__=='__main__':
    src,dst=sys.argv[1],sys.argv[2]
    os.makedirs(dst,exist_ok=True)
    for fn in sorted(os.listdir(src)):
        x=conv(open(os.path.join(src,fn)).read())
        # §10.1 keeps its request ids (pointers written by hand); elsewhere BCR -> item
        if not fn.startswith('03050_'): x=bcr(x)
        open(os.path.join(dst,fn),'w').write(x)
