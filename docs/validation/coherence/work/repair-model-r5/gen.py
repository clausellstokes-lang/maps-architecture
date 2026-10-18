#!/usr/bin/env python3
"""repair-model-r5 generator: count-asserted edits over the live §2.7 and §2.9, written as REPLACE blocks.

usage: python3 gen.py BASE.md OUT_BLOCKS.txt
Only the touched ranges are re-composed (the support step bullet of §2.7 *Raised ways*, the `RaisedFoot` comment's
last paragraph, the `supports` line, the §2.9 `workingLayer` entry); every other line is verbatim. Binding:
adjudication-r5.md R5-02 (support step (3), (6), (7), `RaisedFoot`, `supports`) and R5-09 (§2.9 `workingLayer`).
"""
import hashlib, re, sys, textwrap

BASE_SHA = '5f34cceb61432ac420f375d84296f6d154dad2af6a1fbcdf329763425784334c'   # assemble-r4's output, the live base
WIDTH = 120
FENCE = re.compile(r'^\s*(```|~~~)')
HEAD = re.compile(r'^(#{1,6})\s+\S')

base_path, out_path = sys.argv[1], sys.argv[2]
raw = open(base_path, encoding='utf-8').read()
assert hashlib.sha256(raw.encode('utf-8')).hexdigest() == BASE_SHA, 'base is not assemble-r4 output'
lines = raw.split('\n')

H27 = "### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records"
H29 = "### 2.9 The document and serialisation"


def section(heading):
    idx = [i for i, l in enumerate(lines) if l == heading]
    assert len(idx) == 1, (heading, idx)
    s = idx[0]
    lvl = len(HEAD.match(heading).group(1))
    infence = False
    for j in range(s + 1, len(lines)):
        if FENCE.match(lines[j]):
            infence = not infence
            continue
        m = HEAD.match(lines[j]) if not infence else None
        if m and len(m.group(1)) <= lvl:
            return s, j
    return s, len(lines)


def find_line(sec, anchor, after=None):
    s, e = sec
    lo = s if after is None else after
    hits = [i for i in range(lo, e) if anchor in lines[i]]
    assert hits, ('anchor not found', anchor)
    if after is None:
        assert len(hits) == 1, ('anchor not unique', anchor, hits)
    return hits[0]


def bad_start(t):
    return bool(re.match(r'([-*+>|#]\s|\d+[.)]\s|=== )', t))


def wrap(text, first_indent, cont_indent, width=WIDTH):
    """Wrap one paragraph; never let a continuation line open with a list, quote, table or heading marker."""
    assert '  ' not in text, ('double space', text[text.find('  ') - 60:text.find('  ') + 20])
    words = text.split(' ')
    out, cur, empty = [], first_indent, True
    for w in words:
        cand = (cur + w) if empty else (cur + ' ' + w)
        if len(cand) > width and not empty:
            out.append(cur)
            cur = cont_indent + w
        else:
            cur = cand
        empty = False
    out.append(cur)
    # no continuation line may open with a marker: pull one more word down
    for k in range(1, len(out)):
        guard = 0
        while bad_start(out[k][len(cont_indent):]) and guard < 5:
            prev = out[k - 1]
            cut = prev.rfind(' ')
            assert cut > len(cont_indent), 'cannot fix wrap'
            out[k] = cont_indent + prev[cut + 1:] + ' ' + out[k][len(cont_indent):]
            out[k - 1] = prev[:cut]
            guard += 1
    assert not any(bad_start(out[k][len(cont_indent):]) for k in range(1, len(out)))
    return out


def sub1(text, old, new, label):
    n = text.count(old)
    assert n == 1, (label, n, old[:80])
    return text.replace(old, new)


edits_done = []

# ---------------------------------------------------------------- §2.7
s27 = section(H27)

# (E8) `supports`' `state` comment — one code line, replaced in place
i = find_line(s27, "never on a crossing station, which reads its wall stretch's `condition` (the support step (3), below)")
lines[i] = sub1(lines[i],
    "never on a crossing station, which reads its wall stretch's `condition` (the support step (3), below)",
    "never on a crossing station while a wall stretch lies under it, whose `condition` it reads (the support step (3), (6), below)",
    'E8 supports.state')
