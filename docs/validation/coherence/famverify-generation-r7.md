# Family verify — generation and regeneration (coherence/famverify-generation-r7)

> Seat `coherence/famverify-generation-r7`, 2026-10-02. One of the six family-focused checks of round 7 (J144). The
> family is raised ways (viaducts, elevated roads, aqueducts, their arch vaults) meeting walls of every kind. This lens is
> the generation pipeline in the order it runs (S3's gate routes and boundary, S4's routes and viaducts, S5a's trace and
> pull, S5b's spawned primaries, S6's elevated roads and aqueducts, S7's strips, towers and gates, S10's band), then a
> regeneration under a raised way it keeps, with its routes re-solved. Grading follows J141 as the owner applies it in
> J146 and J151. Nothing J150 hands to round 8 is reported: the two-axis lock, its readers outside the family (§7.2's
> *Declared means held*, §7.3 item 4's fates and the rest Part A lists), and a lock's behaviour under undo, redo, a
> re-grade or value edit inside a standing meeting, or a repair. No design text was changed.

**Read.** The brief, whole. adjudication-r7.md: Part L whole; R7-02's banner, sentences, outcomes and both tables;
R7-03 – R7-07; Part H's head and the pipeline, scope, model and determinism headings; Part P passes 6–8 where they touch
this lens (PRB7F-GEN-…, PRB7G-GEN-…, PRB7H-GEN-…). The live design, docs/ARCHITECTURE.md:
* §2.7's support step (1)–(6) (l. 2534–2577) and (0), the laws (l. 2578–2889);
* the worked examples (l. 2891–3342), with both tables;
* §4.1's batch rows (l. 5694–5710);
* §4.2 S3 (4)–(13) (l. 6141–6360);
* §4.3: *Lattice and costs*, *Routes*, *Raised ways* (*The slot*, *Where it may not go*) (l. 6373–6495);
* §4.4 S5a – S5d (l. 6537–6709);
* §4.6's holes (l. 7192–7199, 7432–7438);
* §4.7 S10 (0) (l. 7508–7525);
* §4.8's lead, *Wall strips*, *Gates*, *Towers* and the harbour mouth (l. 8328–8395);
* §4.13's raised-way column (l. 9688–9699);
* §5.2's F-ROUTE, F-WALL and F-REDERIVE rows (l. 9838–9840, 9857);
* §5.3's way-and-trace, law-1, gate and trace rows (l. 9924, 9928, 9938, 9939);
* §5.4's `warnings` and `changes` (l. 9970, 10030–10036);
* §7.2 (l. 11445–11490);
* §13.2's T106-3, T101-4, T110-2 (1)–(8), T110-3 and T110-4 (l. 19150–19530).

The round-6 family findings of this lens were read in their verify files (verify-pipeline-r6t.md,
verify-edges-world-r6t.md, verify-scope-r6t.md, verify-edges-life-r6t.md, verify-model-r6t.md,
verify-agree-fabric-r6t.md, verify-determinism-r6t.md). No famverify-*-r6.md exists.

## Part 1 — the round-6 findings of this lens, re-checked against the live text

| id | sev (r6) | ruled | verdict | evidence (live ARCHITECTURE.md) |
|---|---|---|---|---|
| VPC-r6-01 | major | FIX per R7-03 (a); E-P13 | **fixed** | §4.2 S3 (7) (l. 6214) re-solves a gate route whose first point at `T = t_1` lies on its priced deck, or where §2.7's laws admit no gate. The re-solve excludes every deck edge straddling the stage-1 boundary or ending nearer it than the first point beyond the foot, and places the harbour gate on `L*` the same way. §4.3 *Where it may not go* (l. 6490) and §2.7 *down before the wall* (l. 3027–3028) count the stage-1 boundary as standing from S3 (7). F-ROUTE's row names the re-solve (l. 9838). T110-2 (2) runs it (l. 19288–19291). |
| VEW-r6-01 | major | FIX (R7-03 (b)); E-S3 | **fixed** | §4.4 S5a *Trace* (2) (l. 6590): "the pull keeps that crossing beneath its deck … the stage's gates are its pins (`N_k`)". §4.1's S5 row pins only arterial crossings on ground part 0 (l. 5698). T110-2 (3) has the search-band variant: "the stage's gates exactly `N_k`, 0 non-gate crossings" (l. 19322–19324). |
| VCS-r6-02 | major | FIX; E-S6 | **fixed** (as J149 reads it) | T110-2 (6)'s New random (l. 19466–19471): "the trace crossing the deck line under a span, never at a support, S3's pull treating the aqueduct's standing supports as impassable where its channel runs above the ring's top". Its merged variant (channel within the ring's height) is there too. No "nearest span" is left. |
| VPC-r6-04 | minor | FIX | **fixed** | §4.7 S10 (0) types the stopped moat's gap "as on a dry stretch … across an under-deck strip where a moat is stopped" (l. 7514). §4.8 *Wall strips* closes it "by the glacis line, as on a dry stretch" (l. 8340). |
| VPC-r6-05 = VDC6-02 | minor | FIX per R7-07 | **fixed** | S3 (10) carries "each channel stopped at its under-deck strip counted in S3's `W_RAISED_CROSSING`" (l. 6285). §4.4 *Outer moats* says "its crossings S7's to count … a channel stopped there counted in S5a's" (l. 6630). §5.4 says which stage counts what (l. 9970). T110-2 (3) counts each crossing once (l. 19348–19349). |
| VPC-r6-06 = VAL-R6-07 | minor | FIX per R7-07 | **fixed** | §4.13's `wall` cell gives the rung: leave out and report; simpler shape; else `refuse.raised.meeting` (l. 9697). |
| VEL6-r6-02 | major | FIX per R7-06; E-S6 | **fixed** | T110-2 (6) (l. 19474–19480) runs (1)'s c15 fixture with the aqueduct placement-locked, Regenerate (keep) and New random over the state sweep (row W3). That includes the cleared ring as open ground, the `ruined` stump, the run at its own top and no chamber in the breached span. |
| VM-R6T-02 | major | FIX per R7-04, R7-06 | **fixed** | (1): as VEL6-r6-02. (2): T110-2 (8) has the `vault` span of a standing aqueduct under the old line, "the arch vault laid again with its id in the commit" (l. 19504–19508). |
| VM-R6T-04 | minor | FIX | **fixed** | Support step (3): "× the `pierSpacingM` band's upper bound ((1))" (l. 2548). |
| VEW-r6-03 | major | FIX per R7-02 | **fixed** (by law 1 (4), (6), (11) and the fixed-place sentence) | S5a (1)'s anchor "never in a standing raised way's strip nor a road deck's zone" (l. 6573). §4.8 *Towers* "never moved off it for a raised way" (l. 8383). *over the band*: S6's aqueduct "having planned round the fixed places the trace and the castle record" (l. 3018–3021). T110-2 (1) has the anchor/water-gate/weld variant (l. 19284–19287). T110-2 (3) has the spur town's gorge anchor (l. 19327–19331). |
| VM-R6T-01 | major | FIX per R7-02 | **fixed** (as above) | §4.4 *Water and the waterfront*: "never in a standing road deck's zone, nor in an aqueduct's strip but where law 1 (5) admits a gate there" (l. 6605). §4.8's lead (l. 8332). The fixed-place sentence (l. 3216–3256). T110-2 (3)'s river ring (l. 19325–19327). |
| VAF-R6T-03 | major | FIX per R7-06 | **fixed** | T110-2 (3)'s castle-path clause: "a CITY fixture holding a declared masonry aqueduct the user placement-locked across a corner of a castle's bailey … S7 lays the castle's internal paths …" (l. 19342–19348). Row (a)'s test cell names it (l. 2911). |

All fourteen are fixed in the live text. None is reopened.

## Part 2 — the laws attacked through this lens

I applied laws 1–4 to every step this lens covers and to the regeneration:
* S3 (5)–(11): gate routes, `T`, the gates and their re-solve, the castle filter, the pull and anchors, the moat, the
  harbour route;
* S4: commits its routes and lays its viaducts' supports;
* S5a: boundary, pull, pins, outer moats;
* S5b: `c` and its spawned primaries;
* S5c and S5d;
* S6's end: elevated roads and aqueducts;
* S7: towers, gatehouses, intervallum, castle paths, chain;
* S10 (0)'s band;
* §5.2's rungs, §5.3's checks, §5.4's counts;
* Regenerate (keep) and New random under a kept raised way and under a kept wall;
* a generation from a creation prefix.

The laws give one outcome, or a valid choice, almost everywhere. Part 3 lists those cases. The nine findings follow (3 major, 6 minor, 0 blocker).

### VF7-GEN-01 · major · TWO READINGS / READERS (law 1 (2)) · owner pipeline (END at model)

**The pull's impassable list omits the over form's own condition on spans. Where an aqueduct's channel runs above the
wall's top, a pulled trace may cross under a span that does not clear the wall's top. That is a crossing law 1 (2) calls
unlawful.**

*What the laws say:*
* Law 1 (2) (l. 2703–2711) gives the form by level. **Over**, "where its channel there lies above the wall's top — no
  standing support in the band there and every span above the band clearing the wall's top". **Merged**, "where its
  channel lies within the wall's height". Then: "a crossing that fits neither form is unlawful".
* Law 2 (a) (l. 2810–2811) says every pull or cost field "searches only shapes law 1 admits".
* *beneath*'s *Where the line crosses* states it correctly (l. 3056–3058): "over where its channel runs above the wall's
  top — under a span that clears the wall's top, or through a `cleared` support's ring". So does the bent-group
  sentence's lawful crossing (l. 3177–3178).

*What the list says.* §4.4 S5a *Trace* (2) (l. 6589) gives the pull "the impassables §2.7's laws give a trace (law 1
(2)–(4), law 1 (9) and (10)) impassable to it — …". For an aqueduct it names only "an aqueduct's standing supports where
its channel runs above the wall's top (its crossing there over)". *beneath*'s list for every pulled or cost-field trace
(l. 3069–3079) is the same: "an aqueduct's standing supports where its channel runs above the wall's top (each widened
so that the band's half at most touches the ring, *the edge*)". It names that list as "the list §4.4 S5a *Trace* (2)
gives". V06 §3.7.4 (2)'s epoch cost field takes the same list by citation (V06 l. 1605–1606).

