S45 = """### 4.5 The clerk's view (§11.2's tool API; item 101)

The clerk reads the underground through the reader, filtered by its viewer's knowledge key (§9.2): per system its kind,
depth range, floor area and element counts; per band its contents; per named run its name, kind, served area and
outfall; per undercity neighbourhood its parent, households and the institutions it may know; per access its kind,
state, `knownTo` and `cause` where admitted; per link its kind, `via` and `cause`; per catacomb complex its source, rank,
extent, `fill` and `blockedBy`; per ruin its culture, age and the districts above it (V01's `districtsAbove(part,
element)`, V01 §3.16, for "under the old quarter"); per ruin monument its tiers laid, standing and truncated and its
mound; per arch vault its raised way and its span's `reason` (item 244) — V09 lists it "at street level, under ⟨way⟩",
its depth-band filter never hides it and the hit stack reaches it through the span (V09 §4.17.6); per terminal cistern
its aqueduct and source; per cistern the nearest water and aqueduct delivery point its test read; per foundation pillar
or collapsed stretch the raised-way pier or retaining wall that made it and the epoch whose `Foundations.apply` made it;
per village working's breach its working and the void it reached; per buried stair step the tombstoned retaining wall it
keeps; per buried former settlement its burial epoch and the former records it keeps; per `lost` cluster that it was
once known and when its way in closed (`lostAt`). A ruin, a cavern cluster and every unexcavated or lost element are
known to a `secret` key only (V04 §5.2).

**The providers (V10 §3.9, §3.9a; item 270).** `@plat/under` registers, for V10's `why` query and V09's why card and
underground panels:
* a **`WhyProvider`** for the kinds `UndergroundSystem`, `AccessPoint`, `UndergroundLink`, `RuinRecord`,
  `CatacombComplex` and a void cluster. On a cavern, ruin or former-settlement cluster it returns the fact
  `under/wayIn` — the connection graph's open path from the nearest surface access the key admits, or none — with the
  cluster's reading; an access's answer is chosen by its `cause.rule` (the symbol §8.2's access row draws by the same key);
* the **`underground` `WhySectionProvider`**, whose rows join the answer on a burial face (the why path `catacomb` with
  its candidate-pass reason), a building over a void (its dig draw's verdict and the reading), a district above a ruin,
  a raised way with arch vaults (each span's `reason`), an arch vault (its span and reason), a ruin's stepped monument
  (tiers laid, standing, truncated), an aqueduct's terminal building (its cistern) and a void met by a footing (the
  raised-way pier or wall);
* **`catacombOutcome(doc, face)`**, read-only, over the candidate pass's derived per-face record
  `{ holds: Id | null; countReached: boolean; wet: boolean; age: boolean; island: boolean; belowTown: boolean;
  chance: { value: number; passed: boolean } }` — why a burial face holds a catacomb or not.

Every row carries a catalogue key `info.under.<kind>.<value>`: one per value of `source.kind`, `blockedBy`,
`cause.rule`, the excavation reading and each outcome of `catacombOutcome`; the knowledge filter applies to the rows and
to the effects list alike (§9.2). The providers are read-only, never persisted, and answer an empty section where
nothing lies below (EU-20). V10 builds "why is this here" from them and the rows that pulled each member (V04 §3.6a).
Tested by T-V4-79.

The clerk proposes the same events (V04 §4.1) as ghosts; accepted, they commit with `proposedBy: 'clerk'`. A secret
element it cannot see it cannot edit: an event naming a withheld id is refused as if the id did not exist.
"""
P=[
("Over an `unexcavated` cluster it is the user's excavation:", "Over an `unexcavated` or `lost` cluster it is the user's excavation (a `lost` one refound):"),
("grouped before a dwelling declaration on an `unexcavated` cluster (V09 §4.17.4's **Use another building**)",
 "grouped before a dwelling declaration on an `unexcavated` or `lost` cluster (V09 §4.17.4's **Use another building**)"),
("the shape tool T9 every attribute below (1b.3) — no thirteenth tool", "the shape tool T9 every attribute below (V04 §1b.3) — no thirteenth tool"),
("a `state` of `bricked` on a cluster's last access lists the vacated dwellings as fates;",
 "a `state` of `bricked` on a cluster's last open way turns it `lost` and lists the vacated dwellings as fates;"),
("a building created or given a basement over a cavern or ruin element draws U-ACCESS (d) in the edit's commit,",
 "a building created or given a basement over a cavern, ruin or former-settlement element draws U-ACCESS (d) in the edit's commit,"),
("| a `delete`, `seal` or `bricked` of a cluster's last access | the excavation reading; the cluster's F6 dwellings and undercity plots vacated by II.7.3's vacancy rules, listed as fates in the dry run | the rest |",
 "| a `delete`, `seal`, `caveIn` or `bricked` of a cluster's last open way (its access, a link, the element that carried it), or the demolition of the building above it | the excavation reading (the cluster `lost` or `unexcavated`, `lostAt` written); the cluster's F6 dwellings and undercity plots vacated by II.7.3's vacancy rules, listed as fates in the dry run | the rest |\n| a `reopen`, an access or a link that joins a `lost` or `unexcavated` cluster to the surface | the excavation reading (`accessible`, `lostAt` cleared); dwellings at the next placement, never in this commit (V04 §3.5.7 (g)) | the rest |"),
("| a dwelling declaration on an `unexcavated` cluster, alone or after its grouped `addUndergroundAccess` (item 372) |",
 "| a dwelling declaration on an `unexcavated` or `lost` cluster, alone or after its grouped `addUndergroundAccess` (item 372) |"),
("held while that institution is live: a `delete` of one returns F-EDIT `dossier-owned` with `rejectSite` offered (the institution moved, its underground re-made; item 20).",
 "held while that institution is live: a `delete` of one returns F-EDIT `dossier-owned` with `rejectSite` offered (the institution moved, its underground re-made; item 20); released, never torn down, when the dossier lets it go (V04 §3.7 L5)."),
("4. No ruin is created (g item 109 (h)); `recipe.layers.ruins`, absent, reads `off`.",
 "4. No ruin is created (g item 109 (h)); `recipe.layers.ruins`, absent, reads `off`.\n\nA document saved before item 113's version holds no `ExcavationRecord`: it is built on load from the current reading (V04 §2.6), so the document holds no `lost` cluster, and no buried former settlement is laid (the replay runs only at generation)."),
]
