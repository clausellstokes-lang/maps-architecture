# Lane coherence/assemble-r0, step (3): apply the rationale changes docs/validation/coherence/rewrite-scope.md lists
# (*Cross-part notes*, the bullet "Rationale (Part A)"). Mechanical; no hand edits.
#  (a) Part A gains a full entry for each of the 45 new index rows, parsed from the report ("J-x: chose …"), each written as
#      the table row "| J-x | Chose … |", appended after Part A's last row in the report's order. Guard: the parsed ids are
#      exactly the report's list (*Renumberings and new ids*, "New index rows (45)"), none already in Part A, each an index
#      row of the new base.
#  (b) Changed entries: J-A16.01 drops the total 166–220 (SCOPE-C03); J-A29.25 reads the report's two clauses (BCR-V2-33
#      (b), file f item 371); J-A28.02 drops canon R11 (ID-R: the repair-round 'R11' is narration).
#  (c) E-24: each entry the report's E-24 list names gains the one mark its new index row carries (" — *amended by …*" /
#      " — *superseded by …*"), unless the entry already carries that exact mark.
# Every replacement must match exactly once. Run with --dry to check only. Writes work/assemble-r0/rationale.json.
import json, os, re, sys
ROOT = '/home/user/maps-architecture'
os.chdir(ROOT)
DRY = '--dry' in sys.argv
RAT = 'docs/ARCHITECTURE-RATIONALE.md'
REP = 'docs/validation/coherence/rewrite-scope.md'
IDXF = 'docs/validation/coherence/new/base/scope/12-judgment.md'
WORK = 'docs/validation/coherence/work/assemble-r0'
rat = open(RAT, encoding='utf-8').read()
rep = open(REP, encoding='utf-8').read().split('\n')
idx = open(IDXF, encoding='utf-8').read()
problems = []

# ---- the report's bullet, unwrapped
s = next(i for i, l in enumerate(rep) if l.startswith('* **Rationale (Part A):**'))
e = next(i for i in range(s + 1, len(rep)) if rep[i].startswith('* **'))
bullet = ' '.join(l.strip() for l in rep[s:e])
first, rest = bullet.split('**Changed entries:**', 1)
changed, editors = rest.split("**The part editors' J122 decisions**", 1)
editors = editors.split('):', 1)[1]          # after "(full texts in … §4):"
ENTRY = re.compile(r'(?:(?<=\s)|^)(J-[A-Z]+(?:-?\d+(?:\.\d+)?)): (chose[ ,].*?)(?=\s+J-[A-Z]+(?:-?\d+(?:\.\d+)?): chose[ ,]|\s*$)')
entries = []
for block in (first.split('as follows.', 1)[1], editors):
    for m in ENTRY.finditer(block.strip()):
        entries.append((m.group(1), m.group(2).strip()))

# ---- the expected id list (report, *Renumberings and new ids*)
nl = next(l for l in rep if l.startswith('* **New index rows (45):**'))
k = rep.index(nl); blk = []
while True:
    blk.append(rep[k]); k += 1
    if rep[k].startswith('* ') or not rep[k].strip(): break
blk = ' '.join(x.strip() for x in blk)
def expand(txt):
    out = []
    for a, b in re.findall(r'(J-[A-Z]+-?\d+(?:\.\d+)?)(?:\s+–\s+(J-[A-Z]+-?\d+(?:\.\d+)?))?', txt):
        if not b: out.append(a); continue
        pa, na = re.match(r'(.*?)(\d+)$', a).groups(); pb, nb = re.match(r'(.*?)(\d+)$', b).groups()
        w = len(na) if pa.endswith('.') else 0
        out += [f'{pa}{str(n).zfill(w) if w else n}' for n in range(int(na), int(nb) + 1)]
    return out
own = blk.split("the part editors'", 1)[0]
eds = blk.split("the part editors'", 1)[1].split('The model\'s J-RM1', 1)[0]
# the editors' list names each decision followed by "(… for its J-RM3 …)" glosses; keep only index ids
expected = expand(own) + [x for x in expand(eds) if not x.startswith('J-RM')]
expected = list(dict.fromkeys(expected))
got = [i for i, _ in entries]
if len(entries) != 45: problems.append(f'parsed {len(entries)} entries, expected 45')
if sorted(got) != sorted(expected): problems.append(f'parsed ids differ from the report list: only parsed {sorted(set(got) - set(expected))}, only listed {sorted(set(expected) - set(got))}')
if len(set(got)) != len(got): problems.append('duplicate parsed id')
for i, t in entries:
    if re.search(rf'^\| {re.escape(i)} \|', rat, re.M): problems.append(f'{i} already in Part A')
    if len(re.findall(rf'^\| {re.escape(i)} \|', idx, re.M)) != 1: problems.append(f'{i} is not one index row of the new base')
    if re.search(r'(?<!\\)\|', t): problems.append(f'{i}: text holds an unescaped pipe')