edits_done.append('E8 supports.state comment (R5-02)')

# (E7) `RaisedFoot`'s comment, its last paragraph (the `// At a deck end …` lines), re-wrapped at its own width
a = find_line(s27, "// At a deck end on the arena's outer ring — an aqueduct sourced beyond the frame")
b = find_line(s27, "// re-derivation re-placing both ends of that foot on the new rings, one transaction per part (§3.4)", after=a)
assert b - a == 4, (a, b)
txt = ' '.join(l.strip()[3:] if l.strip().startswith('// ') else l.strip() for l in lines[a:b + 1])
txt = sub1(txt, "then extends the deck to the new ring as §4.11 continues a through-road,",
           "then extends the deck to the new ring as §4.11 continues a through-road (the old deck's stations kept, the support step's (7)),",
           'E7 RaisedFoot')
new = wrap(txt, '  // ', '  // ', width=159)
lines[a:b + 1] = new
edits_done.append('E7 RaisedFoot comment (R5-02; VV34-r4-01)')

# the support step bullet: from "* **The support step**" to the end of (6) (b)
s27 = section(H27)
a = find_line(s27, "* **The support step**, run for every raised way — generated, declared or drawn — after its course and deck level are")
b = find_line(s27, "110 (b)), so a locked or pinned raised way is crossed as an unlocked one is (§7.4's lock column; T110-2).", after=a)
nxt = find_line(s27, "* **The clearance.** Over each crossed part-0 way", after=a)
assert nxt == b + 1, (b, nxt)
blk = lines[a:b + 1]
# the main paragraph: from a to the line holding "(6)" lead; then the (a) and (b) bullets
k6 = [k for k in range(len(blk)) if blk[k].startswith('  * (a) *At generation.*')]
assert len(k6) == 1
head_lines = blk[:k6[0]]
head = ' '.join(l.strip() for l in head_lines)
assert head.startswith('* **The support step**')
head = head[2:]
old6 = "(6) **later work across a raised way**, at generation and after it:"
assert head.endswith(old6), head[-120:]
head = head[:-len(old6)].rstrip()
assert head.endswith('after the largest key the way has held;'), head[-80:]

# (E1) (3)'s obstacles: the strip S7 will cut
head = sub1(head,
    "an enceinte's wall strip (`Enceinte.strips`) but for a crossing station on its band (below)",
    "an enceinte's wall strip (`Enceinte.strips`, or before S7 has cut it the strip S7 cuts beside the standing trace — its "
    "band's half, setback and glacis by §4.8's rows and the berm up to its moat) but for a crossing station on its band (below)",
    'E1 obstacles strip')
edits_done.append("E1 (3) obstacles: the strip S7 cuts (R5-02; VEW-r4-03)")
# (E2) (3)'s obstacles: the quay S7 lays along a `quay` bank
head = sub1(head,
    "a part-0 way's corridor (a bridge's, a pier's, a mole's or a quay's deck among them),",
    "a part-0 way's corridor (a bridge's, a pier's, a mole's or a quay's deck among them), and along a bank of kind `quay` "
    "(§4.2 S1 (7)) the corridor of the quay S7 lays there (§4.8),",
    'E2 obstacles quay')
edits_done.append("E2 (3) obstacles: the quay S7 lays (R5-02; VEW-r4-03)")
# (E3) (3)'s palisade parenthesis
head = sub1(head,
    "(a village map's palisade, `VillagePlan.palisade`, is no crossing: its trace abuts each support standing in its band, "
    "never moving it, and passes beneath every span, with no crossing station and no gate; V07 §3.5a (4))",
    "(only a stretch standing when the raised way is created; a stretch laid after it — a village palisade's among them — "
    "takes no station and runs on beneath the deck, (6) (d))",
    'E3 palisade parenthesis')
edits_done.append("E3 (3) palisade parenthesis (R5-02; VEW-r4-02)")
# (E4) (3)'s station's ring
head = sub1(head,
    "(no pier raised, no pier-height test; at a standing station a later trace takes, the pier's former ring with it, (6) (b) (iii))",
    "(no pier raised, no pier-height test)",
    'E4 station ring')
