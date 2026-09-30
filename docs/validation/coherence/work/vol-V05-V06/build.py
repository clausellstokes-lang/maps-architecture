#!/usr/bin/env python3
# generates docs/validation/coherence/inventory-vol-V05-V06.json and .md from the work store
import json,re,hashlib,collections,os,sys
W=os.path.dirname(os.path.abspath(__file__)); ROOT='/Users/cstokes/Desktop/Maps'
sys.path.insert(0,W); from terms import TERMS
OUT=f'{ROOT}/docs/validation/coherence/inventory-vol-V05-V06'
SRC={'V05':'docs/volumes/V05-sky.md','V06':'docs/volumes/V06-evolution.md'}
IT=[json.loads(l) for l in open(f'{W}/items.jsonl')]
FS=[json.loads(l) for l in open(f'{W}/findings.jsonl')]
REFS={v:json.load(open(f'{W}/refs-{v}.json')) for v in SRC}
TXT={v:open(f'{ROOT}/{p}').read() for v,p in SRC.items()}
LINES={v:t.split('\n') for v,t in TXT.items()}
def words(v,a,b): return sum(len(l.split()) for l in LINES[v][a-1:b])
NARR={'V05':[((1,91),'banner lines and PROGRESS ledger'),((3276,3443),'§12 CONFIRMED/PLAUSIBLE record (lane history beyond its first two paragraphs)'),((3631,3808),'integration note and reconciliation rounds 1-6')],
      'V06':[((1,182),'banner blocks, revision/reconciliation ledgers, reading record'),((4004,4144),'§12 CONFIRMED/PLAUSIBLE record'),((4306,4631),'integration notes, reconciliation rounds 2-6 with continuations, finalization')]}
SECT={'V05':{'§10 BCRs':(2824,3267),'§13 fix list':(3444,3630)},'V06':{'§10 BCRs':(3641,3984),'§13 fix list':(4145,4305)}}
source={}
for v,p in SRC.items():
    tw=len(TXT[v].split()); nr=[{'lines':f'{a}-{b}','what':w,'words':words(v,a,b)} for (a,b),w in NARR[v]]
    nw=sum(x['words'] for x in nr)
    source[v]={'file':p,'lines':len(LINES[v])-(1 if TXT[v].endswith('\n') else 0),'md5':hashlib.md5(TXT[v].encode()).hexdigest(),'words':tw,
               'narration_ranges':nr,'narration_words':nw,'narration_share':round(nw/tw,3),
               'other_ranges':{k:{'lines':f'{a}-{b}','words':words(v,a,b)} for k,(a,b) in SECT[v].items()}}
# ids for findings
TY={'restate':'RESTATE','dup':'DUP','iconf':'ICONF','xconf':'XCONF','agree':'AGREE','bref':'BREF','wgap':'WGAP','eleg':'ELEG','edge':'EDGE','narr':'NARR','defer':'DEFER','missing':'MISSING','term':'TERM'}
def fid(f): return f"{f['vol']}-{TY[f['type']]}-{f['n']}"
def fj(f):
    it=[i for i in f['items'] if i!='—']
    return {'id':fid(f),'severity':f['severity'],'items':it,'where':f['where'],'claim':f['claim'],'hint':f['hint']}
