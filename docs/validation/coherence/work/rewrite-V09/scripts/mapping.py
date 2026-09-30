import re,json
W='/home/user/maps-architecture/docs/validation/coherence/work/rewrite-V09/'
NEW=open('/home/user/maps-architecture/docs/validation/coherence/new/volumes/V09-application.md').read()
req=json.load(open(W+'req2f.json'))
own={'BCR-V9-1':514,'BCR-V9-2':515,'BCR-V9-3':277,'BCR-V9-5':460,'BCR-V9-7':411,'BCR-V9-8':516,'BCR-V9-9':517,'BCR-V9-10':461,'BCR-V9-11':462,'BCR-V9-12':463,'BCR-V9-13':360,'BCR-V9-14':453,'BCR-V9-15':454,'BCR-V9-16':348,'BCR-V9-17':494,'BCR-V9-18':530,'BCR-V9-19':269,'BCR-V9-20':278,'BCR-V9-21':361,'BCR-V9-22':372,'BCR-V9-23':464,'BCR-V9-24':490,'BCR-V9-25':413,'BCR-V9-26':362,'BCR-V9-27':465,'BCR-V9-28':466,'BCR-V9-29':363,'BCR-V9-30':246,'BCR-V9-31':447,'BCR-V9-32':455,'BCR-V9-33':364,'BCR-V9-34':467,'BCR-V9-35':570,'BCR-V9-36':583}
xvclose={1:'V11 §4.2 (canon ruling V09-XAGREE-1)',2:'V11 §4.2 (canon ruling V09-XAGREE-1)',3:'V04 §1b.1, V04 §1b.3, V04 §2.6, V04 §5.1',4:'V04 §4.5, V04 §5.2, V04 §4.1',5:'V03 §3.7.4 (canon ruling V09-XAGREE-2)',6:'V02 §3.14.5, V02 §4.5, V02 §4.6',7:'V10 §2.6, V10 §2.4, V10 §1b.1',8:'V04 §8, V05 §8, V10 §8, V02 §8.3',9:'V07 §3.4, V07 §5.1',10:'V10 §4.1',11:'V10 §2.6, V10 §5.4, V10 §4.4',12:'V10 §4.1, V10 §2.13, V10 §3.9, V10 §2.6, V10 §4.3',13:'V11 §3.24.1, V11 §3.24.4, V11 §3.24.2',14:'V04 §2.2, V04 §5.1',15:'V03 §4.2',16:'V05 §2.6, V05 §4.1, V05 §4.2',17:'V08 §3.1',18:'V10 §2.6, V10 §3.17, V10 §2.3, V10 §3.9a',19:'V10 §2.6, V10 §4.1, V10 §2.3',20:'V08 §3.1, V08 §3.14',21:'V08 §3.1, V08 §4.6, V08 §5.1',22:'V10 §4.3, V10 §2.6, V10 §1b.2, V10 §3.1',23:'V06 §3.19.3, V06 §2.12',24:'V08 §3.1, V08 §3.8, V08 §5.2',25:'V05 §3.22',26:'V08 §5.2',27:'V04 §3.8, V04 §4.1',28:'V06 §2.10, V06 §3.19.3',29:'V08 §3.1',30:'V10 §3.5, V10 §1b.1, V10 §2.6, V10 §3.16, V10 §3.11, V10 §3.17',31:'V11 §3.1 row 87 (cross-part note to the V11 rewrite)'}
retired=[('refuse.raised.','renamed to its `bend.raised.*` row (J-VI.4; IN-V09-2)'),('refuse.aqueduct.','renamed to its `bend.aqueduct.*` row (J-VI.4)'),('refuse.retaining.rim','renamed `bend.retaining.rim` (J-VI.4)'),('refuse.stack','replaced by V02 §1b\'s bend ids (V09-XAGREE-3)'),('bend.tiers.flights','retired: no producer; V02 §1b\'s ids (V09-XAGREE-3)'),('bend.stack.internalSolid','retired: no producer; V02 §1b\'s ids (V09-XAGREE-3)'),('bend.stack.removeStair','retired: no producer (V09-XAGREE-3)'),('bend.stack.addWing','retired: no producer (V09-XAGREE-3)'),('bend.stack.deck','retired: V02\'s `bend.deck.*` ids (V09-XAGREE-3)'),('bend.stack.notStepped','retired: no producer (V09-XAGREE-3)'),('error.clerkOffline','retired: one row `refuse.clerk.offline`, V10\'s (E-32)'),('button.giveTiers','retired with the `giveTiers` event form (V09-XAGREE-3)'),('button.rebuildFrom','renamed `button.rederiveFrom` (G-rederive)'),('info.catacomb.grew','renamed `panel.catacomb.grew`'),('refuse.noSite','renamed `bend.place.noSite` (J-VI.30; IN-V09-16)'),('refuse.overBudget','renamed `bend.place.overBudget` (J-VI.30)'),('refuse.vacateFirst','renamed `bend.vacate` (J-VI.30)')]
def jrow(n):
    return 'V09 §9 J-V9.%s'%n
