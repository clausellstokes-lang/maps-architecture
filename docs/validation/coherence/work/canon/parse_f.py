"""Parse docs/AMENDMENTS-2026-09-28f.md into items with their base section, requests, scope, also-touches, and the
reconciliation sections that revise them. Output: work/canon/f_items.json"""
import re, json
SRC='docs/AMENDMENTS-2026-09-28f.md'
lines=open(SRC).read().split('\n')
items={}; cur_sec=None; cur_item=None; in_recon=None
recon_mentions={}
for i,l in enumerate(lines, start=1):
    h=re.match(r'^(#{2,3}) (.*)$', l)
    if h:
        if h.group(1)=='###' and not in_recon:
            cur_sec=h.group(2).strip()
        elif h.group(1)=='##':
            in_recon=h.group(2).strip()
        elif in_recon and h.group(1)=='###':
            pass
        cur_item=None
        continue
    m=re.match(r'^\*\*(\d{3})\.\*\*\s*(.*)$', l)
    if m and not in_recon:
        n=int(m.group(1)); cur_item=n
        items[n]={'item':n,'section_heading':cur_sec,'line':i,'text':m.group(2)}
        continue
    if cur_item and not in_recon:
        if l.strip()=='' :
            cur_item=None
        else:
            items[cur_item]['text']+=' '+l.strip()
    if in_recon:
        for mm in re.finditer(r'\bitems? (\d{3})(?:(?:, | and | to |–|-)(\d{3}))*', l):
            for num in re.findall(r'\d{3}', mm.group(0)):
                k=int(num)
                if 200<=k<=585:
                    recon_mentions.setdefault(k,set()).add(in_recon)
def secnum(h):
    if h is None: return None
    m=re.match(r'^(§?\d+(?:\.\d+)?|II\.\d+(?:\.\d+)?|PART III|Staged)', h)
    return m.group(1) if m else h[:20]
for n,it in items.items():
    t=it['text']
    it['sec']=secnum(it['section_heading'])
    sc=re.findall(r'\*\*(BASE[^*]*|STAGED[^*]*)\*\*', t)
    it['scope']=sc[-1] if sc else ''
    at=re.search(r'Also touches:\s*([^.*]*)', t)
    it['also_touches']=[s.strip() for s in re.split(r',| and ', at.group(1))] if at else []
    nb=re.search(r'\*Needed by:\*\s*([^.*]*)', t)
    it['needed_by']=re.findall(r'V\d\d', nb.group(1)) if nb else []
    it['requests']=sorted(set(re.findall(r'(?:BCR-V\d+-\d+|V0[14] BCR-\d+)', t)))
    it['consolidated']='**Consolidated.**' in t
    it['words']=len(t.split())
    it['revised_in']=sorted(recon_mentions.get(n,[]))
out=[items[k] for k in sorted(items)]
json.dump(out, open('docs/validation/coherence/work/canon/f_items.json','w'), indent=1, ensure_ascii=False)
print(len(out), 'items', min(items), max(items), 'missing', [k for k in range(200,586) if k not in items])
import collections
print(collections.Counter(it['sec'] for it in out).most_common(80))
