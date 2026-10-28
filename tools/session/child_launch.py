#!/usr/bin/env python3
"""Render a CHILD cloud session's creation arguments (title, prompt, append_system_prompt, source, model, tools) from
the round's variables, in the shape tools/session/child-recipe.md binds the child to (J343's generic standing rule;
J489's lesson: source_url + source_revision are mandatory or the child has no repository).

usage: child_launch.py --letter BB --id M0-c-02 --tag s5 --new wip/child-c02s5 --from 5 --state "..." [--old BRANCH]
       [--lane default|flow|consolidate] [--fromdisk yes|no] [--check-model opus|fable] [--build-model opus|sonnet]
       [--old-count N] [--extra-setup "..."] [--handback-notes "..."] [--window-reset "2026-10-25 23:10Z"]
       [--head HASH] [--parent SESSION] [--out FILE.json]

Prints the JSON the parent pastes into create_session (or writes it with --out). The spec entry for the round must
already be in workflows/lane-prompts/session-fix-cloud/specs.json (tools/session/hardening_spec.py appends it); the
rulings live in that entry's "session" clause, so STATE stays short: where the round stands and what it opens on.
"""
import argparse, json, sys

REPO = 'https://github.com/clausellstokes-lang/maps-architecture'
BRANCH = 'claude/great-galileo-b4mzbq'
PARENT = 'session_01UZr7HWSaSZAuvVxtBo6UtD'
R = '/home/user/maps-architecture'


def lanes(id_, lane, from_):
    n = from_
    if lane == 'flow':
        b = f'build/{id_}' if n == 0 else f'build/{id_}-fix{n}'
        c = f'check/{id_}' if n == 0 else f'check/{id_}-close-r{n}'
        v = f'plat/docs/build/checks/{id_}.md'
    elif lane == 'consolidate':
        b, c, v = f'build/{id_}-consolidate-{n}', f'check/{id_}-consolidate-close-{n}', f'plat/docs/build/checks/{id_}-c{n}.md'
    else:
        b, c, v = f'build/{id_}-fix-s{n}', f'check/{id_}-close-s{n}', f'plat/docs/build/checks/{id_}-s{n}.md'
    return b, c, v