edits_done.append("E4 (3) the station's ring (R5-02; VEW-r4-01)")
# (E5) (3)'s held stretch: a removal of the wall around it never takes it
head = sub1(head,
    "and a hand op's dry run bends its stretch round it (item 101 R2); it may wear,",
    "and a hand op's dry run bends its stretch round it (item 101 R2); nor does a removal of the wall around it take it — "
    "a hand `delete` of the enceinte is bent to a `dismantle` of every other run, the record kept, and one of its raised "
    "gate or wall opening there changes nothing (§7.1's `bend.wall.held`), and `wallToWay`, `absorbWall` (§4.11; V06 "
    "§3.7.6 (5)) and the hand-off down that makes the enceinte the village's palisade (V07 §3.5a (4)) each leave it "
    "standing as a free-standing gate tower or arch carrying the deck, with no gate law and no junction with a ring road, "
    "the enceinte's record kept while it stands; it may wear,",
    'E5 held stretch')
edits_done.append("E5 (3) the held stretch under a removal of the wall (R5-02; END of VDC4-04, VDC4-05, VAL-R4-03)")

# (E6) (6) replaced; (7) new
lead6 = (
    "(6) **Held from its creation; later work gives way.** A raised way's stations, keys and spans are placed by (1)–(5) "
    "at the commit that creates it — at generation inside S4's or a stage's S5b route solve or at S6's end, at an epoch "
    "by V06 §3.19's founding, by hand at its declaration's commit — against the obstacles standing then, each span's `use` "
    "ruled once by the span rule (below); from that commit, at generation as after it, it is **held**: nothing laid later "
    "re-runs this step on it, moves, adds or omits a station, mints a key, re-rules a span or drops it; only an op that "
    "names it changes it (its edits, V06 §3.19's ops, a landfall, a frame growth's extension of its deck by (7)), and "
    "such an op keeps how it meets each wall stretch ((d)). A lock or pin holds the same; at a regeneration a locked, "
    "pinned or declared raised way stands before every stage the regeneration runs (§7.2). Its supports, its ramps, "
    "stairs and feet (`RaisedWayRecord.feet`) and, once the span rule has run, the under-deck strip of each `vault` span "
    "are a **reservation** on ground part 0, and everything laid after the raised way gives way to it:")
b_a = (
    "(a) *a part-0 way* — a route, S5c's proposal, a stage-2 seed's way, a village tracker, S7's quay, intervallum or "
    "castle path, a hand way — crosses the rest of its under-deck strip only by §4.3's crossing rule, each with its own "
    "ladder (§4.3's for a route; §4.4's for S5c's proposal; V01 §3.17.3 (3)'s for a stage-2 seed's way; V07 §3.5a (3)'s "
    "for a tracker; §4.8's lead for S7's; §7.1's `bend.raised.underSpan` and `bend.raised.around` for a hand way), a way "
    "whose ladder offers no crossing ending at the strip as at a reservation;")
b_b = (
    "(b) *a channel* — a moat's or a carve's — passes beneath where its crossing of the under-deck strip meets no part of "
    "the reservation; elsewhere it stops at the strip's edges, ending against the ground as against a berm (§4.2 S3 "
    "(10)), reported (`W_RAISED_CROSSING`), a hand carve's crossing first moved along the deck to the nearest that passes "
    "(`bend.raised.underSpan`);")
b_c = (
    "(c) *a face* — S8 holes its plots round the reservation and the under-deck strip (§4.6); a square, a reservation or "
    "a gate plaza is cut round the reservation; S7 roots no pier, mole or breakwater on it, a root moved along the shore "
    "to the nearest clear one;")