cat=lambda *ts: [fj(f) for f in FS if f['type'] in ts]
# restatements (fact stated here whose canonical home is elsewhere)
RESTATE=[
 ('V05-0019','base §1.1','RungProfile.layers.islands per rung (none at TOWN and villages, possible at CITY, METROPOLIS) in the §1.2 hook table','V05-RESTATE-1'),
 ('V05-0179','base §1.1','the same rung values again in V5 §3.2 (1)\'s gate','V05-RESTATE-5'),
 ('V05-0020','V01 BCR-39 (item 110 (b))','raised-way generation slot: viaducts inside S4, elevated roads and aqueducts at S6\'s end','V05-RESTATE-2'),
 ('V05-0113','base II.6 (4)','IslandRule.chance [0.6, 0.5, 0.35] and redrawPerYear 0.1 in the record comments',None),
 ('V05-0176','base §4.1 (after BCR-V5-3)','ground L1 writer order S3, S4, S5, S6, S7, S7b, SKY, S8','V05-RESTATE-5'),
 ('V05-0521','V05 §2.4 IslandRule.node.bonus','node bonus literal 0.25 written into base II.6 rule (3) by BCR-V5-17','V05-RESTATE-3'),
 ('V05-0298','base §4.5 (after BCR-V5-15)','model daylight sampler: nine equinox suns, one point per 32 m cell, layout','V05-RESTATE-4'),
 ('V05-0465','base §4.5 (after BCR-V5-15)','J-V5.42 restates the sampler default','V05-RESTATE-4'),
 ('V05-0017','base §4.5 (after BCR-V5-15)','§1.1 item 18 restates the sampler default','V05-RESTATE-4'),
 ('V05-0160','V06 §2.8 and §2.12','Way.formerClass full lifecycle row (V05 is one writer)','V05-RESTATE-7'),
 ('V05-0161','file f item 575; base §2.7; V06 §2.12','Enceinte.condition full lifecycle row (V05 is one writer)','V05-RESTATE-7'),
 ('V05-0505..V05-0534','base (on application of BCR-V5-1..30)','§10 carries the full base texts the coherence pass applies; once applied, the base text lives twice','V05-RESTATE-6'),
 ('V06-0316','V05 §6 (resize / rim reshape rows)','V05 §6\'s row quoted verbatim as read on 2026-09-29 and its figures re-derived','V06-RESTATE-1'),
]
restatements=[{'item':a,'canonical_home':b,'fact':c,'finding':d} for a,b,c,d in RESTATE]
# broken references, itemized
brefs=[{'id':'V05-BREF-1','ref':'V5 §3.1 (3)–(4)','at':'Integration note IN-V05-1','status':'§3.1 has no items (3)-(4); the bends it means are V5 §3.2 (3)-(4)'}]
for v,fn in (('V05','V05-BREF-2'),('V06','V06-BREF-2')):
    c=collections.Counter(re.findall(r'scratchpad/[A-Za-z0-9_./*-]*',TXT[v]))
    for p,n in sorted(c.items()): brefs.append({'id':fn,'ref':p,'at':f'{v} ({n} occurrence{"s" if n>1 else ""})','status':'session scratch file outside the project; not a design reference'})
drl=collections.OrderedDict()
for i,l in enumerate(LINES['V06'],1):
    for m in re.finditer(r"the coherence pass's rows? for item (\d+ \([a-z]\))",l): drl.setdefault(m.group(1),[]).append(i)
for k,ls in drl.items():
    brefs.append({'id':'V06-BREF-1','ref':f"the coherence pass's row for item {k}",'at':'V06 §1b dossier trace, line'+('s ' if len(ls)>1 else ' ')+', '.join(map(str,ls)),'status':'derivation row without an id (dossier trace needs a named DR row)'})
# glossary
terms=[]; gc=collections.Counter()
for v,t,d,h,s in TERMS:
    gc[v]+=1; terms.append({'id':f'{v}-G{gc[v]:02d}','term':t,'definition':d,'home':h,'synonyms_or_hazards':s})
# counts
NONFACT={'term','summary','status'}
byv={}
for v in SRC:
    s=[i for i in IT if i['id'].startswith(v)]
    byv[v]={'items':len(s),'facts':sum(1 for i in s if i['kind'] not in NONFACT),'by_kind':dict(collections.Counter(i['kind'] for i in s).most_common()),
            'findings':sum(1 for f in FS if f['vol']==v),'major':sum(1 for f in FS if f['vol']==v and f['severity']=='major')}
facts=sum(b['facts'] for b in byv.values())
iconf=cat('iconf')
counts={'items':len(IT),'facts':facts,'terms':len(terms),'by_volume':byv,
        'findings':{'total':len(FS),'major':sum(1 for f in FS if f['severity']=='major'),'minor':sum(1 for f in FS if f['severity']=='minor'),
                    'by_type':dict(collections.Counter(TY[f['type']] for f in FS).most_common())},
        'restatements':len(restatements),'internal_conflicts':len(iconf),'broken_references':len(brefs),
        'facts_method':'items minus kinds term, summary (plain-words paraphrase of body text) and status (CONFIRMED/PLAUSIBLE record)'}
