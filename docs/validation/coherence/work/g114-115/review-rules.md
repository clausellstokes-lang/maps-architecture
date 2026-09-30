# Review: owner words and conflicts (draft items 114 and 115)

**Reviewer's lens.** Do the drafts honour the owner's words exactly? Do they contradict any owner rule or standing
decision, and where they change one, is the change deliberate and stated? Is every interpretation justified, marked
vetoable, and never presented as the owner's own? Do they follow SettlementForge's slider definitions (J121)?

**Subject.** `items-114-115.md` (cited as `items l.N`), read against `draft-notes.md` and `read-{base,sf,vols}.md`.

**How claims were checked.** Every claim was checked against the design files themselves, not the notes alone:
- `docs/OWNER-INSTRUCTIONS-2026-09-25.md` (whole);
- `docs/DEFINITION.md` (whole);
- `docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md` (whole);
- `docs/PROGRESS.md` rows J120–J125;
- g items 102, 107, 112 and 113 (whole);
- item 20 (b, h) and items 22 and 23 (`AMENDMENTS-2026-09-25b.md`, `-27c.md` §G);
- item 72 (d‴), (d4) and (d5) (`-27c.md`);
- item 101 R2, R13 and R15 (`-27e.md`);
- the base §7.7 whole (layer 1, layer 2, dossier contract items 1–12, the derivation table) and §7.8 whole
  (`new/base/determinism/03-s7-editing.md`);
- §4.5's bands, band range, dials and pressure, and §4.11's `EpochInputs` and history-first generation
  (`new/base/pipeline/01-s4-generation-pipeline.md`);
- II.6 whole (`new/base/pipeline/09-ii6-staged-layers.md`);
- D-3 (`new/base/scope/11-delegated.md`);
- V05 §3.2, §3.3, §4.2 (declaring) and §4.4, with J-V5.10, J-V5.19 and J-V5.25;
- V10 §2.12;
- V11 IN-V11-1;
- V12 §1;
- `research/sf/mapping.md` rows 12 and 54 and J-M5;
- `research/sf/dossier-outputs.md` §1.2 and §3.1;
- `docs/lane-events.log` (2026-09-30).

Receipts are in `tmp/rv-*.txt` (`rv-receipts.txt`, `rv-events.txt`, `rv-item72.txt`, `rv-det-economy.txt`,
`rv-progress-j12x.txt`).

**Verdict.** The quotations are verbatim, and both items keep the owner's core nouns: the whole map, SettlementForge's
economy slider, and a conjunctive gate. But they still need changes:
- Two items extend the owner's "first generation" / "initial generation" beyond what he said and attribute the extension
  to him (R1, R4).
- One lets a non-owner input override the owner's ceiling at the first generation (R2).
- The two items treat author edits against the owner's rules inconsistently (R3).
- Several program numbers and unestablished SettlementForge facts are stamped as the owner's rule or as confirmed (R8–R10,
  R12).
- The retirement of J-V5.19 is misdescribed (R11).
- A landed unit is missing from the late seats (R15).

There are **21 required changes**. Items R1–R11 and R15 are **major** (the parallel editors would diverge, or the owner's
words or a standing decision would be misstated). Items R12–R14 and R16–R21 are **minor**.

---

## A. Required changes: item 114

### R1 (major). "First generation": the persistence of the founding ceiling is attributed to the owner, and (e) contradicts itself

**Evidence.**
- The owner said: "at generation time the first generation, teh economy slider determines the cieling prosperity"
  (OWNER-INSTRUCTIONS not yet updated; the quotation is at items l.2–3).
- items l.113–122, (e), reads: "The owner said FIRST generation, so the priority is read once per creation and never
  again. At every epoch the position is recomputed as the higher of the recorded priority's row value and the wealth
  floor … a fall brings the ceiling back toward, never below, the founding's row … *Why:* the owner's words; …".

**Defects.**
1. The owner's words bind the first generation. That the founding row keeps capping every later epoch is the program's
   reading; it is not "the owner's words". draft-notes D114-9 gives the real reason, which is realism (option (i) rejected
   because "an economy-10 town grown by 1 % would suddenly gain a rich band"). The item does not state that reason.
2. "Read once … and never again" is false as written. The recorded priority's row value is read at every epoch (items
   l.114–115), and it is read by item 115's gate at every later rising (items l.303–305).
