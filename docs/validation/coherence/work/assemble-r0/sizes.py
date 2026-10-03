# Lane coherence/assemble-r0, step (d): sizes before and after per unit (the archives against the live files), and a
# census of duplicate id definitions across the set (principle (4)). Writes work/assemble-r0/sizes.json; prints a table.
import glob, json, os, re
from collections import Counter
ROOT = '/home/user/maps-architecture'
os.chdir(ROOT)
A = 'docs/archive'
rd = lambda p: open(p, encoding='utf-8').read()
units = [('base', f'{A}/ARCHITECTURE-pre-coherence-2026-09-28.md', 'docs/ARCHITECTURE.md')]
for f in sorted(glob.glob('docs/volumes/V*.md')):
    units.append((os.path.basename(f)[:3], f'{A}/volumes-pre-coherence-2026-09-28/{os.path.basename(f)}', f))
units += [('INDEX', f'{A}/volumes-pre-coherence-2026-09-28/INDEX.md', 'docs/volumes/INDEX.md'),
          ('rationale', f'{A}/ARCHITECTURE-RATIONALE-pre-coherence-2026-09-28.md', 'docs/ARCHITECTURE-RATIONALE.md')]
rows = []
for u, a, b in units:
    ta, tb = rd(a), rd(b)
    rows.append(dict(unit=u, old_bytes=len(ta.encode()), new_bytes=len(tb.encode()), old_words=len(ta.split()), new_words=len(tb.split()),
                     old_lines=ta.count('\n'), new_lines=tb.count('\n')))
def tot(sel):
    r = [x for x in rows if x['unit'] in sel]
    return {k: sum(x[k] for x in r) for k in ('old_bytes', 'new_bytes', 'old_words', 'new_words', 'old_lines', 'new_lines')}
vols = [x['unit'] for x in rows if x['unit'].startswith('V')]
totals = {'base + volumes': tot(['base'] + vols), 'volumes': tot(vols), 'base + volumes + INDEX': tot(['base', 'INDEX'] + vols)}
# duplicate definitions
base = rd('docs/ARCHITECTURE.md'); bl = base.split('\n')
jc = next(i for i, l in enumerate(bl) if l.startswith('# Judgment calls')); st = next(i for i, l in enumerate(bl) if l.startswith('# Staged by'))
dups = {}
c = Counter(m.group(1) for l in bl[jc:st] for m in [re.match(r'\|\s*(J-[A-Za-z]+-?\d+(?:\.\d+)?)\s*\|', l)] if m); dups['base index J rows'] = sorted(k for k, n in c.items() if n > 1)
c = Counter(re.findall(r'^\*\*(D-\d+)\b', base, re.M)); dups['base D-n'] = sorted(k for k, n in c.items() if n > 1)
c = Counter(m.group(1) for m in re.finditer(r'^\|\s*(T-ER-\d+)\s*\|', base, re.M)); dups['base T-ER'] = sorted(k for k, n in c.items() if n > 1)
for f in sorted(glob.glob('docs/volumes/V*.md')):
    n = str(int(os.path.basename(f)[1:3])); t = rd(f)
    # definitions: tests in the volume's §7, decisions in its §9 (first table cells or bold labels, not "X's …")
    def sect(k):
        m = re.search(r'^## ' + k + r' .*?(?=^## )', t, re.M | re.S); return m.group(0) if m else ''
    body = sect('7') + '\n' + sect('9')
    ids = [m.group(1) for m in re.finditer(r'^(?:\|\s*|\s*(?:[*-] )?\*\*)(?:\*\*)?((?:T-V|J-V)' + n + r'[-.]\d+)\b(?![-.]\d)(?!\s*[–-]\s*(?:T|J)-V)(?!\'s)', body, re.M)]
    c = Counter(ids); dups[os.path.basename(f)[:3] + ' T-V/J-V'] = sorted(k for k, m in c.items() if m > 1)
c = Counter(re.findall(r'^\|\s*(J-VI\.\d+)\s*\|', rd('docs/volumes/_integrate.md'), re.M)); dups['_integrate J-VI'] = sorted(k for k, n in c.items() if n > 1)
json.dump(dict(units=rows, totals=totals, duplicate_definitions=dups), open('docs/validation/coherence/work/assemble-r0/sizes.json', 'w'), indent=1)
for x in rows + [dict(unit=k, **v) for k, v in totals.items()]:
    print(f"{x['unit']:<24} {x['old_bytes']:>9} -> {x['new_bytes']:>9} B ({(x['new_bytes'] / x['old_bytes'] - 1) * 100:+6.1f} %)  "
          f"{x['old_words']:>7} -> {x['new_words']:>7} w ({(x['new_words'] / x['old_words'] - 1) * 100:+6.1f} %)  KB {x['old_bytes'] / 1024:.1f} -> {x['new_bytes'] / 1024:.1f}")
print('duplicate definitions:', {k: v for k, v in dups.items() if v} or 'none')