census={'by_volume':{v:{'counts':REFS[v]['counts'],'unresolved_by_kind':dict(collections.Counter(x['kind'] for x in REFS[v]['unresolved']))} for v in SRC},
 'method':('Every base §x.y / II.x, volume reference (V0n §x, Vn §x, Vn-x.y), J-/T-/BCR- id, D- id, file f and g item and file path in both volumes was extracted by '
           'script (work/vol-V05-V06/refs.py) and resolved against ARCHITECTURE.md headings, the volumes\' numbered headings and bold sub-numbers, the defining J/T/BCR tables, '
           'AMENDMENTS-2026-09-28f.md and -28g.md item numbers, and the file system. Script-unresolved hits were checked by hand: base-kind hits are list continuations of '
           'another volume\'s sections (\'volume 1 (V01) §2.4, §3.10.3\'), resolved against the named volume; ownbare hits are the volume\'s own sections cited bare (resolve; '
           'V06 §2.2\'s table form collides with base kernel numbers, V06-TERM-1); style hits are single-digit volume prefixes (V05-TERM-1, V06-TERM-1); file hits are session '
           'scratch paths (BREF). What remains broken is itemized under broken_references.')}
g={'note':('g items from 111 on: 111 names V05 (an island\'s own water, unchanged) and V06 (failing springs and oases over epochs) - neither volume carries its part '
           '(V05-MISSING-1, V06-MISSING-2); 112 names neither V05 nor V06; 113 names V06 (replay engine at generation, coarse epochs, event-to-epoch mapping) - V06 carries none '
           'of it and rules pre-creation history out of scope (V06-MISSING-3, V06-XCONF-1); 113 does not name V05. J121/J122: V05 Q1 (underground before the sky: yes) and '
           'V06 Q1 ((a) the evolution engine right after M4) are decided in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md but not marked answered (V05-MISSING-2, V06-MISSING-1).')}
# shrink estimate
shrink={}
for v in SRC:
    tw=source[v]['words']; nw=source[v]['narration_words']
    a0=NARR[v][0][0][1]+1; b0=NARR[v][1][0][0]-1
    ids=len(re.findall(r'\b(?:C[56]|SL|SLR\d|ST|TR|TT|TU|TV|TW|SS|SCC(?:-R2C)?|V[56]C)-\d+\b','\n'.join(LINES[v][a0-1:b0])))
    bcr=source[v]['other_ranges']['§10 BCRs']['words']
    shrink[v]={'total_words':tw,'narration_range_words':nw,'inline_provenance_ids':ids,'bcr_block_words':bcr,
               'target_one_third':round(tw/3),
               'estimate':('narration ranges alone remove %d words (%.0f %%); with the %d inline critique/seam ids in §0-§11 (about 2 words each) and §10\'s base texts replaced by pointers once applied '
                           '(about 80 %% of %d words) the measured removals reach about %d words (%.0f %%); the rest of the one-third target (about %d words) must come from J-row revision '
                           'narration, the duplicated statements (DUP findings) and verbose prose, which were not measured. PLAUSIBLE (arithmetic on line ranges; no rewrite performed).')
                          %(nw,100*nw/tw,ids,bcr,nw+int(bcr*0.8)+ids*2,100*(nw+int(bcr*0.8)+ids*2)/tw,max(0,round(tw/3)-(nw+int(bcr*0.8)+ids*2)))}
J={'key':'coherence/inventory-vol-V05-V06','unit':'volumes V05 (sky) and V06 (evolution)',
   'scope':'docs/volumes/V05-sky.md and docs/volumes/V06-evolution.md, each read completely (every section, integration notes, reconciliation rounds, finalization)',
   'source':source,'counts':counts,'reference_census':census,'items':IT,'restatements':restatements,
   'internal_duplications':cat('dup'),'internal_conflicts':iconf,'cross_part_conflicts':cat('xconf','agree'),'broken_references':brefs,'broken_reference_findings':cat('bref'),
   'wiring_gaps':cat('wgap'),'missing_parts':cat('missing'),'elegance_candidates':cat('eleg'),'edges_observed':cat('edge'),'deferral_wording':cat('defer'),
   'narration':cat('narr'),'terminology':cat('term'),'restatement_findings':cat('restate'),'terms':terms,'g_items_routing':g,'shrink_estimate':shrink}
