# -*- coding: utf-8 -*-
# V11 transform: citation forms (G-cite, BREF-2 bare own refs, BREF-3 list continuation), DR ids (ID-DR),
# retired terms, provenance narration ids (NARR-3..17). BCR ids handled by hand per section.
import re,sys,os,json
H=os.path.dirname(os.path.abspath(__file__)); W=os.path.join(H,'..')
S=json.load(open(os.path.join(W,'secsets.json')))
SETS={k:set(v) for k,v in S.items() if not k.endswith('_src')}
BASE=SETS['base']
SETS['V11']|={'3.19.2','3.25','3.26','3.27'}
SEC=r'(?:\d+[a-z]?(?:\.\d+[a-z]?)*|II(?:\.\d+)+)'
def conv(t):
    t=re.sub(r'(?<![\w\-./])V([1-9])-(\d+(?:\.\d+)+)',lambda m:'V0%s §%s'%(m.group(1),m.group(2)),t)
    t=re.sub(r'(?<![\w\-./])V([1-9])(?=\s+§|[\'’]s\b| \(|W\d)',lambda m:'V0'+m.group(1),t)
    t=re.sub(r'\b[Vv]olume ([1-9]) §',lambda m:'V0%s §'%m.group(1),t)
    t=re.sub(r'\b[Vv]olume (1[0-2]) §',lambda m:'V%s §'%m.group(1),t)
    t=re.sub(r"the(\s+)base['’]s(\s+)§",r'§',t)
    t=re.sub(r'\bV(\d\d) V\1 §',r'V\1 §',t)
    # list continuation: Vnn §a, §b -> Vnn §b when b in Vnn and not in base
    pat=re.compile(r'(V(\d\d)\s+§'+SEC+r'(?:\s\((?:[a-z0-9]{1,3}|[a-z0-9]{1,3}′)\))*(?:(?:,\s|\sand\s|,\sand\s|\s[–-]\s|–)(?:V\2\s)?§'+SEC+r'(?:\s\([a-z0-9]{1,3}\))*)*)((?:,\s|\sand\s|,\sand\s|\s[–-]\s|–))§('+SEC+r')\b')
    def rep(m):
        v='V'+m.group(2); sec=m.group(4)
        if sec in SETS.get(v,set()) and sec not in BASE: return m.group(1)+m.group(3)+v+' §'+sec
        return m.group(0)
    for _ in range(10):
        t2=pat.sub(rep,t)
        if t2==t: break
        t=t2
    # bare § not in base but in V11 -> V11 §
    def bare(m):
        sec=m.group(1)
        if sec not in BASE and sec in SETS['V11']: return 'V11 §'+sec
        return m.group(0)
    t=re.sub(r'(?<!V\d\d )(?<!V\d\d\s)§('+SEC+r')(?![\w.])',lambda m: bare(m),t)
    t=re.sub(r'\bV11 V11 §',r'V11 §',t)
    # DR aliases
    for a,b in [('DR-V6.1','DR28'),('DR-V8.6','DR28'),('DR-V8.1','DR29'),('DR-V8.2','DR30'),('DR-V8.3','DR31'),('DR-V8.4','DR32'),('DR-V8.5','DR33'),('DR-V8.7','DR34'),('DR-V8.8','DR35'),('DR-V1.1','DR26'),('DR-SKY','DR27')]:
        t=t.replace(a,b)
    # retired terms
    t=re.sub(r'\bdecline (pool|lottery)\b','strike pool',t)
    t=re.sub(r'\bpanel M4-110\b',"the M4 panel's M4-110 group",t)
    t=t.replace('site.terrainType','site.terrain')
    t=re.sub(r'\bSkyHandover\b','SkyUnitInput',t)
    # provenance ids (narration)
    ONE=r'(?:critique-V\d+(?:[\'’]s)? |critique |seam |seam-[a-z-]+-r\d+(?:[\'’]s)? )?(?:C\d+|ST|TR|TT|TU|TV|TW|TX|SS|SR\d|SLR\d|SCC(?:-R\dC)?|C4-110|V\dC|V1\dC|I110R|RC\d|FL|VD\d|S23R\d|RV-pc)-\d+(?:\s?\((?:[a-z]|\d+|[a-z]′|\d[a-z]?)\))*(?:\s?[–-]\s?(?:C\d+-|C4-110-|ST-|TR-|SR\d-|SS-|V\dC-|V1\dC-|SR-|SCC-|SCC-R\dC-)?\d+)?(?:\s?\((?:[a-z]|\d+)\))*(?:[\'’]s (?:V\d\d |V0\d |volume \d+ )?(?:half|row|part|reading|companion|clause|shape|V11 half|V06 half))?'
    LIST=ONE+r'(?:(?:,\s*|\s(?:and|with)\s|;\s*)'+ONE+r')*'
    RR=r'(?:the )?(?:reconciliation )?round \d(?:[\'’]s continuation)?(?:,? ?(?:'+LIST+r'))?|the finalization|the second revision|the first revision|reconcile-[A-Za-z0-9-]+(?:[\'’]s continuation)?'
    for _ in range(3):
        t=re.sub(r'\s*\((?:'+LIST+r'|'+RR+r')\)','',t)
        t=re.sub(r'[;,]\s*(?:'+LIST+r'|'+RR+r')(?=\s*[);\]])','',t)
        t=re.sub(r'\((?:'+LIST+r'|'+RR+r')[;,]\s*','(',t)
    return t
if __name__=='__main__':
    src,dst=sys.argv[1],sys.argv[2]
    os.makedirs(dst,exist_ok=True)
    for fn in sorted(os.listdir(src)):
        x=conv(open(os.path.join(src,fn)).read())
        open(os.path.join(dst,fn),'w').write(x)