def standing_rule(parent):
    return (
        "You are a CHILD cloud session of the Maps programme. The repository's tools/session/child-recipe.md and "
        "tools/session/child-resume-2026-10-20.md are binding on you, together with the parent's prompt. Standing rules: never push "
        f"to main or to the design branch {BRANCH}; never open, touch or merge a pull request; never force-push any branch except "
        "the backup branch the parent's current instructions name for your current round; never edit plat/ yourself and never run "
        "git for the seats (the seats run no git); never message a running workflow seat; keep your own turns few and cheap (no large "
        "file reads, no polling, no sleeps waiting for the workflow — its completion notification wakes you); if a setup step fails "
        f"after three honest, different attempts, send the parent the error and stop. Your parent is {parent}; every report goes to it "
        "by the claude-code-remote send_message tool, and after the hand-back you stop until the parent writes."
    )


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--letter', required=True)
    ap.add_argument('--id', required=True)
    ap.add_argument('--tag', required=True, help='the round file tag: s5, c1, f0')
    ap.add_argument('--new', required=True, help='the child\'s own backup branch, e.g. wip/child-c02s5')
    ap.add_argument('--from', dest='from_', type=int, required=True)
    ap.add_argument('--state', required=True, help='where the round stands and what it opened on (one paragraph)')
    ap.add_argument('--old', default='', help='the earlier child\'s or seed branch (a resumed round or a continuation)')
    ap.add_argument('--old-count', type=int, default=0, help='the lane-line count the OLD overlay must reach')
    ap.add_argument('--lane', default='default', choices=['default', 'flow', 'consolidate'])
    ap.add_argument('--fromdisk', default='no', choices=['yes', 'no'])
    ap.add_argument('--check-model', default='opus', choices=['opus', 'fable'])
    ap.add_argument('--check-effort', default='xhigh', choices=['high', 'xhigh', 'max'])  # J624: the opus check seat one step up
    ap.add_argument('--build-model', default='opus', choices=['opus', 'sonnet'])
    ap.add_argument('--extra-setup', default='', help='a setup addition after the step-1 overlay (e.g. a file restored from the design branch)')
    ap.add_argument('--handback-notes', default='machine id, the fitted args, any restart or relaunch, every REPORTED row, whether landed:verify printed ok')
    ap.add_argument('--window-reset', required=True, help='e.g. "2026-10-25 23:10Z"')
    ap.add_argument('--head', default='', help='the design branch head the child should see (or later)')
    ap.add_argument('--parent', default=PARENT)
    ap.add_argument('--short', default='', help='a short description for the title')
    ap.add_argument('--out', default='')
    a = ap.parse_args()

    short_id = a.id.replace('M0-', '')
    brief = f'prompts-{short_id}{a.tag}.json'
    buildlane, checklane, verdict = lanes(a.id, a.lane, a.from_)
    seats = {
        'build': {'model': a.build_model, 'effort': 'low' if a.build_model == 'sonnet' else 'high'},
        'fix': {'model': 'opus', 'effort': 'high'},
        'check': {'model': a.check_model, 'effort': a.check_effort},
        'recheck': {'model': 'opus', 'effort': 'medium'},
    }
    lane_arg = 'default (omit the "lane" key in the Workflow args)' if a.lane == 'default' else f'{a.lane} (pass "lane": "{a.lane}" in the Workflow args)'
    if a.old:
        old = (f"OLD = {a.old} — the recipe's step-1 overlay (`rm -rf $R/plat && git -C $R checkout origin/{a.old} -- plat docs/lanes.json`, "
               f"the branch's lane lines the log lacks appended, `git -C $R reset -q`)."
               + (f" {a.extra_setup}" if a.extra_setup else ''))
        old_check = (f" After the step-1 overlay `grep -c -E \"{buildlane}|{checklane}\" $R/docs/lane-events.log` is ≥ {a.old_count}."
                     if a.old_count else '')
        verify = ("Step 3's `corepack pnpm landed:verify -- flow-7 --item " + a.id + "` must print ok" if a.fromdisk == 'yes' else
                  "Step 3's `corepack pnpm landed:verify -- flow-7 --item " + a.id + "` may print FAIL on files the earlier seat changed after its record — expected, note it, continue")
    else:
        old = "OLD = none (a FRESH round: the tree is the design branch as cloned; nothing to overlay)." + (f" {a.extra_setup}" if a.extra_setup else '')
        old_check = ''
        verify = ("Step 3's `corepack pnpm landed:verify -- flow-7 --item " + a.id + "` must print ok (the item's landed record matches the tree); "
                  "if it does not, stop and report")
    fromdisk = ('yes (the round\'s BUILD already LANDED; the build seat returns from disk under the RESUME RULE)' if a.fromdisk == 'yes'
                else 'no (a real build)')
    head = f" (its head {a.head} or later)" if a.head else ''
    prompt = f"""You are child {a.letter} of the Maps programme's managing session (the parent: {a.parent}, Fable 5.1, on this account). The repository is cloned at {R} on the design branch{head}. Read {R}/tools/session/child-recipe.md and {R}/tools/session/child-resume-2026-10-20.md WHOLE first; both are binding. Then run the recipe's setup steps 1–7 with these variables:

LETTER = {a.letter}
ID = {a.id}
TAG = {a.tag}
{old}
NEW = {a.new}
FROM = {a.from_}
LANE = {lane_arg}
BRIEF = {brief}
FROMDISK = {fromdisk}
SEATS = {json.dumps(seats)}  (J390 / J394 / J624)
BUILDLANE / CHECKLANE = {buildlane} / {checklane}.{old_check} Before launching, echo the rendered brief's two lane keys and confirm they equal these.
VERDICT = {verdict}
STATE = {a.state} The spec entry {a.id} {a.tag.upper()} in workflows/lane-prompts/session-fix-cloud/specs.json is binding (its "session" clause carries the session's rulings for the round; read it whole in the rendered brief). maxRounds 3.

Deltas you must honour (child-resume-2026-10-20.md): the base is the DESIGN BRANCH origin/{BRANCH} (`git -C $R fetch origin {BRANCH} && git -C $R checkout -q -B main origin/{BRANCH}`{', then the OLD overlay as step 1 says' if a.old else ''}); the scratch for step 4's args is /home/user/maps-scratch/waves (mkdir -p; never the session scratchpad); rsync is absent (cp -a or tar for mirrors); never run pnpm install at the project root. {verify}. Node 24.12.0 per step 2 (the container ships 22). Machine id expected of the class linux:Intel(R) Xeon(R) Processor[ @ <clock>]:4cpu:16gib; if the core or memory counts differ, fit the args to this machine anyway and say so.

The window: this account's five-hour window resets at {a.window_reset}, then five hours after each window's first use. If the seats die of "You've hit your session limit": snapshot once when you can and WAIT — the parent messages the resume after the reset (TaskStop the dead run; confirm the machine id; relaunch step 5 with the same args and the same FROM; restart the snapshot loop; one hand-back). If your container restarts (/home/user/maps-scratch survives, /tmp does not): re-check Node 24 and the install, confirm the machine id, re-render only if it changed, relaunch step 5 with the same args, restart the snapshot loop, and say so in the hand-back; after a second restart, snapshot, message the parent and stop.

Hand-back (step 7): ONE send_message to {a.parent} in the recipe's format ("HAND-BACK child {a.letter} {a.id} {a.tag}: workflow <ok, rounds, built.status, check.verdict, failing_lines count>; LANDED lines: <the build and check LANDED lines>; verdict file {verdict}; records <the landed/*.json names>; branch {a.new} @ <hash> (final snapshot <time>Z); notes: {a.handback_notes}"), then stop. Use absolute paths and `git -C` in every command; never a bare cd in a parallel call. Your own turns run on Opus 5.5; keep them few."""
    title = f"Maps child {a.letter}: {buildlane} ({a.id} {a.tag.upper()}{', ' + a.short if a.short else ''})"
    out = {
        'title': title,
        'prompt': prompt,
        'append_system_prompt': standing_rule(a.parent),
        'source_url': REPO,
        'source_revision': BRANCH,
        'model': 'claude-opus-5-5',
        'extra_allowed_tools': ['Workflow', 'mcp__claude-code-remote__send_message'],
    }
    text = json.dumps(out, ensure_ascii=False, indent=1)
    if a.out:
        open(a.out, 'w', encoding='utf-8').write(text + '\n')
        print(f'{a.out}: {len(prompt)} chars of prompt; lanes {buildlane} / {checklane}; brief {brief}; verdict {verdict}')
    else:
        print(text)


if __name__ == '__main__':
    main()