rows=[]
unres=[]
for l in open(W+'inv.tsv'):
    f=l.rstrip('\n').split('\t')
    iid,kind,sec,role,stmt=f
    note=''
    if sec=='header': now='V09 head (*How to read this volume*)'
    elif sec=='glossary':
        now='canon glossary; used at its V09 home'
        m=re.search(r'\(V9 (§[0-9.]+)',stmt)
        if m: now='canon glossary; V09 '+m.group(1)
        if 'scoped re-roll' in stmt: note='term: New random over a scope (V09 §3.7), "Try again" its label only (G-newrandom)'
    elif sec=='IN':
        now='folded into the body; V09 Integration notes table'
    elif sec=='finalization': now='V09 §4.16, T-V9-70 (the change log dropped: S9)'
    elif role=='history-out': now='V09 §12 (condensed; round logs dropped: S9)'
    elif role=='answer-J121-J122':
        q=re.match(r'(Q\d)',stmt).group(1); now='V09 §11 %s answered (J121/J122); read at its body home'%q
    elif role=='bcr-pointer':
        m=re.match(r'(BCR-V9-\d+)',stmt)
        b=m.group(1) if m else None
        if b in own: now='V09 §10.1 row %s → item %d'%(b,own[b])
        else: now='V09 §10.1 row %s (withdrawn)'%b
    elif role=='handoff':
        m=re.match(r'XV-V9-(\d+)',stmt)
        if m: now='V09 §10.2 row XV-V9-%s, closed at %s'%(m.group(1),xvclose[int(m.group(1))])
        else: now='V09 §13 (hand-off table)'
    elif sec=='9':
        m=re.match(r'(J-V9\.\d+)',stmt); now='V09 §9 '+(m.group(1) if m else '')
        if 'withdrawn' in stmt[:80]: note='E-24 mark: superseded by …'
    elif sec=='7.1' and kind=='test':
        m=re.match(r'(T-V9-\d+)',stmt); now='V09 §7.1 '+(m.group(1) if m else '')
    elif sec=='10.2': now='V09 §10.2'
    elif sec=='11': now='V09 §11'
    elif sec=='12': now='V09 §12'
    elif sec=='13': now='V09 §13'
    else:
        now='V09 §'+sec
        if sec=='3.7': now='V09 §3.7 (heading now "New random over a scope")'
    if role=='reference': note=(note+'; ' if note else '')+'restatement replaced by a citation of its home'
    if role=='index-row': note=(note+'; ' if note else '')+'index row kept, citing'
    if kind=='message':
        km=re.match(r'`([^`]+)`',stmt)
        if km:
            k=km.group(1)
            done=False
            for a,b in retired:
                if k.startswith(a): note=(note+'; ' if note else '')+b; done=True; break
            if not done and ('`%s`'%k not in NEW and k.split(' ')[0] not in NEW):
                unres.append((iid,k))
    rows.append((iid,kind,sec,now,note))
json.dump(rows,open('/tmp/maps-scratch/coherence/v09-map.json','w'))
print(len(rows),'unresolved msg keys',len(unres)); print(unres[:60])
