#!/usr/bin/env python3
"""Carry a child's chain files across containers and accounts (J813, the stop of 2026-11-13).

A child's seats keep their long runs' state under /home/user/maps-scratch/waves/ (chain steps, exit codes, logs, JSON
reports, census stores, mirrors). That folder lives in the child's container and dies with it; the backup branch holds
only the repository's tree. This script puts the folder's state INTO the tree, so that the next snapshot carries it,
and takes it out again in a fresh container:

  stash_waves.py stash <LETTER> [extra dir ...]   -> <repo>/stash/<LETTER>/waves.tgz.partNN + MANIFEST.txt + README.md
  stash_waves.py restore <LETTER>                 -> /home/user/maps-scratch/waves/... as it was, mirrors rebuilt

WHAT IS STASHED: every file under the folder (and the extra dirs, which must lie under /home/user/maps-scratch) except
node_modules, dist, .turbo, .git and files over 15 MB (each listed as SKIPPED). A TREE COPY (a seat's mirror: a folder
holding package.json and packages/, or a copy of the repository holding plat/ and workflows/) is stored as ITS
DIFFERENCES from the child's own tree: the files that differ or that the tree lacks go into the archive; the files
identical to the tree's are only LISTED (mirrors/<n>.same.txt in the archive). `restore` extracts the archive and then
rebuilds each tree copy: the listed files are copied from the tree as it stands at restore time. So a restored mirror
is 'the tree at restore, with the mirror's own differences' — if the design branch moved between stash and restore,
the listed files are the new head's (the MANIFEST names the head the stash was taken on). node_modules is never
stashed: a seat that needs a mirror's packages installs them again (`corepack pnpm install --frozen-lockfile --offline`
in its plat folder, or links the tree's node_modules as it first did).

The archive is split in parts of 40 MB (a host limit on file size). Nothing outside <repo>/stash/<LETTER>/ and the
scratch folder is written."""
import filecmp
import io
import os
import subprocess
import sys
import tarfile
import time

R = os.environ.get('MAPS_ROOT', '/home/user/maps-architecture')
SCR = os.environ.get('MAPS_SCRATCH', '/home/user/maps-scratch')
SKIP_DIRS = {'node_modules', 'dist', '.turbo', '.git', '.vite', 'coverage', '.pnpm-store', '__pycache__'}
BIG = 15 * 1024 * 1024
PART = 40 * 1024 * 1024


def ref_root(d):
    """The tree a folder is a copy of: plat/ for a plat copy, the repository for a repository copy, else None."""
    if os.path.isfile(os.path.join(d, 'package.json')) and os.path.isdir(os.path.join(d, 'packages')):
        return os.path.join(R, 'plat')
    if os.path.isdir(os.path.join(d, 'workflows')) and os.path.isfile(os.path.join(d, 'plat', 'package.json')):
        return R
    return None


