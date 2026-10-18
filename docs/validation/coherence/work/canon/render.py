"""coherence/canon step 10: render canon.md, agreement.md and edges.md from the three JSON files."""
import json, collections, re
D = 'docs/validation/coherence'
C = json.load(open(D + '/canon.json'))
A = json.load(open(D + '/agreement.json'))
E = json.load(open(D + '/edges.json'))
BANNER = '> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/canon; covered by the whole-design retrovalidation (J84).'
BASE = ['model', 'kernel', 'pipeline', 'determinism', 'rendering', 'scope']
VOLS = ['V%02d' % i for i in range(1, 13)]
UNITS = BASE + VOLS
def esc(s):
    return str(s if s is not None else '').replace('|', '¦').replace('\n', ' ')
def short(s, n=220):
    s = esc(s)
    return s if len(s) <= n else s[:n - 1] + '…'
n = C['counts']
out = []
w = out.append
w('# Canon — one canonical home for every fact of the whole set (base + twelve volumes)')
w('')
w(BANNER)
w('')
w('PROGRESS (lane `coherence/canon`, 2026-09-29)')
for p in ['P1 inputs read (12 inventories, wiring, INDEX, f whole, g, delegated decisions, _integrate, seam r6, the consistency canon): done',
          'P2 facts and homes (canon.json `facts`, `by_inventory_id`): done', 'P3 glossary: done', 'P4 conflicts ruled: done', 'P5 f and g routing: done',
          'P6 id hygiene: done', 'P7 wiring gaps routed: done', 'P8 elegance rulings: done', 'P9 agreement matrix (agreement.json/.md): done',
          'P10 edge catalogue (edges.json/.md): done', 'P11 open findings routed: done', 'P12 per-unit instructions: done']:
    w('- ' + p)
w('')
w('## How to use this canon')
w('')
w("* **Machine twin.** `canon.json` (query with python; keys `facts`, `by_inventory_id`, `glossary`, `conflicts`, `f_routing`, `g_routing`, `id_hygiene`, `wiring_gaps`, `elegance`, `open_findings`, `owner_questions`, `canon_decisions`, `cohesion`, `units`, `home_rules`, `counts`). Agreement: `agreement.json`/`agreement.md`. Edges: `edges.json`/`edges.md`. Everything is rebuilt by the scripts in `work/canon/` (norm → link → ids → glossary → agree → handoffs → edges → combos → assemble → render); the rulings are in `rulings_conflicts.py`, `rulings_other.py` and `manual.py`.")
w("* **A fact** is one normative item of the set. Its id is the inventory id of the statement at its canonical home (stable). `by_inventory_id` maps every one of the 11 408 inventory ids to its role: `home` (state it once, with its value), `reference` (replace by 'see §x.y' / 'see Vnn §x.y'; the home unit and section given, with the home fact where the link script found it — `fact` exact, `near_fact` a likely match to confirm), `bcr-pointer` (a volume's base change request: after file f is applied it becomes a one-line pointer to the applied item), `index-row` (scope's Judgment-calls index rows), `glossary`, `history-out` (narration), `handoff`, `answer-J121-J122`.")
w("* **Each editor** reads its unit's section at the end of this file: STATE (every inventory id of the unit whose role is `home`; the list is in `canon.json → units.<unit>.state`), REFERENCE (listed here), the BCR pointers, the terms to replace, the conflicts it resolves, the f and g items it applies, the wiring gaps it closes, the elegance and id rulings it applies, its cohesion checks, the owner questions it marks answered, its open findings, the hand-offs it closes, its disagreements (agreement.md) and its UNDEFINED/UNTESTED edges (edges.md).")
w("* **Verifiers** check each inventory id against its role here, each ruling as written, each elegance ruling's equivalence list against the archive, and the catalogues.")
w('')
w('## Numbers')
w('')
w('| measure | count |')
w('|---|---|')
for k, v in n.items():
    w(f'| {k.replace("_", " ")} | {v if not isinstance(v, dict) else ", ".join(f"{a} {b}" for a, b in v.items())} |')