3. items l.124–125 says "no model change, since no map fact depends on it after creation (item 11 (b))". Both uses just
   named are map facts that depend on the recorded value after creation.

**Required change.** Replace the lead of (e) and its *Why* with:

> **(e) AFTER THE FIRST GENERATION — the founding ceiling carried, the lived wealth lifting it.** The owner's rule binds
> the first generation: the economy priority is read from its source (the dossier, T1, a blueprint) once per creation and
> recorded in `Recipe.intent.economyPriority`. What follows is the program's reading (vetoable). At every later epoch the
> position is the higher of the recorded value's row and the wealth floor (b) 2 at the lived wealth … *Why (the
> program's):* realism — a town's top never jumps without cause, and the ceiling lapsing at the first epoch would give an
> economy-10 town grown by 1 % a rich band at once; SettlementForge's surveys found no writer of its sliders after birth
> (PLAUSIBLE, read-sf §1) while its prosperity word lives (CONFIRMED, receipt F9); item 20 (h) keeps the lived word the
> truth. *Rejected:* the ceiling lapsing after the first generation (the jump above); the ceiling following the slider's
> current value (the owner said the first generation).

Replace "no model change, since no map fact depends on it after creation (item 11 (b))" with:

> no model change: every later reader reads the value recorded at creation, never the dossier's later one, so the change
> re-derives nothing (§7.7 item 11 (b)).

### R2 (major). The wealth floor lets the advanced Wealth level override the Economy at the first generation, standalone

**Evidence.**
- items l.52–59, (b) 2: the floor reads "`w` the wealth level in force (the recipe's …)". It ends: "Standalone … the floor
  never binds …; it binds where an author sets the wealth level above the Economy."
- items l.160–161, (i) 5, and T114-5 (l.186–188) bar exactly that lift.
- items l.34–35, (a) 3, offers the wealth level on a dossier map "as the map-side alternative", that is, as a way past the
  dossier-owned Economy.
- The only reason the item gives for the floor is item 20 (h): "a low slider never contradicts a rich word". That reason
  has no force where there is no dossier word.

**Defect.** The owner said that the ECONOMY slider determines the ceiling. As drafted, a second first-generation input
lifts the ceiling at will: the advanced Wealth level, standalone, and on a dossier map the map-side wealth level. The
owner's rule is then inert whenever the advanced panel is used. This is not item 20 (h), and nothing else justifies it.

**Required change.** In (b) 2, replace the definition of `w` and the last sentence with:

> `w` the dossier's own word — DR6's wealth level from `wealth.label` through V08 §2.6's `wealth` row — and, after the
> first generation, the lived wealth: `EpochInputs.wealthLevel` (F9, or a V06 trajectory target) once it has replaced the
> level in force (§4.11). An author's wealth level in the recipe never sets the floor. It moves the mean as today, the
> fold caps the top, and where it asks for more than the ceiling admits the advanced Wealth level shows `info.ceiling`
> with `button.economyUp`. Standalone at creation the floor therefore never binds, and `by: 'wealth'` means "the
> dossier's word or the lived wealth".

Apply the same change in three other places:
- **(e):** read "the wealth level in force" as the lived wealth defined above, not the recipe's.
- **(a) 3:** "the wealth level offered as the map-side alternative for the town's overall wealth — it moves the mean,
  never the ceiling".
- **(i) 5 and T114-5:** delete "or an author's wealth level above the Economy", and add the bar: "standalone, economy 10
  with the advanced wealth level 0.9 keeps the ceiling at the Economy's row, `by: 'economy'`, and shows `info.ceiling`".

### R3 (major). Author edits above the ceiling are bent in one place and held in two others; §7.7 item 11 and item 101 R13 say they stand

**Evidence.**
- (h), items l.150–153: "T5 `quarter`'s band chip above the ceiling bends to the highest allowed band —
  `bend.fill.ceiling`". T114-10 (l.198) bars it.
- (c) 7, items l.89–93, on the other hand: "a locked, pinned or declared entity above the ceiling holds, its fate
  `held above the prosperity ceiling`".
- Item 115 (d) 4, items l.315–321, holds an author's island against the owner's gate (`held against its magic` /
  `…economy`, J-V5.10 extended).
- §7.7 item 11 (03-s7-editing.md l.1793–1794): "The rules bind the DERIVATION … a user's edit of a map fact (a prosperity
  stroke …) belongs to the user and stands".
