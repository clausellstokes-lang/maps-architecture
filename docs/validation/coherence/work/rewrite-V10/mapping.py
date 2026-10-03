# Builds the mapping table: every V10 inventory id -> where it now lives in the new text.
import json, re, sys
S = '/tmp/claude-0/-home-user-maps-architecture/ce371545-83c4-5807-9f2a-da73abd8485d/scratchpad/coherence'
inv = json.load(open(f'{S}/inv-V10.json'))
new = open('/home/user/maps-architecture/docs/validation/coherence/new/volumes/V10-clerk.md').read()
s9 = open('/home/user/maps-architecture/docs/validation/coherence/work/rewrite-V10/parts/27-s9.md').read()

bcr = {1:'468',2:'311',3:'270',4:'297',5:'469',6:'470',7:'473',8:'518',9:'538',10:'531',11:'487',12:'348',13:'471',
       14:'519',15:'271',16:'365',17:'366',18:'367',19:'481',20:'368',21:'290 (6)',22:'572',23:'571'}
cvr_met = {1:'V04 §4.5',2:'V03 §4.6',3:'V08 §3.1, V08 §4.4 (4)',4:'V09 §6.2, V09 §4.11, V09 §2.10, V09 §4.9',
           5:'V06 §3.15, V06 §4.5',6:'V01 §4.5',7:'§7.1, V09 §2.10, V09 §4.11, V09 §4.20',8:'V02 §4.5, V02 §4.6',
           9:'V03 §4.6, V03 §2.3',10:'V04 §4.5',11:'V06 §4.5',12:'V11 §3.6, V11 §4.5',13:'V01 §3.17.1 (2)',
           14:'V05 §4.5, V07 §4.5, V08 §4.6',15:'V09 §2.10, V09 §4.11, V09 §2.7',16:'V11 §4.2, V09 §2.6',
           17:'V09 §4.9, V09 §4.20.2 (5)',18:"V09 §4.5's T11 and T9 rows",19:'V09 §4.11, V09 §2.10, V09 §4.9',
           20:'V09 §2.9, V09 §4.5, V09 §4.9, V09 §4.11'}

def jmark(n):
    m = re.search(r'^\| J-V10\.%d \| (.*)$' % n, s9, re.M)
    if not m: return None
    row = m.group(1)
    if row.startswith('Superseded by'):
        return row.split('|')[0].strip().rstrip('.')
    a = re.search(r'amended by (J-V10\.\d+)', row)
    return ('amended by ' + a.group(1)) if a else None

