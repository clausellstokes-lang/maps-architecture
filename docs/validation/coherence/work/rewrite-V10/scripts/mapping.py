import csv,re,json
rows=[l.rstrip('\n').split('\t') for l in open('inv.tsv')]
new=open('/home/user/maps-architecture/docs/validation/coherence/new/volumes/V10-clerk.md').read()
secs=set()
for l in new.split('\n'):
    m=re.match(r'^#{1,6}\s+(\d+[a-z]?(?:\.\d+[a-z]?)*)\b',l)
    if m: secs.add(m.group(1))
ov={
 'V10-0001':'the head\'s *How to read this volume* (citation convention per the canon S7)',
 'V10-0006':'V10 §0 *Turning it on* — reworded per J121/J122 (V10-J121-1): the provider, tier and key path read from the deployment\'s AI configuration',
 'V10-0009':'V10 §1.1 (8) — SettlementForge\'s configuration C named (J121/J122)',
 'V10-0100':'V10 §1b.2 — `ClerkHandle` row without the alias (E-33)',
 'V10-0141':'V10 §2.2 — `backend` comment reads the AI configuration (J121)',
 'V10-0150':'V10 §2.6 — `createClerk(mount)` returns `ClerkHandle`; the alias dropped (E-33)',
 'V10-0152':'V10 §2.6 — alias dropped (E-33)',
 'V10-0183':'V10 §2.10 — `ops.model.id` row per J121 (V10-J121-1)',
 'V10-0194':'V10 §2.11 — the SDK named by the AI configuration (J121)',
 'V10-0198':'V10 §2.12 — `link` cells cite V11 §4.2, the `avoid` condition dropped (V10-XAGREE-1); `weights` cites V09 §2.6 (RESTATEMENTS-018)',
 'V10-0214':'removed: the translation note dropped (V10-XAGREE-2); V10 §2.13 states that providers name V11\'s families, citing V01 §4.5',
 'V10-0276':'V10 §3.3 rule 16 — the owner-ruling time narration removed; oasis added (item 111)',
 'V10-0279':'V10 §3.4 (1) — `link.op` from V11 §4.2\'s cells; specialisations cite V11 §3.24.3',
 'V10-0304':'V10 §3.7 (1) — biome/oasis and history fields added (items 111, 113)',
 'V10-0321':'V10 §3.9 — default providers table (V01\'s `RetainingWall` provider replaces the default from M5, W-IF-03)',
 'V10-0388':'V10 §3.15 — the ravine quarter per V01 §3.17.1 (2) (CVR-V10-13, V10-HANDOFF-1)',
 'V10-0399':'V10 §3.16 — `key` row\'s provider slot (J121); `offline` one row (E-32)',
 'V10-0404':'V10 §3.17 — *Which configuration* (J121/J122; V10-J121-2)',
 'V10-0408':'V10 §3.17 — fallbacks platforms named without the skill citation',
 'V10-0417':'V10 §3.17 — the relay is a host\'s AI setup\'s (J121)',
 'V10-0419':'V10 §3.19 — key-check row\'s provider slot (J121)',
 'V10-0440':'V10 §3.20 — the data notice names `{provider}` (V10-J121-2)',
 'V10-0450':'V10 §4.1 — the binding table cited (E-04)',
 'V10-0466':'V10 §4.1 T2 `islet` — `encoders.islet.sizeM2` (V10-WGAP-1)',
 'V10-0470':'V10 §4.1 T6 `class` — V11 §3.24.3\'s carriers and the specialisation `setAttr` (CVR-V10-12, V10-DEFER-1)',
 'V10-0472':'V10 §4.1 T8 `fill` — `encoders.scopeRingSides` / `encoders.ringSides` (V10-WGAP-1)',
 'V10-0489':'V10 §4.1 T12 `dress` — V09 §4.5\'s New decoration group cited (RESTATEMENTS-019)',
 'V10-0496':'V10 §4.5 — "New random" (G-newrandom)',
 'V10-0532':'V10 §6.1 — village rungs read TOWN\'s rows; g111/g113 rows added',
 'V10-0534':'V10 §6.3',
 'V10-0536':'V10 §6.4 — the caching prices without the skill citation',
 'V10-0537':'V10 §6.4',
 'V10-0539':'V10 §6.4 — the fallback reads J121 (a cheaper tier evaluated before any switch)',
 'V10-0578':'V10 §7.1 T-V10-4 — SR6-05 (a) (the `subject` rule) and the New decoration group cited',
 'V10-0591':'V10 §7.1 T-V10-29 — SR6-05 (d); E-32',
 'V10-0603':'V10 §7.3 — the staged spend (J122 Q5; V10-J121-3), 95 cases (group J)',
 'V10-0608':'V10 §8 — M3c beside M3b (J122 Q4); risk (1) per J121',
 'V10-0613':'V10 §8 — risk (3) per J121',
 'V10-0617':'V10 §9 J-V10.4 — amended by J-V10.114 (J121)',
 'V10-0637':'V10 §9 J-V10.24 — amended by J-V10.114',
 'V10-0664':'V10 §9 J-V10.56 — amended by J-V10.114',
 'V10-0670':'V10 §9 J-V10.69 — amended by J-V10.114',
 'V10-0701':'V10 §9 J-V10.88 — E-33 applied in place (no alias)',
 'V10-0747':'V10 §10\'s opening paragraph',
 'V10-0774':'V10 §11 Q1 — answered: follows SettlementForge\'s AI setup (J121)',
 'V10-0775':'V10 §11 Q2 — answered: SettlementForge\'s assistant, driving our tool API (J121, J122)',
 'V10-0776':'V10 §11 Q3 — answered: follows SettlementForge (J121); a cheaper tier evaluated before any switch (V10 §7.3 tier 3)',
 'V10-0777':'V10 §11 Q4 — answered: J122 yes; the figures in V10 §8',
 'V10-0778':'V10 §11 Q5 — answered: J122 cap, staged; V10 §7.3\'s tiers, J-V10.116',
 'V10-0779':'history out: the round-by-round CONFIRMED narration to the validation records; V10 §12 keeps one CONFIRMED paragraph (V10-NARR-4)',
 'V10-0780':'V10 §12\'s PLAUSIBLE list (condensed; no claim dropped)',
 'V10-0781':'V10 §13 — empty; every routed request met (V10 §10.2) (V10-NARR-5)',
 'V10-0782':'the Integration notes table (IN-V10-1 → V10 §3.16)',
 'V10-0783':'folded: V10 §2.6 (`ProposalView.variations[].bends`, `lines[].actions`, `TurnView.refused`), §3.5 step 3, §3.16, J-V10.110; the finalization record to the validation records',
 'V10-0785':'glossary: harness = `createClerk(mount)` returning `ClerkHandle` (E-33; the alias retired)',
}

