#!/usr/bin/env python3
"""Render a CHILD cloud session's creation arguments for ONE stage-group INTEGRATION CHECK of flow-7 (J173; J695 (1):
the flow's build items are all landed, its integration checks g15–g18 are outstanding, run as child rounds in
render-int.mjs's form). The child follows tools/session/child-recipe.md's setup (the design branch as base, Node 24,
install, the args fitted to its machine) and then, instead of a build/check round, renders the integration checker's
prompt with workflows/lane-prompts/session-fix-cloud/render-int.mjs and runs it as one Opus/high seat through
workflows/52-integration-seat.js, snapshots to its NEW branch, and hands back once.

usage: int_launch.py --letter CP --group 15 --ids M0-x-04 --busy M0-a-06,M0-c-02,M0-c-04,M0-x-06 --new wip/child-intg15
       --state "..." --window-reset "2026-11-02 04:40Z" [--prev-lines FILE.json] [--head HASH] [--parent SESSION] [--out FILE.json]

Prints the JSON the parent pastes into create_session (or writes it with --out). The lane key is
check/integration-flow-7-g<group> (or -close for the re-check after an integration fix, when --prev-lines is given).
"""
import argparse, json

from child_launch import BRANCH, PARENT, R, REPO, standing_rule


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--letter', required=True)
    ap.add_argument('--group', required=True, type=int)
    ap.add_argument('--ids', required=True, help='the group\'s items, comma-separated, in the flow\'s order')
    ap.add_argument('--busy', default='', help='items being built, checked or fixed by other seats right now, comma-separated')
    ap.add_argument('--new', required=True, help='the child\'s own backup branch, e.g. wip/child-intg15')
    ap.add_argument('--state', required=True, help='the group\'s items, their passed checks and what the check opens on (one paragraph)')
    ap.add_argument('--prev-lines', default='', help='the previous integration check\'s failing lines (a JSON array file) — the re-check after an integration fix')
    ap.add_argument('--window-reset', required=True, help='e.g. "2026-11-02 04:40Z"')
    ap.add_argument('--head', default='', help='the design branch head the child should see (or later)')
    ap.add_argument('--parent', default=PARENT)
    ap.add_argument('--out', default='')
    a = ap.parse_args()

    g = a.group
    ids = [x for x in a.ids.split(',') if x]
    busy = [x for x in a.busy.split(',') if x]
    lane = f'check/integration-flow-7-g{g}' + ('-close' if a.prev_lines else '')
    verdict = f'plat/docs/build/checks/integration-g{g}.md'
    record = f'plat/docs/build/landed/check-integration-g{g}.json'
    out_json = f'$S/int-g{g}.json'
    prev_arg = f' "$(cat {a.prev_lines})"' if a.prev_lines else ''
    head = f' (its head {a.head} or later)' if a.head else ''
    prompt = f"""You are child {a.letter} of the Maps programme's managing session (the parent: {a.parent}, Fable 5.1, on this account). The repository is cloned at {R} on the design branch{head}. Read {R}/tools/session/child-recipe.md and {R}/tools/session/child-resume-2026-10-20.md WHOLE first; both are binding, with the ROUND REPLACED as below: this child runs ONE stage-group INTEGRATION CHECK of the flow flow-7 (J173; J695 (1)), not a build / check round — there is no spec entry, no BRIEF rendered by render.mjs, no FROM, no build seat.

LETTER = {a.letter}
GROUP = {g}; ITEMS = {json.dumps(ids)} (each already passed its own independent check); BUSY = {json.dumps(busy)} (items other seats are building, checking or fixing right now; their files are work in progress — a red there is a note, never the group's verdict).
OLD = none (the tree is the design branch as cloned; nothing to overlay).
NEW = {a.new}
LANE = {lane}
VERDICT = {verdict}; RECORD = {record} (landed with `corepack pnpm landed -- check-integration-g{g} --lane {lane} --wave flow-7 --owns {verdict}`, as the rendered prompt says).
STATE = {a.state}

Setup: the recipe's steps 1–4 unchanged (step 1 without OLD; step 3's landed:verify for EACH item of the group — `corepack pnpm landed:verify -- flow-7 --item <id>` must print ok for each, or stop and report; step 4 fits the args exactly as written: $S/args.fitted.json and $S/specs.json with "args" and "workflow" set — render.mjs's briefs are NOT needed and `node $S/render.mjs …` is skipped). Then step 5' (replaces step 5): render the integration checker's prompt ON THIS MACHINE, never copied:
`cp {R}/workflows/lane-prompts/session-fix-cloud/render-int.mjs $S/ && node $S/render-int.mjs $S/specs.json {g} {','.join(ids)} {','.join(busy)} {out_json}{prev_arg}` — it prints "{out_json}: {lane} (…)"; confirm the lane key it prints equals LANE, then launch with the Workflow tool (ultracode): scriptPath {R}/workflows/52-integration-seat.js, args {{"promptFile": "<the absolute path of {out_json}>", "group": "{g}", "lane": "{lane}", "seat": {{"model": "opus", "effort": "high"}}}}. Exactly that one seat; it runs in the background. Steps 6 (the snapshot loop to NEW; restart it every two hours until the hand-back) and 7 (the hand-back) unchanged, with the grep for the lane lines reading `grep -E "{lane}" $R/docs/lane-events.log | grep -E "LANDED|BLOCKED|FAIL" | cut -c1-400`.

Deltas you must honour (child-resume-2026-10-20.md): the base is the DESIGN BRANCH origin/{BRANCH} (`git -C $R fetch origin {BRANCH} && git -C $R checkout -q -B main origin/{BRANCH}`); the scratch for step 4's args is /home/user/maps-scratch/waves (mkdir -p; never the session scratchpad); rsync is absent (cp -a or tar for mirrors); never run pnpm install at the project root. Node 24.12.0 per step 2 (the container ships 22). Machine id expected of the class linux:Intel(R) Xeon(R) Processor[ @ <clock>]:4cpu:16gib; if the core or memory counts differ, fit the args to this machine anyway and say so.

The window: this account's five-hour window resets at {a.window_reset}, then five hours after each window's first use. If the seat dies of "You've hit your session limit": snapshot once when you can and WAIT — the parent messages the resume after the reset (TaskStop the dead run; confirm the machine id; relaunch step 5' with the same args; restart the snapshot loop; one hand-back). If your container restarts (/home/user/maps-scratch survives, /tmp does not): re-check Node 24 and the install, confirm the machine id, re-render only if it changed, relaunch step 5' with the same args (the RESUME RULE in the seat's prompt reads the lane log's CHECKPOINT lines), restart the snapshot loop, and say so in the hand-back; after a second restart, snapshot, message the parent and stop.

Hand-back (step 7): ONE send_message to {a.parent} in the recipe's format ("HAND-BACK child {a.letter} integration g{g}: workflow <ok, pass, failing_lines count>; LANDED lines: <the lane's LANDED line>; verdict file {verdict}; records check-integration-g{g}; branch {a.new} @ <hash> (final snapshot <time>Z); notes: machine id, the fitted args, any restart or relaunch, every note the checker wrote for the session, whether landed:verify printed ok for every item"), then stop. Use absolute paths and `git -C` in every command; never a bare cd in a parallel call. Your own turns run on Opus 5.5; keep them few."""
    title = f"Maps child {a.letter}: {lane} ({', '.join(x.replace('M0-', '') for x in ids)})"
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
        print(f'{a.out}: {len(prompt)} chars of prompt; lane {lane}; verdict {verdict}')
    else:
        print(text)


if __name__ == '__main__':
    main()