json.dump(J,open(OUT+'.json','w'),ensure_ascii=False,indent=1)
# ---- markdown
esc=lambda s: str(s).replace('|','/').replace('\n',' ')
M=[]; a=M.append
a('# Inventory — design volumes V05 (sky) and V06 (evolution) (coherence/inventory-vol-V05-V06)\n')
a('PROGRESS')
a('- working store: docs/validation/coherence/work/vol-V05-V06/ (items.jsonl, findings.jsonl, terms.py, add.py, fixitems.py, refs.py, find.py, secwords.py, build.py); this file and inventory-vol-V05-V06.json are generated from it')
for v in SRC: a(f"- source {v}: {SRC[v]} ({source[v]['lines']} lines, {source[v]['words']} words, md5 {source[v]['md5'][:8]})")
a('- [x] V05 read whole and inventoried (§0-§13, integration note, reconciliation rounds 1-6)')
a('- [x] V06 read whole and inventoried (§0-§13, integration notes, reconciliation rounds 2-6 with continuations, finalization)')
a('- [x] cross-reference census and resolution (script: work/vol-V05-V06/refs.py; hand check of script-unresolved hits)')
a('- [x] restatements, internal conflicts, wiring gaps, elegance, edges, terminology, g-item and J122 routing')
a('- [x] generated .json and .md; results file; LANDED\n')
a('## Summary\n')
maj=[fj(f) for f in FS if f['severity']=='major']
a(f"{len(IT)} inventory items ({facts} facts; {len(terms)} defined terms in the glossary): V05 {byv['V05']['items']}, V06 {byv['V06']['items']}. "
  f"{len(FS)} findings ({counts['findings']['major']} major, {counts['findings']['minor']} minor); {len(restatements)} restatements of facts owned elsewhere; "
  f"{len(iconf)} internal conflicts; {len(brefs)} broken references (1 misdirected section reference, 30 distinct session-scratch paths, 4 unnamed derivation rows).\n")
a('The majors: g item 111 has no V05 or V06 part and g item 113 has no V06 part, while V06 still rules pre-creation history out of scope against the owner rule '
  '(V05-MISSING-1, V06-MISSING-2, V06-MISSING-3, V06-XCONF-1); J-V6.92 says the water-system record is a chance factor while the body says it never scales the chance '
  '(V06-ICONF-2); three bend lines and one hit-test rule the volumes hand to V09/V10 have no key or row there (V05-WGAP-1, V05-WGAP-2, V06-WGAP-1); six edges have no '
  'defined outcome or test (V05-EDGE-1..4: locked island vs dossier removal, landfall over another island\'s access, uncapped hand-placed accesses vs the ≤ 9 bound, '
  'untested clearance lock; V06-EDGE-1, -2: degenerate advance inputs, advance undo after reload or in a shared document).\n')
a(f"Shrink: narration ranges are {source['V05']['narration_words']} words of V05 ({source['V05']['narration_share']*100:.0f} %) and {source['V06']['narration_words']} of V06 "
  f"({source['V06']['narration_share']*100:.0f} %); with inline provenance ids, J-row revision narration, the duplicated statements and §10's base texts once applied, "
  "the measured removals reach about a fifth of each volume; the rest of the one-third target rests on unmeasured prose tightening (see Shrink estimate). CONFIRMED: every item and finding comes from reading both volumes whole and grepping the "
  "cited base, sibling-volume and amendment text; PLAUSIBLE: the shrink figures (arithmetic on line ranges).\n")
