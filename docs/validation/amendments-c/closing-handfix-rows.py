#!/usr/bin/env python3
"""closing-handfix-rows.py — the hand-fix list of the bundled amendments pass c + d + e, as DATA rows (lane
amendments-c/closing, 2026-09-28; opus standing in for the Fable seat — PENDING FABLE REVIEW).

The 26 issue rows the round-3 verifiers left open (verify-model-r3, verify-determinism-r3, verify-pipeline-r3,
verify-rendering-r3, verify-scope-r3) fold into the 19 issues of closing-report.md §2; each sub-change below is one
exact single-occurrence substitution or insertion on docs/ARCHITECTURE.md or docs/ARCHITECTURE-RATIONALE.md, in the
order the report gives. Where the verifiers proposed different texts for one span, the row carries the closing seat's
one reconciled text (closing-report.md §3); rows marked CLOSING are the closing seat's additions (the lifecycle ripples
of the lifeline closure, the slab list's home and size, the derived casters' trigger).

This script never writes the design files. It checks the anchors (--check) or writes a DRY RUN into the files named
by --out-doc / --out-rationale, so the hand fix and the document checks can run on the result. The engine is
docs/validation/amendments-b/handfix/handfix.py's (every single space of an anchor also matches ONE soft line break
with its indentation; never a blank line). Stdlib only; run from the project root.

usage: python3 docs/validation/amendments-c/closing-handfix-rows.py --check
       python3 docs/validation/amendments-c/closing-handfix-rows.py --out-doc A --out-rationale B --log L
"""
import argparse, hashlib, importlib.util, json, os, re, sys

ROOT = os.getcwd()
spec = importlib.util.spec_from_file_location(
    'handfix', os.path.join(ROOT, 'docs/validation/amendments-b/handfix/handfix.py'))
H = importlib.util.module_from_spec(spec); spec.loader.exec_module(H)

DOC, RAT = 'docs/ARCHITECTURE.md', 'docs/ARCHITECTURE-RATIONALE.md'
EXPECT_DOC = '70ddb6e302ea06c19891bdba707570963c39a4e2760150432c97fb2d8f4bf819'
EXPECT_RAT = 'e138da2377d31b9fa9c1ae73ce7a64b1512a97f770c4b28c4d3844ad30aed16e'

R = []


def row(n, id_, owner, sub, file, kind, anchor, text, scope=None):
    R.append(dict(n=n, id=id_, owner=owner, sub=sub, file=file, kind=kind, anchor=anchor, text=text, scope=scope))


# ---------------------------------------------------------------- 1. VD3-02 (major) — determinism: §5.3's light row
row(1, 'VD3-02', 'determinism', '§5.3 light row', 'doc', 'replace',
    r"""| every `LightSource` (§2.7, item 68) stands in its host's faces on its host's arena, its height within its rule row's band; no light on a building whose Works stands before its finished stage (§4.11) | batch-local (touched lights and their hosts) | `pointLocate` on the host's `PlatKey`; the rule row's band |""",
    r"""| every `LightSource` (§2.7, item 68) stands in its host's faces on its host's arena (a door light, which stands on its footprint ring, within half a lattice diagonal of that ring's edge nearest it, on either side; §2.2 rule 3, §7.4), its height within its rule row's band; no light lit on a building whose Works stands before its finished stage, its record kept and unlit (§2.7; §4.7's *Light sources* (5); §4.11) | batch-local (touched lights and their hosts) | `pointLocate` on the host's `PlatKey` (a door light: its squared distance to its host footprint ring's nearest edge at most ½ cm², in exact integer arithmetic); the rule row's band |""")

# ---------------------------------------------------------------- 2. VD3-03 — pipeline: where a door light's point stands
row(2, 'VD3-03', 'pipeline', '(1) §4.7 LightRule.offsetCm', 'doc', 'insert_after',
    r"""count?: number /* per host; default 1 */;""",
    r""" offsetCm?: Cm /* 'door' rows: the lantern's distance from its entrance vertex along the footprint ring, on the drawn side — own default 60, calibratable */;""")
row(2, 'VD3-03', 'pipeline', '(2) §4.7 Light sources (4)', 'doc', 'insert_after',
    r"""on the concern `pin.light` keyed by the host's lineage and the rule row (§6.1).""",
    r""" A door light's point lies on its building's footprint ring, at its row's `offsetCm` from the entrance vertex (`LightSource.entrance`), walked along the ring on the drawn side and rounded to the lattice; §7.4 carries it and §5.3's light row checks it.""")