w('')
w("Words before the pass (the shrink goal's baseline; principle (9)): base 372 998, volumes 1 118 687, total 1 491 685. Goal: about a third fewer (a band of 25 to 40 per cent: 895 011 – 1 118 764 words after), from four sources only — restatement, narration, duplicated mechanisms (the UNIFY rulings below), verbose prose. Each unit's band is in its section.")
w('')
w('## Precedence and home rules')
w('')
w('**Precedence for a conflict (principle (3)):** ' + C['meta']['precedence'] + '.')
w('')
w('**Which base part a base section belongs to:** ' + C['meta']['section_units'] + '.')
w('')
w("The earlier canon's home rules R1–R13 (docs/validation/consistency/canon.md) hold inside the base. The set adds:")
w('')
for h in C['home_rules']:
    w(f"* **{h['id']}.** {h['rule']}")
w('')
w('## The canon\'s own decisions (J122 delegation; vetoable)')
w('')
for d in C['canon_decisions']:
    w(f"* **{d['id']}** — {d['decision']} *Basis:* {d['basis']}.")
w('')
w('## Owner questions — every one answered (J121, J122, J-C)')
w('')
w('| unit | question | subject | answer |')
w('|---|---|---|---|')
for q in C['owner_questions']:
    w(f"| {q['unit']} | {esc(q['question'])} | {esc(q['subject'])} | {esc(q['answer'])} |")
w('')
w('Each unit marks its questions answered with the decision and its id (J121 / J122 / J-C) and reads the decision in its body; no text keeps "until the owner answers".')
w('')
# glossary
w('## Glossary')
w('')
w('### Retired synonyms (one term per concept) — replaced everywhere')
w('')
w('Occurrence counts are the script\'s candidate hits per unit (a verifier greps each to zero; a hit inside a quotation of a reference, or a legitimate different sense, is kept and noted by the editor).')
w('')
w('| id | concept | the one term | retired | occurrences (unit: hits) | basis |')
w('|---|---|---|---|---|---|')
for g in C['glossary']['retired']:
    occ = ', '.join(f'{u} {c}' for u, c in sorted(g['occurrences'].items(), key=lambda x: -x[1])) or '0'
    w(f"| {g['id']} | {esc(g['concept'])} | {esc(g['term'])} | {esc(g['retired'])} | {esc(occ)} | {esc(g['basis'])} |")
w('')
w('### Defined terms (their homes)')
w('')
w('Every term the twelve inventories record as defined, with its home; a term defined in two units is defined at its home and cited elsewhere (`canon.json → glossary.terms` holds the definitions).')
w('')
seen = set()
rows = []
for t in C['glossary']['terms']:
    key = (str(t['term']).lower()[:60], str(t['unit']))
    if key in seen or not t['term']:
        continue
    seen.add(key)
    rows.append(t)
by_term = collections.defaultdict(list)
for t in rows:
    by_term[str(t['term']).lower()[:60]].append(t)
w('| term | unit | home | other names or hazards |')
w('|---|---|---|---|')
for k in sorted(by_term):
    for t in by_term[k]:
        w(f"| {short(t['term'], 70)} | {esc(t['unit'])} | {short(t['home'], 50)} | {short(t['other_names'], 90)} |")
w('')
# conflicts
w('## Conflicts — every one ruled')
w('')
w('Each: the statements, where, the ruling, its basis in the precedence, and the units that change. FIX = change at the units; FIX-BY-F = an f item applied as written resolves it.')
w('')
for c in C['conflicts']:
    w(f"### {c['id']} ({c['inventory']}; {c.get('severity') or ''}) — {c['verdict']}")
    w('')
    for s in c['statements'][:4]:
        w('* ' + short(s, 700))
    if c.get('where'):
        w(f"* *Where:* {short(c['where'], 300)}")
    w(f"* **Ruling:** {c['ruling']}")
    w(f"* *Basis:* {c['basis']}. *Units:* {', '.join(c['units'])}.")
    w('')
