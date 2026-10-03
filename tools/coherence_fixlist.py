#!/usr/bin/env python3
"""Write the coherence pass's open findings as the build-time fix list (owner, J129: build after the round-0 verification;
the findings are noted and resolved as the build reaches them).

  python3 tools/coherence_fixlist.py

Reads docs/validation/coherence/driver/state.json (the round-0 sweep's issues with their owners normalised, the
operator findings included) and writes:
  docs/validation/coherence/fix-list.md   every open finding, by unit and severity, with a plain-language head
  plat/docs/build/open-design-findings.md the findings that touch what M0 builds (the kernel, determinism, the records
                                          the kernel and the digest need, tests, packages, the build plan and the
                                          clean room), for implementer-side seats: design text only, no reference to
                                          the research side of §17.1's firewall
"""
import json, os, re
from collections import Counter, defaultdict

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATE = os.path.join(BASE, 'docs', 'validation', 'coherence', 'driver', 'state.json')
OUT = os.path.join(BASE, 'docs', 'validation', 'coherence', 'fix-list.md')
BUILD = os.path.join(BASE, 'plat', 'docs', 'build', 'open-design-findings.md')
ORDER = ['model', 'kernel', 'pipeline', 'determinism', 'rendering', 'scope'] + [f'V{i:02d}' for i in range(1, 13)]
SEV = ['blocker', 'major', 'minor']
NAMES = {'model': 'base §2 (domain model)', 'kernel': 'base §3 (geometry kernel)', 'pipeline': 'base §4, §10, Parts II–III (generation)',
         'determinism': 'base §5–§7 (failure handling, determinism, editing)', 'rendering': 'base §8, §9, §11, §12 (rendering, labels, export, budgets)',
         'scope': 'base summary, §0, §1, §13–§17 (scope, tests, packages, plan, clean room)', 'V01': 'V01 neighbourhoods', 'V02': 'V02 buildings',
         'V03': 'V03 interiors', 'V04': 'V04 underground', 'V05': 'V05 sky', 'V06': 'V06 evolution', 'V07': 'V07 village', 'V08': 'V08 SettlementForge',
         'V09': 'V09 application', 'V10': 'V10 clerk', 'V11': 'V11 content', 'V12': 'V12 calibration'}
# research-side paths and names an implementer-side file must not carry (§17.1 (1))
FIREWALL = re.compile(r'research/|captures/|reference/|partitioned/|docs/confidence|docs/improvements|CONFIDENCE\.md|IMPROVEMENTS\.md|findings?/|_critic|red-?team|fable-review|retrovalidation', re.I)
M0_TEXT = re.compile(r'§3\b|§3\.\d|§6\b|§6\.\d|§13|§14|§16|§17|§12\.4|\bM0\b|kernel|dmath|digest|stream key|lineage|xoshiro|Invariant|KernelTx|StageDecl', re.I)


def m0_relevant(i):
    return i['owner'] in ('kernel', 'determinism') or (i['owner'] in ('model', 'scope') and M0_TEXT.search(i['claim'] + ' ' + i['required_change'])) \
        or bool(re.search(r'\bM0\b|@plat/kernel|KernelTx|dmath', i['claim'] + ' ' + i['required_change']))


def row(i):
    cell = lambda t: str(t).replace('|', '\\|').replace('\n', ' ')
    return f"| {cell(i['id'])} | {i.get('severity', '')} | {cell(i.get('kind', ''))} | {cell(i['claim'])} | {cell(i['required_change'])} | {cell(i.get('reported_by', ''))} |"


def main():
    st = json.load(open(STATE))
    issues = st['work'] if st.get('work') else st['issues']
    by = defaultdict(list)
    for i in issues:
        by[i['owner']].append(i)
    sev = Counter(i.get('severity') for i in issues)
    head = [
        '# Fix list — the coherence pass\'s open findings, carried into the build',
        '',
        f'Owner ruling J129 (2026-10-03): the build starts after the round-0 verification; these findings are noted here and resolved as the build reaches the parts they concern. {len(issues)} open findings — {sev["blocker"]} blockers, {sev["major"]} major, {sev["minor"]} minor — from the round-0 full sweep (20 checking seats) plus the findings confirmed by hand (`OP-…`) and owner rule 114\'s changes (`G114-…`). None is fixed in the text yet.',
        '',
        '*In plain words.* The design was rewritten so that every fact lives in one place; then twenty checkers compared the new text with the old one and with each other. What they found is listed below, by the part of the design it is in. A **blocker** would make the generator behave wrongly or lose something; a **major** is a real gap or disagreement; a **minor** is tidying. Each row says what is wrong and exactly what the fix is.',
        '',
        '| part | blockers | major | minor | total |',
        '|---|---|---|---|---|',
    ]
    for u in ORDER:
        if by.get(u):
            c = Counter(i.get('severity') for i in by[u])
            head.append(f"| {NAMES[u]} | {c['blocker']} | {c['major']} | {c['minor']} | {len(by[u])} |")
    out = head + ['']
    for u in ORDER:
        if not by.get(u):
            continue
        out += [f'## {NAMES[u]} ({u})', '', '| id | severity | kind | what is wrong | the fix | reported by |', '|---|---|---|---|---|---|']
        out += [row(i) for i in sorted(by[u], key=lambda i: (SEV.index(i.get('severity', 'minor')) if i.get('severity') in SEV else 3, i['id']))]
        out.append('')
    open(OUT, 'w').write('\n'.join(out))
    m0 = [i for i in issues if m0_relevant(i)]
    clean = [i for i in m0 if not FIREWALL.search(i['claim'] + ' ' + i['required_change'])]
    held = len(m0) - len(clean)
    os.makedirs(os.path.dirname(BUILD), exist_ok=True)
    b = ['# Open design findings that touch M0',
         '',
         f'The architecture set has {len(issues)} open findings from its last verification (owner ruling J129: they are resolved as the build reaches them). These {len(clean)} touch what M0 builds — the kernel (§3), determinism (§6), the records the kernel and the digest need (§2), and the tests, packages, plan and clean room (§13, §14, §16, §17). The M0 build spec decides each one: resolved in the spec (the decision and its reason, under the owner\'s delegation), or not affecting M0. Design text only; {held} further M0 finding(s) that cite the research side of §17.1\'s firewall are held back from this file and resolved by a design seat.',
         '',
         '| id | severity | part | what is wrong | the fix |', '|---|---|---|---|---|']
    cell = lambda t: str(t).replace('|', '\\|').replace('\n', ' ')
    b += [f"| {cell(i['id'])} | {i.get('severity', '')} | {i['owner']} | {cell(i['claim'])} | {cell(i['required_change'])} |" for i in clean]
    open(BUILD, 'w').write('\n'.join(b) + '\n')
    print(f'{len(issues)} findings → {os.path.relpath(OUT, BASE)}; {len(clean)} for M0 (held back {held}) → {os.path.relpath(BUILD, BASE)}')


if __name__ == '__main__':
    main()