# ---------------------------------------------------------------- 3. VD3-01 — determinism: the door light's carry, off the lattice edge
row(3, 'VD3-01', 'determinism', '(1) §7.4 the carry', 'doc', 'replace',
    r"""instead keeps its fraction of the ring edge its point lies on — its new point that edge's two end vertices where the move leaves them, blended at the fraction its old point had between them before it (the mean-value image of a boundary point; `+ − × ÷` only), rounded to the lattice — so it stays on the moved facade whether the warp slides or turns it)""",
    r"""instead keeps its fraction of the ring edge nearest its point — the foot of its point on that edge, clamped to [0, 1], since a lattice point seldom lies exactly on an edge (§2.2 rule 3); the nearer of two edges by squared distance, a tie going to the edge that comes first in the ring's order — its new point that edge's two end vertices where the move leaves them, blended at that fraction (the mean-value image of a boundary point; `+ − × ÷` only), rounded to the lattice — so it stays within half a lattice diagonal of the moved facade whether the warp slides or turns it, the rounding never accumulating)""")
row(3, 'VD3-01', 'determinism', '(2) §7.4 the re-seat exception', 'doc', 'replace',
    r"""never a door light, which keeps that point on its ring edge wherever it falls, so no warp pushes it indoors""",
    r"""never a door light, which keeps that point by its ring edge wherever it falls, so no warp pushes it indoors beyond the lattice's own rounding""")
row(3, 'VD3-01', 'determinism', '(3) §7.4 the held-record exception', 'doc', 'replace',
    r"""a door light excepted, which goes with the ring edge it stands on (above)""",
    r"""a door light excepted, which goes with the ring edge nearest it (above)""")
row(3, 'VD3-01', 'determinism', '(4) J-A68.73 index row', 'doc', 'replace',
    r"""(a door light excepted: it keeps its fraction of the footprint ring's edge it stands on, never re-seated)""",
    r"""(a door light excepted: it keeps its fraction of the footprint ring's edge nearest it, measured at its point's foot, never re-seated)""",
    scope='| J-A68.73 |')
row(3, 'VD3-01', 'determinism', '(5) J-A68.73 Part A (restated in place)', 'rat', 'replace',
    r"""a door light keeping its fraction of the footprint ring's edge it stands on instead and never re-seated""",
    r"""a door light keeping its fraction of the footprint ring's edge nearest it (the foot of its point on that edge) instead and never re-seated""",
    scope='| J-A68.73 |')
row(3, 'VD3-01', 'determinism', '(6) J-A68.73 Part A reason', 'rat', 'insert_after',
    r"""while its fraction of its ring edge is that same mean-value image on the boundary itself""",
    r""", measured at its point's foot because a lattice point lies exactly on its edge in under 1 % of cases and within half a lattice diagonal of it otherwise""",
    scope='| J-A68.73 |')
row(3, 'VD3-01', 'determinism', '(7) J-A68.73 Part A provenance', 'rat', 'replace',
    r"""repair r2, VD1-04, VD1-05; repair r3, VD2-01). |""",
    r"""repair r2, VD1-04, VD1-05; repair r3, VD2-01; verify-determinism-r3, VD3-01). |""",
    scope='| J-A68.73 |')

# ---------------------------------------------------------------- 4. VS3-01 (= VD3-09) — scope: the lit-street fixture proves the carry
row(4, 'VS3-01 (= VD3-09)', 'scope', '§13.2 B-EDIT lit-street fixture', 'doc', 'replace',
    r"""the door light keeping its fraction of the footprint ring's edge it stands on and never re-seated""",
    r"""the door light keeping its fraction of the footprint ring's edge nearest it and never re-seated, through two successive warps, the second starting from its lattice-rounded point off that edge, and passing §5.3's light row after each""")

# ---------------------------------------------------------------- 5. VD3-05 (= V-MC3-02 = VPR3-04 §7.3) — determinism: the closure's instances by edit kind and subject
row(5, 'VD3-05 (= V-MC3-02, VPR3-04 §7.3)', 'determinism', '(1) §7.3 item 9 (d)', 'doc', 'replace',
    r"""A clandestine front that lacks its concealed door (§4.7, item 63) and an undercity entrance that lacks its lifeline (II.7.5, item 65) are closures too, each built by the generators its edit kind declares (§2.8) —""",
    r"""A clandestine front that lacks its concealed door (§4.7, item 63; the `setAttr` that sets a placed use's `concealment` to `front`, acting on the use's building; T66-5) and an undercity neighbourhood that an edit leaves without a lifeline (II.7.5's condition 4, item 65; a `drawBoundary` that adds one on the undercity's part or a `split` of one, §7.1's districts row, acting on that neighbourhood's `District`, whose lineage keys the lifeline's draws) are closures too, each built by the generators its edit kind declares (§2.8) —""")
