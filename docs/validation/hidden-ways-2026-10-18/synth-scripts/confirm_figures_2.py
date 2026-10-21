# confirm-consistency-2: milestone figures, Q5 status, clean room (read-only, python3 -I)
import json, re
D='/home/user/maps-architecture/docs/'; HW=D+'validation/hidden-ways-2026-10-18/'
P={'V13':D+'volumes/V13-world.md','V14':D+'volumes/V14-sites.md','HRQ':D+'HOST-REQUIREMENTS-2026-10-18.md',
   'INDEX':D+'volumes/INDEX.md','SUMMARY':D+'volumes/SUMMARY.md'}
L={k:open(v).read().split('\n') for k,v in P.items()}
n=[0]; fails=[]
def at(k,i,*subs):
    for s in subs:
        n[0]+=1
        if s not in L[k][i-1]: fails.append(f'{k}:{i} lacks {s!r}')
# milestone figures
at('V13',4001,'| **M-W2 routes','| 10 pw (file w')
est=[re.search(r'\| (?:≈ )?(\d+) pw',l.split('|')[-2]+'|') for l in L['V13'][3997:4004]]
vals=[int(re.search(r'(\d+) pw',l.split('|')[-2]).group(1)) for l in L['V13'][3997:4004]]
n[0]+=1
if sum(vals)!=47: fails.append(f'V13 §8.2 estimates sum {vals}={sum(vals)} != 47')
print('§8.2 estimates', vals, sum(vals))
at('V13',4007,'39–47 pw (37–45 before file w, ≈ 2 pw on M-W2')
at('V13',4571,'**BCR-V13-37 — §16','reads 39–47 pw')
at('V13',4572,'by 2 pw more by file w')
at('V13',4573,'moves by 11 pw at both ends (2 for the sway, 7 for the lenses, 2 for file w','to 39–47)')
n[0]+=1
if 2+7+2!=11 or 28+11!=39 or 36+11!=47: fails.append('BCR arithmetic')
at('V13',4674,'8 → 10'); at('V13',4676,'37–45 → 39–47'); at('V13',4687,'M-W2 10 pw, the staged row 39–47')
at('V13',157,'M-W2 at 10 pw and the staged row at 39–47')
at('INDEX',39,'39–47 as one staged row'); at('INDEX',225,'M-W2 8 → 10 pw','(M-W2 10 pw, the staged row 39–47)')
at('INDEX',258,'39–47 (37–45 before file w')
at('SUMMARY',130,'about **39–47 person-weeks**'); at('SUMMARY',134,'25.75–36.25')
at('SUMMARY',136,'about **457–622 person-weeks**','the earlier 392–539')
n[0]+=1
if (round(392+39+25.75),round(539+47+36.25))!=(457,622): fails.append('SUMMARY total arithmetic')
at('SUMMARY',218,"the world's 39–47 since you accepted")
at('HRQ',143,'| M-W2 |','10 person-weeks, 8 before file w','(V13 §8.2, line 4001)')
at('HRQ',146,'one staged row of 39 to 47 person-weeks','(lines 4006–4007)')
at('HRQ',717,'M-W2 is 10 pw (the staged row 39–47)')
# the HRQ cites point at what they say
at('V13',4006,'The volume states no total of its own')
# stale figures anywhere in the five targets
bad=[]
for k in P:
    for i,l in enumerate(L[k],1):
        for m in re.finditer(r'37–45|37 to 45|455–620',l):
            ctx=l[max(0,m.start()-60):m.end()+60]
            n[0]+=1
            if not re.search(r'before file w|→ 39–47|took as 37–45 by file o|37–45 m |455–620 before|37–45 and 25\.75–36\.25 person-weeks; the world',ctx):
                bad.append(f'{k}:{i} {ctx!r}')
fails+=bad
# Q5 answered
at('V13',4686,'**Answered 2026-10-19 (J421):**'); at('V13',4219,'answered on 2026-10-19 (J421)')
at('V13',156,"the owner's answer to §11 Q5")
at('HRQ',717,'V13 §11 Q5, answered by the owner on 2026-10-19, J421')
at('INDEX',186,'the owner answering it on 2026-10-19','J421')
at('INDEX',225,'(J421: "i follow your recommendations")','(answered by the owner)')
at('SUMMARY',16,'that you answered on 19 October by following the recommendations')
at('SUMMARY',173,'which you accepted on 19 October')
at('SUMMARY',223,'answered by you on 19 October'); at('SUMMARY',228,'You followed the recommendations on 19 October')
at('SUMMARY',240,'seven proceed on their recommendation'); at('SUMMARY',241,'two you answered on 18 October and one on 19 October')
n[0]+=1
if 7+2+1!=10: fails.append('decision count')
for k in P:
    for i,l in enumerate(L[k],1):
        if re.search(r'pending your look|open for the owner|put to the owner in Q5(?!, answered)',l):
            n[0]+=1; fails.append(f'{k}:{i} Q5 still open')
# clean room
toks=['way_known','way_rung','way_forgotten','settlementId','wayId','spatialLedgers',"how: 'office'","kind: 'hidden'",'research/sf','HRQ:','FPI:','TRD:','FTH:','FPS:','FRR:','PLG:','LNS:','src/','.js','.ts','`wild`','tick)','H32 hash']
fx=json.load(open(HW+'draft-x.fragments.json'))
vx=' '.join(f['new'] for f in fx if 'V13' in f['file'] or 'V14' in f['file'])
for t in toks:
    n[0]+=1
    if re.search(re.escape(t)+(r'\b' if t in ('.js','.ts') else ''),vx): fails.append(f'clean room: {t!r} in x V13/V14 new text')
whole={}
for k in ('V13','V14'):
    for t in toks:
        rx=re.escape(t)+(r'\b' if t in ('.js','.ts') else '')
        h=[i for i,l in enumerate(L[k],1) if re.search(rx,l)]
        if h: whole[(k,t)]=h
print('whole-volume token hits', whole)
n[0]+=1
want={('V13','research/sf'):[37,48],('V14','src/'):[2864],('V14','.ts'):[2864,2977,3149,3216]}
if whole!=want: fails.append(f'clean room whole-volume differs: {whole}')
print('checked',n[0],'failures',len(fails))
for f in fails: print('FAIL',f)
