from lib import *
t = extract(2323, 2539)
R = [
("### 3.18 The underground over epochs (item 109 (h), (j) (1)–(5) with (3b), (k) (1)–(6) as revised; J-V6.50–J-V6.53, J-V6.62–J-V6.66)",
 "### 3.18 The underground over epochs (item 109 (h), (j), (3b), (k); item 113 (d), (e); J-V6.50–J-V6.53, J-V6.62–J-V6.66)"),
("fading by `under.fade` (V04 §2.6; `W_RUIN_SOURCE_REMOVED`); no epoch\n   removes a ruin (TR-17).", "fading by `under.fade` (V04 §2.6; `W_RUIN_SOURCE_REMOVED`); no epoch\n   removes a ruin."),
("**At a\n      village rung** (ST-29), each mining use's", "**At a\n      village rung**, each mining use's"),
("(c) over them adds nothing — the test is idempotent (TR-18) — and (c)", "(c) over them adds nothing — the test is idempotent — and (c)"),
("""   access point — **transitively**, so opening one void can open those beyond it (109 (j) (3b)). A cluster that turns
   accessible is chronicled `accessOpened`, naming its cause.""",
 """   access point **through open links only** — **transitively**, so opening one void can open those beyond it (109 (j)
   (3b)) — and `lost` (item 113 (e), II.7.4) when it was accessible once and every open path to the surface has closed. A
   cluster that turns accessible is chronicled `accessOpened`, naming its cause; one refound from `lost` the same, with
   its former reading named.
   **Growth over a sealed or lost void** (item 113 (d), (e); the owner's named combination). A new house over it draws its
   dig by (a); a sewer extension over it reopens the closed runs on its path before laying new ones (V04's J-V4.29, II.7.2)
   and its runs breach the void by (b); a growing catacomb or working does the same by (b) and (c). A lost void so
   reached is refound in that batch — its reading `accessible` again — and (4) admits dwellings in it from the same epoch;
   its former households, gone by the vacancy rules, return only through regrowth (V06 §3.8) like any household."""),
("   **Whose households** (ST-19; J-V6.100).", "   **Whose households** (J-V6.100)."),
("whether or not the town has sewers (item 574; TR-09).", "whether or not the town has sewers (item 574)."),
("6. **Foundations over the epoch's scope** (ST-20; V04 §3.5.0 *Foundations*).", "6. **Foundations over the epoch's scope** (V04 §3.5.0 *Foundations*)."),
("**3.18.2 Catacombs over epochs** (109 (k) (1)–(6) as revised ~20:05: only under cemeteries; J-V6.52, J-V6.53,\nJ-V6.64, J-V6.65).",
 "**3.18.2 Catacombs over epochs** (item 109 (k): catacombs only under cemeteries; J-V6.52, J-V6.53, J-V6.64, J-V6.65)."),
("reads as worked out at the epoch (V04 §3.5.3, given the epoch's scope; TR-18) within", "reads as worked out at the epoch (V04 §3.5.3, given the epoch's scope) within"),
("and church count, island churches included (ST-24), **re-read at each epoch** (ST-55).", "and church count, island churches included, **re-read at each epoch**."),
("the span's calamity deaths (each `CalamityRef.deaths` of the epoch's events, V08;\n   ST-31) added", "the span's calamity deaths (each `CalamityRef.deaths` of the epoch's events, V08)\n   added"),
("with a plague condition active in the span (`activeConditions`) adding", "with a plague condition active in the span (`activeConditions`, or a replay epoch's `plague` condition effect, V06 §3.20.3) adding"),
("`growthFloorM2` (the cells cited, their values V11's; SCC-69), a share **per year compounded over the epoch's span**, so the same century grows the same at any\n   cadence (J-V6.53; ST-44). V6 passes this cap,",
 "`growthFloorM2` (the cells cited, their values V11's), a share **per year compounded over the epoch's span**, so the same century grows the same at any\n   cadence (J-V6.53). This volume passes this cap,"),
("V11 §3.23.8's `rankCap` (V04's `CatacombRule` field; SCC-47) × the primary's", "V11 §3.23.8's `rankCap` (V04's `CatacombRule` field) × the primary's"),
("4. **The timeline invariant** (109 (k) (4), (6); V6 owns it).", "4. **The timeline invariant** (109 (k) (4), (6); this volume owns it)."),
("or a village rung holds it in V04's maintenance mode (`rung`, V04 §3.1; ST-18);", "or a village rung holds it in V04's maintenance mode (`rung`, V04 §3.1);"),
("chronicled `catacombResumed` (TR-13; what closes and reopens a face,", "chronicled `catacombResumed` (what closes and reopens a face,"),
("**3.18.3 Crypts over epochs** (109 (k) (2) as revised: \"CHURCHES GET CRYPTS:", "**3.18.3 Crypts over epochs** (109 (k) (2): \"CHURCHES GET CRYPTS:"),
("(item 436; the village rows' by V07 §2.4; TT-06 — its values are those tables', never restated here),", "(item 436; the village rows' by V07 §2.4 — its values are those tables', never restated here),"),
("at V11 §3.23.8's `cryptJoin.own` (V04's `CatacombRule` field; SCC-47) when", "at V11 §3.23.8's `cryptJoin.own` (V04's `CatacombRule` field) when"),
]
t = apply(t, R)
t = rx(t, r"reading turns `unexcavated` in that batch, and the fade adapter vacates the void's dwellings \*\*in the same batch\*\* by\n   II\.7\.3's vacancy rules, returning their households as `EpochOps\.displaced` \(cause `void`\), re-housed at `siting` in the\n   same epoch \(V06 §3\.8\.1\); chronicled `voidSealed` and `voidVacated`\. A sealed void is `unexcavated` for dwellings until an\n   access exists again\.",
 """reading turns `lost` in that batch (item 113 (e): remembered as once known, drawn faded like an unexcavated
   void), and the fade adapter vacates the void's dwellings **in the same batch** by II.7.3's vacancy rules, returning
   their households as `EpochOps.displaced` (cause `void`), re-housed at `siting` in the same epoch (V06 §3.8.1);
   chronicled `voidSealed` and `voidVacated`. The same holds for every op of any phase that closes a void's last open
   path — a sewer sealed or caved in, a cellar filled, the building above lost, a disaster (item 113 (e)): the batch that
   closes it turns the reading `lost` and vacates its dwellings. A lost void takes no dwellings until it is refound
   (above).""")
t = strip_narr_ids(t)
save('12-s3g.md', t)
print(words(t))