row(5, 'VD3-05 (= V-MC3-02, VPR3-04 §7.3)', 'determinism', '(2) §6.1 sewer concern: the closure generators keyed by the edited entity (CLOSING)', 'doc', 'replace',
    r"""and an underground closure's generators (II.7.6; §7.3 item 9, item 66), keyed by the building's lineage, the target's and the event's `seq`""",
    r"""and an underground closure's generators (II.7.6; §7.3 item 9, items 65, 66), keyed by the edited entity's lineage — the building's, or an undercity lifeline's neighbourhood `District` (§7.3 item 9 (d)) — the target's and the event's `seq`""")
row(5, 'VD3-05 (= V-MC3-02, VPR3-04 §7.3)', 'determinism', '(3) J-A66.72 index row (new)', 'doc', 'insert_line',
    r"""| J-A68.94 |""",
    r"""| J-A66.72 | the closure's two further instances named by edit kind and subject: the `setAttr` of a placed use's `concealment` to `front` (the use's building) and a `drawBoundary` or `split` on the undercity's part that leaves a neighbourhood without a lifeline (that neighbourhood's `District`, whose lineage keys the draws, whose ring the connector starts from, and which the dug system's `sources` names where a connector is dug) | §7.3, II.7.6 |""")
row(5, 'VD3-05 (= V-MC3-02, VPR3-04 §7.3)', 'determinism', '(4) J-A66.72 Part A entry (new)', 'rat', 'insert_line',
    r"""| J-A68.94 |""",
    r"""| J-A66.72 | Chose to name the edit kind and the subject of the closure's concealed-door and undercity-lifeline instances — the `setAttr` that sets a placed use's `concealment` to `front`, acting on the use's building, and a `drawBoundary` or `split` on the undercity's part that leaves a neighbourhood without a lifeline, acting on that neighbourhood's `District`, whose ring the lifeline's connector starts from in place of a basement ring — over the unnamed "undercity entrance", because §2.8 declares closure generators per edit kind, item 9 (b) keys every piece's draws by the edited entity's lineage, II.7.6's connector needs a ring to start from, and §2.7's `UndergroundSystem.sources` must name the entity a closure-dug passage answers to; an undercity neighbourhood is a district like any (§7.1), so the edits that add or divide one are the ones whose own subject can lack its lifeline; and, since such a closure can dig the first `dug` passage, the `dug` system is created by the first closure of either kind that needs one, which §2.1, §4.11 and II.7.6 now say (§7.3, II.7.6; items 65, 66; verify-determinism-r3, VD3-05 = V-MC3-02 = VPR3-04, from model r3's cross-part note; amendments-c closing). |""")

# ---------------------------------------------------------------- 6. VD3-06 (= V-MC3-03, VPR3-04 §2.7) — model: what explains a closure-dug lifeline
row(6, 'VD3-06 (= V-MC3-03, VPR3-04 §2.7)', 'model', '(1) §2.7 UndergroundSystem.sources', 'doc', 'replace',
    r"""the building whose access edit dug a passage (`addUndergroundAccess`, item 66) */""",
    r"""the building whose access edit dug a passage (`addUndergroundAccess`, item 66), or the undercity neighbourhood's `District` whose lifeline closure dug one (§7.3 item 9 (d)) */""")
row(6, 'VD3-06 (= V-MC3-03, VPR3-04 §2.7)', 'model', '(2) §2.1 the underground layer: the dug part (CLOSING)', 'doc', 'replace',
    r"""or the private passages an access edit digs (`dug`)""",
    r"""or the private passages an access edit or an undercity lifeline's closure digs (`dug`)""")
row(6, 'VD3-06 (= V-MC3-03, VPR3-04 §2.7)', 'model', '(3) §2.1 when a dug system exists (CLOSING)', 'doc', 'replace',
    r"""or, for a `dug` system, when an access edit makes one once those stages exist""",
    r"""or, for a `dug` system, when an access edit or an undercity lifeline's closure makes one once those stages exist""")

# ---------------------------------------------------------------- 7. VD3-07 (= VPR3-04 II.7.6) — pipeline: the lifeline's generators run from the district
row(7, 'VD3-07 (= VPR3-04 II.7.6)', 'pipeline', '(1) II.7.6 closing paragraph', 'doc', 'replace',
    r"""an undercity entrance's missing lifeline by the target, connector, access-point and link steps above (II.7.5)""",
    r"""an undercity neighbourhood's missing lifeline by the target, connector, access-point and link steps above (II.7.5), run from that neighbourhood's district ring in place of a basement ring, its target the nearest element of another system with an access to the surface (II.7.5's condition 4), and keyed by that district's lineage""")
