#!/usr/bin/env python3
# tabitems.py FILE START END VOL KIND SEC OWNER COLS
# COLS: comma list mapping column index -> role: s (statement part), r (reads), u (used_by), k (keys); e.g. "s,r,u,k"
# each markdown table row between START and END (inclusive, 1-based) becomes one item; statement = 'col0 — col_s...' joined
import sys,json,os,re
f,a,b,vol,kind,sec,owner,cols=sys.argv[1:9]
a,b=int(a),int(b); roles=cols.split(',')
W=os.path.dirname(os.path.abspath(__file__)); IT=f'{W}/items.jsonl'
cnt=0
for l in open(IT):
    if l.strip():
        d=json.loads(l)
        if d['id'][:3]==vol: cnt=max(cnt,int(d['id'][4:]))
ALL=open(f).read().split('\n'); lines=ALL[a-1:b]
out=open(IT,'a'); n=0
for ln,l in zip(range(a,b+1),lines):
    l=l.strip()
    if not l.startswith('|') or re.match(r'^\|[-| :]+\|$',l.strip()): continue
    if ln < len(ALL) and re.match(r'^\|[-| :]+\|$',ALL[ln].strip()): continue  # header row
    # split on | not inside backticks
    cells=[];cur='';tick=False
    src=l.strip()[1:-1].replace('\\|','¦')
    for ch in src:
        if ch=='`': tick=not tick
        if ch=='|' and not tick: cells.append(cur.strip()); cur=''
        else: cur+=ch
    cells.append(cur.strip())
    if len(cells)!=len(roles): print('WARN cols',ln,len(cells)); 
    st=[];rd=[];us=[];ky=[]
    for i,c in enumerate(cells):
        r=roles[i] if i<len(roles) else 's'
        if r=='s': st.append(c)
        elif r=='r': rd.append(c)
        elif r=='u': us.append(c)
        elif r=='k': ky.append(c)
        elif r.startswith('s:'): st.append(r[2:]+': '+c)
    if st and st[0].startswith('piece') or (st and st[0].split(' (')[0] in ('fact shown','event kind','base section','kind','question','state','screen','card field','class','bar','id','milestone','request','decision','piece','fact','event','test','tool','step')): continue
    cnt+=1; n+=1
    d={'id':f'{vol}-{cnt:04d}','kind':kind,'sec':sec,'owner':owner,'statement':' — '.join(st)+f' [line {ln}]','reads':rd,'used_by':us,'keys':ky}
    out.write(json.dumps(d,ensure_ascii=False)+'\n')
print('added',n,'last',cnt)
