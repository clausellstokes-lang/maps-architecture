#!/usr/bin/env python3
"""The WATCH SEAT's whole job (J714): read the live children's backup branches and say QUIET or ALERT.

usage: watch_children.py [--table FILE] [--repo DIR] [--now EPOCH] [--no-fetch]

The managing seat keeps workflows/lane-prompts/session-seats/children/live.json on the design branch:
  {"parent": "session_…", "design_branch": "claude/…", "silent_minutes": 90, "terminal_minutes": 45,
   "children": [{"letter": "CW", "session": "session_…", "branch": "wip/child-a06s8e", "created": "2026-11-09T20:40:04Z",
                 "lanes": ["build/M0-a-06-fix-s8", "check/M0-a-06-close-s8"]}]}
A child is in the table from its creation until the managing seat has landed (or re-launched) its round.

For each child the script fetches its branch and reads (a) the newest snapshot commit's time and (b) the newest line of
its lanes in docs/lane-events.log written after its creation. It prints one line per child and then exactly one verdict:
  QUIET  — every child has a sign of life inside the silent window and no terminal line is waiting too long;
  ALERT  — a child is SILENT (no snapshot and no lane line for silent_minutes; before its first snapshot the window runs
           from its creation), or a TERMINAL line (the last lane's LANDED, or a FAIL / BLOCKED on any lane) has stood for
           terminal_minutes while the child is still in the table (the hand-back was lost, or the managing seat is asleep).
           A later round of a listed lane (…-s2 after …-s1: a fix round and its re-check) counts as that lane, so a check
           that LANDED a FAIL is terminal only until the fix round's first line.
The watch seat (a cheap session woken hourly) sends the ALERT lines to the parent and does nothing else: no judgment here.
It never writes to the repository. Times are UTC (the containers' clock; the lane lines carry no zone).
"""
import argparse, calendar, json, re, subprocess, sys, time

TABLE = 'workflows/lane-prompts/session-seats/children/live.json'


def git(repo, *a):
    r = subprocess.run(['git', '-C', repo, *a], capture_output=True, text=True)
    return r.returncode, r.stdout, r.stderr


def epoch(s, fmt):
    return calendar.timegm(time.strptime(s, fmt))


def same_lane(line_lane, listed):
    """A lane line belongs to a listed lane when it is that lane or a LATER ROUND of it: a workflow whose first check
    fails goes on under the next round's keys (build/<id>-fix-s2, check/<id>-close-s2 after …-s1; J733: child DC's fix
    round was read as silence after a terminal line). The family is the lane's name without its trailing number."""
    if line_lane == listed:
        return True
    a = re.match(r'(.*?)(\d+)$', line_lane)
    b = re.match(r'(.*?)(\d+)$', listed)
    return bool(a and b and a.group(1) == b.group(1) and int(a.group(2)) >= int(b.group(2)))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--repo', default='/home/user/maps-architecture')
    ap.add_argument('--table', default='', help='a local table file (default: the design branch\'s copy, read from origin)')
    ap.add_argument('--design', default='claude/great-galileo-b4mzbq')
    ap.add_argument('--now', type=int, default=0)
    ap.add_argument('--no-fetch', action='store_true')
    a = ap.parse_args()
    now = a.now or int(time.time())
    if a.table:
        table = json.load(open(a.table, encoding='utf-8'))
    else:
        if not a.no_fetch:
            git(a.repo, 'fetch', '-q', 'origin', f'+refs/heads/{a.design}:refs/remotes/origin/{a.design}')
        rc, out, err = git(a.repo, 'show', f'origin/{a.design}:{TABLE}')
        if rc != 0:
            print(f'ALERT the table {TABLE} cannot be read from origin/{a.design}: {err.strip()[:200]}')
            return
        table = json.loads(out)
    silent = int(table.get('silent_minutes', 90)) * 60
    terminal = int(table.get('terminal_minutes', 45)) * 60
    kids = table.get('children', [])
    alerts = []
    stamp = time.strftime('%Y-%m-%d %H:%MZ', time.gmtime(now))
    for k in kids:
        letter, branch, lanes = k['letter'], k['branch'], k['lanes']
        created = epoch(k['created'], '%Y-%m-%dT%H:%M:%SZ')
        if not a.no_fetch:
            git(a.repo, 'fetch', '-q', 'origin', f'+refs/heads/{branch}:refs/remotes/origin/{branch}')
        rc, out, _ = git(a.repo, 'log', '-1', '--format=%ct', f'origin/{branch}')
        snap = int(out.strip()) if rc == 0 and out.strip() else 0
        if snap and snap < created:  # a stale ref of an earlier child on the same name: not this child's
            snap = 0
        last_line, last_t, term = '', 0, None
        if snap:
            rc, log, _ = git(a.repo, 'show', f'origin/{branch}:docs/lane-events.log')
            for line in log.splitlines() if rc == 0 else []:
                m = re.match(r'(\d{4}-\d\d-\d\d \d\d:\d\d) (\S+) (LANDED|CHECKPOINT|BLOCKED|FAIL)\b', line)
                if not m or not any(same_lane(m.group(2), ln) for ln in lanes):
                    continue
                t = epoch(m.group(1), '%Y-%m-%d %H:%M')
                if t < created - 60:
                    continue
                last_line, last_t = line, t
                kind = m.group(3)
                if kind in ('BLOCKED', 'FAIL') or (kind == 'LANDED' and same_lane(m.group(2), lanes[-1])):
                    term = (t, line)
                elif term and kind == 'CHECKPOINT':
                    term = None  # work went on after it (a further round, a re-check)
        life = max(snap, last_t, created)
        age = (now - life) // 60
        desc = (f'{letter} {branch}: snapshot {time.strftime("%H:%MZ", time.gmtime(snap)) if snap else "none yet"}, '
                f'last lane line {last_line[:16] + "Z " + " ".join(last_line.split()[2:4]) if last_line else "none yet"}, {age} min since a sign of life')
        print(desc)
        if term and now - term[0] > terminal:
            alerts.append(f'{letter} ({k["session"]}, {branch}) TERMINAL line standing {(now - term[0]) // 60} min with the child still in the table: {term[1][:260]}')
        elif not term and now - life > silent:
            alerts.append(f'{letter} ({k["session"]}, {branch}) SILENT {age} min (no snapshot commit and no lane line; last: {last_line[:200] or "nothing since its creation"})')
    if alerts:
        for x in alerts:
            print(f'ALERT {stamp} {x}')
    else:
        print(f'QUIET {stamp} {len(kids)} child(ren) in the table')


if __name__ == '__main__':
    main()