- Item 101 R13 (`AMENDMENTS-2026-09-27e.md` l.234): "Whatever the author declared is held by default". T5 `quarter` is a
  declaration: `drawBoundary` + `assign` + a `setField(prosperity)` stroke (03-s7-editing.md l.431–436).
- §4.5 lets an author `setAttr` the `FieldBands` cuts (pipeline l.1233–1236). The item never says what the ceiling does to
  such an edit.

**Defects.**
1. The owner's rule is about "generation time the first generation". A later author edit is outside it, and the item
   treats it so for islands (115) and for declared entities ((c) 7), but not for a declared band.
2. The pair of items therefore teaches the parallel editors two contrary rules.

**Required change.** In (h), replace the `bend.fill.ceiling` sentence with:

> An author's explicit band above the ceiling — T5 `quarter`'s band, a `setAttr` of the `FieldBands` cuts that reopens a
> band above it, a T6 or `placeAt` of a class whose band row lies above it — is HELD, never bent. The plots it covers band
> at the declared band (the banding clamp of (c) 2 skips them). The households S10a homes there read that band. The rest
> of the town keeps the fold. The fate `held above the prosperity ceiling` is confirmed at the dry run, with
> `info.fill.ceiling` — "Richer than the town's economy allows ({band}); held as you drew it." — and `button.economyUp`
> offered. A T8 stroke moves values, which band by the town's cuts under the ceiling; to hold a band above the ceiling,
> the author declares it (T5).

Apply the same change in five other places:
- **(c) 7:** add "an author's declared band" to the held list.
- **(k) pipeline seat:** STATES the held band's mechanism in §4.5.
- **(k) V09 seat:** `info.fill.ceiling` replaces `bend.fill.ceiling`.
- **(k) determinism seat:** §7.4's fate row.
- **T114-10:** "a T5 band chip above the ceiling is held with its fate, and its undo restores the digest".

### R6 (major). After a same-id re-offer, the locked Economy shows a value the dossier no longer states

**Evidence.**
- items l.22–23: "§2.8's `factTier` reads `dossier` for `Recipe.intent.economyPriority` exactly when the settlement's
  carried facts hold a value for it".
- items l.123–125: a later slider change is "carried in the settlement's carried facts", F-V8-8, `creation_only`, and the
  recipe is not changed.
- items l.32–33: the host frame shows the Economy "locked, 'Set by SettlementForge'".
- §7.7 item 9 (l.1708–1710): a dossier fact is "immutable on the map and changed only by a dossier event".

**Defects.**
1. After F-V8-8 the carried fact holds the new value, while `factTier` marks the recipe's old value as a dossier fact.
2. The host frame then shows as "Set by SettlementForge" a value SettlementForge no longer holds.
3. A dossier that first lacks the value (the recipe holds a map-owned 50, perhaps edited by the author) and later
   supplies one would have its recipe value turn "dossier-owned" at the wrong number.

**Required change.** Replace the `factTier` sentence with:

> `Recipe.intent.economyPriority` is SettlementForge's economy AT THIS MAP'S CREATION. `factTier` reads `dossier` for it
> exactly when the creation's absorb carried a value (its provenance names that absorb), and a value that arrives or
> changes later never re-tiers it or moves it (F-V8-8, `creation_only`).

Replace the host-frame sentence with:

> shown locked, "Set by SettlementForge when this map was made", and — where the carried value now differs — the report
> line "SettlementForge's economy is now {new}; this map keeps {old} from its creation (F-V8-8)".

V08 and V09 state the line; the determinism seat states the tier rule.

### R7 (major). The base sentences that the dossier-owned economy (and 115's dossier-owned magic) contradict are not in any seat

**Evidence.**
- Layer 1 (03-s7-editing.md l.1411–1413): "the port's creation half fills the intent from the dossier … the filled values
  are map facts (§7.7 item 9) and stay editable."
- §7.7 item 9's list of dossier facts by kind (l.1714–1718) names neither the economy priority nor the magic word.
- items l.214–221, the determinism seat, names "§7.7 layer 1 (`Intent.economyPriority`, …)" and item 11. It does not name
  either sentence above.

**Defect.** A copied intent value becomes dossier-owned, and the creation slice's magic becomes dossier-owned (items
l.266). Both are deliberate changes to standing base text, but no editor is told to make them. The determinism editor
would keep "the filled values are map facts".

**Required change.** In 114 (k)'s and 115 (h)'s determinism seats, add:

> STATES layer 1's exception — "the filled values are map facts, except the economy priority the dossier supplied at
> creation (item 114 (a))" — and §7.7 item 9's dossier-fact list gaining "the settlement's economy priority at creation
> where the dossier supplied one (item 114)" and "the creation slice's magic word where the dossier supplied one
> (item 115)".

---

## B. Required changes: item 115

### R4 (major). "In the initial generation" has dropped out of the title, (d) and the D-3 sentence, and the extension is not acknowledged

**Evidence.**
- The owner said: "only high magic on the slider allows for floating islands in the initial generation." The owner then
  said: "actually floating islands has to have both high magic and high economy" (items l.247–248).
- The title (l.246) reads "Floating islands need both high magic and a high economy".
- (d) 1 (l.302–305) gates every later rising: an epoch's `raiseIsland`, and a settled refloat.
- The D-3 sentence the scope seat must write (l.394–395) reads "only with high magic and an economy of 75 or more at their
  rising".
- The reasoning that makes the second message general appears only in draft-notes D115-6, not in the item.

**Defects.**
1. The "actually" message corrects the condition (magic only → magic and economy). It does not restate the scope.
2. Gating later risings is the program's extension, but the item presents it as the rule itself. The title and D-3
   sentence would carry it into the base as the owner's.