row(7, 'VD3-07 (= VPR3-04 II.7.6)', 'pipeline', '(2) II.7.6 the dug kind (CLOSING)', 'doc', 'replace',
    r"""`dug` (the private passages an access edit digs, item 66)""",
    r"""`dug` (the private passages an access edit or an undercity lifeline's closure digs, item 66)""")
row(7, 'VD3-07 (= VPR3-04 II.7.6)', 'pipeline', '(3) II.7.6 when the dug system is created (CLOSING)', 'doc', 'replace',
    r"""a `dug` system at the first access edit that needs one""",
    r"""a `dug` system at the first closure that needs one — an access edit's or an undercity lifeline's (§7.3 item 9 (d))""")
row(7, 'VD3-07 (= VPR3-04 II.7.6)', 'pipeline', '(4) §4.11 frame growth: the dug part (CLOSING)', 'doc', 'replace',
    r"""and the passages access edits dig""",
    r"""and the passages access edits and undercity lifeline closures dig""")

# ---------------------------------------------------------------- 8. VS3-02 (⊇ VD3-08) — scope: T66-6 proves the lifeline instance
row(8, 'VS3-02 (= VD3-08, widened)', 'scope', '(1) §13.2 T66-6', 'doc', 'replace',
    r"""that door; with no such edge it adds none, the concealed programme reached from the front's service side (§4.7's *Concealed institutions* (4) (b)).""",
    r"""that door; with no such edge it adds none, the concealed programme reached from the front's service side (§4.7's *Concealed institutions* (4) (b)); (T66-6) a `drawBoundary` that adds an undercity neighbourhood no lifeline reaches, and a `split` of one that leaves a part no lifeline reaches, each adds that neighbourhood's nearest lifeline by II.7.6's target, connector, access-point and link steps in the same event, its closure record naming them and, where it digs a connector, the dug system's `sources` naming the neighbourhood's `District`; its undo removes exactly them (§7.3 item 9 (d); J-A66.72).""")
row(8, 'VS3-02 (= VD3-08, widened)', 'scope', '(2) §16 M4 exit', 'doc', 'replace',
    r"""the hook fixtures of items 64, 65, 66 (T66-1 – T66-4)""",
    r"""the hook fixtures of items 64, 65, 66 (T66-1 – T66-4, T66-6)""")
row(8, 'VS3-02 (= VD3-08, widened)', 'scope', '(3) J-A66.01 index row', 'doc', 'replace',
    r"""its staged-layer refusal and T66-1 – T66-4 at M4""",
    r"""its staged-layer refusal and T66-1 – T66-4 and T66-6 at M4""",
    scope='| J-A66.01 |')
row(8, 'VS3-02 (= VD3-08, widened)', 'scope', '(4) J-A66.01 Part A (restated in place)', 'rat', 'replace',
    r"""and its bars T66-1 – T66-4 at M4 with the underground layer's hooks""",
    r"""and its bars T66-1 – T66-4 at M4 with the underground layer's hooks, T66-6 (the undercity-lifeline instance, J-A66.72) with them""",
    scope='| J-A66.01 |')
row(8, 'VS3-02 (= VD3-08, widened)', 'scope', '(5) J-A66.01 Part A provenance', 'rat', 'replace',
    r"""(§16, §13.2; item 66; repair r1, VSC-01; repair r2, VS1-07)""",
    r"""(§16, §13.2; item 66; repair r1, VSC-01; repair r2, VS1-07; verify-scope-r3, VS3-02 = VD3-08)""",
    scope='| J-A66.01 |')

# ---------------------------------------------------------------- 9. VS3-03 — scope: §0.2 row 66 cites J-A66.72 and schedules T66-6
row(9, 'VS3-03', 'scope', '(1) §0.2 row 66 rulings', 'doc', 'replace',
    r"""home §7.3 item 9, the closure rule (J-A66.71);""",
    r"""home §7.3 item 9, the closure rule (J-A66.71) and its instances by edit kind and subject (J-A66.72);""")
row(9, 'VS3-03', 'scope', '(2) §0.2 row 66 schedule', 'doc', 'replace',
    r"""the access edit at M4 with the underground layer's hooks (§16; J-A66.01)""",
    r"""the access edit and the undercity-lifeline instance (T66-6) at M4 with the underground layer's hooks (§16; J-A66.01)""")

