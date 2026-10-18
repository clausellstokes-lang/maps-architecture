#!/usr/bin/env python3
"""Insert a J-row into docs/PROGRESS.md, apply HANDOFF replacements, commit the named files to main and push.

usage: jrow_commit.py <jrow.json> [extra paths to add...]
The JSON carries: row (the full table row), after (the marker of the row it follows, e.g. "| J309 |"),
handoff (a list of [old, new] exact replacements for docs/HANDOFF.md; each must occur exactly once),
commit2 (the commit subject; HASH placeholders are left as given), optional queue_after/queue_row for docs/M0-FIX-QUEUE.md.
"""
import json, subprocess, sys, time

ROOT = '/home/user/maps-architecture'
TRAILERS = ('\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>\n'
            'Claude-Session: https://claude.ai/code/session_016ixiawV2FqmQGBHKX7udzT\n')


def run(*args, check=True):
    r = subprocess.run(args, cwd=ROOT, capture_output=True, text=True)
    if check and r.returncode != 0:
        print(r.stdout, r.stderr)
        sys.exit(f'failed: {args}')
    return r.stdout


def insert_after(path, marker, row):
    s = open(path, encoding='utf-8').read()
    i = s.rfind('\n' + marker)
    assert i >= 0, f'{marker!r} not found in {path}'
    j = s.index('\n', i + 1)
    row = row if row.endswith('\n') else row + '\n'
    s = s[:j + 1] + row + s[j + 1:]
    open(path, 'w', encoding='utf-8').write(s)


def main():
    spec = json.load(open(sys.argv[1], encoding='utf-8'))
    extra = [a for a in sys.argv[2:] if not a.startswith('HASH=')]
    h = [a[5:] for a in sys.argv[2:] if a.startswith('HASH=')]
    if h:
        txt = json.dumps(spec).replace('HASH', h[0])
        spec = json.loads(txt)
    insert_after(f'{ROOT}/docs/PROGRESS.md', spec['after'], spec['row'])
    files = ['docs/PROGRESS.md']
    if spec.get('queue_row'):
        insert_after(f'{ROOT}/docs/M0-FIX-QUEUE.md', spec['queue_after'], spec['queue_row'])
        files.append('docs/M0-FIX-QUEUE.md')
    if spec.get('handoff'):
        p = f'{ROOT}/docs/HANDOFF.md'
        s = open(p, encoding='utf-8').read()
        for old, new in spec['handoff']:
            assert s.count(old) == 1, f'HANDOFF replacement occurs {s.count(old)} times: {old[:80]!r}'
            s = s.replace(old, new)
        open(p, 'w', encoding='utf-8').write(s)
        files.append('docs/HANDOFF.md')
    files += extra
    run('git', 'add', '--', *files)
    staged = run('git', 'diff', '--cached', '--name-only').split()
    assert sorted(staged) == sorted(files), f'staged {staged} != {files}'
    msg = spec['commit2'] + TRAILERS
    mp = sys.argv[1] + '.msg'
    open(mp, 'w', encoding='utf-8').write(msg)
    run('git', 'commit', '-q', '-F', mp)
    print('committed', run('git', 'log', '-1', '--format=%h %s').strip()[:120])
    for i, wait in enumerate((0, 2, 4, 8, 16)):
        if wait:
            time.sleep(wait)
        r = subprocess.run(['git', 'push', '-u', 'origin', 'main'], cwd=ROOT, capture_output=True, text=True)
        if r.returncode == 0:
            print('pushed', run('git', 'rev-parse', '--short', 'origin/main').strip())
            return
        if 'rejected' in r.stderr or 'fetch first' in r.stderr:
            run('git', 'fetch', 'origin', 'main')
            m = subprocess.run(['git', 'merge', '--no-edit', 'origin/main'], cwd=ROOT, capture_output=True, text=True)
            print('merged after rejection:', m.returncode, m.stdout[-200:], m.stderr[-200:])
        else:
            print('push failed:', r.stderr[-300:])
    sys.exit('push failed after retries')


if __name__ == '__main__':
    main()
