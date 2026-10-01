# V04 repair r2 — edits, part b: V04 §3.2 (N2, N3, N7), §3.5 (§3.5.2, §3.5.7), §3.10, §3.11, §3.12.
import os
EDITS = []
_ORIG = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'V04.orig.md'), encoding='utf-8').read()


def S(ids, old, new, count=1):
    EDITS.append((ids, old, new, count))


def line_starting(prefix):
    ls = [l for l in _ORIG.split('\n') if l.startswith(prefix)]
    assert len(ls) == 1, (prefix, len(ls))
    return ls[0]


# ---- §3.2 N2: the order, a candidate's bank, a bank's stretch (VV34-r1-08, R2-25 (b))
S('VV34-r1-08 §3.2 N2',
  "These fallbacks are taken **per bank** (N3: the parts of the graph the water divides, never crossed; J-V4.129). On a bank\n"
  "with none admitted, its `moat` candidates are admitted with the start cost `outfall.moatPenalty × outfall.reachM` (a town\n"
  "ditch took the town's waste; J-V4.7). With none of those either, U-NET makes that bank one **field outfall**: the D8 path\n"
  "of the hydro cell of largest accumulation on the bank's stretch of `R`'s boundary is followed outward to its first cell\n"
  "outside `R` and beyond the outermost enceinte's outer strip; the Outfall there is `{ into: 'field', water: null, at: that\n"
  "cell's centre, snapped }`, the cess field of a dry town. A bank whose stretch of `R`'s boundary lies wholly on water (an\n"
  "island in the river, a quarter between a river and a canal) and that holds no candidate makes none: its plots drain by\n"
  "gutter and pit, its area reported unsewered (F-NET's truncate rung). Every admitted candidate is linked to the nearest way\n"
  "junction on its own bank within `outfall.linkM` by a straight `outfallRun` edge that crosses no water face; a candidate\n"
  "with none is dropped.\n",
  "**The order, the banks and each candidate's bank (J-V4.129).** U-NET first builds N3's way, culvert and drainage edges,\n"
  "without outfall runs, and from them N3's banks (the parts of the graph the water divides, never crossed). Then every\n"
  "candidate — and every `Terrain.outfalls` entry with `into: 'moat'` within `outfall.reachM` of `R`, a **moat candidate** —\n"
  "takes its **link**: the nearest way junction (under `drainage-lines`, the nearest graph node) within `outfall.linkM`\n"
  "whose straight segment to the candidate's `at` crosses no water face, by plan distance, ties by address; the candidate's\n"
  "**bank** is its link's, and a candidate with no link is dropped. **A bank's stretch** of `R`'s boundary is the set of\n"
  "`R`'s boundary `hydro` cells — each a cell of `R` with a D8 neighbour outside `R` — whose nearest graph node, by plan\n"
  "distance, ties by address, lies on that bank; a cell of the stretch is **on water** when each of its D8 neighbours\n"
  "outside `R` lies in a water face. Admission and its fallbacks then run bank by bank, in N3's bank order, and last each\n"
  "admitted candidate's straight `outfallRun` edge to its link joins the graph, before N3's tree search. On a bank with\n"
  "none admitted, its moat candidates are admitted with the start cost `outfall.moatPenalty × outfall.reachM` (a town ditch\n"
  "took the town's waste; J-V4.7). With none of those either, U-NET makes that bank one **field outfall**: the D8 path of\n"
  "the cell of largest accumulation (ties by address) among its stretch's cells not on water is followed outward to its\n"
  "first cell outside `R` and beyond the outermost enceinte's outer strip; the Outfall there is `{ into: 'field', water:\n"
  "null, at: that cell's centre, snapped }`, the cess field of a dry town, and its outfall run follows that D8 path back to\n"
  "the stretch's cell and joins the cell's nearest graph node by a straight edge that crosses no water face (the bank's next\n"
  "nearest node where it would). A bank whose stretch is empty or lies wholly on water (an island in the river, a quarter\n"
  "between a river and a canal) and that holds no candidate makes none: its plots drain by gutter and pit, its area\n"
  "reported unsewered (F-NET's truncate rung).\n")

S('VV34-r1-08 §3.2 N3 outfall runs join last',
  "convex hull (the extent is fixed before the search; the Dijkstra then selects), plus N2's outfall-run edges — each with",
  "convex hull (the extent is fixed before the search; the Dijkstra then selects), plus N2's outfall-run edges, which join\n"
  "  last (N2's order) — each with")