*Two readings:*
* **Builder 1** builds the list as written. Under a span whose soffit lies below the wall's top, between two standing
  supports, the cost path can cross the deck line, with the channel above the top there. That happens in the band of
  ground heights where the aqueduct's height above ground passes the wall's height, which exists along every aqueduct
  that crosses a valley.
* **Builder 2** builds law 2 (a) as one resolver and makes that span's strip impassable.

Builder 1's trace fits neither form, so law 1 (2) is false at the stage end. §5.3's law-1 row (l. 9928) then raises
`E_INVARIANT` on a regeneration under a kept aqueduct, a New random, or a generation from a creation prefix holding a
declared aqueduct. T110-2 (6) asserts the lawful outcome ("every span over it clearing the ring's top", l. 19469–19470),
so the design text's own list leads to a build the bars reject. Under the brief's two-readings test, an outcome that
breaks law 1 makes this major.

**Required change.**
* §4.4 S5a *Trace* (2) (l. 6589): change "an aqueduct's standing supports where its channel runs above the wall's top
  (its crossing there over)," to "where an aqueduct's channel runs above the wall's top (its crossing there over), its
  standing supports and the strip of each span above the band there whose soffit does not clear the wall's top (§2.7's
  laws, law 1 (2): a crossing that fits neither form unlawful),".
