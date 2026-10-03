from helper import build, src
from sanitize import sanitize
import re, sys
text = src(4305, 4404)
R = []
def r(a, b, c=1): R.append((a, b, c))

r("""| J-V11.8 | chose ≈ 179 authored town and city classes (more than §16's 60–100 estimate) because the 280 catalogue kinds need distinct buildings for distinct siting; the extra authoring is priced in BCR-V11-11 |""",
  """| J-V11.8 | chose 181 authored town and city classes (V11 §3.5.14's count; more than §16's 60–100 estimate) because the 280 catalogue kinds need distinct buildings for distinct siting; the extra authoring is priced in items 532 and 568 |""")
r("""per-cell provenance across ≈ 230 classes by hand""", """per-cell provenance across every compiled class by hand""")
r("""| J-V11.28 | chose to read SettlementForge's catalogue names, tags, categories and tiers from the V08 lane's export in the session scratchpad (the owner's own program, not a reference) to write all 280 kind rows now, over leaving them to the apply step; the descriptions were not read; the committed catalogue manifest (registry row 77) replaces that source for the build |""",
  """| J-V11.28 | chose to write all 280 kind rows from SettlementForge's own catalogue — its names, tags, categories and tiers, read by V08's build step from `research/sf` (the owner's own program, not a reference) and committed as the catalogue manifest (registry row 77), the build's one source — over leaving them to a later step; the descriptions are not read |""")
r("""and the source rule keeps arches honest either way — revised by reconciliation round 1 (SS-13; the former `aqueduct.dossierFactor` 1.5 withdrawn) |""",
  """and the source rule keeps arches honest either way |""")
r("""(the two strike rates withdrawn by J-V11.71; round 2, SCC-30) |""", """— amended by J-V11.71 |""")
r("""*Amended (round 4's continuation, SCC-R3C-15; J-V11.91):* "resolving no other table under `VG`" and its premise (no stage a `VG` document runs reads another table) are withdrawn — a village's epochs read the epoch tables — so every table resolves under `VG` by §7.6's order, a categorical cell of a table no village stage reads to its `MFCG` entry; the entry rule above stands |""",
  """— amended by J-V11.91 |""")
r("""J-V11.77 amended; BCR-V11-31's new text amended (file f item 581, by note to the base-change lane)""",
  """item 581's text follows""")
r("""the package's pipeline registrations (S7c, S8.seed, S9b, its S13a step)""", """the package's pipeline registrations (S7c, S8, S9b, its S13a step)""")
r("""and over-listing a step is only reported; kept the finding's pre-decided move: should T-V11-1 (b)'s recorded reads tag an epoch stage's S5b as EVO_GROWTH rather than under its own id, rows 80 and 81 list EVO_GROWTH in that change (as J-V11.90 does for `S8.seed`) |""",
  """and over-listing a step is only reported — amended by J-V11.100 |""")
r("""(V9 §4.16 (3) as seam-settlements-r6 SR6-03 scopes it; amended by the finalization)""", """(V09 §4.16 (3))""")
r("""since a town roster holds ≈ 180 classes against the village's 25 |""", """since a town roster holds V11 §3.5.14's 181 classes against the village's 25 |""")
r("""their values stay stated once, in V04 and file f, and V11 keeps only the name map.""",
  """their values stated once — amended by J-V11.104.""")
r("""M4-110's panel""", """the M4 panel's M4-110 group""", 'all')
r("""the `bar.<id>` and `frame.*` families are SCC-56's, V12's to add (landed: V12 §2.1, J-V12.65; the two bars V11's entries name are registered by V11's seats, J-V11.78) |""",
  """the `bar.<id>` and `frame.*` families are V12's (V12 §2.1, J-V12.65), the two bars V11's entries name registered by V11's seats (J-V11.78) |""")
r("""to name the non-g tables' register metrics""", """to name the other tables' register metrics""")
r("""(V04's landed values, every rung non-zero)""", """(every rung non-zero)""")
r("""because g item 109""", """because item 109""", 'all')
r("""g item 106 (a)'s""", """item 106 (a)'s""", 'all')
r("""(V02's measured values, X3)""", """(V02 §3.10.3's measured values)""")
r("""both confirmed by X-V11-14 —""", """—""")
r("""BCR-V11-31""", """item 581""", 'all')
r("""to hold V04 BCR-45's span-rule constants""", """to hold item 244's span-rule constants""")
r("""their DR17 is BCR-14's""", """their DR17 is item 386's""")
r("""BCR-V7-13""", """items 376–377""")
r("""(BCR-V3-12, BCR-V3-26, BCR-V3-32, V01's BCR-4)""", """(items 233, 230, 241, 578 and 294)""")
r("""because BCR-31 reserves it as a StageId""", """because item 345 reserves it as a lineage stage id""")
r("""(BCR-32's table""", """(item 301's table""")
r("""(V1-3.15, BCR-46, J-V1.98)""", """(V01 §3.15, item 584, J-V1.98)""")
r("""(§4.11 by BCR-V6-26, file f item 291)""", """(§4.11, item 291)""")

for old, new, c in R:
    n = text.count(old)
    if c == 'all':
        if n == 0:
            print('NOT FOUND', old[:120]); sys.exit(1)
        text = text.replace(old, new); continue
    if n != c:
        print('COUNT', n, '!=', c, old[:150]); sys.exit(1)
    text = text.replace(old, new)

