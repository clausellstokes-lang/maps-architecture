# Mechanical pre-clean of V02 for the coherence rewrite: citation form (G-cite), narration ids inside parentheticals,
# BCR -> f item pointers. Output is a working copy only; every section is then edited by hand against the original.
import re, json, sys
W='/Users/cstokes/Desktop/Maps/docs/validation/coherence/work/rewrite-V02/'
src=open('/Users/cstokes/Desktop/Maps/docs/volumes/V02-buildings.md').read()
bcr=json.load(open(W+'bcr_map.json'))
PRIMARY={'BCR-V2-14':376,'BCR-V2-20':524,'BCR-V2-37':525}
NARR_ID=r'(?:S23(?:R\d)?-\d+|SCC(?:-R\dC)?-\d+|V\dC-\d+|V1\dC-\d+|SR\d?-\d+|ST-\d+|C\d-[\d]+(?:-\d+)?|TW-\d+|S23R\dC?-\d+|J-S23\.\d+|SCC-R\dC-\d+|SLR\d-\d+)(?:\s*\((?:\d+[a-z]?|[a-z])\)(?:\s*,\s*\((?:\d+[a-z]?)\))*)?'
NARR_PHRASE=r'(?:reconciliation round \d+(?:,? continuation)?|(?:the )?second revision|item 110 fold|the revision(?: of 2026-09-28)?|seam|as reconciled|as switched|finalization|the finalization|round \d+|revise-V\d+|reconcile-V\d+-r\d+)'
def is_narr(part):
    p=part.strip().strip('.').strip()
    if not p: return True
    # strip joining words
    q=re.sub(NARR_ID,'',p)
    q=re.sub(NARR_PHRASE,'',q,flags=re.I)
    q=re.sub(r'\b(and|with|also|as|by|since|extended|restated|amended|named here|written|landed|applied|of|the|same-shape sweep|sweep|continuation|re-issued task|its)\b','',q,flags=re.I)
    q=re.sub(r'[\s,;:\-–—()/]+','',q)
    return q==''
def clean_paren(m):
    inner=m.group(1)
    if not re.search(NARR_ID,inner) and not re.search(NARR_PHRASE,inner,flags=re.I):
        return '('+inner+')'
    parts=re.split(r';\s*',inner)
    keep=[x for x in parts if not is_narr(x)]
    if not keep: return ''
    # also drop trailing narration after comma inside a kept part: ", reconciliation round 2, S23R1-06"
    out=[]
    for x in keep:
        segs=re.split(r',\s*',x)
        segs2=[s for s in segs if not is_narr(s)]
        if not segs2: continue
        out.append(', '.join(segs2))
    if not out: return ''
    return '('+'; '.join(out)+')'
def clean_line(l):
    # innermost parentheses first, repeat
    for _ in range(4):
        l2=re.sub(r' ?\(([^()]*)\)', lambda m: (' ' if m.group(0).startswith(' ') else '')+clean_paren(m) if clean_paren(m) else '', l)
        if l2==l: break
        l=l2
    return l
def cite(l):
    l=re.sub(r'\bV2 §','V02 §',l)
    l=re.sub(r'\bV(\d) §',lambda m:'V0'+m.group(1)+' §',l)
    l=re.sub(r'\bV(\d)-(\d+(?:\.\d+)+)',lambda m:'V0'+m.group(1)+' §'+m.group(2),l)
    l=re.sub(r'\b(V\d\d) (\d+(?:\.\d+)*)\b',lambda m:m.group(1)+' §'+m.group(2),l)
    l=re.sub(r'\b[Vv]olume (\d+)\b',lambda m:'V%02d'%int(m.group(1)),l)
    return l
def bcr_to_item(l):
    def rep(m):
        b=m.group(0)
        if b in PRIMARY: return 'item %d'%PRIMARY[b]
        it=bcr.get(b)
        if it and len(it)>=1: return 'item %d'%it[0]
        return b
    l=re.sub(r'BCR-V\d+-\d+',rep,l)
    l=re.sub(r'\bV\d\d (?:BCR-|item )','item ',l) if False else l
    l=re.sub(r'\b(V\d\d) item (\d+)',r'item \2',l)
    return l
lines=src.split('\n')
out=[]
for i,l in enumerate(lines):
    l=cite(l)
    l=clean_line(l)
    out.append(l)
open(W+'cleaned-cite.md','w').write('\n'.join(out))
out2=[bcr_to_item(l) for l in out]
open(W+'cleaned.md','w').write('\n'.join(out2))
import subprocess
print(len(src.split()), len('\n'.join(out2).split()))