b_d = (
    "(d) *a wall stretch laid after the raised way was created* — a later stage's S5a trace at generation, an epoch's "
    "circuit, contraction or re-anchored stretch, a hand `drawWall`, a moved trace vertex, a dismantled stretch rebuilt "
    "on its line, a village palisade — keeps its course and **runs on beneath the deck**: each part of the reservation "
    "standing in its band is taken into the line, the run abutting its faces and closed against it, never moving it "
    "(town walls were built against standing aqueduct piers), at a `vault` span ending at its arch vault's two walled-up "
    "arch mouths, the chamber kept whole; beneath every other span it is an ordinary run whose top is no higher than "
    "that span's soffit (the arch walled up; derived at read, never stored — §4.5's daylight casters, §8.4's casters and "
    "heightfield and §11.1's glTF wall read it); it takes no crossing station and makes no gate on the deck, which "
    "passes over it (a raised arterial crossing a stage's boundary on its deck pins no gate, §4.4 S5a); no gate or tower "
    "stands in the under-deck strip — one the wall's law would place there moves to the nearest point clear of it, a "
    "tower along the trace and a gate along its way, or along the trace where the way is laid after the gate and "
    "follows it (a village track, V07 §3.5a (4)); the stretch's setback, glacis and berm stop at the under-deck strip's "
    "edges, closed along them, and its moat is a channel by (b). Each such meeting is reported (`W_RAISED_CROSSING` at "
    "generation; `walls.raisedCrossings` at an epoch, V06 §2.10; `bend.wall.raisedCrossing`'s line at a hand edit's dry "
    "run).")
tail6 = (
    "A stretch standing when the raised way is created carries it at a crossing station by (3); a stretch (3)'s repair "
    "re-lays under a crossing station is that station's support, never a later stretch; at a regeneration the stretches "
    "it re-derives are laid after a held raised way (above) — a re-derived stretch on a crossing station's line takes the "
    "station into the line as its support again, so an unchanged regeneration reproduces it, and a station no stretch "
    "lies under any more stands as a pier (its `ring` by (4)), its `supports` entry then carrying its own `state`. "
    "Nothing waits for a raised way, and no generated course is dropped for later work (T110-2). (7) **A frame growth's "
    "extension** (§3.2 (9)) keeps every station of the old deck — its key, position and support `ring` — and every span "
    "between two of them as it stands (`use`, `reason`, `state`, `held`); (1)–(5) and the span rule run on the "
    "extension alone, from the old deck's last interior station (with none, from its other foot) to the deck's new end "
    "on the new ring, against the obstacles standing then, its stations' keys minted after the largest the way has held "
    "((5)); so no pier of the old deck moves and no footing leaves (V04 §3.5.0 *At an epoch*).")
edits_done.append("E6 (6) replaced by the held rule with (a)–(d); (7) new (R5-02; VEW-r4-01, VEW-r4-02, VEW-r4-03, "
                  "VM-R4T-01, VM-R4T-05, VV34-r4-01; END of VM-R4T-02)")

newblk = []
newblk += wrap(head + ' ' + lead6, '* ', '  ')
for t in (b_a, b_b, b_c, b_d):
    newblk += wrap(t, '  * ', '    ')
newblk.append('')
newblk += wrap(tail6, '  ', '  ')
lines[a:b + 1] = newblk

# ---------------------------------------------------------------- §2.9
s29 = section(H29)
i = find_line(s29, "`workingLayer` (per viewer: the layer the tools act on — ground, a sky island's `PlatKey`, or an underground depth band;")
assert lines[i + 1].startswith("  V09 §4.2), `restore/<id>` (shared,"), lines[i + 1]
txt = lines[i].strip() + ' ' + lines[i + 1].strip()
txt = sub1(txt,
    "`workingLayer` (per viewer: the layer the tools act on — ground, a sky island's `PlatKey`, or an underground depth band; V09 §4.2)",
    "`workingLayer` (per viewer: the layer the tools act on and the view draws whatever its visibility, §8.4 — ground, a "
    "sky island's `PlatKey`, or the underground, its band the view key `depthBand` alone, never copied into "
    "`workingLayer`; its value V09 §2.4's `WorkingLayer`, its switch V09 §4.2)",
    'E9 workingLayer')
lines[i:i + 2] = wrap(txt, '  ', '  ')
edits_done.append('E9 §2.9 `workingLayer` (R5-09; VAL-R4-01)')

# ---------------------------------------------------------------- blocks
out = []
for h in (H27, H29):
    s, e = section(h)
    body = lines[s:e]
    while body and body[-1] == '':
        body.pop()
    out.append('=== REPLACE ' + h + ' ===')
    out.extend(body)
    out.append('=== END ===')
    out.append('')
open(out_path, 'w', encoding='utf-8').write('\n'.join(out))
print('\n'.join(edits_done))
