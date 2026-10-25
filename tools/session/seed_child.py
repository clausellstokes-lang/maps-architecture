#!/usr/bin/env python3
"""Seed a child's continuation of an UNCHECKED item on the current main (the CONTINUE RULE; the ID RULE applied early).

A resumed round normally takes the earlier child's whole plat/ (child-recipe.md step 1). A continuation of an item whose
earlier seat returned BLOCKED on cross-item defects (M0-c-06, J318 (3)) must instead run on main AS IT IS NOW — the tree
that carries the fixes — with only the item's unchecked files overlaid from the earlier child's branch. This script
builds that tree in a worktree and commits it to a SEED branch the child then checks out as its OLD branch:

  seed_child.py --branch wip/child-c06f0c --item M0-c-06 --seed wip/seed-c06f0d [--extra plat/bench/manifest.json ...]
                [--worktree <dir>] [--push] [--apply-live] [--note "<text for the session's CHECKPOINT line>"]

Steps (each stops the script on its first failure):
  1. a detached worktree at origin/main;
  2. the item's record on the branch names its files: created/changed files are written from the branch, deleted ones
     removed; the record itself and --extra paths are copied too;
  3. the item's ledger rows (CLEAN-ROOM.md L-, choices.md C-: a row whose seat cell names one of the item's lanes
     build/<item>… or check/<item>…) that main lacks are inserted after the table's last row; a row whose id main holds
     under another seat is renumbered to the next free id with the transplant note (the ID RULE), and its citations in
     the overlaid text files follow;
  4. the item's lane lines main lacks are appended to docs/lane-events.log, then one CHECKPOINT line by the session;
  5. the record is re-landed under its own lane (node tools/landed/landed.mjs) and verified (verify.mjs … ok);
  6. the result is committed on the seed branch (never merged into main) and pushed with --push.
With --apply-live the same files, rows and lane lines replace the live tree's copies of the item (the busy rule keeps
them off main; tools/session/land_child.py then meets no stale row at the landing).
"""
import argparse, json, os, re, subprocess, sys, time

R = '/home/user/maps-architecture'
NOTE = ' Renumbered from {old} (collision) by the session at the cloud transplant. |'
LEDGERS = (('plat/CLEAN-ROOM.md', 'L'), ('plat/docs/build/choices.md', 'C'))


def sh(cmd, cwd=R, check=True):
    r = subprocess.run(cmd, cwd=cwd, shell=True, capture_output=True, text=True)
    if check and r.returncode != 0:
        sys.exit(f'FAILED ({cwd}): {cmd}\n{(r.stdout + r.stderr).strip()[:1200]}')
    return r.stdout


def git(*a, cwd=R, check=True):
    r = subprocess.run(['git', '-C', cwd, *a], capture_output=True, text=True)
    if check and r.returncode != 0:
        sys.exit(f'git {" ".join(a)} failed: {r.stderr.strip()[:600]}')
    return r.stdout


def show(ref, path):
    r = subprocess.run(['git', '-C', R, 'show', f'{ref}:{path}'], capture_output=True)
    return r.stdout if r.returncode == 0 else None


def rows_of(text, prefix):
    return [l for l in text.splitlines(keepends=True) if l.startswith(f'| {prefix}-')]


def row_id(line):
    return line.split('|')[1].strip()


def lane_re(item):
    return re.compile(r'(?:build|check)/' + re.escape(item) + r'(?![A-Za-z0-9])')


def item_row(line, item):
    """A ledger row of one of the item's lanes: its seat cell (CLEAN-ROOM col 2, choices col 3) names build/<item>… or check/<item>…"""
    cells = line.split('|')[1:5]
    return any(lane_re(item).search(c) for c in cells[1:4])


def next_free(text, prefix):
    ids = [int(row_id(l).split('-')[1]) for l in rows_of(text, prefix)]
    return max(ids) + 1


def renum(row, old, new):
    assert row.startswith(f'| {old} |'), row[:30]
    r = (f'| {new} |' + row[len(f'| {old} |'):]).rstrip('\n')
    assert r.endswith(' |'), r[-40:]
    return r[:-2] + NOTE.replace('{old}', old) + '\n'


def insert_rows(path, prefix, rows):
    lines = open(path, encoding='utf-8').read().splitlines(keepends=True)
    idx = [k for k, l in enumerate(lines) if l.startswith(f'| {prefix}-')]
    i = idx[-1]
    lines[i + 1:i + 1] = rows
    open(path, 'w', encoding='utf-8').write(''.join(lines))