# ---------------------------------------------------------------- 10. V-MC3-01 (= VPR3-03) — model: concealmentSource points to §4.7 (1)
row(10, 'V-MC3-01 (= VPR3-03)', 'model', '§2.7 Use.concealmentSource comment (one reconciled text)', 'doc', 'replace',
    r"""one that withdraws the dossier's mode re-resolves the mode by §4.7's Concealed institutions (1) from the map-side sources — a map assignment's value, else the class table on the institution's `siting` draw, else `none` (the use then placed as an open use) — as that event's least-disruption mutation (§7.7 items 5, 11 (b)), writing their source.""",
    r"""one that withdraws the dossier's mode re-resolves it from the map-side sources and re-places the use by §4.7's Concealed institutions (1), writing their source here (J-A63.22).""")

# ---------------------------------------------------------------- 11. VPR3-02 — pipeline: J-A63.41 no longer says "once"
row(11, 'VPR3-02', 'pipeline', '(1) J-A63.41 Part A (restated in place)', 'rat', 'replace',
    r"""resolved once per institution from the dossier, then an assignment""",
    r"""resolved per institution when it is first placed — and again, from the map-side sources, only when a dossier event withdraws the mode the dossier set (J-A63.22) — from the dossier, then an assignment""",
    scope='| J-A63.41 |')
row(11, 'VPR3-02', 'pipeline', '(2) J-A63.41 Part A provenance', 'rat', 'replace',
    r"""(§4.7; item 63 (a), (b); amendments-c, pipeline seat D). |""",
    r"""(§4.7; item 63 (a), (b); amendments-c, pipeline seat D; verify-pipeline-r3, VPR3-02). |""",
    scope='| J-A63.41 |')

# ---------------------------------------------------------------- 12. VPR3-01 — pipeline: the cluster kind's depth is a range, and the web's spacing depth is named
row(12, 'VPR3-01', 'pipeline', '(1) §10.2 ClusterRow.kinds.depthM', 'doc', 'replace',
    r"""footprintM2: [number, number]; depthM: number }[];""",
    r"""footprintM2: [number, number]; depthM: [number, number] /* the kind's structure depth, drawn in the range on siteplan; §4.7's footpath web spaces by the row's largest upper end */ }[];""")
row(12, 'VPR3-01', 'pipeline', '(2) §4.7 S11 Informal clusters 3 (i)', 'doc', 'replace',
    r"""ending one structure depth before the opposite side""",
    r"""ending one structure depth — the largest `depthM` upper end among the cluster row's kinds (§10.2), which every later "structure depth" of this step reads — before the opposite side""")

# ---------------------------------------------------------------- 13. VD3-04 — determinism: the last layer-meaning "item 1" in §7.7
row(13, 'VD3-04', 'determinism', '§7.7 Intent comment', 'doc', 'replace',
    r"""// — layer 1's record (item 1): the recipe's intent, `Recipe.intent` (§2.9); item 1's rows expand it to the internal parameters""",
    r"""// — layer 1's record: the recipe's intent, `Recipe.intent` (§2.9); layer 1's expansion rows turn it into the internal parameters""")

# ---------------------------------------------------------------- 14. VRC3-01 — rendering: one caster set for every holder's levels ≥ 1
row(14, 'VRC3-01', 'rendering', '(1) §8.1 item 2 the city band\'s casters', 'doc', 'replace',
    r"""each building's footprint mark carries the building's `Heights`, its max over its wings (§2.6), so the ring blocks (§8.8) and `surfaceTopCm` read the whole document's casters from the one list the tile worker always holds, and a finer band adds no caster above them""",
    r"""each base wing of a building of several has a caster mark in the city band carrying its own `Heights`, drawn by no program there (as a tree line's crowns), a building of one wing casting by its footprint mark; and the city band carries the caster marks of every composition's wings and towers and every close-up's casters that the elaboration cache holds (§2.9, §8.6) — added in the `DisplayDelta` that answers the band request deriving them, removed with the cache entry, and included in every full build — a composed building's replacing its base wings'; so the city band carries every caster any band draws at the heights that band draws, and the ring blocks (§8.8) and `surfaceTopCm` read them from the one list the tile worker always holds""")
row(14, 'VRC3-01', 'rendering', '(2) §8.8 pyramid levels read the city band\'s casters', 'doc', 'replace',
    r"""levels 1–9 per cell the greatest height of the marks whose outlines""",
    r"""levels 1–9 per cell the greatest height of the city band's caster marks (§8.1 item 2) whose outlines""")