**Required change.**
- **Title:** "OWNER RULE — Floating islands at the first generation need both high magic and a high economy".
- **Open (d) with:**

  > The owner's rule governs the initial generation: creation, every re-derivation of it, and the history-first replay,
  > which item 113 makes "part of the generation" (§4.11: the replay's epochs are the creation prefix). Gating every
  > later rule-driven rising by the same clauses is the program's reading (vetoable). The "actually" message restated the
  > condition and did not narrow it to a moment, and a rising without both would contradict "has to have both".
  > *Rejected:* later risings under today's law alone (a low-magic city would then gain islands at its first epochs).

- **D-3 sentence:** "… only at CITY and METROPOLIS; at the first generation — and, by the program's reading of item 115,
  at every later rising — only with high magic and an economy of 75 or more; and only where prosperity supplies them".

### R5 (major). At later risings the gate reads magic live but the economy frozen, although SettlementForge writes both only at birth

**Evidence.**
- (d) 1 (l.303–305): "the magic in force at that time and the recorded economy priority (constant after creation)".
- (d) 3 (l.312–314): "a dossier's changed `magicLevel` rides the next epoch's slice … and opens or closes the gate for
  later risings". The economy's change, by contrast, is F-V8-8 `creation_only` (114 (e)).
- read-sf §1–§2 (from `dossier-model.md:53`, `dossier-generation.md:746, 750`): no simulator writer of `config.priority*`
  **or** `config.magicLevel` was found. Both are SettlementForge generation inputs that change only by a regeneration.

**Defect.** Two parallel SettlementForge birth inputs are given opposite lifecycles for the same gate, with no reason
stated. The outcome on a same-id re-offer is arbitrary: raising magic opens the gate, raising the economy never does.

**Required change.** Pin one rule for both clauses. The recommended rule, which is the literal "initial generation"
permission:

> At every later rising both clauses read the values recorded at creation — the first generation's permission. The
> magic `none` in force, which is the supply side ((d) 2), bars a rising exactly as it wanes a standing island. A
> dossier's changed `magicLevel` still rides the next epoch's slice for the lights, the access kinds and the wane, but
> opens no gate. Standalone, both are changed only by the Magic and Economy controls, which re-run the first generation.

If the other rule is chosen instead (both read in force), F-V8-8's response becomes `epoch` for the gate, while the ceiling
stays creation-only. (d) 1, (d) 3, T115-3 and V06's seat must then say so. Either way, state the reason in the item.

### R8 (major). "High magic on the slider": an unestablished fact is stated as confirmed, and the reason for leaving the slider unread contradicts the item's own argument

**Evidence.**
- items l.251–252 (under "CONFIRMED"): "`config.magicLevel` … which its step 1 (`resolveConfig`) derives — how it bands
  the slider is not recorded".
- items l.260–261: "the word its generation resolves from its magic slider and toggle, so its own banding decides".
- read-sf §2: "How `magicLevel` is resolved (from `priorityMagic` bands? from `magicExists`? from culture or tier?) —
  **N**". Hypotheses A and B are open.
- items l.262–263: "`priorityMagic` stays never-read: its effect already sits in `magicLevel`, and reading both would
  count it twice (J-M5's own reason)".
- Yet 114 (g) (l.137–140) argues that "a bound and a gate clause add no weight … so nothing is counted twice".
- The owner's words: "high magic **on the slider**".

**Defects.**
1. The item asserts as confirmed a link the survey marks as not established.
2. It then drops the owner's literal referent, SettlementForge's magic slider, on a double-count reason that its own (g)
   says does not reach a gate.
3. If SettlementForge resolves `magicLevel` from culture (hypothesis B), a SettlementForge author who sets the magic
   slider to its top still gets no island. That contradicts "high magic on the slider allows".

**Required change.** Relabel both passages: "how `resolveConfig` derives `magicLevel` is not recorded (N; read-sf §2)".
Delete the double-count reason. Then choose, and state the choice:

- **(A) Recommended, as the owner's literal words.** The magic clause holds where SettlementForge's magic slider is high —
  `config.priorityMagic ≥ 75`, the same "high" as the economy's, one threshold for both sliders — or where its resolved
  `magicLevel` is `high`. It never holds where `magicLevel` is `none` (SettlementForge's world law; item 20 (h)).
  `priorityMagic` then joins `priorityEconomy` as a named consumer of the creation half, read once for the gate and never
  as a weight (114 (g)'s argument). It is recorded as `DossierDigest.settlement.magicPriority?` with the same absent and
  clamped notes. §7.7 item 1's list, J-V8.45, BCR-V8-25, T-V8-20 and T115-2 follow.
- **(B)** Keep `magicLevel: 'high'` alone, and state three things: the N fact; the consequence ("a SettlementForge author
  who sets the magic slider to its top may still get no island; the report names the source, 'magic moderate —
  SettlementForge'"); and why that risk is accepted over (A).

### R9 (major). The reason for choosing 75 rests on a SettlementForge equivalence nobody has recorded

**Evidence.** items l.275–278: "75 splits the range above the default in two as SettlementForge's four magic words split
magic, so 'high' names the same top quarter in both words the gate reads."

**Defect.** SettlementForge's banding of any slider, and whether its four magic words cut the magic slider into quarters,
are N (read-sf §1, §2; draft-notes "N facts"). The sentence invents a correspondence and presents it as following
SettlementForge.

**Required change.** Replace the last clause of *Why 75* with:

> and 75 is the program's pick for "high" — the upper half of the range above the default, a round, neutral cut, since
> SettlementForge records no banding of its sliders (N). Vetoable.

### R10 (major). The program's numbers are stamped as the owner's rule

**Evidence.**
- items l.43, (b) 1: the ceiling rows `{0, 'modest'}` and `{50, 'rich'}` carry "`ownerRule: '114 (b)'`, never calibrated,
  V12 §1".
- items l.279–281: `IslandRule.gate` `{magic: ['high'], economyMin: 75}` carries "`ownerRule: '115 (b)'`, never
  calibrated".
- V12 §1 (V12-calibration.md l.150–155): "Rules that are the owner's stay the owner's … No tuning run, no fallback and no
  historical map may move them; if the historical maps ever show something an owner's rule excludes … it goes to the
  owner as a question with the recommendation 'keep the rule'".
- The IN-V11-1 precedent (V11 l.5044–5048) stamps what the owner fixed, such as the raised ways' rung gate. The program's
  numbers beside it, the chance and the cap, stay calibration values with minima.

**Defect.** The owner fixed two things: that the ceiling follows the economy slider, and that islands need both clauses.
The owner did not fix `modest` at 0, "no ceiling" from 50, or 75. Stamping those values `ownerRule` presents program
choices as the owner's word, and V12 would put them to the owner as "keep the rule".

**Required change.** Stamp `ownerRule` only on what the owner fixed:
- the ceiling's existence and its monotone dependence on the economy priority;
- the gate's two conjunctive clauses, with the magic clause's word `high`.

Mark the ceiling rows, the parity row and `economyMin` 75 with provenance `own` (the program's reading under J122,
vetoable), `calibratable: false`, and the reason "no corpus measures a slider". Also:
- V11's seat and V12's register entries read "owner's rule (clause) / program's value (row)";
- V12 §1's list names the two rules, not the numbers.

### R11 (major). J-V5.19 is "retired" in (c) but generalised in (d) 5; T115-2 and declarations under a disabled control contradict the text

**Evidence.**
- (c), l.294–296: "the refusal of the SETTING where the dossier states `none` (§7.7 item 11, J-V5.19) is retired — the
  setting alone raises nothing now".
- (d) 5, l.325–327: "where a failing clause is the dossier's, the control is disabled with its reason row
  `refuse.islandsDossier`". That now disables the setting on every census dossier city (economy 50 or magic low).
- T115-2 (l.359–360): "a `medium` city at economy 90 has 0 islands (`gated: magic`) and a disabled control". But (c)
  reports `islands: off` whenever clause (1) fails (l.291), and a disabled control cannot turn the setting on.
- V05 §4.2 (l.2057–2058): "Declaring an island … the gate (V5 §3.2 (1)) … must hold". The gate includes the setting.
  (d) 4 says a declaration under a failed magic or economy clause is ALLOWED, and that the one refusal is a dossier-stated
  `none`, but it never says whether a setting that is off or disabled refuses the declaration.
- J-V5.19's second half, "keep the setting and the circumstance independent without a dossier", is also overturned by the
  item. Only "J-V5.19 restated" is given (l.402–403), with no pinned text.

**Required change.**
- **The (c) "Subsumed" sentence becomes:**

  > J-V5.19 is REPLACED. The refusal of the setting where the dossier states `none` is generalised by (d) 5: the Islands
  > control is disabled wherever a failing clause is the dossier's (§7.8's nothing-to-act-on rule). A standalone map's
  > setting and magic are no longer independent. The new J-V5.19: "Chose to gate every rule-driven rising by item 115's
  > clauses in every document, to disable the Islands control where a failing clause is the dossier's, and to refuse
  > only a declared island in a world the dossier states magic-less, because the owner coupled islands to magic and the
  > economy (item 115) and a floating island would contradict a magic-less dossier world (item 20 (h))."

- **Pin in (d) 4:**

  > A T5 `sky` declaration and a T6 island placement are judged by the rung clause and a dossier-stated `none` only. The
  > setting, magic and economy clauses never refuse them: with the setting off or disabled the declaration stands as a
  > forced slot and the setting stays as it is. The parity clause keeps V05 §4.2's present treatment. V05 §4.2's
  > "the gate must hold" is rewritten accordingly.

- **T115-2:** "a `medium` city at economy 90 has 0 islands, its control disabled with `refuse.islandsDossier` and its
  report `islands: off` with the reason row; with the setting on through a user's preset, `gated: magic`".

- **Where some failing clauses are the map's and others the dossier's**, pin one outcome: disabled, the row naming the
  dossier's clauses and the buttons offering the map's.

---

## C. Required changes: both items, and minor ones

### R12 (minor). SettlementForge facts are labelled CONFIRMED beyond what the survey found

**Evidence and required change.**
1. items l.9 says "all 155 census dossiers were generated at the default sliders", and l.276 says "all 155 census
   dossiers sit at 50". V08's seat (l.236) says "all 155 at 50". But `dossier-outputs.md` §1.2 and read-sf §1 record that
   the three sample cards (among them Black Crag, a CITY) carry "real wizard dials that appear in no other sample", and
   their slider values were not recorded. Write instead:

   > the 152 generated from rotated configs sit at the default 50 (CONFIRMED); the three sample cards' slider values are
   > not recorded (N)

   In (c) l.299–301, say that the census conclusion rests on the magic clause alone: no census dossier is `high`
   (CONFIRMED).
2. items l.8 says "no simulator writes them after birth", and l.122 says "SettlementForge writes its sliders only at
   birth". Write instead: "no survey found a writer after birth (PLAUSIBLE that they stay at their birth values)".
3. (g) l.137–140 says "Nothing is counted twice". Add: "whether `priorityEconomy` moves SettlementForge's prosperity word
   is not recorded (N); if it does, the word sets the mean and the ceiling bounds the top — two moments, not one weight
   counted twice".

### R13 (minor). J121: the departures from SettlementForge's own slider definitions are not stated

**Evidence.**
- The standalone Magic control (l.266–269) is None · Low · High, default None, discrete. SettlementForge's magic is a
  0–100 slider, default 50, with a `magicExists` toggle (read-sf §1–§2).
- The Economy's label "Economy" (l.24–25) is justified by the keys' word. SettlementForge's UI label is N (read-sf §1).

**Required change.** Add to 115 (a) 2:

> This departs from SettlementForge's magic slider (0–100, default 50) and its `magicExists` toggle: D-3 keeps magic
> `none` by default, and banding a slider into none, low and high would invent cuts SettlementForge never recorded (N).
> The control offers SettlementForge's resolved words instead. The owner's "on the slider" is SettlementForge's slider on
> a hosted map (a).

Add to 114 (a) 2: "the label is the program's pick; SettlementForge's own UI label is not recorded (N)".

### R14 (minor). Research row 12 is not answered

**Evidence.** `research/sf/mapping.md` row 12 maps `config.magicLevel` to "II.6's island supply law …; none → no islands"
with the transformation "word → a supply multiplier". The task's reading list names it. Item 115 never mentions it.

**Required change.** Add to 115 (b):

> Research row 12's "none → no islands" is superseded by the magic clause, and its "word → a supply multiplier" stays
> unadopted: the magic clause gates, the supply law sizes.

### R15 (major). V03 and V04 have landed; V04 needs a late seat

**Evidence.** `docs/lane-events.log` l.1867 records "2026-09-30 01:34 coherence/rewrite-V04 LANDED", and l.1868 records
"01:35 coherence/rewrite-V03 LANDED". Neither landed text carries item 114. Against this:
- 114 (k) (l.205–206) and 115 (h) (l.379–380) say "the landed base parts in a late rewrite seat each, every other unit in
  its main rewrite";
- 114's V04 part (l.229–230) is "REFERENCES (c) 6 in one pointer at F2 and C5".

**Required change.** The lead of both unit lines becomes:

> the units whose rewrite has landed when this item is filed — the base's model, kernel, pipeline, determinism and
> rendering, and volumes V03 and V04 (landed 2026-09-30 01:34–01:35) — in a late rewrite seat each; every other unit in
> its main rewrite.

V04's late seat carries 114's one pointer. V03 has no part in either item.

### R16 (minor). Edge (14) contradicts (a) 1 and T114-11

**Evidence.**
- (a) 1 (l.19–20): an out-of-range value is "clamped to [0, 100] (noted `economy_clamped`)".
- T114-11: "140 reads 100".
- (i) 14 (l.171–172): "A dossier missing the value or out of range: 50, editable".

**Required change.** (i) 14 becomes: "A dossier missing the value, or holding a non-number: 50, editable,
`economy_absent`; out of range: clamped, `economy_clamped` — tier 5, substitution".

### R17 (minor). The no-op pin needs `FieldBands.ceiling` absent when there is no ceiling

**Evidence.**
- `FieldBands` is model data in the digest (read-base C3; DET6 §6.2).
- (d) (l.104–109) says "absent means no ceiling", but it does not say when S6 writes the record.
- T114-1 claims byte-identity with today's documents at economy ≥ 50. (i) 13 says "byte-identical … but for
  `FieldBands.ceiling`".

**Defect.** If S6 writes `{at: 5, by: 'economy'}` at economy 50, every document's digest changes, and the claim that
"the goldens and every parity run stay as they are" fails.

**Required change.** Add to (d):

> S6 writes `FieldBands.ceiling` only when the highest allowed band lies below the band set's top band. Otherwise it is
> absent, so every document at economy ≥ 50 or under a parity preset keeps today's digest.

### R18 (minor). The floor's "+1" is presented as item 20 (h)'s requirement

**Evidence.**
- (b) 2 (l.55–57): "a dossier's word always keeps a band of room above its mean … and a low slider never contradicts a
  rich word (item 20 (h))".
- DR6's bar (03-s7-editing.md l.1746) is "the population-weighted mean band within one band of the wealth row's band".

Without the +1 (floor = the word's own band), on the default shares, the mean band is 1.97 for Moderate at a `modest`
ceiling and 3.05 for Prosperous at a `prosperous` ceiling. Both are within one band, but only just for Prosperous. So the
+1 is a safety margin chosen by the program, not something item 20 (h) forces.

**Defect.** The +1 overrides the owner's ceiling for every word from Moderate up at a low slider. At economy 0, a Moderate
word lifts the ceiling from `modest` to `comfortable`, and a Comfortable word lifts it to `prosperous`. The item gives the
program's margin as item 20 (h)'s demand.

**Required change.** Keep the +1 if wanted, but write:

> The floor is the word's band plus one — the program's margin (vetoable), so T73-7 keeps its margin under the fold; item
> 20 (h) alone requires only the word's own band. Its cost to the owner's rule: at a low economy a Moderate word lifts the
> ceiling to `comfortable`.

### R19 (minor). "The rarity the owner asks for"

**Evidence.** (c), l.301. The owner asked for a condition ("only … allows", "has to have both"), not for rarity.

**Required change.** Write instead: "the consequence of the owner's condition at SettlementForge's defaults".

### R20 (minor). A panel group nobody has defined, and an ambiguous "R15"

**Evidence and required change.**
1. "the advanced panel's fantasy group" (115 (a) 2, l.270) exists in no base part, no volume and no amendment (receipt
   `tmp/rv-receipts.txt`: 0 hits). Write "in the advanced panel, beside the Islands control", or have V09's seat state the
   group.
2. "(R15; J-A101.77)" (114 (a) 2, l.26) means §7.8's control-surface budget. Item 101 has its own R15 ("NEVER LOSE WORK"),
   and 115 cites item 101's rules as "R2, R13". Write "§7.8's control-surface budget (R15)".

### R21 (minor). The one-click town's wealth level is assumed, not stated

**Evidence.**
- The base states no default `wealthLevel` (read-base C1; grep: no default in `new/base`).
- The item's promise that "the one-click town, the goldens and every parity run stay as they are" (l.47–48) depends on
  the one-click recipe standing at 0.5.

**Required change.** Add to (a) 2:

> the base's unstated wealth-level default is thereby 0.5 (economy 50), the value §13.2's sweeps, T15-1 and V05's
> calibration take as reference; a preset or form row that sets `wealthLevel` explicitly keeps it (§7.5)

The scope seat states it once in §13.2's goldens note.

---

## D. Points checked with no defect found

- **The quotations** are verbatim, typos kept, and match the event log's relay (`lane-events.log` l.1842). No other owner
  instruction (OWNER-INSTRUCTIONS, DEFINITION) names a wealth or economy slider, so renaming T1's wealth slider to
  "Economy" contradicts no owner word. The change is stated as the program's.
- **The whole map.** The ceiling reaches the ground, the village product, a standalone neighbourhood, the underground and
  undercity (banded by the town's `FieldBands`, II.7), held islands and hinterland classes. None is missed.
- **The economy slider, hosted.** `config.priorityEconomy`, resolved, 0–100, default 50, is SettlementForge's own
  (read-sf §1). Leaving `_config` and `economicState.priorities` unread is right.
- **A band ceiling rather than a value clamp.** The reading is justified (per-town quantile cuts; `S_town` untouched) and
  marked vetoable. It honours "the ceiling prosperity", since the design's prosperity is "a gradient and a band" (owner).
- **"Both … and …".** The gate is conjunctive in every clause and bar.
- **Item 72 (d‴), (d4) and (d5).** The map's ceiling bounds the district range and never lies below the district's own
  band. The item states that the pressure gains no upward excess at the highest allowed band, a deliberate limit on
  (d‴)'s "until the neighbourhood itself upgrades". The dials are unchanged. There is no conflict with (d4)'s "the map
  reads the make-up; it never models the economy".
- **D-3 and J-A10.01.** The model setting is kept, off by default. The standalone Magic defaults to None, honouring D-3.
  The view toggle is unchanged.
- **Parity presets.** Exempting them from both rules follows item 23 and the J-V5.25 precedent, and it is stated.
- **No deferral wording.** A grep of the items for deferral stems finds only "a later change", used as a condition
  (receipt `tmp/rv-receipts.txt`).
- **The realism tiebreaker.** There is no conflict. The lowest ceiling, `modest`, and the island rule's realism floor are
  argued from the references.
- **Item 113.** "A history-first generation IS the first generation" agrees with §4.11 (the replay's epochs are the
  creation prefix, flagged `creation`) and with the owner's "as part of the generation".
- **Item 20 (h)'s refusal of a declared island in a dossier-stated magic-less world** is right. It is the one refusal item
  101 R2 admits.
- **J-M5, row 54 and §7.7 item 1** are narrowed deliberately, with the reason stated. Subject to R8, the same argument
  applies to `priorityMagic`.
- **V07's contradiction** (§1 against §3.12 and V06 §3.2) is resolved deliberately, in V07's seat.
- **The numbers** (at = 2 + 3·min(e, 50)/50; 17, 34 and 50; 97.8 %; "the floor never binds when derived") were recomputed
  and are correct.
