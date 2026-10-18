import re,glob,collections
exec(open(S:='/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/volumes/cov.py').read().split('import glob')[0])
files={f[:3]:open(f).read().split('\n') for f in glob.glob('V*.md')}
def heads(lines):
    h=[];cur2=cur3=''
    for i,l in enumerate(lines):
        if l.startswith('## '): cur2=l[3:].split(' ')[0]; cur3=''
        elif l.startswith('### ') or l.startswith('#### ') or re.match(r'\*\*\d+\.\d+(\.\d+)?[a-z]? ',l) or re.match(r'\*\*V\d+-\d',l):
            m=re.match(r'#+ (\S+)',l) or re.match(r'\*\*(\S+)',l); cur3=m.group(1).rstrip('.')
        h.append((cur2,cur3))
    return h
H={v:heads(L) for v,L in files.items()}
for item,vol,pat,label in checks:
    L=files[vol]; hs=H[vol]; c=collections.Counter()
    for i,l in enumerate(L):
        if re.search(pat,l,flags=re.I):
            s2,s3=hs[i]
            if s2 in ('2','3','4','5','7','1b') or s2.startswith('1b'): c[(s2,s3)]+=1
    top=[f"§{s3 or s2}({n})" for (s2,s3),n in c.most_common(4)]
    print(f"{item:8}|{vol}|{label}|{' '.join(top)}")