row(14, 'VRC3-01', 'rendering', '(3) §8.8 blocks equal, not bounded', 'doc', 'replace',
    r"""so no cell of a block lies below what the view's band writes there""",
    r"""so a block's cell equals the same cell of any pyramid""")
row(14, 'VRC3-01', 'rendering', '(4) §8.3 mountainous row', 'doc', 'replace',
    r"""every block cell at or above the greatest height the district band's marks write there, the city band carrying every caster (§8.1 item 2)""",
    r"""every block cell equal to that cell in a pyramid built at any band, the city band carrying every caster at the heights its band draws (§8.1 item 2); a building of two base wings — a 10 m hall and a 30 m tower — two rings outside the view at the building band (and, from their stages, a composed building and a close-up's caster), its shadow in the view identical before and after a pan brings it into the first ring""")
row(14, 'VRC3-01', 'rendering', '(5) J-A68.93 index row', 'doc', 'replace',
    r"""which S14 makes carry every caster — a tree line's `instances` mark with an empty city-band rank subset, a footprint with its building's heights — so every view and export reads one caster set held whole,""",
    r"""which S14 makes carry every caster at the heights the band that draws it draws — a tree line's `instances` mark with an empty city-band rank subset, an undrawn caster mark per base wing (a one-wing building casting by its footprint), the casters of the compositions and close-ups the elaboration cache holds — so every view and export reads one caster set held whole, a block's cell equal to that cell in any pyramid,""",
    scope='| J-A68.93 |')
row(14, 'VRC3-01', 'rendering', '(6) J-A68.93 Part A casters (restated in place)', 'rat', 'replace',
    r"""and a building's footprint with the building's `Heights`, its max over its wings —""",
    r"""an undrawn caster mark per base wing with its own `Heights` (a building of one wing casting by its footprint), and the caster marks of the compositions and close-ups the elaboration cache holds, a composed building's replacing its base wings' —""",
    scope='| J-A68.93 |')
row(14, 'VRC3-01', 'rendering', '(7) J-A68.93 Part A reason', 'rat', 'replace',
    r"""where the city band's casters, once they include the tree lines and carry each building's highest wing, bound every finer band's (§8.3's mountainous row checks it)""",
    r"""where the city band's casters, once they include the tree lines and every caster any band draws at that band's heights, equal every finer band's, so a far shadow never changes when a pan moves its caster between the first ring and a block — a footprint at its highest wing's height would shade a 10 m hall with a 30 m tower as a 30 m block beyond the first ring (verify-rendering-r3's VRC3-01), and the casters follow the elaboration cache, as the finer bands' drawing does, so the picture stays a function of the document and its cache (§8.3's mountainous row checks it)""",
    scope='| J-A68.93 |')
row(14, 'VRC3-01', 'rendering', '(8) J-A68.93 Part A provenance', 'rat', 'replace',
    r"""(§8.1 items 2 and 6, §8.8, §8.9, §11.1; item 68; repair round 3, VRC2-02, VRC2-05)""",
    r"""(§8.1 items 2 and 6, §8.8, §8.9, §11.1; item 68; repair round 3, VRC2-02, VRC2-05; verify-rendering-r3, VRC3-01; amendments-c closing: the casters follow the elaboration cache)""",
    scope='| J-A68.93 |')
row(14, 'VRC3-01', 'rendering', '(9) §8.1 item 6 size: the caster marks and the slab list (CLOSING; with VRC3-02)', 'doc', 'insert_after',
    r"""≈ 4 MB of coordinates and ≤ 0.5 MB of label, instance and string rows — ≈ 10 MB;""",
    r""" the undrawn caster marks of item 2 add 54 B each and their coordinates, and the slab list (§8.8) 16 B per record and 8 B per outline vertex, both counted on B-CITY at M2b;""")

# ---------------------------------------------------------------- 15. VRC3-02 — rendering: slabs inside the window, one slab list per document
row(15, 'VRC3-02', 'rendering', '(1) §8.1 surfaceTopCm counts slab tops', 'doc', 'replace',
    r"""that a caster of the city band's list writes into the surface layer or a pyramid (§8.4 (a), §8.8)""",
    r"""that a caster of the city band's list writes into the surface layer, a pyramid or the slab list (a slab's top: an island's, a span mark's, a deck's; §8.4 (a), §8.8)""")
row(15, 'VRC3-02', 'rendering', '(2) §8.4 (a) a slab is a record of the document\'s slab list (CLOSING)', 'doc', 'replace',
    r"""each a per-tile record of its outline, its top and its underside""",
    r"""each a record of the document's slab list (§8.8) — its outline, its top and its underside""")