* END at model, §2.7's *beneath* (l. 3075–3077): change "an aqueduct's standing supports where its channel runs above
  the wall's top (each widened so that the band's half at most touches the ring, *the edge*)," to "where an aqueduct's
  channel runs above the wall's top, its standing supports (each widened so that the band's half at most touches the
  ring, *the edge*) and the strip of each span whose soffit does not clear the wall's top (law 1 (2)),".

V06 §3.7.4 (2) cites the list and needs no words of its own.

### VF7-GEN-02 · major · READERS (law 1 (6); law 2 *Newer*) · owner pipeline

**S3's lists of the raised ways that stand at each step leave out a creation prefix's declared raised ways. So S3
(8)'s castle filter can put a weld vertex or the town-side gate in a declared road deck's zone.**

*What the laws say:*
* *Order* (l. 2668) and *Newer* (l. 2762–2765) put "a creation prefix's declarations before every stage".
* W1·C8 says it plainly (l. 3329): "a creation prefix's declared walls and raised ways (a skeleton's; **Rebuild around my
  drawings**') … every generated structure meets them as structures standing before its stage".
* Law 1 (6) (l. 2724): no fixed place, with its footprint, in a road deck's zone. A castle's weld vertices and
  town-side gate are fixed places (l. 2626–2629).

