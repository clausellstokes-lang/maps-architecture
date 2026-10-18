# Lane coherence/assemble-r0, step (b): docs/validation/bench/doc_checks.py by the three-copy method against one corpus
# snapshot — untouched (the archived pre-coherence base), new (the placed section files, before the assembler's fixes) and
# combined (the live docs/ARCHITECTURE.md with them) — over (a) every top-level heading key of the base and (b) the eight
# '#' keys, which partition the document (under (a) the parent keys ARCHITECTURE, PART I, PART II span their children, so
# their C3/C4 hits count twice). Usage: checks.py OUTDIR [copies…]. Prints the counts; the full outputs go to OUTDIR.
import glob, json, os, re, subprocess, sys
ROOT = '/home/user/maps-architecture'
os.chdir(ROOT)
OUT = sys.argv[1]; os.makedirs(OUT, exist_ok=True)
want = sys.argv[2:] or ['untouched', 'new', 'combined']
place = json.load(open('docs/validation/coherence/work/assemble-r0/place.json', encoding='utf-8'))
new_copy = f'{OUT}/ARCHITECTURE-new.md'
open(new_copy, 'w', encoding='utf-8').write('\n\n'.join(open(b['file'], encoding='utf-8').read().rstrip('\n') for b in place['base']) + '\n')
COPIES = {'untouched': 'docs/archive/ARCHITECTURE-pre-coherence-2026-09-28.md', 'new': new_copy, 'combined': 'docs/ARCHITECTURE.md'}
def keys(path):
    fence = False; ks = []; top = []
    for l in open(path, encoding='utf-8').read().split('\n'):
        if l.lstrip().startswith('```'): fence = not fence; continue
        if fence: continue
        m = re.match(r'(#{1,2}) (.*)', l)
        if not m: continue
        t = m.group(2)
        mm = re.match(r'§(\d+) ', t) or re.match(r'(II\.\d+) ', t)
        k = mm.group(1) if mm else ('The whole design' if t.startswith('The whole design') else
             re.match(r'(ARCHITECTURE|PART III|PART II|PART I|Delegated decisions|Judgment calls|Staged|Appendix A)', t).group(1))
        ks.append(k)
        if m.group(1) == '#': top.append(k)
    return ks, top
res = {}
for name in want:
    path = COPIES[name]
    ka, kb = keys(path)
    for kset, ks in (('a', ka), ('b', kb)):
        r = subprocess.run(['python3', 'docs/validation/bench/doc_checks.py', '--doc', path, '--sections', ','.join(ks)],
                           capture_output=True, text=True)
        open(f'{OUT}/{name}-{kset}.out', 'w').write(r.stdout + '\n--- stderr\n' + r.stderr)
        cnt = {c: [int(x) for x in re.search(rf'^{c}: (\d+) hits, (\d+) unreviewed', r.stdout, re.M).groups()] for c in ('C1', 'C2', 'C3', 'C4', 'S1', 'S2')}
        warn = [l for l in r.stdout.split('\n') if l.startswith('WARNING')]
        head = r.stdout.split('\n')[len(warn)] if r.stdout else ''
        res[f'{name}-{kset}'] = dict(doc=path, keys=len(ks), exit=r.returncode, counts=cnt, header=head, warning=warn[:1])
        print(f'{name:<9} ({kset}, {len(ks):>2} keys) exit {r.returncode}  ' + '  '.join(f'{c} {t}/{u}' for c, (t, u) in cnt.items()))
json.dump(res, open(f'{OUT}/checks.json', 'w'), indent=1)