def drop_item_rows(path, prefix, item):
    lines = open(path, encoding='utf-8').read().splitlines(keepends=True)
    keep = [l for l in lines if not (l.startswith(f'| {prefix}-') and item_row(l, item))]
    open(path, 'w', encoding='utf-8').write(''.join(keep))
    return len(lines) - len(keep)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--branch', required=True, help='the earlier child\'s backup branch (wip/child-…)')
    ap.add_argument('--item', required=True)
    ap.add_argument('--seed', required=True, help='the seed branch to create (wip/seed-…)')
    ap.add_argument('--extra', nargs='*', default=[], help='paths outside the record to copy from the branch (e.g. plat/bench/manifest.json)')
    ap.add_argument('--worktree', default=os.path.join(os.environ.get('SCRATCH', '/tmp'), 'seed'))
    ap.add_argument('--push', action='store_true')
    ap.add_argument('--apply-live', action='store_true', help='also replace the live tree\'s copies of the item with the seed\'s')
    ap.add_argument('--note', default='')
    ap.add_argument('--base', default='origin/main', help='the ref the seed is built on (J489: the design branch while it carries landings main lacks)')
    a = ap.parse_args()
    item, b, W = a.item, a.branch, a.worktree

    git('fetch', '-q', '--force', 'origin', f'+refs/heads/{b}:refs/remotes/origin/{b}', '+refs/heads/main:refs/remotes/origin/main')
    if a.base.startswith('origin/') and a.base != 'origin/main':
        git('fetch', '-q', '--force', 'origin', f'+refs/heads/{a.base[7:]}:refs/remotes/{a.base}')
    bhash = git('rev-parse', '--short', f'origin/{b}').strip()
    mhash = git('rev-parse', '--short', a.base).strip()
    if os.path.exists(W):
        git('worktree', 'remove', '--force', W, check=False)
    git('worktree', 'add', '-q', '--detach', W, a.base)

    # 2. the item's files from the branch
    rec_path = f'plat/docs/build/landed/{item}.json'
    rec_raw = show(f'origin/{b}', rec_path)
    if rec_raw is None:
        sys.exit(f'no record {rec_path} on {b}')
    rec = json.loads(rec_raw)
    overlaid, removed = [], []
    for f in rec['files']:
        p = f['path']
        dst = os.path.join(W, p)
        if f['status'] == 'deleted':
            if os.path.exists(dst):
                os.remove(dst)
                removed.append(p)
            continue
        blob = show(f'origin/{b}', p)
        if blob is None:
            sys.exit(f'{p} named by the record but absent on {b}')
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        open(dst, 'wb').write(blob)
        overlaid.append(p)
    for p in [rec_path] + list(a.extra):
        blob = show(f'origin/{b}', p)
        if blob is None:
            sys.exit(f'{p} absent on {b}')
        os.makedirs(os.path.dirname(os.path.join(W, p)), exist_ok=True)
        open(os.path.join(W, p), 'wb').write(blob)
        overlaid.append(p)
    print(f'overlaid {len(overlaid)} files, removed {len(removed)} (record lane {rec["lane"]}, dated {rec["date"][:16]})')

    # 3. the item's ledger rows
    renamed = []
    seed_rows = {}
    for path, prefix in LEDGERS:
        mine = open(os.path.join(W, path), encoding='utf-8').read()
        mine_lines = set(rows_of(mine, prefix))
        mine_ids = {row_id(l) for l in mine_lines}
        theirs = [l for l in rows_of(show(f'origin/{b}', path).decode('utf-8'), prefix) if item_row(l, item) and l not in mine_lines]
        if not theirs:
            seed_rows[path] = []
            continue
        free_ids = {row_id(l) for l in theirs if row_id(l) not in mine_ids}
        cand = next_free(mine, prefix)
        out = []
        for l in theirs:
            rid = row_id(l)
            if rid in mine_ids:
                while f'{prefix}-{cand:04d}' in free_ids:
                    cand += 1
                nid = f'{prefix}-{cand:04d}'
                cand += 1
                out.append(renum(l, rid, nid))
                renamed.append((rid, nid))
                holder = [x for x in mine_lines if row_id(x) == rid][0].split('|')[2 if prefix == 'L' else 3].strip()[:48]
                print(f'  {path}: {rid} -> {nid} (main holds {rid} under {holder!r})')
            else:
                out.append(l)
                print(f'  {path}: {rid} kept')
        insert_rows(os.path.join(W, path), prefix, out)
        seed_rows[path] = out
    cited = []
    if renamed:
        for p in overlaid:
            if p == rec_path:
                continue
            fp = os.path.join(W, p)
            try:
                t = open(fp, encoding='utf-8').read()
            except (UnicodeDecodeError, IsADirectoryError):
                continue
            t2 = t
            for old, new in renamed:
                t2 = re.sub(r'\b' + re.escape(old) + r'\b', new, t2)
            if t2 != t:
                open(fp, 'w', encoding='utf-8').write(t2)
                cited.append(p)
        print('citations followed in', len(cited), 'files:', ', '.join(os.path.basename(p) for p in cited))

    # 4. lane lines
    log_w = os.path.join(W, 'docs/lane-events.log')
    mine_log = set(open(log_w, encoding='utf-8').read().splitlines())
    theirs_log = [l for l in show(f'origin/{b}', 'docs/lane-events.log').decode('utf-8').splitlines() if l and l not in mine_log and lane_re(item).search(l)]
    stamp = time.strftime('%Y-%m-%d %H:%M', time.gmtime())
    ren_s = '; '.join(f'{o} -> {n}' for o, n in renamed) or 'none'
    session_line = (f'{stamp} {rec["lane"]} CHECKPOINT (the session, seeding the next continuation; the ID RULE) the item\'s files '
                    f'of {b} @ {bhash} (its last snapshot) overlaid on main {mhash}; ledger rows renumbered: {ren_s}'
                    + (f' (citations in {len(cited)} files follow)' if cited else '') + '; record re-landed by the session'
                    + (f'; {a.note}' if a.note else ''))
    with open(log_w, 'a', encoding='utf-8') as fh:
        for l in theirs_log:
            fh.write(l + '\n')
        fh.write(session_line + '\n')
    print(f'lane lines appended {len(theirs_log)} + the session line')

    # 5. re-land and verify
    out = sh(f'node tools/landed/landed.mjs {item} --lane {rec["lane"]} --wave flow-7', cwd=os.path.join(W, 'plat'))
    print('landed |', out.strip().splitlines()[-1][:200])
    out = sh(f'node tools/landed/verify.mjs flow-7 --item {item}', cwd=os.path.join(W, 'plat'))
    last = out.strip().splitlines()[-1]
    print('verify |', last[:200])
    if ' ok' not in last and not last.startswith('ok'):
        sys.exit('verify did not print ok')

    # 6. commit the seed branch
    git('checkout', '-q', '-B', a.seed, cwd=W)
    git('add', '-A', '--', 'plat', 'docs/lane-events.log', cwd=W)
    msg = (f'SEED {item}: main {mhash} + the item\'s unchecked files of {b} @ {bhash} (ids renumbered: {ren_s}); '
           f'the next continuation\'s OLD branch — never merge into main\n')
    git('commit', '-q', '-m', msg, cwd=W)
    shash = git('rev-parse', '--short', 'HEAD', cwd=W).strip()
    print('seed commit', shash, 'on', a.seed)
    if a.push:
        for i, wait in enumerate((0, 2, 4, 8, 16)):
            if wait:
                time.sleep(wait)
            r = subprocess.run(['git', '-C', W, 'push', '-q', '--force', 'origin', f'refs/heads/{a.seed}:refs/heads/{a.seed}'], capture_output=True, text=True)
            if r.returncode == 0:
                print('pushed', a.seed)
                break
        else:
            sys.exit('push failed after retries')

    # 7. the live tree
    if a.apply_live:
        for p in overlaid:
            src = os.path.join(W, p)
            dst = os.path.join(R, p)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            open(dst, 'wb').write(open(src, 'rb').read())
        for p in removed:
            if os.path.exists(os.path.join(R, p)):
                os.remove(os.path.join(R, p))
        for path, prefix in LEDGERS:
            dropped = drop_item_rows(os.path.join(R, path), prefix, item)
            if seed_rows.get(path):
                insert_rows(os.path.join(R, path), prefix, seed_rows[path])
            print(f'live {path}: dropped {dropped} stale rows, inserted {len(seed_rows.get(path, []))}')
        live_log = f'{R}/docs/lane-events.log'
        have = set(open(live_log, encoding='utf-8').read().splitlines())
        with open(live_log, 'a', encoding='utf-8') as fh:
            n = 0
            for l in theirs_log + [session_line]:
                if l not in have:
                    fh.write(l + '\n')
                    n += 1
        print('live lane lines appended', n)
        out = sh(f'node tools/landed/verify.mjs flow-7 --item {item}', cwd=f'{R}/plat', check=False)
        print('live verify |', out.strip().splitlines()[-1][:200] if out.strip() else '(no output)')
    git('worktree', 'remove', '--force', W, check=False)
    print(json.dumps({'seed': a.seed, 'hash': shash, 'main': mhash, 'branch': f'{b}@{bhash}', 'renamed': renamed, 'files': len(overlaid), 'laneLines': len(theirs_log) + 1}))


if __name__ == '__main__':
    main()
