#!/usr/bin/env python3
"""Build repair-r4-V05's blocks from the live V05 with count-asserted substitutions (lane coherence/repair-V05-r4).

V05 owns no issue in round 4; it writes the three END lines adjudication-r4 Part H . V05 lists (R4-02, R4-09, R4-12)
and the sweep R4-01 (2) asks of the seat (every V05 restatement of the term, key or rule those rulings change).
Each edit is (heading, old, new, count, tag); every untouched line of a replaced subsection is verbatim.
"""
import hashlib, importlib.util, os, sys

ROOT = '/home/user/maps-architecture'
LIVE = os.path.join(ROOT, 'docs/volumes/V05-sky.md')
HERE = os.path.dirname(os.path.abspath(__file__))
SCRATCH = sys.argv[1] if len(sys.argv) > 1 else HERE

spec = importlib.util.spec_from_file_location('ab', os.path.join(ROOT, 'docs/validation/amendments-b/apply-blocks.py'))
ab = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ab)

text = open(LIVE, encoding='utf-8').read()
EXPECT_SHA = 'cc1dfa61fe882bcb8767901e0d5624fcfc7776d6cc1a4256d6eca269a89aad28'  # assemble-r3's V05
assert hashlib.sha256(text.encode('utf-8')).hexdigest() == EXPECT_SHA, 'live V05 changed since P1'
lines = text.split('\n')

H1B = '## 1b Wiring table — every new piece, what feeds it and what it feeds'
H316 = '### 3.16 The fall and the landfall (`fallIsland`)'
H323 = '### 3.23 Edges — every mechanism at its limits (principle (11))'
H51 = '### 5.1 Marks (S14; every sky coordinate is `anchor` + the local one)'
H52 = '### 5.2 Occlusion'
H53 = "### 5.3 Light and shadow — the underside's shadow (the owner's J98)"
H54 = '### 5.4 Labels'
H56 = "### 5.6 Find on Sky (item 120, the sky's part; J-V5.89)"
H6 = '## 6 Performance budgets'
H7 = '## 7 Tests and acceptance bars'
H9 = '## 9 Decisions (each vetoable)'