# f routing
w('## File f — every item routed to the base part that applies it')
w('')
w(C['f_routing']['owner_rule_check'])
w('')
w('**f items ruled against a volume\'s text or another item:**')
w('')
for fc in C['f_routing']['conflicts_ruled']:
    w(f"* items {', '.join(map(str, fc['items']))}: {fc['ruling']} (*{fc['basis']}*)")
w('')
w('**The request census:** ' + C['f_routing']['census'] + '. The not-items: ' + '; '.join(f"{x['request']} ({x['volume']}) — {x['ruling']}" for x in C['f_routing']['not_items']) + '.')
w('')
w('Application order: file g first, then file f in its own order (base-section order; the notes\' "applied before/after" orders govern). Each base editor applies the items of its sections as written; a part in another part\'s section ("also touches") is applied by that part\'s editor. A volume cites each applied item as base text; its `## 10` request becomes a one-line pointer "BCR-V… → file f item N, applied at §x.y".')
w('')
w('| item | base section | applies | also applies a part | scope | requests | needed by |')
w('|---|---|---|---|---|---|---|')
for f in C['f_routing']['items']:
    w(f"| {f['item']} | {short(f['section'], 60)} | {f['unit']} | {', '.join(f['also'])} | {short(f['scope'], 80)} | {short(', '.join(f['requests']), 90)} | {', '.join(f['needed_by'])} |")
w('')
# g routing
w('## File g — items 102–113')
w('')
w('Items 102–110 are applied to the base like f items (the volumes carry their parts, integrated by the volumes pass); items 111–113 reached the program after that, so EVERY unit named writes its part at build depth as new design (a verifier raises F-MISSING where a part is absent). Parts marked WIRING CONSEQUENCE are not named by the item but are needed so the pieces it adds are wired both ways (principle (7)).')
w('')
for g in C['g_routing']:
    w(f"### g item {g['item']} — {g['class']}")
    w('')
    for u, p in g['parts'].items():
        w(f"* **{u}:** {p}")
    w('')
# id hygiene
w('## Id hygiene')
w('')
w(f"The census (`work/canon/ids.py`) found {C['id_census']['defined_ids']} defined ids and {C['id_census']['apparent_duplicates']} apparent duplicates, read: the true collisions are {', '.join(C['id_census']['true_collisions'])}; every other duplicate is an index row and its Part A entry, a registration row and its bar, an amendment note to the same request or a continued range.")
w('')
for i in C['id_hygiene']:
    w(f"* **{i['id']}** — {i['subject']} **Ruling:** {i['ruling']} *Units:* {', '.join(i['units'])}." + (f" *Renumbering:* {'; '.join(r['from'] + ' → ' + r['to'] for r in i['renumber'])}." if i['renumber'] else ''))
w('')
# wiring
w('## Wiring gaps (wiring.md) — every one routed')
w('')
w('| id | class | sev | units | the piece | the link to write (or the ruling) |')
w('|---|---|---|---|---|---|')
for x in C['wiring_gaps']:
    link = x['ruling'] if not x['ruling'].startswith('WIRE') else x['link']
    w(f"| {x['id']} | {x['class']} | {x['severity']} | {', '.join(x['units'])} | {short(x['piece'], 140)} | {short(link, 420)} |")
