#!/usr/bin/env python3
"""fullstate.py — builds the post-round-2 set on copies (base: the five landed base r2 files + this seat's; each volume:
its landed r2 file; INDEX: this seat's) under SCR/full/docs, for refs.py and doc_checks. Never writes a live file."""
import glob, os, re, shutil, subprocess, sys, json
sys.path.insert(0, os.path.dirname(__file__))
from dryrun import split, run, SCR, ROOT
F = f'{SCR}/full'
shutil.rmtree(F, ignore_errors=True); os.makedirs(f'{F}/docs/volumes')
# base and rationale from the combined dry run (dryrun.py must have run), the swap applied
shutil.copy(f'{SCR}/combined.md', f'{F}/docs/ARCHITECTURE.md'); shutil.copy(f'{SCR}/combined-R.swapped.md', f'{F}/docs/ARCHITECTURE-RATIONALE.md')
shutil.copy(f'{SCR}/INDEX.new.md', f'{F}/docs/volumes/INDEX.md')
out = {}
for rp in sorted(glob.glob(f'{ROOT}/docs/validation/coherence/repair-r2-V*.md')):
    parts = split(rp)
    for tgt, txt in parts.items():
        p = f'{SCR}/split/vol/{os.path.basename(rp)}'; os.makedirs(os.path.dirname(p), exist_ok=True); open(p, 'w').write(txt)
        r = run(f'{ROOT}/{tgt}', f'{ROOT}/docs/ARCHITECTURE-RATIONALE.md', f'{F}/{tgt}', f'{SCR}/throwaway-{os.path.basename(tgt)}', f'{SCR}/{os.path.basename(rp)}.json', [p])
        out[os.path.basename(rp)] = dict(target=tgt, found=r['found'], applied=r['applied'], audit_not_ok=r['audit_not_ok'], skipped=r['skipped'])
for v in glob.glob(f'{ROOT}/docs/volumes/V*.md'):
    d = f'{F}/docs/volumes/{os.path.basename(v)}'
    if not os.path.exists(d): shutil.copy(v, d)
print(json.dumps(out, indent=0))