# ---- §3.2 N7 (1): the receiving water's surface (VEW-r1-07, R2-25 (a))
S('VEW-r1-07 §3.2 N7 (1)',
  "1. **Root-first.** Each outfall knot's floor is `low = h(at) + freeboardCm`: the terrain's height at the shore stands for\n"
  "   the water surface, as §2.6's water table reads it, so the mouth sits `outfall.freeboardCm` above the water it\n"
  "   discharges into; a field outfall's is `h(at) − coverMinCm − headroomCm`.",
  "1. **Root-first.** Each outfall knot's floor is `low = s + freeboardCm`, `s` the receiving water's surface as §2.6's\n"
  "   water table reads it — a moat's the derived level of §4.2 S3 (10), every other body's terrain height at the shore,\n"
  "   `h(at)` — so the mouth sits `outfall.freeboardCm` above the water it discharges into; a field outfall's is\n"
  "   `h(at) − coverMinCm − headroomCm`.")

# ---- §3.5.2: the mining test read, not restated (R2-28 (a))
S('R2-28 §3.5.2',
  "× `mineBoost` (capped at `mineCap`) where the site\n"
  "**holds mining** — the share of the frame's land cells with `SiteResources.ore ≥ 0.5` reaches `miningCellShare`\n"
  "(V11 §3.23.1), or the roster holds a mining class, or the dossier carries a mining deposit (V04 §1b.5); one uniform on `sewer`",
  "× `mineBoost` (capped at `mineCap`) where the site\n"
  "**holds mining** — `Terrain.mining`, by §4.2 S1 (10)'s test (V04 §1b.5); one uniform on `sewer`")

# ---- §3.5.7 (d): one draw per (lineage, void kind, added-wing key) (VAT0-01)
S('VAT0-01 §3.5.7 (d)',
  "deeper cellars and more digging raise the chance of access as the settlement grows, and a building never draws twice for\n"
  "  one kind. Item 109 (d)'s \"chance raised over a ruin\" is this row.",
  "deeper cellars and more digging raise the chance of access as the settlement grows, and a building draws once per\n"
  "  void kind, plus once for each wing V02's mutator adds over a void (a `MutationPlan` step or a rung-3 op), its key\n"
  "  carrying that wing's key, never twice for one key (V06 §3.18.1 (2a); T-V6-34). Item 109 (d)'s \"chance raised over a\n"
  "  ruin\" is this row.")

S('VAT0-01 §3.5.7 determinism',
  "and within U-ACCESS each (building, void kind) has its own salt,",
  "and within U-ACCESS each dig key — the building, the void kind and, for an added wing, its key ((d)) — has its own salt,")

# ---- §3.5.7 *With a scope* (R2-12)
S('R2-12 §3.5.7 with a scope',
  "**With a scope.** `AccessPass.run(doc, scope?: EpochScope)`: without a scope (T2b) it runs (a)–(g) over the whole document;",
  "**With a scope.** `AccessPassStrategy.run(doc, rules, ctx, k, scope?: EpochScope)` (II.7.6): without a scope (T2b) it runs\n"
  "(a)–(g) over the whole document;")

# ---- §3.10 (R2-12)
S('R2-12 §3.10 callers',
  "`under.access` (order 20) runs `AccessPass.run(doc, scope)`; `under.undercity` (order 30)",
  "`under.access` (order 20) runs `AccessPassStrategy.run(doc, rules, ctx, k, scope)`;\n`under.undercity` (order 30)")
S('R2-12 §3.10 access at an epoch',
  "`under.access` runs `AccessPass.run(doc, scope)`\n  (V04 §3.5.7, *With a scope*)",
  "`under.access` runs\n  `AccessPassStrategy.run(doc, rules, ctx, k, scope)` (V04 §3.5.7, *With a scope*)")
S('R2-12 §3.10 opening pass',
  "2. at an epoch, as the last step of `AccessPass.run` with a scope",
  "2. at an epoch, as the last step of `AccessPassStrategy.run` with a scope")

# ---- §3.11: the outfall row's stretch (VV34-r1-08)
S('VV34-r1-08 §3.11 outfalls row',
  "| U-NET outfalls | no admitted candidate on a bank (V04 §3.2 N3) | that bank's moat candidates → its field outfall → its gutters and pits where no dry stretch of `R`'s boundary is left (F-NET's truncate rung) |",
  "| U-NET outfalls | no admitted candidate on a bank (V04 §3.2 N2, N3) | that bank's moat candidates → its field outfall → its gutters and pits where its stretch of `R`'s boundary is empty or lies wholly on water (V04 §3.2 N2; F-NET's truncate rung) |")

