#!/usr/bin/env python3
"""snapshot.py (coherence/assemble-r3, P1) — sha256 of every live file this seat may write, checked equal to the
committed blob at HEAD, and an untouched copy of each in the scratch folder (the 'untouched' text of the three-copy
method and the merge base of any double REPLACE). Read-only on the live files. Writes snapshot.json beside it."""
import hashlib, json, os, subprocess, sys, glob, shutil
ROOT = '/home/user/maps-architecture'
SCR = sys.argv[1] if len(sys.argv) > 1 else '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm3/before'
os.chdir(ROOT)
files = ['docs/ARCHITECTURE.md', 'docs/ARCHITECTURE-RATIONALE.md'] + sorted(glob.glob('docs/volumes/V*.md')) + ['docs/volumes/INDEX.md']
head = subprocess.check_output(['git', 'rev-parse', 'HEAD'], text=True).strip()
out = dict(head=head, files=[])
for f in files:
    b = open(f, 'rb').read()
    blob = subprocess.check_output(['git', 'show', f'HEAD:{f}'])
    d = os.path.join(SCR, os.path.dirname(f)); os.makedirs(d, exist_ok=True)
    shutil.copy2(f, os.path.join(SCR, f))
    rec = dict(path=f, bytes=len(b), words=len(b.decode('utf-8').split()), sha256=hashlib.sha256(b).hexdigest(),
               equals_head=(blob == b), copy_identical=(open(os.path.join(SCR, f), 'rb').read() == b))
    out['files'].append(rec)
    print(f"{f:45} {rec['bytes']:>9} {rec['words']:>8} {rec['sha256']} head={rec['equals_head']} copy={rec['copy_identical']}")
json.dump(out, open(os.path.join(ROOT, 'docs/validation/coherence/work/assemble-r3/snapshot.json'), 'w'), indent=1)
print('HEAD', head)
