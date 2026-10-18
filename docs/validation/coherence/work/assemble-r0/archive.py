# Lane coherence/assemble-r0, step 0: archive the pre-coherence set (never overwrite an archive; cmp identical;
# chmod a-w; sha256 recorded). Writes work/assemble-r0/archive.json. Exit 2 if a target exists and differs.
import filecmp, glob, hashlib, json, os, shutil, stat, sys
ROOT = '/home/user/maps-architecture'
os.chdir(ROOT)
PAIRS = [('docs/ARCHITECTURE.md', 'docs/archive/ARCHITECTURE-pre-coherence-2026-09-28.md'),
         ('docs/ARCHITECTURE-RATIONALE.md', 'docs/archive/ARCHITECTURE-RATIONALE-pre-coherence-2026-09-28.md')]
VOLDIR = 'docs/archive/volumes-pre-coherence-2026-09-28'
for f in sorted(glob.glob('docs/volumes/V*.md')) + ['docs/volumes/INDEX.md']:
    PAIRS.append((f, f'{VOLDIR}/{os.path.basename(f)}'))
os.makedirs(VOLDIR, exist_ok=True)
sha = lambda p: hashlib.sha256(open(p, 'rb').read()).hexdigest()
rec = []
for src, dst in PAIRS:
    if os.path.exists(dst):
        if not filecmp.cmp(src, dst, shallow=False):
            print(f'STOP: archive {dst} exists and differs from {src}'); sys.exit(2)
        action = 'kept (existing, identical)'
    else:
        shutil.copy2(src, dst); action = 'copied'
    same = filecmp.cmp(src, dst, shallow=False)
    os.chmod(dst, os.stat(dst).st_mode & ~(stat.S_IWUSR | stat.S_IWGRP | stat.S_IWOTH))
    r = dict(src=src, dst=dst, action=action, identical=same, bytes=os.path.getsize(dst), sha256=sha(dst),
             sha256_src=sha(src), writable=bool(os.stat(dst).st_mode & 0o222))
    rec.append(r)
    print(f"{action:<28} identical={same} ro={not r['writable']} {r['bytes']:>9} {r['sha256'][:12]}  {dst}")
json.dump(rec, open('docs/validation/coherence/work/assemble-r0/archive.json', 'w'), indent=1)
if not all(r['identical'] and r['sha256'] == r['sha256_src'] and not r['writable'] for r in rec):
    print('STOP: an archive is not identical or not read-only'); sys.exit(2)
print(f'{len(rec)} files archived')
