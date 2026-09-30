# -*- coding: utf-8 -*-
# V08 transform: citation forms (G-cite), DR ids (ID-DR), BCR -> applied f items (ID-BCR / S1), retired terms, provenance narration ids
import re,sys,os,json
H=os.path.dirname(os.path.abspath(__file__))
R=json.load(open(os.path.join(H,'..','req2f.json')))
def fitem(req):
    v=R.get(req); return v[0][0] if v else None
def conv(t):
    # citation forms
    t=re.sub(r'(?<![\w\-./])V([1-9])(?= §|[\'’]s\b| \(|W\d)',lambda m:'V0'+m.group(1),t)
    t=re.sub(r"the(\s+)base['’]s(\s+)§",r'§',t)
    # DR aliases (ID-DR)
    for a,b in [('DR-V6.1','DR28'),('DR-V8.6','DR28'),('DR-V8.1','DR29'),('DR-V8.2','DR30'),('DR-V8.3','DR31'),('DR-V8.4','DR32'),('DR-V8.5','DR33'),('DR-V8.7','DR34'),('DR-V8.8','DR35'),('DR-V1.1','DR26'),('DR-SKY','DR27')]:
        t=t.replace(a,b)
    # BCR ids -> the applied f item
    def bcr(m):
        pre=m.group(1) or ''; req=m.group(2)
        key=(pre.strip()+' '+req).strip() if pre.strip() in ('V01','V04') else req
        n=fitem(key)
        return 'item %d'%n if n else m.group(0)
    t=re.sub(r'(V0[14] )?(BCR-(?:V\d+-)?\d+)',bcr,t)
    t=re.sub(r'item (\d+)(?:,| and|;) item \1\b',r'item \1',t)
    # retired terms
    t=re.sub(r'\bfirst paint\b','first map',t)
    t=t.replace('BuildingInput.lot','BuildingInput.plot')
    t=re.sub(r'\bPortRungPath\b','ProductDecl',t); t=re.sub(r'\bregisterRungPath\b','StrategyRegistry.products',t)
    # provenance ids (narration): (C8-01), (SR2-24 (a)), SS-10, ST-30 ...
    ONE=r'(?:critique-V\d+ |critique |seam |seam-[a-z-]+-r\d+ )?(?:C8|ST|TR|TT|TU|TV|TW|TX|SS|SR\d|SLR\d|SCC(?:-R\dC)?|C6|C5|C4-110|C4|V\dC|V1\dC|I110R|CVR-V\d+|RC\d|FL|SR|VD\d)-\d+(?:\s?\((?:[a-z]|\d+|[a-z]′|\d[a-z]?)\))*(?:\s?[–-]\s?(?:C8-|C4-110-|C6-|C5-|ST-|TR-|SR\d-|SS-|V\dC-)?\d+)?(?:\s?\((?:[a-z]|\d+)\))*(?:[\'’]s (?:V\d\d |V0\d |volume \d+ )?(?:half|row|part|reading|companion|clause))?'
    LIST=ONE+r'(?:(?:,\s*|\s(?:and|with)\s|;\s*)'+ONE+r')*'
    RR=r'(?:the )?reconciliation round \d(?:[\'’]s continuation)?(?:,? ?(?:'+LIST+r'))?|the finalization|the second revision|the first revision|reconcile-[A-Za-z0-9-]+'
    for _ in range(3):
        t=re.sub(r'\s*\((?:'+LIST+r'|'+RR+r')\)','',t)
        t=re.sub(r'[;,]\s*(?:'+LIST+r'|'+RR+r')(?=\s*[);\]])','',t)
        t=re.sub(r'\((?:'+LIST+r'|'+RR+r')[;,]\s*','(',t)
    return t
src,dst=sys.argv[1],sys.argv[2]
os.makedirs(dst,exist_ok=True)
for f in sorted(os.listdir(src)):
    open(os.path.join(dst,f),'w').write(conv(open(os.path.join(src,f)).read()))
