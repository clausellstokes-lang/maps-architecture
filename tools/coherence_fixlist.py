#!/usr/bin/env python3
"""Write the build-time fix list (owner ruling J153: the coherence loop ends with check run r7y; every open finding is
noted and resolved as the build reaches the part it concerns).

  python3 tools/coherence_fixlist.py [--check-run r7y]

Sources (all on disk in docs/validation/coherence/):
  results/coherence_famverify-*-<run>.json   the last family check run: issues and held notes
  work/held-r8/<unit>.json                   the round-6 findings held for round 8
  adjudication-r7*.md                        the builders' valid choices (J151) and the fix passes' held notes
  J150's round-8 hand-offs and owner rule 127's changes (item 127, J152), written here
Writes:
  docs/validation/coherence/fix-list.md      everything, by unit and severity, with a plain-language head
  plat/docs/build/open-design-findings.md    the findings that touch M0 (the kernel, determinism, the records they need,
                                             tests, packages, the plan, the clean room), design text only, for
                                             implementer-side seats (§17.1's firewall)
"""
import glob, json, os, re, sys
from collections import Counter, defaultdict

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
C = os.path.join(BASE, 'docs', 'validation', 'coherence')
OUT = os.path.join(C, 'fix-list.md')
BUILD = os.path.join(BASE, 'plat', 'docs', 'build', 'open-design-findings.md')
RUN = sys.argv[sys.argv.index('--check-run') + 1] if '--check-run' in sys.argv else 'r7y'
ORDER = ['model', 'kernel', 'pipeline', 'determinism', 'rendering', 'scope'] + [f'V{i:02d}' for i in range(1, 13)]
SEV = ['blocker', 'major', 'minor']
NAMES = {'model': 'base §2 (domain model)', 'kernel': 'base §3 (geometry kernel)', 'pipeline': 'base §4, §10, Parts II–III (generation)',
         'determinism': 'base §5–§7 (failure handling, determinism, editing)', 'rendering': 'base §8, §9, §11, §12 (rendering, labels, export, budgets)',
         'scope': 'base summary, §0, §1, §13–§17 (scope, tests, packages, plan, clean room)', 'V01': 'V01 neighbourhoods', 'V02': 'V02 buildings',
         'V03': 'V03 interiors', 'V04': 'V04 underground', 'V05': 'V05 sky', 'V06': 'V06 evolution', 'V07': 'V07 village', 'V08': 'V08 SettlementForge',
         'V09': 'V09 application', 'V10': 'V10 clerk', 'V11': 'V11 content', 'V12': 'V12 calibration'}
FIREWALL = re.compile(r'research/|captures/|reference/|partitioned/|docs/confidence|docs/improvements|CONFIDENCE\.md|IMPROVEMENTS\.md|findings?/|_critic|red-?team|fable-review|retrovalidation', re.I)
M0_TEXT = re.compile(r'§3\b|§3\.\d|§6\b|§6\.\d|§13|§14|§16|§17|§12\.4|\bM0\b|kernel|dmath|digest|stream key|lineage|xoshiro|Invariant|KernelTx|StageDecl', re.I)


def norm_owner(o):
    t = str(o or '').strip()
    if t in ORDER:
        return t
    low = t.lower()
    for k in ORDER[:6]:
        if low.startswith(k):
            return k
    m = re.search(r'V\s*0?(\d{1,2})', t.upper())
    if m and 1 <= int(m.group(1)) <= 12:
        return f'V{int(m.group(1)):02d}'
    return 'scope'


def cell(t):
    return str(t).replace('|', '\\|').replace('\n', ' ')