for i,w in [(238,'THORP typical (V07 §2.1)'),(239,'HAMLET typical (V07 §2.1)'),(240,'VILLAGE typical (V07 §2.1)')]:
    ov['V10-%04d'%i]='V10 §3.3 lexicon row — its value now `{ typical }`, the %s, no number (V10-RESTATE-1)'%w
for i,w in [(241,'smallTown'),(242,'town'),(243,'largeTown'),(244,'smallCity'),(245,'city'),(246,'largeCity'),(247,'metropolis')]:
    ov['V10-%04d'%i]='V10 §3.3 lexicon row — its value now `{ size: \'%s\' }`, V09 §4.5\'s T1 chip quantile (V10-XAGREE-3)'%w
ov['V10-0248']='V10 §3.3 lexicon row — kept at 100 000 (no chip carries it; §1.1 clamps above the cap)'
ov['V10-0343']='V10 §3.9a — the access row cites V04 §2.2\'s `AccessCause.rule` instead of listing its values'
ov['V10-0348']='V10 §3.9a — the catacomb row names `CatacombRule.rankCap` (V04 §3.5.1 (5)) without the number (V10-RESTATE-2)'
ov['V10-0355']='V10 §3.9a — the no-crypt row cites V03 §3.7.4 *Wet ground* for both classes (V10-XAGREE-4)'

bcrmap={'V10-%04d'%(724+i):None for i in range(23)}
out=[]
for r in rows:
    iid,kind,sec,role=r[0],r[1],r[2],r[3]
    loc=None
    if iid in ov: loc=ov[iid]
    elif role.startswith('bcr-pointer'):
        m=re.search(r'BCR-V10-(\d+)',r[4]); n=m.group(1) if m else '?'
        loc='V10 §10.1 pointer row (BCR-V10-%s → its applied item); the request text lives in the base'%n
    elif role.startswith('handoff') and sec=='10.2':
        m=re.search(r'CVR-V10-(\d+)',r[4]); loc='V10 §10.2 CVR-V10-%s row, met at its destination (status written)'%(m.group(1) if m else '?')
    elif role.startswith('reference'):
        home=role.split('->',1)[1].strip()
        loc='V10 §%s, citing %s'%(sec,home) if home and 'None' not in home else 'V10 §%s, citing the owning volume\'s section'%sec
        if sec=='2.13': loc='V10 §%s (kept as home: §11.2 and §4.7 S10b cite V10 §2.13 for these types, item 468)'%sec
        if sec=='3.9a': loc='V10 §3.9a (the words, this volume\'s per V09 §4.9\'s family table; values cited to %s)'%home
        if sec=='3.9' and 'pipeline' in home: loc='V10 §3.9, citing %s (restatement cut)'%home
    elif role.startswith('glossary'):
        loc='canon glossary; its term stays at the V10 section named in it'
    elif role.startswith('index-row'):
        loc='V10 §9 (the same decision id)'
    elif role.startswith('answer-J121-J122'):
        loc='V10 §11 (answered)'
    elif sec in ('header',''):
        loc='the head'
    elif sec=='IN':
        loc='Integration notes table'
    elif sec in secs or sec in ('0','1','2','3','4','5','6','7','8','9','10','11','12','13'):
        loc='V10 §%s'%sec
    else:
        loc='V10 §%s (check)'%sec
    out.append((iid,kind,sec,role.split('->')[0],loc))
unm=[o for o in out if 'check' in o[4]]
open('mapping.md','w').write('| inventory id | kind | old § | role | now lives at |\n|---|---|---|---|---|\n'+'\n'.join('| %s | %s | %s | %s | %s |'%o for o in out)+'\n')
print(len(out),'unmapped',len(unm)); print(unm[:10])