a('## Item counts by kind\n')
a('| kind | V05 | V06 |'); a('|---|---|---|')
kinds=sorted(set(k for v in SRC for k in byv[v]['by_kind']),key=lambda k:-(byv['V05']['by_kind'].get(k,0)+byv['V06']['by_kind'].get(k,0)))
for k in kinds: a(f"| {k} | {byv['V05']['by_kind'].get(k,0)} | {byv['V06']['by_kind'].get(k,0)} |")
a(f"| **total** | {byv['V05']['items']} | {byv['V06']['items']} |\n")
a('## Findings\n')
SECS=[('missing_parts','Missing parts (g items 111+; J122 decisions)'),('internal_conflicts','Internal conflicts'),('cross_part_conflicts','Conflicts with other units'),
      ('wiring_gaps','Wiring gaps'),('edges_observed','Edges without a defined outcome or test'),('deferral_wording','Deferral wording'),
      ('broken_reference_findings','Broken or misdirected references'),('internal_duplications','Internal duplications (principle (1))'),
      ('restatement_findings','Restatement findings'),('elegance_candidates','Elegance candidates'),('terminology','Terminology (principle (2))'),('narration','Narration (principle (5))')]
for k,t in SECS:
    L=J[k]; a(f'### {t} ({len(L)})\n')
    if not L: a('None.\n'); continue
    a('| id | sev | where | claim | fix | items |'); a('|---|---|---|---|---|---|')
    for f in sorted(L,key=lambda f:(f['severity']!='major',f['id'])): a(f"| {f['id']} | {f['severity']} | {esc(f['where'])} | {esc(f['claim'])} | {esc(f['hint'])} | {', '.join(f['items'][:10])}{' …' if len(f['items'])>10 else ''} |")
    a('')
a('## Restatements (a fact stated here whose canonical home is elsewhere)\n')
a('| item | canonical home | fact | finding |'); a('|---|---|---|---|')
for r in restatements: a(f"| {r['item']} | {esc(r['canonical_home'])} | {esc(r['fact'])} | {r['finding'] or '—'} |")
a('\n## Broken references (itemized)\n')
a('| finding | reference | at | status |'); a('|---|---|---|---|')
for b in brefs: a(f"| {b['id']} | {esc(b['ref'])} | {esc(b['at'])} | {esc(b['status'])} |")
a('\n## Reference census\n')
a(census['method']+'\n')
a('| volume | extracted by kind | script-unresolved by kind |'); a('|---|---|---|')
for v in SRC: a(f"| {v} | {', '.join(f'{k} {n}' for k,n in REFS[v]['counts'].items())} | {', '.join(f'{k} {n}' for k,n in census['by_volume'][v]['unresolved_by_kind'].items())} |")
a('\n## g items 111+ and J121/J122 routing\n'); a(g['note']+'\n')
a('## Defined terms (glossary)\n')
a('| id | term | definition | home | synonyms / naming hazards |'); a('|---|---|---|---|---|')
for t in terms: a(f"| {t['id']} | {esc(t['term'])} | {esc(t['definition'])} | {esc(t['home'])} | {esc(t['synonyms_or_hazards'])} |")
a('\n## Shrink estimate (principle (9): a third fewer words)\n')
a('| volume | words | narration ranges | inline provenance ids | §10 BCR block | estimate |'); a('|---|---|---|---|---|---|')
for v in SRC:
    s=shrink[v]; a(f"| {v} | {s['total_words']} | {s['narration_range_words']} | {s['inline_provenance_ids']} | {s['bcr_block_words']} | {esc(s['estimate'])} |")
for v in SRC:
    a(f'\nNarration ranges {v}: '+'; '.join(f"lines {x['lines']} {x['what']} ({x['words']} words)" for x in source[v]['narration_ranges'])+'.')
a('\n## Items\n')
a('Columns: id, kind, section, owner, statement, reads (produced by / inputs), used by (renders, exports, tests, calls), keys.\n')
for v in SRC:
    a(f'### {v}\n'); a('| id | kind | § | owner | statement | reads | used by |'); a('|---|---|---|---|---|---|---|')
    for i in IT:
        if i['id'].startswith(v): a(f"| {i['id']} | {i['kind']} | {esc(i['sec'])} | {esc(i['owner'])} | {esc(i['statement'])} | {esc('; '.join(i['reads']))} | {esc('; '.join(i['used_by']))} |")
    a('')
open(OUT+'.md','w').write('\n'.join(M)+'\n')
print(json.dumps({k:counts[k] for k in ('items','facts','terms','restatements','internal_conflicts','broken_references')}),counts['findings'])
for v in SRC: print(v,source[v]['narration_words'],source[v]['narration_share'],shrink[v]['estimate'][:200])
