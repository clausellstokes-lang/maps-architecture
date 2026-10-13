#!/usr/bin/env python3
"""Transplant a child's finished round from its WIP branch onto the live tree (HANDOFF step 2 + 6; the ID RULE).

usage:
  land_child.py inspect --branch wip/child-x02c1 --item M0-x-02 --owns <path>... --checks <checks file>...
  land_child.py land    --branch ... --item ... --owns ... --checks ... --records <name>=<lane>[=<owns>]... \
                        --busy-file <busy.txt> --msg <commit message file> [--extra-records a,b]

inspect prints the branch head, the new lane lines, the colliding ledger rows, the records and the verdict head.
land overlays the owns, the checks files and the records from the branch (per file), appends the lane lines main lacks,
renumbers the colliding CLEAN-ROOM / choices rows (the verbatim transplant note), re-lands and verifies the records,
removes the item from the busy list, plans and stages with flow_stage, and commits with the message file.
Every step stops the script on its first failure; nothing is pushed here.
"""
import argparse, json, os, re, subprocess, sys

R = '/home/user/maps-architecture'
NOTE = ' Renumbered from {old} (collision) by the session at the cloud transplant. |'


def git(*a, check=True):
    r = subprocess.run(['git', '-C', R, *a], capture_output=True, text=True)
    if check and r.returncode != 0:
        sys.exit(f'git {" ".join(a)} failed: {r.stderr.strip()[:400]}')
    return r.stdout


def show(branch, path):
    return git('show', f'origin/{branch}:{path}', check=False)


def run(cmd, cwd=R):
    r = subprocess.run(cmd, cwd=cwd, shell=True, capture_output=True, text=True)
    return r.returncode, (r.stdout + r.stderr)


def ledger_rows(text, prefix):
    return [l for l in text.splitlines(keepends=True) if l.startswith(f'| {prefix}-')]


def row_id(line):
    return line.split('|')[1].strip()


def new_rows(branch, path, prefix):
    mine = open(f'{R}/{path}', encoding='utf-8').read()
    mine_ids = {row_id(l) for l in ledger_rows(mine, prefix)}
    mine_lines = set(ledger_rows(mine, prefix))
    out = []
    for l in ledger_rows(show(branch, path), prefix):
        if l in mine_lines:
            continue
        out.append((row_id(l), row_id(l) in mine_ids, l))
    return out


def next_id(path, prefix):
    mine = open(f'{R}/{path}', encoding='utf-8').read()
    ids = [int(row_id(l).split('-')[1]) for l in ledger_rows(mine, prefix)]
    return max(ids) + 1


def renum(row, old, new):
    assert row.startswith(f'| {old} |'), row[:30]
    r = f'| {new} |' + row[len(f'| {old} |'):]
    r = r.rstrip('\n')
    assert r.endswith(' |'), r[-40:]
    return r[:-2] + NOTE.replace('{old}', old) + '\n'


def insert_rows(path, prefix, rows):
    """Insert rows after the last existing row of the ledger's table (never at EOF)."""
    p = f'{R}/{path}'
    mine = open(p, encoding='utf-8').read().splitlines(keepends=True)
    idx = [k for k, l in enumerate(mine) if l.startswith(f'| {prefix}-')]
    i = idx[-1]
    mine[i + 1:i + 1] = rows
    open(p, 'w', encoding='utf-8').write(''.join(mine))


def lane_lines_missing(branch):
    mine = set(open(f'{R}/docs/lane-events.log', encoding='utf-8').read().splitlines())
    return [l for l in show(branch, 'docs/lane-events.log').splitlines() if l and l not in mine]


def overlay_paths(args):
    paths = list(args.owns) + list(args.checks)
    for rec in args.records:
        name = rec.split('=')[0]
        paths.append(f'plat/docs/build/landed/{name}.json')
    return paths