w('')
# elegance
w('## Elegance — UNIFY with the equivalence list, or KEEP APART with the nuance that separates')
w('')
w('An editor applies a UNIFY ruling exactly as written and ticks every equivalence item at its new home; a verifier checks each item against the archive (a blur is a blocker). No other unification is made.')
w('')
for e in C['elegance']:
    w(f"### {e['id']} — {e['verdict']}: {short(e['subject'], 300)}")
    w('')
    if e['unified_form']:
        w(f"* **Unified form:** {e['unified_form']}")
    w(f"* **Home:** {e['home']}. **Units that change:** {', '.join(e['units'])}.")
    if e['equivalence']:
        w('* **Equivalence list:**')
        for q in e['equivalence']:
            w(f"  * {q}")
    if e['separating_nuance']:
        w(f"* **Kept apart because:** {e['separating_nuance']}")
    w('')
# cohesion
w('## Cohesion checks')
w('')
w('**scope (the summary, §1, §14, §15, §16 against INDEX.md and the volumes\' build plans):**')
w('')
for c in C['cohesion']['scope']:
    w('* ' + c)
w('')
w('**INDEX.md** is rewritten with the scope part: the scope editor writes INDEX §3, §4 (J122\'s order, §16\'s totals), §6 (the decisions table) and §7 (no open item) as a cross-part note, and the assembler writes the file.')
w('')
w('**every volume:**')
w('')
for c in C['cohesion']['volume']:
    w('* ' + c)
w('')
# per unit
w('## Open findings — where they come from')
w('')
w("Every finding of the twelve inventories (940), the round-6 seam findings the finalization left open with INDEX §7's fix list (18 rows, SEAM_OPEN, each with its ruling where one was needed), every volume's integration note (folded into its body) and every volume's own Fix list and hand-off rows are routed to the unit that closes them (listed per unit below; the full text is in canon.json → open_findings). No `fix-list.md` exists under docs/validation/ (find: 0 files), so none is routed. THE BAR IS ZERO: each is FIXED in the text or ruled INVALID by the adjudicator; none is parked.")
w('')
w('## Per unit — what each editor states, references, replaces, resolves, applies and closes')
w('')
fins = {f['id']: f for f in C['open_findings']}
items_by_unit = collections.defaultdict(list)
for r in json.load(open(D + '/work/canon/items_norm.json')):
    items_by_unit[r['unit']].append(r)
