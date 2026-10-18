# The lens design critic — gap list (workflows/40, critic seat)

> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat check/lens-n-critic; to be retrovalidated overall at the next opportunity (owner, 2026-10-17, J375)

The completeness critic of amendments n as applied (docs/validation/coherence/lens-n.md), recorded verbatim. Its fourteen gaps are carried by amendments o (workflows/41-lens-close.js); J386 rules gaps 6 and 7.

Material gaps found: 14 in all. One is high, five are medium and eight are low or low-medium. Item 6 also asks for one new owner question. File n is applied and agrees with file m and with itself in the places that matter. The gaps are things left out, plus two stale statements.

1. **HIGH: the trade lens leaves out production, consumption, imports and exports. These are the owner's own words.**
   - Where: J380 asks for "the flow of trade/caravans based on individual imports, exports, production, consumption, of goods and services" (docs/PROGRESS.md:439) [STATED].
   - The lens note's first trade row is "Production and need", live on every campaign and public in the dossier (research/sf/lens-implications.md:236) [STATED]. The trade note lists the same fact (research/sf/trade-system.md:860) and makes production and need glyphs its first lens addition (:875-878). Its supply record also carries the input good (:187).
   - V13's trade lens (docs/volumes/V13-world.md:3173-3187) has no such element. `LensFacts` (:804-819) has no economy field, `arrivals` (:812) carries no good, and H23 (:3578) does not ask for either [OBSERVED].
   - Fix (file o):
     - (a) Add `LensFacts.economy?: { seat; produces; needs; exports; imports; services; foodCoverage?; audience }[]`, each good keyed by the host's normalized catalog key with its category and shippable flag, in host words through the adapter's goods table. Add `arrivals[].good?`.
     - (b) Add trade-lens rows:
       - "production and need": a glyph by category, with shippable goods, food (never ships) and services (never move) drawn differently. Class S, every regime, public where the host's dossier shows it, criminal income DM-only, scrub by plate.
       - "food coverage": a ring, with the stressor cut marked apart from a siege.
       - "supply arrival": captioned with its good.
     - (c) Add an H23 clause asking for these lists and the supply link's input good.
     - (d) Add a T-V13-53 clause (or a new T-V13-56): production draws under every regime, relations included; food never draws on a link; a service never moves; a supply link names its good.
     - (e) Add a decision row recording the choice.

2. **MEDIUM: the religion lens leaves out the host's global deity ranking (asked for in J380), suppressed creeds (J379, kept by the faith read) and patron falls.**
   - Where: J380 says "note how we have local and global diety rankings and a global piety system" (docs/PROGRESS.md:439). The faith read lists the global rank (tier, seats, wins/losses, public allowlisted), suppressed creeds (engine state, not public) and patron falls (research/sf/faith-system.md:1192, :1194, :1195). Its legend is ordered by global tier (:1209-1210), and it keeps "suppressed creeds DM-only" from J379 (:1276) [STATED].
   - V13's religion lens (V13:3212-3227) has realm piety but no rank, suppressed-creed or fall row. It only refuses showing suppressed creeds to players (:3231). `LensFacts.faith` (:808-810) and H23/H28 (:3578, :3583) carry none of these [OBSERVED].
   - Fix:
     - Add `LensFacts.pantheon?: { deity; tier; seats; wins; losses; audience }[]` and `faith[].suppressed?: string[]`, never in the party set.
     - Send patron falls as dated events.
     - Add religion rows: "global rank" (a legend ordered by tier and seats; S; seated and spread; public); "suppressed creeds" (S; DM-only); "patron fall" (a dated glyph; S; host-dated).
     - Add an H23/H28 clause, and T-V13-54 assertions that suppressed rows never reach a party set and the rank legend follows the host's tier order.

3. **MEDIUM: the culture, danger and calamity lenses have no recorded decision.**
   - Where: J379 names "later culture, trade and danger" (docs/PROGRESS.md:438). The lens note gives each its own table (research/sf/lens-implications.md:301-325).
   - V13's `LensId` holds exactly eight (V13:786). §5.9 (:3101) and §9's decisions and deferred list (:3677-3698) never mention these three [OBSERVED].
   - Fix:
     - Add D-V13.8 (deferred) or J-V13.101, recording each as a later row of the same mechanism, with its host facts and gate:
       - culture: pair-distance link shading from H13's bands, class D;
       - danger: the embattlement ring, route danger per mover and believed danger, gated on H17 and the lens window;
       - calamity: strike pins and relative exposure shading, never merged with plague.
     - Say why they are outside J384 (8)'s order, and add one sentence to §5.9's intro pointing at the row.

