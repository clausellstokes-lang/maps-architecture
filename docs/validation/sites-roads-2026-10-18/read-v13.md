# read-v13 — the reader's record of V13 for J393 (sites, roads, autocorrect)

**Lane:** `sites-roads/read-v13` (opus; J390, Fable-checked). A reader: this record states what the text says, with
line numbers; it judges nothing.

**Files read (whole), at 2026-10-18 05:12Z:**

| file | lines | md5 at read |
|---|---|---|
| `docs/volumes/V13-world.md` | 4,452 | `c8759307398388249547f71e1912feca` |
| `docs/validation/sites-roads-2026-10-18/README.md` | 29 | `eabd68cd5eec8bb1a35539c4a08e1bfd` |

All V13 line numbers below are against md5 `c8759307398388249547f71e1912feca` (a snapshot copy was taken at the read and
read from, so the cites hold even while J392 edits the live file). The apply step re-verifies every cite.

**Reading of the README.** No difference recorded by this reader (a reader does not re-read the owner's words); see the
gaps section for what the volume text does and does not say against the README's "What exists today".

## Facts, in the order found

### Front matter, §0, §1 (lines 1–423)

1. Owner's word r (file r item 926): the world canon is outside J86's door 1; door 1 itself (the settlement frame's
   geometry) stays closed; H5 and H22's birth canon no longer wait on Q4. (V13:100–103)
2. The base word **site** keeps its base meaning (S1 Site, `@plat/site`); the owner's persistent sites are **world
   sites** and V14's. (V13:117–119)
3. §0 plain words: the charter hands down "which roads arrive"; a town made before its world is dropped later and "the
   world then bends itself to the town, never the town to the world"; "If the spot the game master chose cannot be made
   coherent — a port dropped inland — the world offers the nearest spot that can." (V13:134–148)
4. §1.1 engine row W-ROUTES W7: "`WorldRoute` records: on a standalone world the Urquhart neighbourhood graph per
   landmass under the cost law, ports as the final reachable water body, sea routes; on a host-bound world exactly the
   host's genesis edges and lived changes laid as geometry, with time stations". (V13:186)
5. §1.1 W-SUIT W6: "the pluggable suitability score, two-stage scoring, `SitingProposal` records for the host".
   (V13:185)
6. §1.1 W-POLITY W8 lists `PatrolCadence` among W8b's records. (V13:187)
7. §1.1 P-PLACE P1–P5: "`Placement` records, the coherence cost and the nearest lawful placement, the blend band, the
   local drainage re-run, the `FrameCharter` emitted both ways, the precedence stamp, the mirror edit". (V13:189)
8. §1.2: S1 takes the charter as its one input record; the roads land as "S3 (4)'s requested bearings". (V13:204)
9. §1.2 V14 row: V14 consumes `FrameCharter`, `Placement`, the suitability score, the water class test and
   `ReasonRecord`. (V13:241)
10. §1.3 item 134 obeyed by §3.7's suitability score admitting a world site as a destination term (134 (c)) and "the
   charter's `territory` and `sites` rows, which a settlement founded there reads so the site claims its ground first";
   both-way flow is P1–P5 with the charter emitted both ways; 134 (d)'s adoption is V14 §3's G8 over V13's placement.
   (V13:259–265)
11. §1.3 item 135 (scale coherence) quoted: "make sure that scaling is completely scaled according to encounter, city,
   and world generating processes"; obeyed by one chain of refinement (world reach, frame river, crop bank), handoff as
   boundary conditions (the charter), deterministic resolution (position-keyed fBm, BCR-V13-29; a declared deviation until
   it lands, V13 §12), edits at their scale, extent/detail per regime by table. (V13:266–274)
12. §1.3 the owner's settlement-first correction, quoted: "(1) a settlement generated standalone is placed on a world
   later and the world autocorrects to the bare coherent minimum (blend band, local drainage re-run, coherence cost
   reported, nearest lawful placement offered); (2) … the settlement glyph …; (3) a mismatch of coast orientation is
   resolved by the bearing first, the world's blend second, and the settlement never unless the DM explicitly chooses
   mirror (warned) or the world-wins verb; orientation-dependent derived terms … recompute from placement with locks
   holding geometry and anomalies reported; the compass is derived presentation." Obeyed by P1–P5 (§3.11), the glyph,
   the precedence stamp with its two explicit verbs (§3.11.5, §4.1). (V13:319–327)
13. §1.3 territory rules (T1)–(T3) quoted; T3: "…also there should be patrols"; obeyed by "garrisoned sites as held
   points, armies presence only" ((10)) and "patrols as a derived cadence per route segment and power (T3; (14))", the
   encounter crop reading all of it at its point and week (V14 E1 (4), E4 (b)). (V13:328–348)
14. §1.4: V13 "reads nothing of V14's but `WorldSite` positions as a suitability input (V13 §3.7) and a site's
   `Placement` as a world fact (`WorldFacts.sites`, V13 §2.4; SW-20)". (V13:372–374)
15. §1.4: the host's political facts per window include "held sites; satellites at their frozen site points; … lit
   water lanes; road watches"; no cost vector is asked of the host. (V13:377–382)
16. §1.4: a phantom of the host is "never a seat, never placed, never projecting, patrolling or contesting"; sight, air
   and teleport are readers and marks, "never edges the map invents"; `aerialLegs(world, seats)` fed only to a canon
   whose envelope names this world. (V13:413–419)
17. §1.4: any settlement rung THORP–METROPOLIS may be placed; a standalone neighbourhood document never (J-V13.47).
   (V13:420–422)