for u in UNITS:
    x = C['units'][u]
    s = x['shrink']
    w(f'### {u}')
    w('')
    w(f"* **Size:** {s['words_before']} words; the goal band after: {s['goal_band_words_after'][0]}–{s['goal_band_words_after'][1]} words" + (f"; narration ranges alone {s['narration_ranges_words']} words" if s['narration_ranges_words'] else '') + f"; {s['restatement_items']} restatements to references; {s['bcr_blocks_to_pointers']} BCR blocks to pointers.")
    w(f"* **STATE:** {len(x['state'])} facts (canon.json → units.{u}.state)" + (f"; {len(x['index_rows'])} index rows" if x['index_rows'] else '') + '.')
    if x['history_out']:
        w(f"* **HISTORY OUT:** {', '.join(x['history_out'])}.")
    if x['reference']:
        w(f"* **REFERENCE ({len(x['reference'])}):** replace each by a pointer to its home:")
        w('')
        w('  | inventory id | home | home fact (match) |')
        w('  |---|---|---|')
        for r in x['reference']:
            w(f"  | {r['id']} | {r['home_unit']} {esc(r['home_sec'] or '(the editor finds the section)')} | {r['fact'] or '—'} ({r['match']}) |")
        w('')
    if x.get('requests_in_f'):
        rq = sorted(x['requests_in_f'], key=lambda r: (int(re.sub(r'\D', '', r['id_after'].split('-')[-1]) or 0)))
        w(f"* **Its §10 requests → one-line pointers to the applied f items ({len(rq)}):** " + '; '.join(f"{r['id_after']}{' (was ' + r['request'] + ')' if r['request'] != r['id_after'] else ''} → item {r['f_item']}" for r in rq) + '.')
    if x['bcr_pointer']:
        w(f"* **BCR blocks → pointers ({len(x['bcr_pointer'])}):** " + '; '.join(f"{b['bcr'] or b['id']} → item {b['f_item'] or '(by id in file f)'}" for b in x['bcr_pointer']) + '.')
    if x['terms']:
        w('* **Terms to replace:** ' + '; '.join(f"{t['id']} ({esc(t['retired'])} → {esc(t['term'])}; {t['count']} hits, first lines {t['lines']})" for t in x['terms']) + '.')
    if x['conflicts']:
        w(f"* **Conflicts it resolves ({len(x['conflicts'])}):** {', '.join(x['conflicts'])}.")
    if x['f_items']:
        fi = collections.defaultdict(list)
        for f in x['f_items']:
            fi[f['role']].append(str(f['item']))
        w('* **File f items it applies:** ' + ' '.join(f"{k}: {', '.join(v)}." for k, v in fi.items()))
    if x['f_items_concerning'] and u in VOLS:
        w(f"* **File f items that concern it (cite as base text):** {', '.join(map(str, sorted(set(x['f_items_concerning']))))}.")
    if x['g_parts']:
        w('* **File g parts it writes or applies:**')
        for g in x['g_parts']:
            w(f"  * item {g['item']}: {g['part']}")
    if x['wiring']:
        w(f"* **Wiring gaps it closes:** {', '.join(x['wiring'])}.")
    if x['elegance']:
        w(f"* **Elegance rulings it applies:** {', '.join(x['elegance'])}.")
    if x['id_rulings']:
        w(f"* **Id rulings it applies:** {', '.join(x['id_rulings'])}.")
    if x.get('owner_questions_answered'):
        w('* **Owner questions to mark answered:** ' + '; '.join(f"{q['q']} — {q['answer']}" for q in x['owner_questions_answered']) + '.')
    if x['cohesion']:
        w(f"* **Cohesion checks:** see *Cohesion checks* ({'scope' if u == 'scope' else 'every volume'}).")
    if x['agreement_disagreements']:
        w(f"* **Disagreements (agreement.md):** " + '; '.join(f"`{d['subject']}` with {d['with']} ({', '.join(d['rulings'])})" for d in x['agreement_disagreements'][:40]) + '.')
    if u in VOLS:
        fl = [i for i in items_by_unit.get(u, []) if str(i['sec']).startswith(u + ' §13')]
        hi = x['handoff_items']
        if fl or hi:
            w(f"* **Its own Fix list (§13) and hand-off rows — every item fixed in the text (or marked for the adjudicator with its reason); §13 keeps no open item:** " + ', '.join(sorted(set([i['id'] for i in fl] + hi))) + '.')
    if x['handoffs_to_close']:
        w(f"* **Hand-offs to close here ({len(x['handoffs_to_close'])}):** {', '.join(x['handoffs_to_close'])} (agreement.md lists each).")
    w(f"* **Edges (edges.md):** {x['edges_undefined']} UNDEFINED, {x['edges_untested']} UNTESTED; {x['combos_owned_undefined']} UNDEFINED combinations it owns.")
    if x['open_findings']:
        w(f"* **Open findings routed here ({len(x['open_findings'])}):**")
        for fid in x['open_findings']:
            f = fins.get(fid)
            if not f:
                continue
            req = f['required'] or ''
            w(f"  * {fid} [{f['list']}; {f['severity'] or '-'}] {short(f['text'], 230)}" + (f" → **{short(req, 300)}**" if req else '') + ('' if f['closure'] == 'FIX at the unit' else f" — *closed by:* {f['closure']}"))
    w('')