# ---- Part A bounds
lines = rat.split('\n')
pa = next(i for i, l in enumerate(lines) if l.startswith('## Part A'))
pb = next(i for i, l in enumerate(lines) if l.startswith('## Part B'))
last_row = max(i for i in range(pa, pb) if lines[i].startswith('| '))
def row(i): return f'| {i} | ' + (lambda t: t[0].upper() + t[1:])(i and dict(entries)[i]) + ' |'
new_rows = [row(i) for i, _ in entries]

# ---- (b) changed entries: (id, old, new)
CHANGES = [
    ('J-A16.01', 'so the rows still sum to the total of 166–220 (153–204 before amendments b)',
                 'so the rows still sum to the total (153–204 before amendments b)'),
    ('J-A29.25', 'an outside stair for a walk-out, else the class\'s programme row\'s access read at the band the stock was built for',
                 '`external` for a walk-out or where no ground wing is storeyed (§2.6 *Basements*; its door V03 §3.7.1\'s), else the programme row\'s `basementAccess` at `builtBand`'),
    ('J-A29.25', 'a walk-out\'s outside stair is a door in the side of the basement ring that lies lowest on the terrain',
                 'an `external` basement\'s outside stair is a door at the point §2.6\'s plan rung step 3 gives (V03 §3.7.1)'),
    ('J-A28.02', 'were folded in place by repair round 1 under canon R11 (the summary carries only canonical figures)',
                 'were folded in place by repair round 1 (the summary carries only canonical figures)'),
]
E24 = ['J-P16', 'J-A29.01', 'J-A30.71', 'J-A30.72', 'J-A30.22', 'J-A8.21', 'J-A12.45', 'J-DET-2', 'J-DET-6', 'J-DET-53',
       'J-A28.71', 'J-A16.01', 'J-A28.02', 'J-A32.02', 'J-A68.05', 'J-A81.71', 'J-A101.04']
def find_row(i):
    hits = [n for n in range(pa, pb) if lines[n].startswith(f'| {i} |')]
    if len(hits) != 1: problems.append(f'{i}: {len(hits)} Part A rows'); return None
    return hits[0]
log = []
for i, a, b in CHANGES:
    n = find_row(i)
    if n is None: continue
    c = lines[n].count(a)
    if c != 1: problems.append(f'{i}: change matched {c} times: {a[:60]!r}'); continue
    lines[n] = lines[n].replace(a, b); log.append(dict(id=i, kind='changed', old=a, new=b))
for i in E24:
    n = find_row(i)
    ir = re.findall(rf'^\| {re.escape(i)} \|(.*)$', idx, re.M)
    if n is None or len(ir) != 1: problems.append(f'{i}: index row count {len(ir)}'); continue
    m = re.findall(r' — \*((?:amended|superseded) by [^*]+)\*', ir[0])
    if len(m) != 1: problems.append(f'{i}: index row carries {len(m)} marks'); continue
    mark = f' — *{m[0]}*'
    if mark in lines[n]: log.append(dict(id=i, kind='E-24 mark already present', mark=m[0])); continue
    if not lines[n].endswith(' |'): problems.append(f'{i}: row does not end with " |"'); continue
    lines[n] = lines[n][:-2] + mark + ' |'; log.append(dict(id=i, kind='E-24 mark', mark=m[0]))

if problems:
    print('STOP — rationale problems:'); [print(' ', p) for p in problems]; sys.exit(2)
lines[last_row + 1:last_row + 1] = new_rows
out = '\n'.join(lines)
json.dump(dict(added=[dict(id=i, text=t) for i, t in entries], changes=log, inserted_after_line=last_row + 1,
               old_bytes=len(rat.encode()), new_bytes=len(out.encode()), old_words=len(rat.split()), new_words=len(out.split())),
          open(f'{WORK}/rationale.json', 'w'), ensure_ascii=False, indent=1)
for i, t in entries: print(f'+ {i:<11} {t[:100]}' + (f'  …{t[-70:]}' if DRY else ''))
for l in log: print(f"~ {l['id']:<11} {l['kind']}: {l.get('mark') or l.get('new', '')[:90]}")
print(f'{len(entries)} entries added after l. {last_row + 1}; {len(log)} changes; {len(rat.encode())} -> {len(out.encode())} bytes')
if DRY: print('DRY RUN — nothing written'); sys.exit(0)
open(RAT, 'w', encoding='utf-8').write(out)
print('written:', RAT)
