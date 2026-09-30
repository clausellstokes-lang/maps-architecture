# -*- coding: utf-8 -*-
import re,sys,os,json
R=json.load(open(os.path.join(os.path.dirname(__file__),'..','req2f.json')))
def fitem(req):
    v=R.get(req)
    return v[0][0] if v else None
def clean(t):
    # BCR ids -> file f items
    def bcr(m):
        pre=m.group(1) or ''; req=m.group(2)
        key=(pre.strip()+' '+req).strip() if pre.strip() in ('V01','V04') else req
        n=fitem(key)
        return 'file f item %d'%n if n else m.group(0)
    t=re.sub(r'(V0[14] )?(BCR-(?:V\d+-)?\d+)',bcr,t)
    t=re.sub(r'file f item (\d+)(?: \([^()]*\))?; file f item \1\b',r'file f item \1',t)
    t=re.sub(r'file f file f','file f',t)
    t=re.sub(r'file f item (\d+) \((?:file f item \1(?:, |; )?)+\)',r'file f item \1',t)
    t=re.sub(r'file f item (\d+),? absorbing file f item \1',r'file f item \1',t)
    t=re.sub(r'\(file f item (\d+)\); file f item \1',r'file f item \1',t)
    # provenance ids
    ONE=r'(?:critique-V\d+ |critique |seam |seam-[a-z-]+-r\d+ )?(?:ST|TR|TT|TU|TV|TW|TX|SS|SR\d|SLR\d|SCC(?:-R\dC)?|C6|C5|C4-110|C4|V\dC|V1\dC|I110R|CVR-V\d+|RC\d|FL|SR)-\d+(?:\s?\((?:[a-z]|\d+|[a-z]\u2032|\d[a-z]?)\))*(?:\s?[–-]\s?(?:C4-110-|C6-|C5-|ST-|TR-|SR\d-|SS-|V\dC-)?\d+)?(?:\s?\((?:[a-z]|\d+)\))*(?:[\'\u2019]s (?:V\d\d |V0\d |volume \d+ )?(?:half|row|part|reading|companion|clause))?'
    LIST=ONE+r'(?:(?:,\s*|\s(?:and|with)\s|;\s*)'+ONE+r')*'
    RR=r'(?:the )?reconciliation round \d(?:[\'’]s continuation)?(?:,? ?(?:'+LIST+r'))?|the finalization|the second revision|the first revision|reconcile-[A-Za-z0-9-]+'
    for _ in range(3):
        t=re.sub(r'\s*\((?:'+LIST+r'|'+RR+r')\)','',t)
        t=re.sub(r'[;,]\s*(?:'+LIST+r'|'+RR+r')(?=\s*[);\]])','',t)
        t=re.sub(r'\((?:'+LIST+r'|'+RR+r')[;,]\s*','(',t)
    t=re.sub(r' (?:as|by) (?:seam )?(?:SS|ST|SR\d|TW|TX|TR|TT|TU|TV|SCC)-\d+(?: \([a-z0-9]\))? (?:fixes|amends|words|states|gives|reads) (?:it|them)','',t)
    # DR aliases
    for a,b in [('DR-V6.1','DR28'),('DR-V8.6','DR28'),('DR-V8.1','DR29'),('DR-V8.2','DR30'),('DR-V8.3','DR31'),('DR-V8.4','DR32'),('DR-V8.5','DR33'),('DR-V8.7','DR34'),('DR-V8.8','DR35'),('DR-V1.1','DR26'),('DR-SKY','DR27')]:
        t=t.replace(a,b)
    for a,b in [('`D_v = D − D_o`','`N_v = N − N_o`'),('`D_v + D_o = D`','`N_v + N_o = N`'),('dwellings `D`','dwellings `N`'),('dwelling count `D`','dwelling count `N`'),('(`D` for the piers','(`N` for the piers')]:
        t=t.replace(a,b)
    t=re.sub(r'\bD_([vob])\b',r'N_\1',t)
    t=re.sub(r'\bfirst paint\b','first map',t)
    t=re.sub(r' +([,;.)])',r'\1',t)
    t=re.sub(r'\(\s*\)','',t)
    return t
src,dst=sys.argv[1],sys.argv[2]
os.makedirs(dst,exist_ok=True)
for f in sorted(os.listdir(src)):
    open(os.path.join(dst,f),'w').write(clean(open(os.path.join(src,f)).read()))