4. **MEDIUM: rows from the lens note were dropped silently, with no element, no refusal and no reason.**
   - The rows (all line numbers in research/sf/lens-implications.md):
     - trade: stocks and throughput bands with entrepôt heat (:240), gate seizures (:241), supply-web plans (:243), relief and credit (:244);
     - populations: pressure (:260);
     - religion: pilgrim catchment (:209), rite adoption (:210), the rite imposed under vassalization (:211);
     - prosperity: pilgrim catchment (:273), the through-route mark (:274), the district wealth word (:276);
     - alignment: quadrant postures (:226), gate character (:227), town grain (:228);
     - patrols: gate character (:194), escort quality (:195);
     - plague: the town condition (:292).
   - The `catchment` drawing grammar is declared (V13:797, :3025) but no element uses it [OBSERVED].
   - Fix: for each row, either add it with its `LensFacts` field and H23 clause, or add a "Not drawn in this pass" line under each lens's refusals with the reason:
     - the town-map rows belong to the frame document;
     - a catchment needs a host-sent set, because the map never recomputes;
     - DM-only plans wait on the trade step.
   - Then either use `catchment` for the pilgrim catchment or drop it from the grammar list.

5. **MEDIUM: V13 states the culture measure in a way that contradicts J384 (2) and the program's own alignment read.**
   - Where: J-V13.64 (V13:3658) says the measure "counts a shared sovereign and trade ties". §3.9 (6) (:1760-1761) justifies holding the culture band through an occupation because "the host's measure counts a shared sovereign as closeness".
   - J384 (2) rules the plain form, with no trade tie (V13:759; H13 :3568) [OBSERVED]. The alignment read finds that the governance term compares government labels and that its header is stale (research/sf/alignment-system.md:1060; lens-implications.md:307, :365) [STATED]. H25 (V13:3580) still asks the host which reading is right.
   - Fix:
     - J-V13.64: "…the host's own culture distance in its plain form over its whole vector (no trade tie, J384 (2)), a measure not purely cultural, held through an occupation…".
     - §3.9 (6): replace the parenthesis with "(held because an occupation may move its governance and alignment terms while no holder changes, (12); whether its governance term reads a shared sovereign or only a government label is H25's question)".