def main():
    items, notes = [], []
    # A. the last family check run
    for f in sorted(glob.glob(os.path.join(C, 'results', f'coherence_famverify-*-{RUN}.json'))):
        d = json.load(open(f))
        lens = d['key'].split('famverify-')[1].rsplit('-', 1)[0]
        for i in d.get('issues', []):
            items.append(dict(i, owner=norm_owner(i.get('owner')), source=f'family check {RUN} ({lens})'))
        for n in d.get('held_notes', []):
            notes.append({'source': f'family check {RUN} ({lens})', 'site': n.get('site', ''), 'note': n.get('note', '')})
    checks = len(glob.glob(os.path.join(C, 'results', f'coherence_famverify-*-{RUN}.json')))
    # B. the round-6 findings held for round 8
    for f in sorted(glob.glob(os.path.join(C, 'work', 'held-r8', '*.json'))):
        unit = os.path.basename(f)[:-5]
        for i in json.load(open(f)):
            items.append(dict(i, owner=norm_owner(i.get('owner') or unit), source='round 6, held for round 8'))
    # C, D. the builders' valid choices and the fix passes' held notes, as the adjudications state them
    choices, held = [], []
    for f in sorted(glob.glob(os.path.join(C, 'adjudication-r7*.md'))):
        text = open(f).read()
        name = os.path.basename(f)
        for m in re.finditer(r'^(#+)\s*(.*?(?:held for the next full round|Held for the next full round|held notes).*)$', text, re.M | re.I):
            level, start = len(m.group(1)), m.end()
            nxt = re.search(rf'^#{{1,{level}}}\s', text[start:], re.M)
            body = text[start:start + nxt.start()] if nxt else text[start:]
            if body.strip():
                held.append((name, m.group(2).strip(), body.strip()))
        for line in text.splitlines():
            if re.search(r'valid choice|builder picks|builders.{0,3} choice', line, re.I) and re.search(r'VF7\w*-[A-Z]+-\d+', line):
                choices.append((name, line.strip()))
    # E. J150's round-8 hand-offs
    handoffs = [
        "The two-axis lock (placement and shape, J147) and every reader of it outside the raised-way × wall family (J150: Part A hand-off to round 8).",
        "Lock behaviour under undo, redo, a re-grade or a value edit within a standing meeting, and a repair (J150: designed in round 8).",
    ]
    # F. owner rule 127's changes (J152), one per home unit
    g127 = {
        'model': "§2.8's suppression bullet ('Removals that hold') and §2.7's raised-way support step where it states the removal",
        'determinism': "§7.1's delete dry run and §7.4's lifecycle rows (the reason-keyed suppression); §7.6 and §7.8 lack the switch rows",
        'pipeline': "every stage that builds a listed kind reads no switch and skips suppressed keys counted as filled",
        'scope': "§13.2 lacks item 127 (e)'s bars",
        'V04': "the underground's optional systems are not on the switch list",
        'V05': "an island's or sky access's removal holds a slot counted as filled",
        'V06': "§2.13's ledger carries `suppressed`; §3.19 skips suppressed keys against the caps",
        'V07': "the kinds a village builds by itself have no switches",
        'V08': "the switches are not stated as map-side settings never written to the dossier",
        'V09': "§4.14 has the single 'Raised ways the town builds by itself' row; §4.20.3's delete and the history row say the town won't rebuild",
        'V10': "the clerk cannot answer 'why is there no …?' with a switch; its removal lines say the town won't rebuild",
        'V11': "no switch rows or defaults for the kinds the town builds by itself",
        'V12': "no bars for item 127 (e)",
    }
    for u, claim in g127.items():
        items.append({'id': f'G127-{u}-01', 'severity': 'major', 'kind': 'F-MISSING', 'owner': u, 'source': 'owner rule 127 (J152)',
                      'claim': f'Owner rule 127 (the "Built by the town" switch list; delete-for-now) is not applied: {claim}.',
                      'required_change': "Apply item 127's part for this unit as its HOMES state ((a) the comprehensive list from an enumeration over the set, (b) the switch, (c) delete-for-now replacing the removal that holds through regeneration, (d) the words, (e) the bars), when the build reaches this part."})
    by = defaultdict(list)
    for i in items:
        by[i['owner']].append(i)
    sev = Counter(i.get('severity') for i in items)
    src = Counter(i['source'].split(' (')[0] for i in items)
    out = ['# Fix list — the coherence pass\'s open findings, carried into the build', '',
           f'Owner ruling J153 (2026-10-03): the coherence pass ends with family check run {RUN}; what is still open is listed here and fixed as the build reaches the part it concerns. {len(items)} open findings — {sev["blocker"]} blockers, {sev["major"]} major, {sev["minor"]} minor — plus {len(choices)} builders\' valid choices, {len(notes) + len(held)} held notes and {len(handoffs)} round-8 hand-offs. Sources: {", ".join(f"{k} {v}" for k, v in src.items())}; the family check run had {checks} of 6 checks on disk when this list was written.',
           '',
           '*In plain words.* Seven rounds of checking and fixing brought the design from 501 findings to the few below. The owner chose to stop the rounds and start building; each remaining item says what is wrong and exactly what the fix is, and is fixed when the build reaches that part of the design. A **blocker** would make the generator behave wrongly; a **major** is a real gap or a place where two builders would build different things; a **minor** changes nothing that is built or tested. A **valid choice** is a case where every reading the design allows gives a correct map: the builder picks one and records it.',
           '', '| part | blockers | major | minor | total |', '|---|---|---|---|---|']
    for u in ORDER:
        if by.get(u):
            c = Counter(i.get('severity') for i in by[u])
            out.append(f"| {NAMES[u]} | {c['blocker']} | {c['major']} | {c['minor']} | {len(by[u])} |")
    out.append('')
    for u in ORDER:
        if not by.get(u):
            continue
        out += [f'## {NAMES[u]} ({u})', '', '| id | severity | kind | what is wrong | the fix | source |', '|---|---|---|---|---|---|']
        for i in sorted(by[u], key=lambda i: (SEV.index(i['severity']) if i.get('severity') in SEV else 3, i['id'])):
            out.append(f"| {cell(i['id'])} | {i.get('severity', '')} | {cell(i.get('kind', ''))} | {cell(i.get('claim', ''))} | {cell(i.get('required_change', ''))} | {cell(i['source'])} |")
        out.append('')
    out += ['## The builders\' valid choices (J151)', '', 'Each is a case the raised-way × wall laws allow more than one way; every way gives a correct map. The builder picks one, records it in the build, and the design text names it later.', '']
    out += [f'* ({name}) {line}' for name, line in choices] or ['* (none recorded in the adjudications)']
    out += ['', '## Round-8 hand-offs (J150)', ''] + [f'* {h}' for h in handoffs]
    out += ['', '## Held notes — defects noticed outside the family, for the next full round', '']
    out += [f"* ({n['source']}) {n['site']}: {n['note']}" for n in notes]
    for name, title, body in held:
        out += ['', f'### {name}: {title}', '', body]
    open(OUT, 'w').write('\n'.join(out) + '\n')
    m0 = [i for i in items if i['owner'] in ('kernel', 'determinism') or (i['owner'] in ('model', 'scope') and M0_TEXT.search(i.get('claim', '') + ' ' + i.get('required_change', ''))) or re.search(r'\bM0\b|@plat/kernel|KernelTx|dmath', i.get('claim', '') + ' ' + i.get('required_change', ''))]
    clean = [i for i in m0 if not FIREWALL.search(i.get('claim', '') + ' ' + i.get('required_change', ''))]
    os.makedirs(os.path.dirname(BUILD), exist_ok=True)
    b = ['# Open design findings that touch M0', '',
         f'The architecture set\'s coherence pass ended (owner ruling J153) with {len(items)} findings open. These {len(clean)} touch what M0 builds — the kernel (§3), determinism (§6), the records the kernel and the digest need (§2), and the tests, packages, plan and clean room (§13, §14, §16, §17). The M0 build spec decides each one: resolved in the spec (the decision and its reason, under the owner\'s delegation), or not affecting M0. Design text only; {len(m0) - len(clean)} further M0 finding(s) citing the research side of §17.1\'s firewall are held back and resolved by a design seat.', '',
         '| id | severity | part | what is wrong | the fix |', '|---|---|---|---|---|']
    b += [f"| {cell(i['id'])} | {i.get('severity', '')} | {i['owner']} | {cell(i.get('claim', ''))} | {cell(i.get('required_change', ''))} |" for i in clean]
    open(BUILD, 'w').write('\n'.join(b) + '\n')
    print(f'{len(items)} findings ({dict(sev)}), {len(choices)} valid choices, {len(notes) + len(held)} held notes → {os.path.relpath(OUT, BASE)}; {len(clean)} for M0 → {os.path.relpath(BUILD, BASE)}; family checks on disk: {checks}/6')


if __name__ == '__main__':
    main()