EDITS = [
    # ---------------------------------------------------------------- END of VEW-r3-04 (model; R4-09) and its sweep
    (H316,
     "| raised span (its deck band's plan projection, in a ground part ≥ 1) and raised-way pier (its footprint) | "
     "`ruined` (item 244's span and support `state`); a span whose pier is ruined becomes `ruined` with it (arches fall "
     "with their piers, whatever their own cover);",
     "| raised span (its deck band's plan projection, in a ground part ≥ 1) and raised-way pier (its footprint; a "
     "crossing station's support is its wall stretch, §2.7: the wall row's breach) | `ruined` (item 244's span and "
     "support `state`); a span whose pier is ruined — or whose crossing station's stretch the wall row breaches — "
     "becomes `ruined` with it (arches fall with their piers, whatever their own cover);",
     1, 'END VEW-r3-04 (R4-09): §3.16 (4) raised-way pier row'),
    (H316,
     "   span: [a, b] }`, `{ raised, support }`) — never a deck plot, which is tombstoned with its deck and listed as a fate —\n"
     "   `source` the island's address and `name` the grammar's fallen form of its name. Each member leaves the list in the\n",
     "   span: [a, b] }`, `{ raised, support }`) — never a deck plot, which is tombstoned with its deck and listed as a fate,\n"
     "   nor a crossing station's support, which is its wall stretch (the wall row) — `source` the island's address and\n"
     "   `name` the grammar's fallen form of its name. Each member leaves the list in the\n",
     1, 'sweep R4-01 (2) of VEW-r3-04: §3.16 (5) members'),

    # ---------------------------------------------------------------- END of VAL-R3-01 (V09; R4-02) and its sweep
    (H56,
     "   is never lost, and Go there turns its visibility on, as switching the working layer does.\n",
     "   is never lost, and Go there makes Sky the working layer, which the view draws whatever its visibility (§8.4), no\n"
     "   event sent (item 120 (a)).\n",
     1, 'END VAL-R3-01 (R4-02): §5.6 (3)'),
    (H323,
     "a hidden sky layer's slabs light nothing and are not drawn (§8.4), the model's strips unchanged;",
     "a sky layer the view does not draw (hidden, and not the view's working layer; §8.4): its slabs light nothing and "
     "are not drawn, the model's strips unchanged;",
     1, 'sweep R4-01 (2) of R4-02: §3.23 light-and-shadow row'),
    (H323,
     "a hidden sky layer: its matches still counted and shown as ghost pins;",
     "a hidden sky layer that is not the working layer: its matches still counted and shown as ghost pins, and Go there "
     "makes Sky the working layer, drawn whatever its visibility, no event sent;",
     1, 'sweep R4-01 (2) of R4-02: §3.23 Find-on-Sky row'),
    (H51,
     "and displaced with it under `offset`, faded with the sky layer under `ghost`, and none while the sky layer is hidden;\n"
     "the seed, the festival and the island fix them, so they draw the same in every view and export (byte-stable tiles) and a\n",
     "and displaced with it under `offset`, faded with the sky layer under `ghost`, and none while the view does not draw the\n"
     "sky layer (hidden, and not the view's working layer; §8.4); the seed, the festival and the island fix them, so they\n"
     "draw the same in every view and export (byte-stable tiles) and a\n",
     1, 'sweep R4-01 (2) of R4-02: §5.1 pennants'),
    (H52,
     "conversion (V05 §4.2). A hidden sky layer draws and lights nothing (§8.4); the islands still exist and the model is\n"
     "unchanged (T15-1).",
     "conversion (V05 §4.2). A sky layer the view does not draw — hidden, and not the view's working layer (§8.4) — draws and\n"
     "lights nothing; the islands still exist and the model is unchanged (T15-1).",
     1, 'sweep R4-01 (2) of R4-02: §5.2'),
    (H53,
     "   `surfaceTopCm` above the view's ground whenever the sky layer is visible and the document holds an island that is not\n"
     "   fallen — whatever is in view — so no sun ever stands below a floating island and panning never changes `H`: it moves\n"
     "   with the zoom alone; the path and fixed suns are unchanged.",
     "   `surfaceTopCm` above the view's ground whenever the view draws the sky layer (visible, or Sky the view's working\n"
     "   layer, §8.4) and the document holds an island that is not fallen — whatever is in view — so no sun ever stands below\n"
     "   a floating island and panning never changes `H`: it moves with the zoom alone; the path and fixed suns are\n"
     "   unchanged.",
     1, 'sweep R4-01 (2) of R4-02: §5.3 (4)'),
    (H54,
     "the island's local frame and translated by S14 (§9.1; file f item 415). §9.2's candidate set: sky rows only while the sky\n"
     "layer is visible; under `opaque`, a ground row whose anchor lies inside a visible island's drawn land face is no candidate;\n"
     "under `ghost` both are candidates, the sky rows at 1.5 × their priority; under `offset`, sky candidates at their displaced\n"
     "positions at the stop.",
     "the island's local frame and translated by S14 (§9.1; file f item 415). §9.2's candidate set: sky rows only while the\n"
     "view draws the sky layer (visible, or Sky the view's working layer, §8.4); under `opaque`, a ground row whose anchor\n"
     "lies inside a visible island's drawn land face is no candidate; under `ghost` both are candidates, the sky rows at 1.5\n"
     "× their priority; under `offset`, sky candidates at their displaced positions at the stop.",
     1, 'sweep R4-01 (2) of R4-02: §5.4'),
    (H7,
     "  their displaced positions; with the sky layer hidden, 0 sky labels and no model digest changed (T15-1); every shipped\n",
     "  their displaced positions; with the sky layer hidden and Ground the working layer, 0 sky labels and no model digest\n"
     "  changed (T15-1); every shipped\n",
     1, 'sweep R4-01 (2) of R4-02: T-V5-12'),
    (H7,
     "  the sky layer hidden no slab is lit or drawn and the ground's picture equals the map without islands, and with no island\n",
     "  the sky layer hidden and Ground the working layer no slab is lit or drawn and the ground's picture equals the map\n"
     "  without islands, and with no island\n",
     1, 'sweep R4-01 (2) of R4-02: T-V5-13 (i)'),
    (H7,
     "  and Go there sets Sky with the match's island; (d) (T120-5) at the city band every sky match has a pin or a bubble,\n",
     "  and Go there sets Sky with the match's island — Sky then drawn whatever its visibility, 0 events logged and its\n"
     "  `LayerSpec.visible` unchanged (V05 §5.6 (3)); (d) (T120-5) at the city band every sky match has a pin or a bubble,\n",
     1, 'sweep R4-01 (2) of R4-02: T-V5-36 (c)'),
    (H9,
     "| J-V5.14 | Chose to floor the cursor sun's height at 1.5 × the display list's top whenever the sky layer is visible "
     "and the document holds",
     "| J-V5.14 | Chose to floor the cursor sun's height at 1.5 × the display list's top whenever the view draws the sky "
     "layer (visible, or Sky the view's working layer) and the document holds",
     1, 'sweep R4-01 (2) of R4-02: J-V5.14'),

    # ---------------------------------------------------------------- END of VAL-R3-05 (V04; R4-12) and its sweep
    (H56,
     "class, area and layer §11.2's, under knowledge admission at the view's effective key (item 120 (h)). This section states\n"
     "what the sky offers and how a match on an island reads.\n",
     "class, area and layer §11.2's, under knowledge admission at the view's effective key (item 120 (h)) and at its drawn\n"
     "week (§2.9's `week`; §11.2's *At a drawn week*). This section states what the sky offers and how a match on an island\n"
     "reads.\n",
     1, 'sweep R4-01 (2) of R4-12: §5.6 lead'),
    (H56,
     "5. **Over time, edits and knowledge** (item 120 (f), (h)). Every commit, regenerate, undo and epoch re-evaluates the\n"
     "   chips: a raised or declared island's matches glow in its commit, a moved island's glow moves with it, a fallen\n"
     "   island's go dark with its landfall then offered on Ground, and a removed island offers nothing. A `secret` access's\n",
     "5. **Over time, edits and knowledge** (item 120 (f), (h)). Every commit, regenerate, undo, epoch and change of the drawn\n"
     "   week (§2.9's `week`) re-evaluates the chips: a raised or declared island's matches glow in its commit, a moved\n"
     "   island's glow moves with it, a fallen island's go dark with its landfall then offered on Ground, and a removed island\n"
     "   offers nothing. At a drawn week whose frame is not the head (V06 §3.15.2), an island's matches, glow, pins, ghost\n"
     "   pins and gaps are §11.2's listing at that week, each drawn at its island's anchor in that frame. A `secret` access's\n",
     1, 'END VAL-R3-05 (R4-12): §5.6 (2)–(5); sweep: (5)\'s re-evaluation list'),
    (H56,
     "   islands' entities join `live.find`'s index, rebuilt once per commit, and the overlay never re-renders the sky base —\n"
     "   V05 §6's Find row.",
     "   islands' entities join `live.find`'s index, rebuilt once per commit and at each change of the drawn week (V09\n"
     "   §4.21.10 (7)), and the overlay never re-renders the sky base — V05 §6's Find row.",
     1, 'sweep R4-01 (2) of R4-12: §5.6 (6)'),
    (H1B,
     "| V09's `live.find` over §11.2's gazetteer at the view's key; the committed island records and their arenas; V01 §5.4 "
     "(3)'s `gapUnits` over each island's arena (V05 §5.6 (4)) |",
     "| V09's `live.find` over §11.2's gazetteer at the view's key and drawn week; the committed island records and their "
     "arenas — at a drawn week whose frame is not the head, that frame's (V06 §3.15.2; V05 §5.6 (5)); V01 §5.4 (3)'s "
     "`gapUnits` over each island's arena at that week (V05 §5.6 (4)) |",
     1, 'sweep R4-01 (2) of R4-12: §1b Find-on-Sky row'),
    (H6,
     "the islands' entities in `live.find`'s index, rebuilt once per commit (≈ 2–5 % of the town's plots",
     "the islands' entities in `live.find`'s index, rebuilt once per commit and at each change of the drawn week (≈ 2–5 % "
     "of the town's plots",
     1, 'sweep R4-01 (2) of R4-12: §6 Find row'),
    (H323,
     "a class `IslandRule.carry.never` excludes a gap like any other | check | T-V5-36 |",
     "a class `IslandRule.carry.never` excludes a gap like any other; at a drawn week whose frame is not the head, an "
     "island raised, resized, moved, fallen or removed since that week: its matches, pins and gaps §11.2's listing at "
     "that week, drawn on its land and at its anchor in that frame (V05 §5.6 (5)), one raised since offering none | "
     "check | T-V5-36 |",
     1, 'R4-12 edge (principle (11)): §3.23 Find-on-Sky row'),
    (H7,
     "  the METROPOLIS cap (V05 §6's Find row).\n",
     "  the METROPOLIS cap (V05 §6's Find row); (i) at a drawn week whose frame is not the head (V05 §5.6 (5)), on (f)'s\n"
     "  fixture after an `advance` whose epochs raise one island and resize another and on T-V5-14's falling CITY, each\n"
     "  scrubbed to a week before those epochs: every sky match, glow, pin, ghost pin and gap unit those of §11.2's\n"
     "  listing at that week, drawn on its island's land and at its anchor in that frame, the raised island offering none\n"
     "  and the fallen island's matches on Sky as the frame holds it, never its landfall on Ground; the head's reading back\n"
     "  when the scrub returns to the head.\n",
     1, 'R4-12 test (principle (11)): T-V5-36 (i)'),
]