# ---- §3.11 UE32: the city band's pins and bubbles, the gaps Below, E8's re-reads (VV34-r1-09, VAT1-02, R2-34)
S('VV34-r1-09 VAT1-02 §3.11 UE32 E3',
  "E3: at the metropolis cap the pins merge into count bubbles by §8.2's rule;",
  "E3: at the city band every match has a pin or a count bubble (item 120 (k)) — a match whose element is under about 6 px "
  "carries its chip's pin, and pins and ghost pins closer than about 24 px merge into a count bubble by §8.2's rule, up to "
  "the metropolis cap; Show gaps Below: every `district` unit Below without a member — each undercity neighbourhood and the "
  "underground pseudo-district — is outlined dashed \"none here\", and a `walk` or `households` unit reads `underDistance` "
  "(V01 §5.4 (3); V04 §3.6a (5));")

S('G123-V04 VV34-r1-09 §3.11 UE32 tail and UE33',
  "redo, regenerate and migrate, the document never changed | — | T-V4-81 |\n",
  "redo, regenerate and migrate, the document never changed | — | T-V4-81 ((c) the gaps, (f) E8, (i) E3) |\n"
  "| UE33 | the damage below ground (V04 §5.6) | E1: a building never decayed (level 0), and an underground none of whose "
  "buildings has decayed, draw byte-identically to the build without the layer (`item123.damage`); E2: one element past its "
  "threshold is drawn damaged alone, and a crypt whose ring holds no cell centre of its column grid has one `cryptVault`, "
  "its room's ceiling whole; E3: at level 1 every element below ground is past its threshold — a cellar and a crypt draw "
  "partly collapsed, every room, wall line, way down and join kept (a ruined church keeps its crypt), the lowest storey's "
  "floor walkable; E4: a crypt-only basement on its ring alone takes its crypt's kinds only, a grid cell whose centre lies "
  "outside the ring is no bay, and an element a plan edit removes leaves with its part; E5: a kind with no V11 row, and "
  "every building before V06's level lands, read as V06 §3.23 (4) states; a building over a void whose cellar vault has "
  "fallen keeps its dig access, a church its crypt join — no stage reads the level; E6: every rung where a basement, a "
  "crypt or an underground building stands; E7: every toggle and preset alike, the parity presets included (a look); the "
  "layer hidden draws none of the underground view's part, a plan's storey below 0 still drawn; E8: a reading — save, "
  "load, undo, redo, regenerate and migrate re-read it at the drawn week, an undone restoration giving back the level its "
  "events give | — | T-V4-82 |\n")

# ---- §3.11 UC21: the damage × the access model (G123-V04)
_UC20 = line_starting('| UC20 |')
S('G123-V04 §3.11 UC21',
  _UC20 + "\n",
  _UC20 + "\n"
  "| UC21 | item 123's damage × the underground's access model — a ruined church whose crypt is joined to a catacomb, a "
  "ruined building over a cavern with its dig access, a cellar under a decayed building over a ruin, the buildings of a "
  "cluster turned `lost` | a drawing only (V04 §5.6 (4); J-V4.130): every access, link, crypt join, `ExcavationRecord` "
  "entry and excavation state is the same at every level, so a scrubbed week never opens or closes a way; a damaged stair "
  "core or access head below 0 draws as rubble over steps still climbable; a way closes only by this volume's closure "
  "states, and a `lost` cluster stays lost whatever its buildings show; a building in a `collapsed` or `flooded` element "
  "draws that element's §8.2 `states` row over its own damage | — | T-V4-82 (d) |\n")

# ---- §3.12: the dig key's added-wing key (VAT0-01); item 123 draws nothing here (G123-V04)
S('VAT0-01 §3.12 dig key',
  "each dig (`sewer` in U-ACCESS, the\nbuilding, salt the void kind);",
  "each dig (`sewer` in U-ACCESS, the\nbuilding, salt the void kind and, for a wing V02's mutator adds over a void, that wing's key; V04 §3.5.7 (d));")
S('G123-V04 §3.12 damage draws',
  "reading (the `lost` state and its memory included) draw nothing;",
  "reading (the `lost` state and its memory included) draw nothing; nor does the damage below ground, whose thresholds are\n"
  "§6.3's `plan.damage` draws keyed by the building's lineage and the element's id (V04 §5.6);")
