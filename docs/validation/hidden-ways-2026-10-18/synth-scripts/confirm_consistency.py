# confirm-consistency: definition counts of every id file w's new texts cite (read-only)
import json, re, sys, collections
D='/home/user/maps-architecture/docs/'
V13=open(D+'volumes/V13-world.md').read().split('\n')
V14=open(D+'volumes/V14-sites.md').read().split('\n')
HRQ=open(D+'HOST-REQUIREMENTS-2026-10-18.md').read().split('\n')
fr=json.load(open(D+'validation/hidden-ways-2026-10-18/draft-w.fragments.json'))
news=' '.join(f['new'] for f in fr)
def defs(lines, rx):
    r=re.compile(rx); return [i+1 for i,l in enumerate(lines) if r.search(l)]
res=[]; fails=[]
def chk(kind, idv, lines, rx, want=1, where=''):
    n=defs(lines, rx); ok=len(n)==want
    res.append((kind,idv,where,len(n),n[:6],ok))
    if not ok: fails.append(f'{kind} {idv}: {len(n)} definitions in {where} at {n[:6]} (want {want})')
for t in sorted(set(re.findall(r'T-V13-(\d+)', news)), key=int):
    chk('T', 'T-V13-'+t, V13, r'^\| T-V13-%s \|'%t, where='V13 §7')
# ranges like "T-V13-57 – 61" / "59 – 61": expand cited ranges
for a,b in set(re.findall(r'T-V13-(\d+) ?[–-] ?(?:T-V13-)?(\d+)', news)):
    for t in range(int(a), int(b)+1):
        chk('T(range)', 'T-V13-%d'%t, V13, r'^\| T-V13-%d \|'%t, where='V13 §7')
js=set(re.findall(r'J-V13\.(\d+)', news))
for a,b in re.findall(r'J-V13\.(\d+) ?[–-] ?(?:J-V13\.)?(\d+)', news):
    js |= {str(x) for x in range(int(a), int(b)+1)}
for j in sorted(js, key=int):
    chk('J', 'J-V13.'+j, V13, r'^\| J-V13\.%s \|'%j, where='V13 §9')
for h in sorted(set(re.findall(r'\bH(\d+)\b', news)), key=int):
    chk('H(V13)', 'H'+h, V13, r'^\| H%s \|'%h, where='V13 §8.5')
for h in ['32']:
    chk('H(HRQ)', 'H'+h, HRQ, r'^\| H%s \|'%h, want=2, where='HRQ (milestone table + lens-dependency table)')
for w in sorted(set(re.findall(r'W_(?:TROD|ROUTE_JUNCTION)_[A-Z_]+', news))):
    chk('W', w, V13, r'^\| [^|]*`%s`'%w, where='V13 §5 code table')
chk('WORLD', 'WORLD-18', V13, r'`WORLD-18` W7 \(13\)', where='V13 §6 budget')
chk('BCR', 'BCR-V13-37', V13, r'^\*\*BCR-V13-37 —', where='V13 §16')
chk('BCR', 'BCR-V14-19', V14, r'^\| \*\*BCR-V14-19\*\*', where='V14 BCR table')
for k,kind,idv,where,n,at,ok in [(None,)+r for r in res]:
    print(('OK  ' if ok else 'FAIL'), kind, idv, where, n, at)
print('checked', len(res), 'failures', len(fails))
for f in fails: print('  ', f)