row(15, 'VRC3-02', 'rendering', '(3) §8.8 the slab list held and transferred', 'doc', 'insert_after',
    r"""and no block waits for a band answer.""",
    r""" The **slab list** is one per document — every slab caster of the city band (§8.4 (a)), each its outline, top and underside — held whole by the tile worker, transferred to the main thread with the first surface layer and again with any delta that changes a slab, and read by the traversal wherever the ray runs within R; its memory is counted with the display list (§8.1 item 6), since it is held once, not per tile position.""")
row(15, 'VRC3-02', 'rendering', '(4) §8.9 tile worker → main row', 'doc', 'replace',
    r"""and each first-ring position's heights with their pyramid and each ring block (§8.8)""",
    r"""and each first-ring position's heights with their pyramid and each ring block (§8.8), and the slab list (its records; §8.8)""")
row(15, 'VRC3-02', 'rendering', '(5) §8.3 island-shadow row', 'doc', 'insert_line',
    r"""| hand lantern (item 68; §8.4 (b), (f)):""",
    r"""| island shadow (item 68; §8.4 (a), (c); II.6): a hand-built island record 100 m above a golden TOWN whose highest roof is ≈ 40 m, `ghost` occlusion, the fixed sun, the view at the 1:500 stop with the island inside it and again two rings outside it, CPU reference and GPU pass | ink, lit | the shadow's near edge at the similar-triangles distance past the outline within max(1 px, the diagonal of §8.4 (c)'s floor cell there), equal in both placements, the GPU within §13.4's tolerance |""")

# ---------------------------------------------------------------- 16. VRC3-03 — rendering: §8.8's print paragraph points to §11.1
row(16, 'VRC3-03', 'rendering', '§8.8 print paragraph', 'doc', 'replace',
    r"""its transient list carries the marks its first rings and light maps read and the city band's casters its blocks read, over the frame dilated by its window R, whose Z is the city band's `surfaceTopCm` the generation worker keeps, never the list's own (§11.1, §8.1 item 6)""",
    r"""its transient list carries what its first rings, light maps and blocks read beyond the frame, the window's Z the city band's `surfaceTopCm` the generation worker keeps (§11.1; §8.1 item 6)""")

# ---------------------------------------------------------------- 17. VRC3-04 — rendering: the export window's bound by scale
row(17, 'VRC3-04', 'rendering', '(1) §8.8 the export tile\'s window', 'doc', 'replace',
    r"""≤ 30 MB whatever R (one export tile's blocks ≤ 13.1 MB at the 1:500 scale over the frame at the population cap, `amendc_repair_rendering_r3_blocks.out` (3))""",
    r"""≤ 14 MB plus its blocks whatever R — the blocks ≤ 13.1 MB at the 1:500 scale and 300 dpi over the frame at the population cap (`amendc_repair_rendering_r3_blocks.out` (3)) and ≤ 1.7 MB more per halving of the export tile's world side (18.52 MB at 1:100 and 600 dpi, `amendc_verify_rendering_r3_exportscale.out`)""")
row(17, 'VRC3-04', 'rendering', '(2) §8.8 the block cache', 'doc', 'replace',
    r"""computed while they fit in 16 MB""",
    r"""computed while they fit in max(16 MB, the tile in progress's blocks)""")
row(17, 'VRC3-04', 'rendering', '(3) §12.8 the export window', 'doc', 'replace',
    r"""≤ 30 MB whatever the window's reach""",
    r"""within §8.8's bound (≤ 30 MB at 1:500 and 300 dpi, ≤ 33 MB at 1:100 and 600 dpi)""")
row(17, 'VRC3-04', 'rendering', '(4) J-A68.90 index row', 'doc', 'replace',
    r"""with a 16-MB block cache (≤ 30 MB whatever its reach)""",
    r"""with a block cache of max(16 MB, the tile in progress's blocks) (≤ 14 MB plus its blocks, which grow by ≤ 1.7 MB per halving of the export tile's world side: ≤ 30 MB at 1:500 and 300 dpi, ≤ 33 MB at 1:100 and 600 dpi)""",
    scope='| J-A68.90 |')
row(17, 'VRC3-04', 'rendering', '(5) J-A68.90 Part A (restated in place)', 'rat', 'replace',
    r"""a lit export keeps its blocks in a 16-MB cache so each is computed once, its window ≤ 30 MB whatever its reach""",
    r"""a lit export keeps its blocks in a cache of max(16 MB, the tile in progress's blocks) so each is computed once, its window ≤ 14 MB plus its blocks whatever its reach — ≤ 30 MB at 1:500 and 300 dpi and ≤ 33 MB at 1:100 and 600 dpi, the blocks growing by ≤ 1.7 MB per halving of the export tile's world side (verify-rendering-r3, VRC3-04)""",
    scope='| J-A68.90 |')