over = {
 'V10-0001': 'V10 head (*How to read this volume*: the citation form `Vnn §x.y`, bare `§x` the base, ID-TOOL and ID-LAYER)',
 'V10-0006': 'V10 §0 (reworded by J121: the provider, model and key path read from the deployment\'s AI setup; SettlementForge\'s assistant through the host seam)',
 'V10-0009': 'V10 §1.1 (`ClerkHandle`, E-33)',
 'V10-0012': 'V10 §1.2 (item 10\'s scoped New random)',
 'V10-0049': 'V10 §1.2 (V06 §4.5; the provider table at V10 §3.9)',
 'V10-0054': 'V10 §1b.1 (`ClerkSegment`, J-V10.115; MC-11)',
 'V10-0100': 'V10 §1b.2 (`ClerkHandle` only; the alias dropped, E-33)',
 'V10-0121': 'V10 §1b.3 — cites §7.1\'s binding table (E-04)',
 'V10-0140': 'V10 §2.1 — cites §14 (item 518) and §17.4 (item 538)',
 'V10-0141': 'V10 §2.2 (`backend: \'direct\' | \'host-proxy\' | \'none\'`, J121, J-V10.114)',
 'V10-0143': 'V10 §2.3 (`ClerkSegment`, J-V10.115)',
 'V10-0144': 'V10 §2.3 — cites V09 §2.10\'s `effectiveKey()` and View as',
 'V10-0150': 'V10 §2.6 (`fork` and `undo` worded by `button.openCopy` and `button.undo`, J-V10.119; SR6-05)',
 'V10-0152': 'V10 §2.6 (`ClerkHandle.run`)',
 'V10-0162': 'V10 §2.6 (history buttons by V09\'s shared rows, J-V10.119)',
 'V10-0163': 'V10 §2.6 *The bridge, through the mount only* — cites J-V9.81 and V08 §3.1',
 'V10-0169': 'V10 §2.10 *Default rows* — cites V11 §3.1 rows 88–89 (J-V11.81, J-V11.82)',
 'V10-0194': 'V10 §2.11 (`DirectBackend`, the provider read from `clerk.ops.model.provider`, J121, J-V10.114)',
 'V10-0200': 'V10 §2.13 — cites §11.2\'s *Knowledge* rules and oracle rules',
 'V10-0201': 'V10 §2.13 (`ClerkQuery`, item 468) — cites §11.2',
 'V10-0202': 'V10 §2.13 (`MapBrief`, item 468; its `water.arid`, oasis lakes and `history` block added for items 111 and 113) — cites §11.2',
 'V10-0203': 'V10 §2.13 (`EntityCard`, item 468; `symbolic` on attrs) — cites §11.2',
 'V10-0204': 'V10 §2.13 (`WhyAnswer`, items 468 and 270) — cites §11.2',
 'V10-0205': 'V10 §2.13 (`ExplainRequest`, `Explanation`, `WhyProvider`, items 311 and 270) — cites §2.8, §4.7',
 'V10-0214': 'dropped (V10-XAGREE-2): V01 names its pushes `sun` and `nuisance` (V01 §4.5, CVR-V10-6 met); the family words stay at V10 §2.13 (`clerk.content.familyWords`)',
 'V10-0217': 'V10 §2.14 (`ClerkSegment`)',
 'V10-0231': 'V10 §3 (every constant a `clerk.ops` or `clerk.content` cell; V10-BREF-1)',
 'V10-0238': 'V10 §3.3 lexicon (the value the rung\'s typical population, V07 §2.1; no number restated)',
 'V10-0239': 'V10 §3.3 lexicon (the rung\'s typical population, V07 §2.1)',
 'V10-0240': 'V10 §3.3 lexicon (the rung\'s typical population, V07 §2.1)',
 'V10-0300': 'V10 §3.5 step 3 — cites V09 §2.9\'s `MsgRow.buttons` (J-V10.106)',
 'V10-0339': 'V10 §3.9 *The solver\'s explanation* — cites §4.7 S10b (item 311)',
 'V10-0340': 'V10 §3.9 *The field\'s drivers* — cites §4.5 (item 297), the water term added (item 111)',
 'V10-0341': 'V10 §3.9a\'s opening — cites V04\'s records (V04 §2.2, V04 §2.6) and V03 §3.7.4',
 'V10-0342': 'V10 §3.9a `underground` ruin row (the clerk\'s words over V04\'s `RuinRecord`)',
 'V10-0343': 'V10 §3.9a access-point row — cites `AccessCause.rule` at V04 §2.2 (the value list no longer restated)',
 'V10-0344': 'V10 §3.9a link row (`LinkCause`, V04\'s record)',
 'V10-0345': 'V10 §3.9a void-cluster row (excavation, V04\'s reading; the lost void, item 113 (e))',
 'V10-0346': 'V10 §3.9a no-dwellings row (item 109 (j) (4), item 113 (e))',
 'V10-0347': 'V10 §3.9a sealed deep void row (`DigRule.maxM`, V04\'s)',
 'V10-0348': 'V10 §3.9a catacomb row (`rankCap` named, no number; V10-RESTATE-2)',
 'V10-0349': 'V10 §3.9a burial-face row (`catacombOutcome`, V04 §4.5; CVR-V10-1)',
 'V10-0350': 'V10 §3.9a church-class row',
 'V10-0351': 'V10 §3.9a crypt presence row — cites V03 §3.7.4 for the class values',
 'V10-0352': 'V10 §3.9a crypt area-and-form row (V02 §3.14.5, V05 §3.10)',
 'V10-0353': 'V10 §3.9a crypt rank row — cites V03 §3.7.4\'s rank',
 'V10-0354': 'V10 §3.9a crypt-join row (V04 §3.5.7 (c))',
 'V10-0355': 'V10 §3.9a — split into the wet-ground row (V03 §3.7.4: a raised-choir crypt for an `always` class, else no crypt with ledger slabs; V10-XAGREE-4) and the no-crypt row',
 'V10-0399': 'V10 §3.16 `key` row ("Your {provider} account has no credit left.", J121)',
 'V10-0404': 'V10 §3.17 configuration A (`DirectBackend`, the provider of the deployment\'s AI setup, J121)',
 'V10-0410': 'V10 §3.17 *Door 1* — cites V08 §5.4, §11.4',
 'V10-0419': 'V10 §3.19 key check (the provider\'s models call)',
 'V10-0440': 'V10 §3.20 data notice (the provider named from the deployment\'s setup, J121)',
 'V10-0450': 'V10 §4.1 `islet` row (`encoders.isletM2`, `encoders.ringSides`; V10-WGAP-1)',
 'V10-0470': 'V10 §4.1 T8 `fill` row (the ring of `encoders.ringSides` sides; V10-WGAP-1)',
 'V10-0472': 'V10 §4.1 `green` row (`encoders.ringSides`; V10-WGAP-1)',
 'V10-0480': 'V10 §4.1 `link` row (`avoid` unconditional, the cell V11 §4.2 states; V10-XAGREE-1)',
 'V10-0489': 'V10 §4.1 `newNames` row (V09 §4.5\'s T11 row cited)',
 'V10-0608': 'V10 §8 C2 (`DirectBackend`, J121)',
 'V10-0779': 'V10 §12 CONFIRMED paragraph (standing evidence; the per-round records left to the validation records)',
 'V10-0780': 'V10 §12 PLAUSIBLE list (items 111 and 113 added)',
 'V10-0781': 'V10 §13 (no open item; the hand-offs table to other units)',
 'V10-0782': 'folded (ID-WX): IN-V10-1 at V10 §3.16 *The dry run\'s bends*; IN-V10-2 at V10 §2.13 (`MapBrief.raised[].reason`); IN-V10-3 at V10 §2.12 and V10 §3.9\'s owed V02 row; IN-V10-4 at V10 §10.2; IN-V10-5 at V10 §4.1\'s terrace row; listed under *Integration notes*',
 'V10-0783': 'folded: SR6-01\'s view model at V10 §2.6 (`ProposalView.variations[].bends`, `lines[].actions`, `TurnView.refused`), V10 §3.5 step 4 and J-V10.110; SR6-05 fixed in the body (V10 §2.6, V10 §3.5, V10 §3.16, J-V10.107, J-V10.119)',
 'V10-0784': 'V10 §9 J-V10.86 (the internal and user-facing names)',
 'V10-0805': 'V10 §4.4 (§13.4\'s pre-decided fallback)',
 'V10-0248': 'V10 §3.3 lexicon (100 000 kept inside METROPOLIS\'s band, §1.1: no size chip carries the word, so no quantile applies)',
 'V10-0321': 'V10 §3.9 owed V03 row (the room cause `deckNoCellar`, V03\'s name for the former `deckRefusal`; E-28 `PlanReport.notes`)',
 'V10-0490': 'V10 §4.1 T12 `dress` row (the bytes of V09 §4.5\'s T12 row cited, not restated)',
 'V10-0485': 'V10 §4.1 `remove` row (the fold\'s suppression, item 260)',
 'V10-0038': 'V10 §1.2 (V06 §2.13; the suppression of item 260)',
 'V10-0785': 'V10 §2.6 (`createClerk(mount)` returning `ClerkHandle`; "harness" retired, E-33)',
 'V10-0800': 'V10 §3.17 (configurations A, B, C; SettlementForge\'s is C, J121, J122)',
 'V10-0753': 'V10 §10.2 CVR-V10-6, met at V01 §4.5 (V10-XAGREE-2)',
 'V10-0760': 'V10 §10.2 CVR-V10-13, met at V01 §3.17.1 (2) (V01\'s `stepped` fabric, `terrace: \'on\'`); V10 §3.15 cites it',
}
# lexicon size-word rows (V10-XAGREE-3)
for x in inv:
    s = x['statement']
    if x['kind'] == 'lexicon-row' and re.search(r'field: `population`', s) and x['id'] not in over:
        over[x['id']] = 'V10 §3.3 lexicon (the size word reads V09 §4.5\'s T1 quantile of the rung table; no number restated; V10-XAGREE-3)'

