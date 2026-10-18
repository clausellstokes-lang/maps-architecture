import re,sys
A=open('/Users/cstokes/Desktop/Maps/docs/ARCHITECTURE.md',encoding='utf-8').read().split('\n')
def sec(num):
    # find heading ### num or ## §num or ## num
    start=None;lvl=None
    for i,l in enumerate(A):
        m=re.match(r'^(#{2,4}) (?:§)?'+re.escape(num)+r'[ .]',l+' ')
        if m: start=i;lvl=len(m.group(1));break
    if start is None: return None,None
    end=len(A)
    for j in range(start+1,len(A)):
        m=re.match(r'^(#{1,4}) ',A[j])
        if m and len(m.group(1))<=lvl: end=j;break
    return start+1,'\n'.join(A[start:end])
checks=[l.split('\t') for l in sys.stdin.read().strip().split('\n')]
for c in checks:
    num,needle=c[0],c[1]
    st,t=sec(num)
    if t is None: print('NOSEC',num,needle);continue
    hits=[m.start() for m in re.finditer(needle,t)]
    if hits:
        pos=hits[0]; line=t[:pos].count('\n')+st
        print('OK',num,'|',needle,'| line',line,'|',t[max(0,pos-60):pos+100].replace('\n',' '))
    else: print('MISS',num,'|',needle)