w('## CONFIRMED versus PLAUSIBLE')
w('')
w("**CONFIRMED (executed):** the normalisation of the 12 inventories (11 408 items, 940 findings) and every count in *Numbers* (scripts in work/canon/); the id census over the base, the rationale, INDEX, f, g, _integrate and the twelve volumes; the retired-synonym hit counts; the f parse (386 items, 200–585, none missing) and its routing by section; the wiring defects (90, wiring.json) each routed; the round-6 seam findings left open (INDEX §7) each routed; every conflict finding (164) ruled, and the four the canon adds.")
w("**PLAUSIBLE (reasoned or scanned, not executed against a build):** the fact links of references (142 exact, 297 near, the rest to a home section — the editor confirms); the agreement verdicts 'agree' (no conflict found by the inventories, the seam rounds r0–r6 or the canon's value comparison — absence of evidence, which the seam checkers test); the edge catalogue's DEFINED/UNDEFINED/UNTESTED (a sentence scan of each mechanism's own text) and the combinations' evidence (one sentence naming both features) — both work lists that the edge checkers confirm; the elegance rulings' equivalence lists (built from the inventories' and the text's statements; each verifier checks them against the archive); the canon decisions J-C1–J-C4 (vetoable).")
open(D + '/canon.md', 'w').write('\n'.join(out) + '\n')

# ---------------- agreement.md ----------------
o = []
w = o.append
w('# Agreement matrix — every pair of units that meet, every subject they share')
w('')
w(BANNER)
w('')
w("Machine twin: `agreement.json` (`pairs[].subjects[]`: subject, home unit, how the home was found, the items in each unit, verdict, conflict rulings; `contracts`; `handoffs`). A **subject** is an identifier (a record, type, field, table, cell, test id, decision id, failure class, code, derivation row, stage) named by items of both units. Its **home** is the unit that defines it (by declaration or id prefix; else the unit that states it most — the editor confirms). **Verdict**: `disagree` where a conflict finding names the subject in both units (ruled in canon.md); `agree` otherwise — no disagreement found by the inventories, the seam rounds r0–r6 or the canon's value comparison (the twelve numeric candidates it raised were read: clause and list numbers, not values). The seam checkers (verify-agree-*) confirm each shared subject in the current text.")
w('')
w('## The cross-unit contracts (principle (4) and (10))')
w('')
for c in A['contracts']:
    w(f"* **{c['subject']}** ({', '.join(c['units'])}) — home {c['home']}. {c['rule']}")
w('')
w('## Pairs')
w('')
w('| pair | shared subjects | disagree | sample of shared subjects (home) |')
w('|---|---|---|---|')
for p in A['pairs']:
    sample = ', '.join(f"`{s['subject']}` ({s['home']})" for s in sorted(p['subjects'], key=lambda s: (s['verdict'] != 'disagree', s['subject']))[:10])
    w(f"| {p['pair'][0]} – {p['pair'][1]} | {p['shared_subjects']} | {p['disagree']} | {short(sample, 700)} |")
w('')
w('## Disagreements and their rulings')
w('')
w('| pair | subject | home | rulings (canon.md conflicts) |')
w('|---|---|---|---|')
for p in A['pairs']:
    for s in p['subjects']:
        if s['verdict'] == 'disagree':
            w(f"| {p['pair'][0]} – {p['pair'][1]} | `{esc(s['subject'])}` | {s['home']} | {', '.join(s['conflicts'])} |")
w('')
w('## Hand-offs — every cross-volume request, routed to the unit that closes it')
w('')
w("`stated` is what the requesting row says (a scan of its words): `closed-stated` rows are confirmed at the destination and reduced to one closed line (or dropped) in the requester; `open-stated` and `unstated` rows are closed at the destination in this pass. Integration notes (IN-…) are folded into their own volume's body (canon.md, open findings).")
w('')
w('| id | from | to | stated | action | request |')
w('|---|---|---|---|---|---|')
for h in A['handoffs']:
    w(f"| {h['id']} | {h['from']} | {', '.join(h['to'])} | {h['stated']} | {short(h['action'], 90)} | {short(h['text'], 300)} |")
open(D + '/agreement.md', 'w').write('\n'.join(o) + '\n')