*What S3 (8) says.* Its filter (l. 6231) bars a weld vertex "in a standing road deck's zone". It then says which raised
ways stand: "(the raised stretches of (5)'s routes at S3, S4's and S5b's viaducts at a stage's citadel, every held one
at a regeneration; …)". A generation from a skeleton or a **Rebuild around my drawings** with a declared viaduct is in
none of those three groups. The declared viaduct is not "held" either, since a declared thing holds nothing unless
locked (*held*, l. 2656–2657).

*Two readings:*
* **Builder 1** reads the parenthetical as the list. It sites an `on_enceinte` castle whose weld vertex lies in the
  declared viaduct's zone. Law 1 (6) is false at S3's stage end and §5.3's law-1 row fails. T110-4 (c) runs exactly this
  path, "a generation from a creation prefix (a skeleton)" (l. 19527), so the bar can hit it.
* **Builder 2** reads "a standing road deck" generally and keeps the zone clear.

S3 (10) has the same gap (l. 6285): "A raised way standing when this step carves — at a regeneration, one held (…); at
generation the raised stretches of (5)'s routes …". A builder can carve the city moat through a prefix aqueduct's
support rings, against row (e) and the support step's "no support in water" (§4.13, l. 9695). That part is not a law-1
breach. S3 (8)'s is, so the finding is major.

The wording below cites *Newer* instead of restating which things a regeneration keeps. That question belongs to §7.2
and round 8 (Part A) and is not reported here.