def stash(letter, extra):
    out = os.path.join(R, 'stash', letter)
    os.makedirs(out, exist_ok=True)
    roots = [os.path.join(SCR, 'waves')] + [os.path.abspath(e) for e in extra]
    for r in roots:
        if not os.path.abspath(r).startswith(os.path.abspath(SCR) + os.sep):
            sys.exit(f'stash: {r} is not under {SCR}')
    files = []      # (abs path, arcname)
    skipped = []    # (arcname, size, why)
    mirrors = []    # (arc root, ref root, [same rels])
    for top in roots:
        if not os.path.isdir(top):
            skipped.append((os.path.relpath(top, SCR), 0, 'NO SUCH FOLDER'))
            continue
        mirror_of = {}  # abs dir -> index in mirrors
        for dp, dn, fn in os.walk(top, followlinks=False):
            dn[:] = sorted(d for d in dn if d not in SKIP_DIRS)
            m = None
            p = dp
            while True:
                if p in mirror_of:
                    m = mirror_of[p]
                    break
                if p == top or len(p) <= len(top):
                    break
                p = os.path.dirname(p)
            if m is None:
                ref = ref_root(dp)
                if ref is not None and os.path.isdir(ref):
                    mirrors.append((os.path.relpath(dp, SCR), ref, []))
                    m = mirror_of[dp] = len(mirrors) - 1
            for f in sorted(fn):
                a = os.path.join(dp, f)
                arc = os.path.relpath(a, SCR)
                if os.path.islink(a):
                    files.append((a, arc))
                    continue
                try:
                    size = os.path.getsize(a)
                except OSError:
                    continue
                if m is not None:
                    mroot = os.path.join(SCR, mirrors[m][0])
                    rel = os.path.relpath(a, mroot)
                    refp = os.path.join(mirrors[m][1], rel)
                    try:
                        if os.path.isfile(refp) and os.path.getsize(refp) == size and filecmp.cmp(a, refp, shallow=False):
                            mirrors[m][2].append(rel)
                            continue
                    except OSError:
                        pass
                if size > BIG:
                    skipped.append((arc, size, 'OVER 15 MB'))
                    continue
                files.append((a, arc))
    head = subprocess.run(['git', '-C', R, 'rev-parse', '--short', 'HEAD'], capture_output=True, text=True).stdout.strip()
    tmp = os.path.join(SCR, f'stash-{letter}.tgz')
    with tarfile.open(tmp, 'w:gz', compresslevel=6) as t:
        for a, arc in files:
            try:
                t.add(a, arcname=arc, recursive=False)
            except OSError as e:
                skipped.append((arc, 0, f'UNREADABLE {e}'))
        for i, (arc, ref, same) in enumerate(mirrors):
            data = ('\n'.join([arc, os.path.relpath(ref, R) if ref != R else '.'] + same) + '\n').encode()
            ti = tarfile.TarInfo(f'mirrors/{i}.same.txt')
            ti.size = len(data)
            ti.mtime = int(time.time())
            t.addfile(ti, io.BytesIO(data))
    for old in os.listdir(out):
        if old.startswith('waves.tgz.part'):
            os.remove(os.path.join(out, old))
    n = 0
    with open(tmp, 'rb') as f:
        while True:
            b = f.read(PART)
            if not b:
                break
            with open(os.path.join(out, f'waves.tgz.part{n:02d}'), 'wb') as o:
                o.write(b)
            n += 1
    total = os.path.getsize(tmp)
    os.remove(tmp)
    stamp = time.strftime('%Y-%m-%d %H:%MZ', time.gmtime())
    with open(os.path.join(out, 'MANIFEST.txt'), 'w', encoding='utf-8') as mf:
        mf.write(f'stash {letter} taken {stamp} on tree head {head}; {len(files)} files in the archive, {total} bytes in {n} part(s); {len(mirrors)} tree copies; {len(skipped)} skipped\n')
        for arc, ref, same in mirrors:
            mf.write(f'TREE COPY {arc} (a copy of {os.path.relpath(ref, R) if ref != R else "the repository"}): {len(same)} files identical to the tree, listed only\n')
        for arc, size, why in skipped:
            mf.write(f'SKIPPED {arc} ({size} bytes): {why}\n')
        for a, arc in files:
            try:
                mf.write(f'{os.path.getsize(a) if not os.path.islink(a) else 0}\t{arc}\n')
            except OSError:
                mf.write(f'?\t{arc}\n')
    with open(os.path.join(out, 'README.md'), 'w', encoding='utf-8') as rd:
        rd.write(f'''# Stash of child {letter}'s chain files ({stamp}, tree head {head})

The state of this child's long runs as it stood when the child was stopped: `/home/user/maps-scratch/waves/` (chain
steps, exit codes, logs, JSON reports, census stores; mirrors as their differences from the tree). `MANIFEST.txt` lists
every file. Restore in a fresh container, after the tree is this branch's tree:

    python3 /home/user/maps-architecture/tools/session/stash_waves.py restore {letter}

then remove `stash/` from the working tree (`rm -rf /home/user/maps-architecture/stash`) so that later snapshots do not
carry it. To the seat that resumes, the restored folder is what a container restart leaves: every finished part of a
chain (its exit code beside it) is read, never run again; node_modules of a mirror is installed again when needed.
''')
    print(f'stash {letter}: {len(files)} files, {total} bytes in {n} part(s), {len(mirrors)} tree copies, {len(skipped)} skipped -> {out}')
    for arc, size, why in skipped[:20]:
        print(f'  SKIPPED {arc} ({size} bytes): {why}')


def restore(letter):
    src = os.path.join(R, 'stash', letter)
    parts = sorted(p for p in os.listdir(src) if p.startswith('waves.tgz.part'))
    if not parts:
        sys.exit(f'restore: no archive parts in {src}')
    os.makedirs(SCR, exist_ok=True)
    tmp = os.path.join(SCR, f'restore-{letter}.tgz')
    with open(tmp, 'wb') as o:
        for p in parts:
            with open(os.path.join(src, p), 'rb') as f:
                o.write(f.read())
    count = 0
    lists = []
    with tarfile.open(tmp, 'r:gz') as t:
        for m in t:
            if m.name.startswith('mirrors/') and m.name.endswith('.same.txt'):
                lists.append(t.extractfile(m).read().decode().split('\n'))
                continue
            if m.name.startswith('/') or '..' in m.name.split('/'):
                continue
            try:
                t.extract(m, SCR, filter='data')
            except TypeError:  # a Python without the filter argument
                t.extract(m, SCR)
            count += 1
    os.remove(tmp)
    rebuilt = 0
    missing = 0
    for lines in lists:
        arc, ref = lines[0], lines[1]
        refroot = R if ref == '.' else os.path.join(R, ref)
        for rel in lines[2:]:
            if not rel:
                continue
            s = os.path.join(refroot, rel)
            d = os.path.join(SCR, arc, rel)
            if os.path.exists(d):
                continue
            if not os.path.isfile(s):
                missing += 1
                continue
            os.makedirs(os.path.dirname(d), exist_ok=True)
            with open(s, 'rb') as fi, open(d, 'wb') as fo:
                fo.write(fi.read())
            try:
                os.chmod(d, os.stat(s).st_mode & 0o777)
            except OSError:
                pass
            rebuilt += 1
    print(f'restore {letter}: {count} files extracted under {SCR}; {len(lists)} tree copies rebuilt from the tree ({rebuilt} files copied, {missing} no longer in the tree)')


if __name__ == '__main__':
    if len(sys.argv) < 3 or sys.argv[1] not in ('stash', 'restore'):
        sys.exit(__doc__)
    if sys.argv[1] == 'stash':
        stash(sys.argv[2], sys.argv[3:])
    else:
        restore(sys.argv[2])