def inspect(args):
    b = args.branch
    git('fetch', '-q', '--force', 'origin', f'+refs/heads/{b}:refs/remotes/origin/{b}')
    print('head', git('log', '-1', '--format=%h %cd %s', '--date=format:%H:%MZ', f'origin/{b}').strip()[:120])
    missing = lane_lines_missing(b)
    print(f'=== lane lines main lacks: {len(missing)}')
    for l in missing:
        if ' LANDED ' in l or 'FAIL' in l or 'blocked' in l:
            print('  ', l[:240])
    for path, prefix in (('plat/CLEAN-ROOM.md', 'L'), ('plat/docs/build/choices.md', 'C')):
        rows = new_rows(b, path, prefix)
        print(f'=== {path}: {len(rows)} new rows on the branch (next free {prefix}-{next_id(path, prefix):04d})')
        for rid, collides, l in rows:
            print('  ', rid, 'COLLIDES' if collides else 'free', l[:100])
    print('=== records on the branch')
    for rec in args.records:
        name = rec.split('=')[0]
        t = show(b, f'plat/docs/build/landed/{name}.json')
        if not t:
            print('  ', name, 'ABSENT')
            continue
        d = json.loads(t)
        print('  ', name, '| lane', d.get('lane'), '| counts', d.get('counts'), '| appends',
              [(a['file'].split('/')[-1], a.get('ids')) for a in d.get('appends', [])])
    print('=== overlay: files differing from HEAD')
    diff = git('diff', '--name-only', 'HEAD', f'origin/{b}', '--', *overlay_paths(args)).split()
    for f in diff:
        print('  ', f)
    print('=== verdict head')
    for c in args.checks:
        t = show(b, c)
        head = [l for l in t.splitlines() if 'Verdict' in l or 'verdict' in l][:3]
        print('  ', c, '|', ' / '.join(h[:200] for h in head))