**Required change.**
* §4.2 S3 (8) (l. 6231): change "(the raised stretches of (5)'s routes at S3, S4's and S5b's viaducts at a stage's
  citadel, every held one at a regeneration;" to "(every raised way standing before the stage — a creation prefix's
  declared ones and, at a regeneration, each one it keeps where it stands (§2.7's laws, law 2 *Newer*) —, the raised
  stretches of (5)'s routes at S3, S4's and S5b's viaducts at a stage's citadel;".
* §4.2 S3 (10) (l. 6285): change "— at a regeneration, one held (§2.7's support step (6); §2.7's laws, law 2 *Newer*);
  at generation the raised stretches of (5)'s routes," to "— a creation prefix's declared one and, at a regeneration, one
  it keeps where it stands (§2.7's support step (6); §2.7's laws, law 2 *Newer*); at generation, besides, the raised
  stretches of (5)'s routes,".

### VF7-GEN-03 · major · TESTS / CHECK (law 2 (c)) · owner pipeline (§5.3's row cites it unchanged)

**At stage 1, F-WALL's raised-way rung re-pulls the trace up to `wall.barrierReachM` beyond the boundary. S3 (9)'s
**Test** and §5.3's runtime row then fail that correct build, because their distance bound has no exception for the
rung.**

*What the laws say.* Law 2 (c) (l. 2828–2830), and F-WALL's row after it (l. 9840), make a raised-way meeting at
generation or a regeneration take F-WALL's own rung: "the boundary re-pulled once with the exclusions of §2.7's laws'
law 1 impassable and its search band widened to `wall.barrierReachM` beyond the stage's boundary, so that it may pass
round the raised way". F-WALL's "where" includes "S3 (stage 1)" (l. 9840). The rung exists so the trace can go further
than the 40 m pull (PRB7E-GEN-08's ruling).

*What the checks say:*
* S3 (9)'s **Test** (l. 6264–6268): "the trace departs from the boundary by ≤ 40 m everywhere except along an
  `on_enceinte` castle's shared stretch … and along a barrier reach, which departs by at most `wall.barrierReachM`".
* §5.3 checks this at runtime (l. 9939): "stage 1's trace within its distance bound of the stage-1 boundary (§4.2 S3
  (9)) | stage-end (S5)".

A stretch the rung re-pulled round a raised way is not a barrier reach, so neither exception covers it.

*Where it occurs.* At stage 1 the case arises at a regeneration under a kept road deck or aqueduct, or from a creation
prefix. For example: a held building's strip, a shape-locked `vault`-use span, or a fixed-place zone over the only
crossing within 40 m. It also arises at generation with S3 (7)'s stretches, which the stage-1 trace may not cross. A
build that does exactly what the rung says, walling the stage round the raised way, departs more than 40 m. §5.3's row
raises `E_INVARIANT`, so the check fails a correct build.

**Required change.** §4.2 S3 (9)'s **Test** (l. 6267): change "and along a barrier reach, which departs by at most
`wall.barrierReachM`" to "and along a barrier reach or a stretch F-WALL's raised-way rung re-pulled round a raised way
(§5.2; §2.7's laws, law 2 (c)), each of which departs by at most `wall.barrierReachM`". §5.3's row (l. 9939) cites S3 (9)
and stays as written.

### VF7-GEN-04 · minor · READERS (gate count) · owner pipeline (one END at determinism)

**S5b's `c` does not name the ramp-crossing pin that row (d) and S5a count. §5.3's gate row drops the carried way's
"or ends".**

* Row (d) (l. 2914, PRB7F-GEN-09's closure) counts an earlier arterial whose crossing of the new boundary falls on a
  ramp, stair or foot as "a gate and one of `c` where that pin is lawful". S5a *Trace* (2) pins it at the first point
  beyond the foot (l. 6590).
* S5b (l. 6638) still says the existing arterials "cross the new boundary `c` times on ground part 0 (a crossing on a
  raised deck no gate, S5a *Trace* (2); …)". A ramp is raised, so a builder who leaves it out of `c` spawns one primary
  too many and builds `N_k` + 1 gates.
* §5.3's outer-enceinte clause (gates ≥ crossings, l. 9938) passes both builds. F-WALL's B-CITY bar ("main gates = N
  exactly", l. 9840) and T110-2 (3)'s ramp variant ("the stage's `N_k` gates on ground part 0", l. 19320–19322) catch the
  wrong build. The laws do not set `N_k` and no law-1 invariant or owner rule is crossed, so this is minor (as
  PRB7F-GEN-09 was).
* Similarly, §5.3's gate row (l. 9938) counts "any gate a carried way standing before the stage takes where the boundary
  crosses its ground course". *Carried way* (l. 2785) and S3 (7) (l. 6214) say "crosses its ground course or ends".

**Required change.**
* §4.4 S5b (l. 6638): change "(a crossing on a raised deck no gate, S5a *Trace* (2);" to "(a crossing on a raised deck
  no gate, and one on a ramp, stair or foot pinned beyond the foot one of them where that pin is lawful, S5a *Trace* (2);
  §2.7's way-and-channel table, row (d);".
* END at determinism, §5.3's gate row (l. 9938): change "where the boundary crosses its ground course" to "where the
  boundary crosses its ground course or ends".

### VF7-GEN-05 · minor · VALID CHOICE (J151) · owner pipeline

**S3 (7)'s re-solve trigger lists what the laws bar at a gate more narrowly than law 1 (4), and more widely than law 1
(5).** The trigger (l. 6214) reads: "would put its gate where §2.7's laws admit none: on a ramp or stair, nearer its
foot than the first point beyond the foot, or with its gate's footprint or the band there over the ends or in the strip
(law 1 (1), (4), (5))".

* **(a) Too wide.** At a regeneration under a kept aqueduct, a gate whose footprint lies in the aqueduct's strip under
  an arch that clears it, in an over crossing, is one law 1 (5) admits (l. 2722–2723). The list re-solves it.
* **(b) Too narrow.** Law 1 (4) keeps the band *and the wall strips* off a raised way's ends (l. 2719). The list names
  only "the band". A gate whose wall strips cover another route's foot, though its band does not, is not re-solved. S3
  (9)'s pull then cannot pass the pinned gate without its strips over that foot, and goes to F-WALL's rung.

Every outcome keeps law 1 and the owner rules and passes §5.3's row and T110-4:
* gate kept or route re-solved, in (a);
* route re-solved, or the rung, else stage 1 left unwalled and reported, in (b).

No named test runs either case. It is a valid choice; fix-list.md lists it, or the list is aligned with the laws.

**Required change.** §4.2 S3 (7) (l. 6214): change "or with its gate's footprint or the band there over the ends or in
the strip (law 1 (1), (4), (5))" to "or with its gate's footprint in a strip where law 1 (5) bars it, or the band or wall
strips there over the ends (law 1 (1), (4), (5))". Alternatively, list the two readings in fix-list.md's builders'
choices.

### VF7-GEN-06 · minor · VALID CHOICE (J151) · owner pipeline

**The kind of a carried way's stage-1 gate is not stated.** *Carried way* (l. 2786) and S3 (7) (l. 6214) give a carried
way standing before stage 1 "a gate … beside the N main gates, decked and counted as the harbour gate is". The harbour
gate is "one gate of kind `water`" (l. 6219–6220). §4.8 *Gates* defines main gates as S4's and S5b's arterials'
crossings (l. 8368–8369). `Gate.kind` is one of `'main'|'postern'|'water'|'gatehouse'|'castle'` (l. 2277).

One builder records `main` (not counted in N). Another records `water`, "as the harbour gate is". The gate's footprint is
read "from the gatehouse row it will be built by" (S5a, l. 6590; law 2 *Not yet built*). So the kind decides whether its
footprint meets a strip (law 1 (5)), and so whether the gate stands or the way is re-routed (*Carried way*, (b)). It also
decides which trade-flow rule weighs the gate (§4.3 *Trade flow*, l. 6516–6520, gives a road partner to "the land gate
whose bearing …").

Each build checks its own footprint, so both keep law 1, pass the check and fail no named test. It is a valid choice.

**Required change.** S3 (7)'s carried-way sentence (l. 6214): change "beside the N main gates, decked and counted as the
harbour gate is," to "beside the N main gates, a gate of kind `main` on the carried way's class (not counted in N),
decked and counted as the harbour gate is,". Alternatively, list the kind in fix-list.md's builders' choices.

### VF7-GEN-07 · minor · READERS (law 2 (c)) · owner determinism (END at scope)

**A harbour-mouth chain with no lawful heads at generation: three texts give it three readings.**

* The fixed-place sentence (l. 3247–3250) and §5.4 (l. 9970, "a harbour-mouth chain not laid, §4.8") say it is not laid
  at generation and `W_RAISED_MEETING` is reported. That is law 2 (c)'s "the newer structure is not built".
* F-WALL's detection (l. 9840) lists "a fixed place with no clear point in reach" with no exception. Its "where"
  includes S7, where S7 lays the chain. It sends every such detection to the raised-way rung: "the boundary re-pulled
  once … → that stage left unwalled". At S7, after S5c has grown the stage, that is a second outcome. It keeps law 1
  (nothing walled), so it is not major.
* T106-3 asserts "every walled port gets its harbour-mouth chain" (l. 19156). It names no exception for a chain law 2 (c)
  leaves out.

**Required change.**
* §5.2 F-WALL's detection (l. 9840): change "a fixed place with no clear point in reach" to "a fixed place the trace
  lays with no clear point in reach (a harbour-mouth chain S7 lays is not laid, `W_RAISED_MEETING`: §2.7's laws, law 2
  (c); its worked example the fixed-place sentence)".
* END at scope, T106-3 (l. 19156): change "and every walled port gets its harbour-mouth chain;" to "and every walled
  port gets its harbour-mouth chain, save one §2.7's laws leave out for a raised way, reported (`W_RAISED_MEETING`; law
  2 (c));".

### VF7-GEN-08 · minor · READERS (citation) · owner pipeline

**Two pipeline readers still cite the worked example without the laws.** Part H's head requires every family citation to
be written "§2.7's laws, law n; its worked example …".
* §4.1's S7 row (l. 5700): "a raised way it meets met by §2.7's crossing table (*beneath*; §4.8's lead)".
* §4.8 *Gates*' last sentence (l. 8378): "A raised way and a trace meet by §2.7's crossing table: no station, gate or
  opening on a deck."

Nothing built changes.

**Required change.**
* §4.1's S7 row: change "met by §2.7's crossing table (*beneath*; §4.8's lead)" to "met by §2.7's laws (law 1 (1)–(9);
  its worked example the crossing table's *beneath*; §4.8's lead)".
* §4.8 *Gates*: change "A raised way and a trace meet by §2.7's crossing table: no station, gate or opening on a deck."
  to "A raised way and a trace meet by §2.7's laws (law 1 (1); its worked example the crossing table): no station, gate
  or opening on a deck."

### VF7-GEN-09 · minor · TESTS (an example's named test) · owner scope

**W3·C2 names T110-2 (6) for a carried way's gate at a regeneration, and T110-2 (6) never runs that case.**

W3·C2 (l. 3331) says a ring re-derived after a kept road deck "takes its carried way's gate by *Carried way*". The
mechanism behind that phrase has four parts:
* S3 (7)'s stage-1 gate beside N₁, decked by S3 (10) and counted by S3 (11), §4.3 *Routes* and §5.3's gate row
  (l. 6214, 6279, 6308, 6402, 9938);
* the pull keeping a deck-only crossing beneath the deck (S5a *Trace* (2), l. 6589);
* at stage k ≥ 2, a lawful pin counted in `c` (l. 6638);
* the way's re-route where no lawful gate stands.

T110-2 (6) regenerates kept aqueducts and a placement-locked S4 viaduct. The viaduct's route is re-solved, so it carries
no kept way (*Carried way*, l. 2791–2793). No clause of §13.2 regenerates a ring across a kept or prefix raised road's
ground course. T101-4 runs only the prefix's own meetings (l. 19104–19107).

Each part's outcome is checked at runtime (§5.3's way-and-trace, gate and water-on-deck rows) wherever a run reaches it,
and none is a law-1 invariant. Under J146 this is the minor of an example whose named test does not hold its case.

**Required change.** §13.2's T110-2 (6), before "and (3)'s table-edit variant regenerated (keep)", add:

"; a CITY whose skeleton holds a hand raised road over the valley beside S3's ring, placement-locked by the user,
regenerated (keep) and given New random with its seed searched so that the stage-1 boundary crosses the raised road's
ground course beyond its foot and, on a second run, only its deck — the first run's gate beside the N main gates on
ground part 0, decked where the city moat is wet and counted among the roads leaving the stage, the second run's trace
crossing beneath the deck with no gate and its pull never moving the crossing onto the ground course, and, on a third
run where that gate's footprint would meet a strip, the way re-routed through one of the stage's gates (§2.7's laws, law
2 *Carried way*, (b); §5.3's gate row)".

## Part 3 — cases of this lens the laws decide (no finding)

* **S3 (5)–(7)'s routes and gates.** A gate route priced across a valley is re-solved off the boundary. Its raised
  stretches are dated S3 (7), after the trace, so the trace never crosses their deck lines (law 1 (3); *Order*).
  Several routes' stretches are read one by one (law 1 terms). A re-solved route that lays new raised stretches plans
  round the other gates fixed at S3 (7) (law 2 (a), Tier 1). A carried way's stage-1 gate at the boundary's crossing
  of its ground course, else re-routed (PRB7H-GEN-04 (i)).
* **S3 (8) and S3 (9).** The castle is sited round fixed-place zones (VF7-GEN-02 aside). Anchors and water gates are
  laid at the nearest clear point, else the rung. Stage 1 unwalled by law 2 (c) takes its gates and welded castle with it
  (law 1 (11)'s exception, PRB7H-GEN-01).
* **S4.** S4's own routes' decks come down before the stage-1 trace (dated S3 (6)). The (5) stretches' stations are
  placed against the trace's band as S3 (10)/(11) read them (*Not yet built*).
* **S5a k ≥ 2.** The trace passes beneath S4's and earlier S5b's decks (dated before the stage's boundary pick). It keeps
  off its own S5b decks' lines. Pins move along their arterial within the band, else the rung (E-P11). S5d keeps each
  crossing (E-P12).
* **S5b.** Spawned primaries come down before the picked boundary, with the gate beyond the foot (law 1 (3), (4); law 2
  (a)'s searched route).
* **S6's end.** An aqueduct crosses each standing wall at its level, over or merged, and plans round gates and fixed
  places (Tier 1). An elevated road with fixed ends is not built across a trace. A shape-locked wall is never merged into.
* **S7.** Towers by spacing or turn take law 3's nearest lawful point (the PRB7H-GEN-03 valid choice, picked in Part L).
  Gatehouses are built as their pins read them. Gate plazas, quays, intervallum and castle paths cross by row (a).
* **S10 (0).** The band is laid through road-deck supports, round a merged pier, the stopped moat's gap typed as dry.
  Arch vaults come from the underground tail's vaults step, with the chamber clause of law 1 (8) in force from that step
  on the regeneration's path too.
* **Regeneration.** Kept structures are older than every stage (*Newer*). A re-derived ring passes beneath a kept road
  deck, keeps off its ends, and crosses a kept aqueduct at its level. Routes are laid after the kept way and cross it by
  row (a). A kept generated deck's route is re-solved and the deck stands alone (PRB7E-GEN-05). T110-2 (6) and (6)·S
  hold W3·C2–C6, C8, C10, C12 and C13. W3·C11 is "as W3·C2" by construction.
* **Gate counts and warnings.** §4.8's "exactly N", S3 (11), §4.3 *Routes* and §5.3's gate row count the harbour gate
  and the carried way's gate alike (VF7-GEN-04 aside). `W_RAISED_CROSSING` counts only a trace laid after a raised way
  and a stopped channel; an aqueduct laid at S6's end across a trace is unreported, as T110-2 (1) asserts.
  `W_RAISED_MEETING`'s producers cover every law 2 (c) outcome of the generation path.
* **The check and the bar.** §5.3's law-1 row checks (1)–(11) at every stage end. T110-4 (c) runs generation from a
  prefix, Regenerate (keep) and New random with a placement-locked and a shape-locked raised way. No invariant of law 1
  is left unchecked on this lens's paths.

## Held for round 8 (outside the family; not graded)

* §5.2 F-WALL's non-raised rung "re-offset with a larger radius" (l. 9840) can move stage 1's trace more than 40 m. S3
  (9)'s **Test** and §5.3's distance row (l. 6264–6268, 9939) have no exception for it either. This is the same class as
  VF7-GEN-03, outside the family.
* §4.2 S3 (7) (l. 6214) places each gate at a route's *first* point at `T = t_1`. Nothing states that a (5) route
  crosses `T = t_1` once, and `T` is not monotone along a route once several routes and the water pull shape it. A later
  re-crossing would cross the trace with no gate (§5.3's way-and-trace row, l. 9924).
* S3 (5) prices a raised stretch over a canal planned at S3 (2) by span length alone (§4.3, l. 6448–6449). The support
  step at S4's commit may then drop it as `raised_too_long` (§2.7 support step (3), l. 2551–2553), leaving a committed
  gate route without its crossing. This is a raised-way × channel case, not raised-way × wall.

## Verdict for this lens

All fourteen round-6 findings of this lens are fixed in the live design:
* S3's gate-route re-solve;
* S5a's pull keeping a deck crossing beneath its deck;
* New random's pulled trace;
* the stopped moat's strip;
* the crossing counts by stage;
* §4.13's rung;
* the regeneration over the state sweep;
* the slide bound;
* the fixed places;
* the castle paths.

The laws, as assembled, give the generation pipeline and a regeneration under a kept raised way one lawful outcome at
almost every step. The examples' tests hold most of their cases, and §5.3's law-1 row with T110-4 checks every
invariant of law 1 on these paths.

Three majors remain:
* **VF7-GEN-01.** S5a's pull list, which *beneath* and V06 cite as the one list, omits law 1 (2)'s condition that the
  arches over an over crossing clear the wall. A builder who follows it crosses under a low span, breaking law 1.
* **VF7-GEN-02.** S3 (8)'s list of the raised ways that stand at S3 leaves out a creation prefix's declared ones, so the
  castle filter can put a fixed place in a declared road deck's zone (law 1 (6)).
* **VF7-GEN-03.** S3 (9)'s **Test** and §5.3's distance row have no exception for the stage-1 trace that F-WALL's
  widened raised-way rung re-pulls, so the check fails a correct build.

Each closes with a few words at its site. The six minors are three readers (VF7-GEN-04, -07, -08), two valid choices (VF7-GEN-05, -06) and one missing test run (VF7-GEN-09). This
lens therefore finds the family **not yet free of majors**.
