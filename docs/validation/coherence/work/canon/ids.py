"""coherence/canon step 3: id census over the whole set (base, rationale, volumes, INDEX, f, g, _integrate).
A DEFINITION is an id opening a table row, a bold lead, a heading, or a line ('ID —', 'ID:'). Output work/canon/ids.json."""
import re, json, glob, collections
FILES = ['docs/ARCHITECTURE.md', 'docs/ARCHITECTURE-RATIONALE.md', 'docs/volumes/INDEX.md', 'docs/AMENDMENTS-2026-09-28f.md',
         'docs/AMENDMENTS-2026-09-28g.md', 'docs/volumes/_integrate.md'] + sorted(glob.glob('docs/volumes/V*.md'))
IDP = r"(T-V\d+-\d+[a-z]?|T\d+[a-z]?-\d+[a-z]?|J-V\d+\.\d+|J-VI\.\d+|J-A\d+\.\d+|J-[A-Z][A-Za-z0-9]*\d*\.\d+|J\d{2,3}|D-\d+|BCR-V\d+-\d+|BCR-\d+|DR\d+|DR-V\d\.\d|X-V1[12]-\d+|XV-V9-\d+|CVR-V10-\d+|IN-V\d\d-\d+|W\d{1,3}|X\d{1,2}|F-[A-Z][A-Z-]+[A-Z]|S-V\d+-[a-z0-9]+|Q-V\d+-\d+|H\d{1,2})"
DEF_RES = [re.compile(r'^\|\s*\**\s*' + IDP + r'\b'),
           re.compile(r'^\s*(?:[-*]\s+)?\*\*' + IDP + r'\b[^*]*\*\*'),
           re.compile(r'^#{2,6}\s+(?:\d+(?:\.\d+)*\s+)?' + IDP + r'\b'),
           re.compile(r'^\s*(?:[-*]\s+)?' + IDP + r'\s*(?:—|–|:|\.)\s')]
defs = collections.defaultdict(list)
cites = collections.Counter()
for f in FILES:
    unit = f.split('/')[-1][:3] if '/volumes/V' in f else f.split('/')[-1]
    for n, line in enumerate(open(f, encoding='utf-8'), start=1):
        for m in re.finditer(r'\b' + IDP + r'\b', line):
            cites[(m.group(1), unit)] += 1
        for rx in DEF_RES:
            m = rx.match(line)
            if m:
                defs[m.group(1)].append({'file': f, 'unit': unit, 'line': n, 'text': line.strip()[:220]})
                break
dups = {}
for k, v in defs.items():
    if len(v) > 1:
        dups[k] = v
out = {'defs': defs, 'dups': dups, 'cites': {f'{k}@{u}': c for (k, u), c in cites.items()}}
json.dump(out, open('docs/validation/coherence/work/canon/ids.json', 'w'), ensure_ascii=False, indent=0)
fam = collections.Counter()
for k, v in dups.items():
    fam[re.sub(r'\d+', 'n', k)] += 1
print('defined ids', len(defs), 'duplicated', len(dups))
print(fam.most_common(40))