# ---------------- edges.md ----------------
o = []
w = o.append
w('# Edge catalogue — every mechanism at its limits, and the cross-unit combinations (principle (11))')
w('')
w(BANNER)
w('')
w('Machine twin: `edges.json` (`mechanisms`, `edges`, `combinations`, `named_combinations`, `general_rules`, `method`).')
w('')
w('**Method.** ' + E['method'])
w('')
w('**Edge classes.** E1 no input; E2 exactly one item; E3 the maximum and its caps; E4 degenerate geometry; E5 missing, empty or contradictory data (the dossier included); E6 every rung from THORP to the METROPOLIS cap; E7 every toggle and preset; E8 save, load, undo, redo, regenerate and migrate. **An UNDEFINED edge is a MAJOR finding to close (a BLOCKER where its outcome would be a crash, a hang, lost data, a silent wrong result or a whole-map retry); an UNTESTED one needs its test.** Each owner writes the outcome, the failure rung (§5\'s ladder: check, repair locally, retry that piece, simpler shape, substitute, leave out and report — never a whole-map retry) and the test.')
w('')
for k, v in E['general_rules'].items():
    w(f"**General rule for {k} (E-GEN-1).** {v}")
w('')
cnt = collections.Counter((e['unit'], e['status']) for e in E['edges'])
w('## Summary by unit')
w('')
w('| unit | mechanisms | edges | DEFINED | UNTESTED | UNDEFINED | combinations owned (UNDEFINED) |')
w('|---|---|---|---|---|---|---|')
mc = collections.Counter(m['unit'] for m in E['mechanisms'])
co = collections.Counter(c['owner'] for c in E['combinations'] if c['status'] == 'UNDEFINED')
for u in UNITS:
    tot = sum(cnt[(u, s)] for s in ('DEFINED', 'UNTESTED', 'UNDEFINED'))
    w(f"| {u} | {mc[u]} | {tot} | {cnt[(u, 'DEFINED')]} | {cnt[(u, 'UNTESTED')]} | {cnt[(u, 'UNDEFINED')]} | {co[u]} |")
w('')
w('## The combinations the owner named')
w('')
for c in E['named_combinations']:
    ev = c['evidence']
    w(f"* **{c['combination']}** ({', '.join(c['units'])}; owner {c['owner']}) — {c['status']}" + (f": {ev['where']}: \"{short(ev['quote'], 260)}\"" if ev else ''))
w('')
w('## UNDEFINED and UNTESTED edges, by unit (the defined ones are in edges.json with their evidence)')
w('')
mech = {m['id']: m for m in E['mechanisms']}
for u in UNITS:
    rows = [e for e in E['edges'] if e['unit'] == u and e['status'] in ('UNDEFINED', 'UNTESTED')]
    if not rows:
        continue
    w(f'### {u}')
    w('')
    for e in rows:
        if e['source'] == 'scan':
            w(f"* {e['id']} — {e['status']} — {e['section']} *{short(e['title'], 70)}* — {e['edge']}" + (f"; tests seen: {', '.join(e['tests'][:4])}" if e['tests'] else '') + (f"; defined by: \"{short(e['outcome_evidence'], 150)}\"" if e['status'] == 'UNTESTED' else ''))
        else:
            w(f"* {e['id']} — UNDEFINED (inventory {e['source']}) — {short(e['section'], 80)} — {short(e['edge'], 400)}")
    w('')
w('## Cross-unit combinations — UNDEFINED, by owner (the DEFINED ones are in edges.json with their quoted sentence)')
w('')
for u in UNITS:
    rows = [c for c in E['combinations'] if c['owner'] == u and c['status'] == 'UNDEFINED']
    if not rows:
        continue
    w(f'### {u}')
    w('')
    for c in rows:
        w(f"* {c['id']} — {c['a']['feature']} ({c['a']['unit']}) × {c['b']['feature']} ({c['b']['unit']}) at {', '.join(c['rungs'])}")
    w('')
open(D + '/edges.md', 'w').write('\n'.join(o) + '\n')
print('rendered')