# ---------------------------------------------------------------- 18. VS3-04 (= VRC3-05) — scope: the hand-lantern row runs at M4
row(18, 'VS3-04 (= VRC3-05)', 'scope', '§16 M4 exit', 'doc', 'replace',
    r"""(T81-1), and the lit-street warp fixture's tunnel, access-point and Works clauses |""",
    r"""(T81-1), the lit-street warp fixture's tunnel, access-point and Works clauses, and §8.3's hand-lantern row on the underground layer's hook fixture (§8.4 (f); J-A68.92) |""")

# ---------------------------------------------------------------- 19. VS3-05 (with VS3-04; = VRC3-05's measurement) — rendering: the lantern is measured at M4
row(19, 'VS3-05', 'rendering', '(1) §12.5 measurement', 'doc', 'replace',
    r"""the GPU pass's frame time while the pointer sweeps the reference and low-end views at every rung, underground with the hand lantern on, and on §8.3's mountainous fixture under its 15° and 7° suns, whose rays cross the ring blocks.""",
    r"""the GPU pass's frame time while the pointer sweeps the reference and low-end views at every rung and on §8.3's mountainous fixture under its 15° and 7° suns, whose rays cross the ring blocks — and, at M4 on the underground layer's hook fixture of §8.3's hand-lantern row, underground with the hand lantern on.""")
row(19, 'VS3-05', 'rendering', '(2) J-A68.92 Part A cost (restated in place)', 'rat', 'replace',
    r"""its cost is ≤ 0.5 ms of the GPU pass's frame (≈ 113 m² lit), PLAUSIBLE until M2b;""",
    r"""its cost is ≤ 0.5 ms of the GPU pass's frame (≈ 113 m² lit), PLAUSIBLE until its M4 measurement on the underground layer's hook fixture (§12.5);""",
    scope='| J-A68.92 |')
row(19, 'VS3-05', 'rendering', '(3) J-A68.92 Part A provenance', 'rat', 'replace',
    r"""(§8.4 (f), §8.3, §12.5; item 68; repair round 2, VRC1-17; repair round 3, VRC2-06)""",
    r"""(§8.4 (f), §8.3, §12.5; item 68; repair round 2, VRC1-17; repair round 3, VRC2-06; verify-scope-r3, VS3-05 = VRC3-05)""",
    scope='| J-A68.92 |')


def ws(s):
    return re.sub(r'\s+', ' ', s)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--check', action='store_true')
    ap.add_argument('--out-doc'); ap.add_argument('--out-rationale'); ap.add_argument('--log')
    a = ap.parse_args()
    doc0 = open(DOC, encoding='utf-8').read(); rat0 = open(RAT, encoding='utf-8').read()
    hd, hr = H.sha(doc0), H.sha(rat0)
    if hd != EXPECT_DOC or hr != EXPECT_RAT:
        sys.exit(f'input hashes differ: doc {hd[:16]}…, rationale {hr[:16]}… — re-derive the rows on the live files first')
    texts = {'doc': doc0, 'rat': rat0}
    orig = {'doc': doc0, 'rat': rat0}
    log, bad = [], 0
    for r in R:
        n0, _ = H.locate(orig[r['file']], r)
        n1, ms = H.locate(texts[r['file']], r)
        ok = n0 == 1 and n1 == 1
        entry = dict(n=r['n'], id=r['id'], owner=r['owner'], sub=r['sub'], file=r['file'], kind=r['kind'],
                     anchor_count_original=n0, anchor_count_evolving=n1)
        if ok and not a.check:
            texts[r['file']], note = H.apply_one(texts[r['file']], r, ms[0])
            entry['note'] = note
            entry['new_text_count'] = ws(texts[r['file']]).count(ws(r['text'].strip()))
            ok = entry['new_text_count'] == 1
        entry['ok'] = ok
        bad += not ok
        log.append(entry)
        print(('OK  ' if ok else 'FAIL'), r['n'], r['id'], '|', r['sub'], '|', n0, n1, entry.get('new_text_count', ''))
    print(f'{len(R)} rows, {bad} failing')
    if a.log:
        json.dump(log, open(a.log, 'w'), indent=1, ensure_ascii=False)
    if not a.check and not bad:
        if a.out_doc:
            open(a.out_doc, 'w', encoding='utf-8').write(texts['doc'])
        if a.out_rationale:
            open(a.out_rationale, 'w', encoding='utf-8').write(texts['rat'])
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
