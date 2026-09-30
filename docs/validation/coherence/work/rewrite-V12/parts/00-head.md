# Design volume 12 — Calibration, reconciliation and parity measurement: how the built generator is tuned against the references and later the corpus

> PENDING FABLE REVIEW — written by opus stand-ins for the Fable seat (volumes/V12-calibration, its revisions, reconciliation and coherence lanes); covered by the whole-design retrovalidation (J84).

**How to read this volume.** It builds the calibration harness over the base (`docs/ARCHITECTURE.md` with files f and g
applied: `docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`). **Citations:** a bare `§n` or `II.n` is the
base's; `Vnn §n` is a design volume's section, this one included (`V12 §3.11`); a list after a volume prefix stays in that
volume; `item n` is an amendment item — 1–101 the owner's instructions, 102–119 file g's owner and program rules, 200 and
above file f's, each the applied text of a volume's base change request (V12 §10 lists this volume's); `J-VI.n` is a
volumes-integration decision (`docs/volumes/_integrate.md`), cited, never restated. Decisions are J-V12.n (V12 §9), bars
T-V12-n (V12 §7), owner questions Q-V12-n (V12 §11, every one answered). **Clean room.** This volume is an implementer
input under §17.1 (1): it names no reference class, method, grammar, palette or asset; reference evidence is cited by file
and section only, and every number it quotes from a capture is a measured behaviour (§17.1 (6)). The corpus was not
read: the machinery and the process follow `partitioned/README.md`'s rules alone.

## 0 In plain words

**What this part of the program is.** Once the generator is built, its rule tables are full of numbers — how far a lane
may bend, how wide a rich plot is, how often a market sits off the main square. This volume sets those numbers right and
proves it, first against the other generators (MFCG, FTG, Neighbourhood, Village Generator and Fantasy Manor) and later
against the owner's historical map collection — without ever changing how the generator works. It runs as four loops.

1. **Measuring the references.** A research helper measures our recordings of the other generators — how much streets
   turn, how big buildings are, how many gates a town has — on towns whose seeds were fixed by a formula before anything
   was captured, so nobody can pick flattering examples. Only numbers cross into the product's folder: never a picture, a
   name, a colour or a line of anyone's code.
2. **Measuring ours the same way.** The product measures its own towns with the very same code, so like is compared
   with like. Every number has a band worked out by one written rule; each night a report says, for every comparison,
   "in band", "out of band" or "for information".
3. **Tuning.** When one of our numbers is out of band, a table value is changed — never the code — by a small, recorded
   search on practice towns kept apart from the test towns, then checked on a second set it never saw. Each change is a
   new version of that table, declared in the release notes in plain words ("lanes now bend a little more, matching FTG's
   streets"), and saved towns keep opening exactly as they were made.
4. **The owner's eye.** At four milestones — M1 (the look check), M2b, M4 and M5 — the owner gets one sitting page of
   about an hour: pairs of maps, ours beside a reference, the sides hidden, three questions per pair (which is easier to
   read, which looks more like a real town, which would you rather use). The later stages' pages join the next of these
   sittings once built; a page the owner has not rated stays "provisional — not rated". Only the owner's answers let a
   milestone say "at parity" or "mastered"; a machine never says it for them.

**Tendencies, not guarantees.** Many of the owner's rules are leanings — "the tannery is usually downstream", "a town that
grows over a cavern usually breaks into it". The harness proves each by counting over many practice towns: it ranks each
town against the same town shuffled at random (a fair coin breaking exact ties), counts members exactly where the
question is "how many landed on the right plots", or watches a rate climb as towns grow — with rules worked out
beforehand so that chance almost never passes and a real leaning almost always does. A failing bar re-runs once on fresh
towns before anything changes. Where the owner's own volume states how a bar passes, that statement wins.

**Rules that are the owner's stay the owner's.** Some numbers are the owner's word — a catacomb only under a cemetery,
the cathedral always with a crypt, raised ways generated only in cities. No tuning, fallback or historical map moves
them; a historical map that shows something an owner's rule excludes goes to the owner as a question with the
recommendation "keep the rule". Catacombs are checked never to shrink on any kind of rebuild, and to fill their ossuaries
when they cannot grow.

**Later: the historical maps.** After the standalone generators are built, the owner's historical map collection adjusts
the default numbers and bands — never the machinery ("what we built stays the base"). One historical example proves
that something is *possible*, never that it is *common*; only a fair sample of measured plans, chosen before anyone
looks at the answer, says how common. The collection teaches drawing, never naming, and its 53 held-back plates are never
used. MFCG's and FTG's behaviour stays exactly reachable through the parity presets; the historical values arrive as a
"historical" layer that becomes the default for its era and region only where the owner's sitting passes it.

**The owner's later rules.** Terraces, raised ways, deck plots and stepped temples (item 110) are measured against our
own rules — no other generator makes them — and a second test city made from an original sketch (a port with a
sea-anchored wall, a walled harbour, terraces, a raised road and a stepped temple) must come out as sketched every time,
as must the first. Water in dry country (item 111), history at generation (item 113), walls that decay into gaps and patchwork and
recover (item 114), the grandeur ceiling of small places (item 115), the zoom-out limit (item 116), seasons (item 117)
and festival decorations (item 118) each get their bars here; colour-blind-safe styles (item 112) get their style check's
threshold and the game-master trial's findings in the calibration record; and every one-time wait is timed against its target and the ten-second
comfort level (item 119). Turning any owner item's new rules off gives back exactly yesterday's towns, and a season or a
festival never changes the map itself — both proved by byte-for-byte pins.

**How it feels to the owner.** A one-page dashboard in plain words after each nightly run; the four sittings; and release
notes that name every number that moved, what it was matched against and by how much, with one plain line for each new
behaviour switched on.
