#!/usr/bin/env python3
"""checks.py (coherence/assemble-r7w, P5) — docs/validation/bench/doc_checks.py by the three-copy method against one corpus
snapshot, as assemble-r0's checks.py: untouched (the live base before this round, snapshot.py's copy), new (apply.py's
output, before the assembler's own changes) and combined (the final text that is installed), each over (a) every
top-level heading key of the base (the brief's command; parent keys span their children, so their C3/C4 hits count
twice) and (b) the eight '#' keys, which partition the document. The corpus fingerprint (path, size, mtime of every file
doc_checks reads) is taken before and after the runs and must be equal. Usage: checks.py OUTDIR [copies…] [--allow F]"""
import glob, hashlib, json, os, re, subprocess, sys
ROOT = '/home/user/maps-architecture'
os.chdir(ROOT)
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm7w'
args = sys.argv[1:]
allow = 'docs/validation/doc-checks-allow.tsv'
if '--allow' in args:
    i = args.index('--allow'); allow = args[i + 1]; del args[i:i + 2]
OUT = args[0]; os.makedirs(OUT, exist_ok=True)
want = args[1:] or ['untouched', 'new', 'combined']
COPIES = {'untouched': f'{SCR}/before/docs/ARCHITECTURE.md', 'new': f'{SCR}/out/docs/ARCHITECTURE.md', 'combined': f'{SCR}/final/docs/ARCHITECTURE.md'}
def fingerprint():
    fs = [f for f in glob.glob('research/**/*', recursive=True) if os.path.isfile(f)]
    fs += glob.glob('captures/**/*', recursive=True) + glob.glob('docs/confidence/**/*', recursive=True) + glob.glob('docs/improvements/**/*', recursive=True)
    fs += ['docs/CONFIDENCE.md', 'docs/IMPROVEMENTS.md', 'docs/validation/bench/doc_checks.py']
    h = hashlib.sha256()
    for f in sorted(set(fs)):
        if os.path.isfile(f):
            st = os.stat(f); h.update(f'{f}\t{st.st_size}\t{int(st.st_mtime)}\n'.encode())
    return h.hexdigest(), len(set(fs))
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
fp0 = fingerprint()
res = dict(corpus_fingerprint_before=fp0, allow=allow, runs={})
for name in want:
    path = COPIES[name]
    ka, kb = keys(path)
    for kset, ks in (('a', ka), ('b', kb)):
        r = subprocess.run(['python3', 'docs/validation/bench/doc_checks.py', '--doc', path, '--sections', ','.join(ks), '--allow', allow],
                           capture_output=True, text=True)
        open(f'{OUT}/{name}-{kset}.out', 'w').write(r.stdout + '\n--- stderr\n' + r.stderr)
        cnt = {c: [int(x) for x in re.search(rf'^{c}: (\d+) hits, (\d+) unreviewed', r.stdout, re.M).groups()] for c in ('C1', 'C2', 'C3', 'C4', 'S1', 'S2')}
        warn = [l for l in r.stdout.split('\n') if l.startswith('WARNING')]
        head = r.stdout.split('\n')[len(warn)] if r.stdout else ''
        res['runs'][f'{name}-{kset}'] = dict(doc=path, sha256=hashlib.sha256(open(path, 'rb').read()).hexdigest(), keys=len(ks), key_list=ks,
                                            exit=r.returncode, counts=cnt, header=head, warning=warn[:1], not_found=[l for l in r.stderr.split('\n') if 'not found' in l])
        print(f'{name:<9} ({kset}, {len(ks):>2} keys) exit {r.returncode}  ' + '  '.join(f'{c} {t}/{u}' for c, (t, u) in cnt.items()), flush=True)
res['corpus_fingerprint_after'] = fingerprint()
res['one_snapshot'] = res['corpus_fingerprint_before'] == res['corpus_fingerprint_after']
json.dump(res, open(f'{OUT}/checks.json', 'w'), indent=1)
print('one corpus snapshot:', res['one_snapshot'], res['corpus_fingerprint_before'][0][:16], res['corpus_fingerprint_before'][1], 'files')
print(res['runs'][next(iter(res['runs']))]['warning'], res['runs'][next(iter(res['runs']))]['header'])