def land(args):
    b = args.branch
    git('fetch', '-q', '--force', 'origin', f'+refs/heads/{b}:refs/remotes/origin/{b}')
    assert not git('diff', '--cached', '--name-only').strip(), 'the index is not empty'
    # 1. overlay per file
    diff = git('diff', '--name-only', 'HEAD', f'origin/{b}', '--', *overlay_paths(args)).split()
    removed = 0
    removed_paths = []
    for f in diff:
        if subprocess.run(['git', '-C', R, 'cat-file', '-e', f'origin/{b}:{f}'], capture_output=True).returncode != 0:
            # the round deleted the file: remove it from the working tree (flow_stage stages the deletion the record names; L24)
            if os.path.exists(f'{R}/{f}'):
                os.remove(f'{R}/{f}')
            removed += 1
            removed_paths.append(f)
            continue
        git('checkout', f'origin/{b}', '--', f)
    git('reset', '-q')
    print('overlaid', len(diff) - removed, 'files, removed', removed)
    # 2. lane lines
    missing = lane_lines_missing(b)
    with open(f'{R}/docs/lane-events.log', 'a', encoding='utf-8') as fh:
        for l in missing:
            fh.write(l + '\n')
    print('lane lines appended', len(missing))
    # 3. ledger rows (renumber collisions, keep free ids)
    renamed = []
    for path, prefix in (('plat/CLEAN-ROOM.md', 'L'), ('plat/docs/build/choices.md', 'C')):
        rows = new_rows(b, path, prefix)
        if not rows:
            continue
        out = []
        for rid, collides, l in rows:
            if collides:
                nid = f'{prefix}-{next_id(path, prefix):04d}'
                # next_id reads the file; account for rows queued but not yet written
                nid = f'{prefix}-{next_id(path, prefix) + len(out):04d}'
                out.append(renum(l, rid, nid))
                renamed.append((rid, nid))
                print(f'  {path}: {rid} -> {nid}')
            else:
                out.append(l)
                print(f'  {path}: {rid} kept')
        insert_rows(path, prefix, out)
    # 3b. a renumbered choices id cited in the item's overlaid files or its checks files follows the row (the ID RULE)
    cmap = {old: new for old, new in renamed if old.startswith('C-')}
    if cmap:
        import re as _re
        for f in list(diff) + list(args.checks):
            fp = f'{R}/{f}'
            if not os.path.isfile(fp) or f.endswith('.json'):
                continue
            t = open(fp, encoding='utf-8').read()
            t2 = t
            for old, new in cmap.items():
                t2 = _re.sub(r'\b' + _re.escape(old) + r'\b', new, t2)
            if t2 != t:
                open(fp, 'w', encoding='utf-8').write(t2)
                print(f'  citation {f}: ' + ', '.join(f'{o} -> {n}' for o, n in cmap.items()))
    # 4. re-land and verify the records
    for rec in args.records:
        parts = rec.split('=')
        name, lane = parts[0], parts[1]
        owns = f' --owns {parts[2]}' if len(parts) > 2 else ''
        rc, out = run(f'corepack pnpm landed -- {name} --lane {lane} --wave flow-7{owns}', cwd=f'{R}/plat')
        last = out.strip().splitlines()[-1] if out.strip() else ''
        print('landed', name, '|', last[:160])
        if rc != 0:
            sys.exit(f'landed failed for {name}')
    for rec in args.records:
        name = rec.split('=')[0]
        rc, out = run(f'corepack pnpm landed:verify -- flow-7 --item {name}', cwd=f'{R}/plat')
        lines = [l for l in out.strip().splitlines() if 'ELIFECYCLE' not in l]
        print('verify', name, '|', (lines[-1] if lines else '')[:160])
        if rc != 0:
            sys.exit(f'verify failed for {name}')
    # 5. busy, plan, stage
    busy = [x for x in open(args.busy_file).read().strip().split(',') if x and x != args.item]
    busy_s = ','.join(busy)
    recs = ','.join(args.stage_records.split(',')) if args.stage_records else ''
    base = f'node {R}/tools/flow_stage.mjs --items {args.item}' + (f' --records {recs}' if recs else '') + f' --busy "{busy_s}" --label flow-7'
    rc, out = run(base)
    d = json.loads(out[out.index('{'):])
    print('plan problems:', d.get('problems'), '| records:', d.get('records'))
    if d.get('problems') != []:
        sys.exit('flow_stage reports problems; nothing staged')
    rc, out = run(base + ' --stage')
    d = json.loads(out[out.index('{'):])
    print('staged:', d.get('staged'), '| problems:', d.get('problems'))
    if d.get('problems') != []:
        sys.exit('flow_stage --stage reports problems')
    # L24: a file the round deleted that the flow-7 snapshot never held is absent from the record's deleted list, so
    # flow_stage cannot stage its deletion — the session stages it (git add -u on the path) before the commit.
    for f in removed_paths:
        git('add', '-u', '--', f)
        print('deletion staged (L24):', f)
    open(args.busy_file, 'w').write(busy_s + '\n')
    print(git('diff', '--cached', '--stat').strip().splitlines()[-1])
    # 6. commit
    git('commit', '-q', '-F', args.msg)
    print('landing commit', git('rev-parse', '--short', 'HEAD').strip())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('mode', choices=['inspect', 'land'])
    ap.add_argument('--branch', required=True)
    ap.add_argument('--item', required=True)
    ap.add_argument('--owns', nargs='+', required=True)
    ap.add_argument('--checks', nargs='*', default=[])
    ap.add_argument('--records', nargs='*', default=[], help='name=lane[=owns]')
    ap.add_argument('--stage-records', default='', help='the extra records flow_stage stages (comma list)')
    ap.add_argument('--busy-file')
    ap.add_argument('--msg')
    a = ap.parse_args()
    if a.mode == 'inspect':
        inspect(a)
    else:
        assert a.busy_file and a.msg
        land(a)


if __name__ == '__main__':
    main()