# drop the round prefixes: "*Reconciliation round N (ids).* Chose" -> "chose"
text = re.sub(r"\*Reconciliation round \d+(?:'s continuation)?(?: \([^)]*\))?\.\* Chose", "chose", text)
# E-24 marks on J-V11.90's conditional (ICONF-1)
old90 = "with the pre-decided move to `S8` in the change whose recorded reads tag the pass so;"
if text.count(old90) != 1:
    print('J-V11.90 text not found'); sys.exit(1)
text = text.replace(old90, "(amended by J-V11.100: the reads are recorded under S8);")
text = sanitize(text)
for a, b in [("over the critique's ", "over "), ("V04's landed value", "V04's value"), ("because g gives no figure", "because item 109 (k) gives no figure"),
             ("calibrate-later", "provisional"), ("confirmed in round 4, J-V11.79", "J-V11.79"), ("file f items", "items"), ("file f item", "item"),
             ("in g's persistence order", "in item 109 (c)'s persistence order")]:
    text = text.replace(a, b)

NEW = """| J-V11.97 | chose to close the content system's edges by five rules — data compiled (a refusal at compile, an absent default at load), geometry the reading stages', rungs, presets and lifecycle by V11 §2.10 — and one table of each mechanism's outcomes and failure rungs, with one table of the combinations this volume owns and one suite (T-V11-40), over an edge paragraph in each subsection, because the content system's edges reduce to its compile refusals and its absent defaults, which the rules state once (V11 §3.26) |
| J-V11.98 | chose to hold item 111's dry-country cells on the climate rows — the arid water factors, the oasis chance with its no-other-water factor, area band, gardens, channel reach and grove, the growth and prosperity water weights and radius, the sunlight multiplier and the wells' yield weight and coverage factor — over a dry-country table of its own, because every reader selects them by the site's biome (§4.2 S0–S3, §4.5, §4.7 S10b, §4.9), one row per biome is one invalidation slice, and a multiplier on `w_sun` keeps item 102 exactly as filed where it is 1 (V11 §3.17.1) |
| J-V11.99 | chose event-to-epoch rows keyed by SettlementForge's template word with one default row per event family, and the burial threshold as the base century times its four factors, clamped, over a row per template only or an additive rule, because a family row maps every one of the 29 templates (a template word the rows lack reads its family's), the factors act per flood and per silting as item 113 (c) words them, and the clamp keeps a much-flooded ruin from burying in a decade (V11 §3.25) |
| J-V11.100 | chose that a table read is recorded under the registered StageId of the stage function that reads — S8 for the seed primitives, S5b for the growth step's router — never under a calling epoch phase (an epoch re-derives through V06's fold), so registry rows 62, 80 and 81 list S8 and S5b with no conditional clause, over keeping the pre-decided moves of J-V11.90 and J-V11.92, because a readers entry is §7.6's invalidation map and must be determinate (V11 §3.1's *Readers*) |
| J-V11.101 | chose, by the owner's delegated decision on Q-V11-1 (J122), to keep SettlementForge's sensitive kinds on the map concealed by default — concealment rows with `none` 0 for `slave_market`, `trafficking_den` and `kidnap_den` and a cover row for the slave market — with a dossier's own mode or knowledge resolved first, so the map shows them as SettlementForge's own settings show them (V11 §3.14) |
| J-V11.102 | chose to hold the values the base calls table values — the dynamic grid's cells by level, New random's advance bound, the crossing search band — as one registered base settings row (registry row 93), over leaving them in prose, because a value outside the registry cannot load, be edited or be pinned (V11 §3.1) |
| J-V11.103 | chose to write every owner item's no-op-pin off form as one table in V11 §3.24.0, each in its columns' ranges, with its base bar and this volume's test, over each item's cells in its own section, because §13.2's convention (5) reads one off form per item and V12's engine writes them as `{ ref, value }` pairs (V11 §3.24.0) |
| J-V11.104 | chose to state the span-rule, slide and snap values in V11 §3.24.1–§3.24.2, the base naming the cells as rows 79–80's and stating no value (§2.2, §2.7), over leaving the values in item 244's text, because one value has one home and the base cites this one (J-V11.96 amended) |
| J-V11.105 | chose that the ladder lessers of the twelve remaining file pairs are written at C4 from the committed `ladderPairs`, the cross-check (T-V11-2) failing any build that lacks one, over writing them from memory now, because the committed data is the one source and a pair with no row cannot pass the build (V11 §3.12, §8) |
| J-V11.106 | chose that the vocabularies — the corpora of V11 §3.20.5 — are written during the build under V11 §3.20.6's plan, clean-room and scanned, never in this volume (J122), because this volume fixes their grammars and bars and the words are authored, spell-checked and scanned together |
| J-V11.107 | chose that a cart crossing needing more than 1.5 × `rampMaxGrade` lowers the wall's step inside the way's corridor (`W_STEP_LOWERED`), over lengthening the ramp along the wall or refusing the way, because the owner's words forbid a stair and a gap, the corridor is the way's own ground, and the wall keeps its line and height elsewhere (V11 §3.24.5) |
| J-V11.108 | chose the union of V09's and this volume's declared shapes for the two document-only tables — the kind keys `uid:`, `cat:` and `cls:` with profile, family weights, quarter, place and split; `use:` with place, pin, split and specialisation; link edits with `bindTo`, `avoid` and `cut` — over either volume's narrower set, because every screen of V09's must write a declared cell and no cell may be lost (V11 §4.2) |
| J-V11.109 | chose `access.ruinGain` 1.5 on II.7.3's basement-access probability over a ruin's element, under the access row's `cap`, over leaving the gain at 1, because item 109 (d) raises the chance over a ruin and a built void is the readiest to break into (V11 §3.23.7) |"""
text = text.rstrip('\n') + '\n' + NEW + '\n'
build('22-s9', None, [], mid=text)
