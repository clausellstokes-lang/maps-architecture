# confirm-consistency: the reply's V13:N citations against V13 before (e68af748) and after (81b3a003) the apply (read-only)
import re, sys, difflib, hashlib
PRE=sys.argv[1]
D='/home/user/maps-architecture/docs/'
old=open(PRE).read().split('\n'); new=open(D+'volumes/V13-world.md').read().split('\n')
assert hashlib.md5(open(PRE,'rb').read()).hexdigest().startswith('e68af748')
rep=open(D+'HOST-REPLY-HIDDEN-WAYS-2026-10-18.md').read().split('\n')
sm=difflib.SequenceMatcher(None, old, new, autojunk=False)
m={}
for a,b,n in sm.get_matching_blocks():
    for k in range(n): m[a+k]=b+k
cites=[]
for i,l in enumerate(rep):
    for mm in re.finditer(r'V13:(\d{2,4})(?:[–-](\d{2,4}))?', l):
        cites.append((i+1, int(mm.group(1)), l))
picks=sorted(set(int(x) for x in sys.argv[2].split(',')))
ok=0; out=[]
for rl, n, l in cites:
    if n not in picks: continue
    picks.remove(n)
    # the quote nearest before the citation in the reply line
    pre=l[:l.find('V13:%d'%n)]
    q=re.findall(r'"([^"]{12,})"', pre) or re.findall(r'`([^`]{4,})`', pre)
    q=q[-1] if q else None
    frag=None
    if q:
        frag=q.split('…')[0][:40]
    o=old[n-1]
    inold = (frag in ' '.join(old[n-2:n+2])) if frag else None
    if n-1 in m:
        nn=m[n-1]+1; status='moved %+d'%(nn-n)
        innew = (frag in ' '.join(new[nn-2:nn+2])) if frag else None
    else:
        # line changed by a fragment: search the fragment of the quote anywhere near
        nn=None; status='rewritten by file w'
        innew=None
        if frag:
            hits=[k+1 for k,x in enumerate(new) if frag in x]
            innew=bool(hits); nn=hits[0] if hits else None
    good = (inold is not False) and (innew is not False or status.startswith('rewritten'))
    ok+=good
    out.append(f'reply:{rl} V13:{n} -> {nn} [{status}] quote={frag!r} pre-hit={inold} post-hit={innew} {"OK" if good else "FAIL"}')
print('\n'.join(out)); print('spot-checked',len(out),'ok',ok)