ORDER = [H1B, H316, H323, H51, H52, H53, H54, H56, H6, H7, H9]
assert set(ORDER) == {e[0] for e in EDITS}
heads, fence_ok = ab.headings(lines)
assert fence_ok
log, blocks = [], []
for h in ORDER:
    ks = [k for k, x in enumerate(heads) if x[2] == h]
    assert len(ks) == 1, (h, ks)
    s, e = ab.section_range(lines, heads, ks[0])
    body = '\n'.join(ab.strip_blank(lines[s:e])) + '\n'
    for (hh, old, new, cnt, tag) in EDITS:
        if hh != h:
            continue
        n = body.count(old)
        assert n == cnt, (tag, n)
        body = body.replace(old, new)
        log.append(f'{tag}: {h[:64]} — {n} replaced')
    blocks.append((h, body.rstrip('\n')))

out = ['=== FILE docs/volumes/V05-sky.md ===', '']
for h, body in blocks:
    out.append(f'=== REPLACE {h} ===')
    out.append(body)
    out.append('=== END ===')
    out.append('')
open(os.path.join(SCRATCH, 'blocks.txt'), 'w', encoding='utf-8').write('\n'.join(out))
open(os.path.join(HERE, 'edits.log'), 'w', encoding='utf-8').write('\n'.join(log) + '\n')

# the expected volume, built directly (the dry run must equal it)
new = text
for (hh, old, new_s, cnt, tag) in EDITS:
    assert new.count(old) == cnt, tag
    new = new.replace(old, new_s)
open(os.path.join(SCRATCH, 'V05.expected.md'), 'w', encoding='utf-8').write(new)
print('\n'.join(log))
print('expected sha256', hashlib.sha256(new.encode('utf-8')).hexdigest(), len(new.encode('utf-8')), 'bytes',
      new.count('\n'), 'newlines')
long_new = [l for l in new.split('\n') if len(l) > 120 and l not in text.split('\n') and not l.startswith('|')]
print('new non-table lines over 120 chars:', len(long_new))
for l in long_new:
    print('  ', len(l), l[:100])