6. **MEDIUM, and an OWNER QUESTION: J384 (6), canonizing a native world at birth, has no decision row, does not appear under Q4, and leaves a pricing decision to "the host's choice".**
   - Where: H22 (V13:3577) waits on Q4 and leaves the premium canonize entitlement to the host's choice. §9 has no decision row for it (:3677-3693), and Q4 (:4074-4080) does not mention H22 [OBSERVED].
   - Fix:
     - (a) Add J-V13.100: chose a native world canonized at the campaign's birth for new campaigns (J384 (6)), with genesis laid at birth and existing campaigns untouched, over the premium canonize as the only route to the canon. Reason: otherwise every new campaign's lenses open uncanonized (plague footprint, populations netted, trade relations only), and the native world is the canon from its first week.
     - (b) Add to Q4: "H22 (J384 (6)) also waits on this answer; until it is confirmed, new campaigns are born uncanonized."
     - (c) Add Q5, an owner question: "Does canonizing a native world at birth follow the host's premium 'Map geography' entitlement, or apply to every new campaign?" Recommendation: apply it to every new campaign on a native world (J384 (6)'s purpose needs it), and keep re-canonize and retcons as the premium DM's act.

7. **LOW-MEDIUM: a host verdict cannot move a march line until the host sends force bands, which defeats much of ask 4.**
   - Where: MarchHold enters only through (10) as μHold (V13:1851). (10) says that while the host sends no force bands, the military term is dark (:1839-1840) [OBSERVED].
   - So in the civil regime, the default preset, even a raid carrying H25's outcome word moves a band and no cell. J384 (5) says "only a host verdict moves a march line"; nothing says that in the civil regime no line moves at all [INFERRED].
   - Fix: rule one of two options.
     - (a) Let μHold alone break a debatable tie when the military term is dark (a lead of at least `margins.mil` in μHold units).
     - (b) State it in §3.9 (11), J-V13.86 and the civil banner ("fight verdicts are recorded as hold bands and move no line until the host sends force bands"), and add a T-V13-41 (s) clause.

8. **LOW-MEDIUM: the base is out of step with the lens additions.**
   - Where: the base's §2.9 world view keys (docs/ARCHITECTURE.md:4198) lack `worldLens` and `lensWeek`, though V13 §1b.3 cites them as §2.9 keys (V13:486-489) and BCR-V13-5 adds them (:3752-3755).
   - The base's §16 still reads "M-W0 – M-W4 … 28–36 pw" (ARCHITECTURE.md:309, :21665, :21710, :21755). BCR-V13-37 and V13 §8.2 say M-W5 and 37–45 (V13:4017-4021, :3502).
   - The base's §7.7 ends "M-W2 for the rest but `lensWindow`" (:12896), which places the DM-placed site offers at M-W2. V13 builds devotion cards in M-W5's religion step [OBSERVED].
   - Fix:
     - Add a base item in file o appending the two keys to line 4198, as item 837 did for the port paragraph.
     - Either apply BCR-V13-37 to the four §16 lines or list it as pending in the BCR ledger.
     - Change :12896's tail to "M-W2 for the rest but `lensWindow` and the DM-placed site offers, M-W5's".

9. **LOW-MEDIUM: T-V14-33 (the devotion card) is in no V14 build step.**
   - Where: its only occurrence is docs/volumes/V14-sites.md:2858. The §8 table's steps SE0–V4 (:2883-2897) gate neither the test nor `SiteRequest.devotion` [OBSERVED].
   - Fix: add the devotion field, G2's `secrecy.devotion` row and T-V14-33 to SE3 ("the secrets"), with its religion-lens clause gated on V13's M-W5 religion step.

10. **LOW-MEDIUM: the lens picker, scrub bar, plate pin and lens-mark card are cited as V09's, but nothing designs them.**
    - Where: the collapsed, greyed and openable picker rows, the scrub bar with its declared gaps, `pinPlate` and the `lensWhy` card are cited as V09's (V13:405, :459, :460, :3472). V09 has no row for them, and BCR-V13-25 (:3915-3923) binds edit events only [OBSERVED].
    - Fix: add BCR-V13-39 to V09 (the world view's lens picker, scrub bar, plate pin and lens-mark card), or state in §5.8 that V13 owns their behaviour and V09 only hosts the panel.

11. **LOW: the player-picture wording disagrees between §5.1 and §5.8 (7).**
    - Where: §5.1 says "under an omniscient preset the picture is the truth" (V13:2921-2922). §5.8 (7) says "the public truth or nothing" (:3076-3077), and §5.8 (2) forbids reading a regime from a preset's name [OBSERVED].
    - Fix: §5.1 → "under an omniscient regime (no belief recorded) the picture is the sway over the host's public facts".

12. **LOW: some mechanism clauses have no test, and one rule has no decision row.**
    - No test covers:
      - (a) one event tagged for several lenses moving each at its week, with the scrub agreeing across lenses (§5.8 (1), V13:3027-3028);
      - (b) `lensWhy`;
      - (c) the authorship note (plague DM-authored, no deity on a born world) and the population small-seat bias; T-V13-55 covers prosperity and alignment only;
      - (d) a player-audience picture export of a lens view (`lensAt` feeds exports, :458) holding only player marks and never a historic front (:3221);
      - (e) no stage, encounter or clerk importing `@plat/world/lens` (J-V13.90).
    - §5.8 (6), host vocabulary as data and the polarity table, has no decision row; J-V13.78 covers only one word, one meaning.
    - Fix: extend T-V13-47 with (a)–(c), T-V13-50 with (d) and T-V13-7's lint with (e), and add a decision row for vocabulary-as-data and polarity.

13. **LOW: the research bracket file n wrote in research/sf/fp-realm-review.md:625-629 says H16's flood exposure reads the "wet-season flood share".**
    - The revised H16 (V13:3571) reads the terrain word H14 derives, and the wet-season share only as a finer reading the host chooses (file n review issue 10) [OBSERVED].
    - Fix: reword the bracket to match.

14. **LOW: `W_POLITY_SATELLITE_UNPLACED` (V13:3457) is not once per window.**
    - On an uncanonized campaign every steading is orbit-only, so the warning would fire for every satellite on every window [INFERRED from lens-implications.md:180].
    - Fix: add "once per window", like `W_POLITY_CULTURE_ABSENT` and `W_POLITY_STRENGTH_ABSENT`.

**Checked and carried, no gap:**
- **J384 rulings:**
  - (1): V13:1771-1775 and J-V13.83.
  - (3): :1790-1801 and J-V13.84, with the bounded push and the "level" fallback recorded as vetoable interpretation (a).
  - (5): :1847-1851 and J-V13.86.
  - (7): :3077-3079 and J-V13.92.
  - (8): :786, :3502, J-V13.93.
  - (9): :3080-3097 and J-V13.91.
  - (10): :3225, J-V13.95 and V14 J-V14.56.
  - (11): :1770, :1863-1868 and J-V13.85.
  - (12): :3198 and J-V13.94.
  - (13): :3039-3047 and J-V13.88.
  - (2) and (4): applied by file m (V13:759, :765; H13 :3568).
  - (6): carried as H22, with the gaps in item 6.
- **J382:** fully in file m. (a) and (b) are at V13:1755-1767 and :759-760 and H13; (c) is a religion refusal (:3229) tested by T-V13-54.
- **The eight lenses:** each has regimes ending in a still word, elements with drawing, audience and scrub columns, and refusals (:3107-3266).
- **Host asks:** all 35 of lens-implications §5 are in V13 §8.5, under H13 and H22–H30. Ask 33 is taken through its "export the resolved regime" option.
- **Mechanism rules (1)–(8):** each has a test (T-V13-47–51 and 53) and a decision (J-V13.87–94), except the holes in item 12.
- **Other documents:** the proposal §6, the brief and the V14 devotion texts agree with V13.
- **Checks run:** a scan of the new lens texts found no host identifiers, and the bundle check reports up to date.