def where(x):
    i, k, sec, s = x['id'], x['kind'], x['sec'], x['statement']
    if i in over: return over[i]
    if k == 'decision':
        m = re.search(r'J-V10\.(\d+)', s); n = int(m.group(1))
        mk = jmark(n)
        return f'V10 §9 J-V10.{n}' + (f' ({mk[0].lower()+mk[1:]})' if mk else '')
    if k == 'test':
        m = re.search(r'T-V10-(\d+)', s); return f'V10 §7.1 T-V10-{m.group(1)}'
    if k == 'bcr':
        m = re.search(r'BCR-V10-(\d+)', s); n = int(m.group(1))
        return f'V10 §10.1 BCR-V10-{n} → item {bcr[n]} (pointer; the base text is the applied item)'
    if k == 'cvr':
        m = re.search(r'CVR-V10-(\d+)', s); n = int(m.group(1))
        return f'V10 §10.2 CVR-V10-{n}, met at {cvr_met[n]}'
    if k == 'merged-text': return 'V10 §10.3'
    if k == 'owner-question':
        m = re.search(r'Q(\d)', s); q = m.group(1)
        return f'V10 §11 Q{q} (answered, J121/J122)'
    if k == 'term':
        tail = s.rsplit(' — ', 1)[-1]
        tail = re.sub(r'(?<!V10 )§(\d)', r'V10 §\1', tail)
        return tail + ' (defined there)'
    if sec in ('0',): return 'V10 §0'
    return f'V10 §{sec}'

rows = []
heads = set(h.rstrip('.') for h in re.findall(r'^#{2,4} (\S+)', new, re.M))
bad = []
for x in inv:
    w = where(x)
    for r in re.findall(r'V10 §([0-9]+[a-z]?(?:\.[0-9]+)*[a-z]?)', w):
        if r not in heads: bad.append((x['id'], r))
    rows.append((x['id'], w))
print('rows', len(rows), 'unresolved', bad[:20], file=sys.stderr)
with open(f'{S}/v10-mapping.md', 'w') as f:
    f.write('| inventory id | kind | where it now lives |\n|---|---|---|\n')
    kinds = {x['id']: x['kind'] for x in inv}
    for i, w in rows:
        f.write(f'| {i} | {kinds[i]} | {w} |\n')
