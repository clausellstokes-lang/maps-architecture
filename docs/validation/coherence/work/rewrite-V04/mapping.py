# builds the mapping table (every V04 inventory id -> where it now lives) for rewrite-V04.md
# run from the project root: python3 docs/validation/coherence/work/rewrite-V04/mapping.py
import json, re
d = json.load(open('docs/validation/coherence/inventory-vol-V03-V04.json'))
c = json.load(open('docs/validation/coherence/canon.json'))['by_inventory_id']
new = open('docs/validation/coherence/new/volumes/V04-underground.md', encoding='utf-8').read()
items = [i for i in d['items'] if i['id'].startswith('V04-')]

# §10's pointer rows: BCR-V4-n -> its 'applied by' cell
sec10 = new.split('## 10 Base change requests')[1].split('## 11 ')[0]
bcr = {}
for l in sec10.split('\n'):
    m = re.match(r'\| BCR-V4-([0-9]+) \| ([^|]+) \| ([^|]+) \|', l)
    if m: bcr[int(m.group(1))] = m.group(3).strip()
# §9's rows: J-V4.n -> its supersede / amend mark
sec9 = new.split('## 9 Decisions')[1].split('## 10 ')[0]
jmark = {}
for l in sec9.split('\n'):
    m = re.match(r'\| (J-V4\.[0-9]+) \| (\*(?:Superseded|Amended) by [^*]+\*)?', l)
    if m: jmark[m.group(1)] = (m.group(2) or '').strip('*').rstrip('.')
# the integration-notes table: IN-V04-n -> now at
innote = {}
for l in new.split('## Integration notes')[1].split('\n'):
    m = re.match(r'\| (IN-V04-[0-9]+) \| ([^|]+) \| ([^|]+) \|', l)
    if m: innote[m.group(1)] = m.group(3).strip()

ov = {
    'V04-0013': 'V04 §1.3 (the out-of-scope row; the callers named in V04 §1b.2)',
    'V04-0014': 'V04 §1.3 (the plan rung row: stage 3, §2.6, item 28; V03 draws, V04 reserves)',
    'V04-0027': 'V04 §1b.1 (F-NET row → item 330; the stage-warning row → items 338, 558, `W_RUIN_SOURCE_REMOVED` in item 558\'s list, V04-WGAP-3)',
    'V04-0042': 'V04 §1b.2 (the buried-system builder row); the buried floor\'s steps V04 §3.5.0 *Foundations* and V04 §3.5.5 (a)',
    'V04-0055': 'V04 §2.1 (`wayFall` and `Junction.arms`, `.chamber` read as the base declares them, §2.4, item 208); V04 §1b.1 row; `levelCm` in V04 §2.3 `NetworkRule`',
    'V04-0056': 'V04 §2.1 (the `Tunnel` fields read as §2.7 declares them, item 247); V04 §1b.1 and V04 §2.6 rows',
    'V04-0057': 'V04 §2.1 (`ChamberKind` and `Chamber.span` read as §2.7 declares them, items 247, 250); the span key V04 §3.5.4 (d)',
    'V04-0103': 'V04 §3.5.0 (the existence-order table; the raised way\'s record §2.7, item 244)',
    'V04-0118': 'V04 §3.5.1 (2): the rank by need, citing II.7.6\'s ossuary law (item 560) for `A(f)` (RESTATEMENTS-011)',
    'V04-0319': 'V04 §10 (its preamble: every request applied by file f, cited by item; the request text lives in the f item)',
    'V04-0344': 'V04 §11 Q1 (answered, J122) and Q2 (answered, J122); V04 §8 *Where it slots*',
    'V04-0345': 'V04 §12 (one CONFIRMED list, one PLAUSIBLE list; the round receipts to the validation records)',
    'V04-0346': 'V04 §13 (*What the sibling units hold for this volume*); each hand-off closed at its destination (cross-part notes)',
}
rows = []
for i in items:
    iid = i['id']; sec = i['sec']; can = c.get(iid, {}); role = can.get('role', 'home')
    st = i['statement']
    if iid in ov:
        where = ov[iid]
    elif role == 'bcr-pointer' or i['kind'] == 'bcr':
        nums = []
        for m in re.finditer(r'\bBCR-([0-9]+)\b', st):
            n = int(m.group(1))
            # a request named at its own clause start (the item's subject), not a citation inside the text
            pre = st[max(0, m.start() - 2):m.start()]
            if m.start() == 0 or pre in ('. ', '; ') or st[m.end():m.end() + 1] in (':',):
                if n not in nums: nums.append(n)
        if not nums:
            nums = [int(re.search(r'BCR-([0-9]+)', st).group(1))]
        where = '; '.join(f'V04 §10 row BCR-V4-{n} → {bcr.get(n, "?")}' for n in nums)
    elif sec == 'IN':
        n = re.match(r'IN-V04-([0-9]+)', st).group(0)
        where = f'folded ({n}): {innote.get(n, "?")}'
    elif sec == '9':
        j = re.search(r'J-V4\.[0-9]+', st).group(0)
        mk = jmark.get(j, '')
        where = f'V04 §9 {j}' + (f' ({mk[0].lower() + mk[1:]})' if mk else '')
    elif role == 'reference':
        where = f'V04 §{sec} cites {can.get("home_unit")} {can.get("home_sec")} (the fact at its home, not restated)'
    elif role == 'glossary':
        where = f'V04 §{sec} (the term defined once there)'
    elif role == 'index-row':
        where = f'V04 §{sec} (an index row of citations)'
    else:
        where = f'V04 §{sec}'
    rows.append((iid, sec, i['kind'], role, where))
out = ['| inventory id | old § | kind | canon role | now lives |', '|---|---|---|---|---|']
for r in rows: out.append('| ' + ' | '.join(r) + ' |')
open('docs/validation/coherence/work/rewrite-V04/mapping.md', 'w', encoding='utf-8').write('\n'.join(out) + '\n')
unm = [r for r in rows if '?' in r[4]]
print(len(rows), 'rows;', len(unm), 'with an unresolved pointer')
for r in unm: print(r)
