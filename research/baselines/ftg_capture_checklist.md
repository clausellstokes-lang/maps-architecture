# FTG capture checklist (W-02, one capture per day)

Research-side file (lane `m1/W-02`, written 2026-10-03 before the first capture). It holds the literal form labels the
driver needs; records outside `research/` and `captures/` name the settings in our own words only (plan-check PC-20).
Owner rule J159 (2026-10-03): the site's free one-per-day allowance only; no account, no login, no purchase, no premium;
on any cookie or consent notice choose the most private option (decline non-essential) and accept nothing else; if the
site asks for a login, an account, a payment, new terms or anything outside that list, STOP and report it.

Paths: `MAPS=/Users/cstokes/Desktop/Maps`; `ISO=<scratchpad>/m1/ftgrun` (the isolated runner, step A3);
`CAP=$MAPS/captures/ftg/<stamp>` (the stamp is printed by the session at start).

## The day's slot (plan section 2.1; `research/baselines/plan.json` → `ftg.slots`)

| day | slot | size (request key) | form size option | coast select | rivers box | label |
|---|---|---|---|---|---|---|
| 1 | 0 | `BIG_TOWN` | the option whose value is `BIG_TOWN` | "No coast" | off | `capture/FTG/BIG_TOWN/none/0` |
| 2 | 1 | `BIG_CITY` | the option whose value is `BIG_CITY` | "No coast" | off | `capture/FTG/BIG_CITY/none/0` |
| 3 | 2 | `BIG_TOWN` | as day 1 | "Coastal" | on | `capture/FTG/BIG_TOWN/coast+river/0` |
| 4 | 3 | `BIG_CITY` | as day 2 | "Coastal" | on | `capture/FTG/BIG_CITY/coast+river/0` |
| 5 | 4 | `BIG_TOWN` | as day 1 | "Coastal" | on | `capture/FTG/BIG_TOWN/coast+river/1` |
| 6 | 5 | `BIG_CITY` | as day 2 | "Coastal" | on | `capture/FTG/BIG_CITY/coast+river/1` |

A refused day slides the schedule: the next day takes the same slot.

**Every other value is the 2026-09-21 base** (the Galeiaward capture; `research/ftg-capture/roadlength100/README.md`
lists it): name blank; layout preset "Medieval europe" (untouched; never open All settings); building material "Wood";
races "Generic fantasy"; religions "Generic religions"; average lifestyle "Comfortable"; climate "Temperate (deciduous
trees)"; boxes Farms, Forests, Reserve natural area and Walled **on**. The site's fresh form differs from that base in
the size, the coast, Rivers, Forests, Reserve natural area and Walled (2026-09-25 step 003), so the boxes are set every
day. The water options are the only change between days of one size.

## A. Pre-flight (no site contact)

1. `date`; `df -h /Users/cstokes` — stop under 1 GB free.
2. No other FTG session: `pgrep -fl "profiles/ftg"` prints nothing; no `SingletonLock` in `profiler/.profiles/ftg`.
3. **Isolated runner.** Parallel lanes share `profiler/.session` and port 9333 (`export.mjs` and `drive.mjs` read that
   file). The FTG session must neither take another lane's browser nor hand its own to another lane, so it runs from
   byte-identical copies whose session file lives in the scratchpad:
   - `mkdir -p $ISO/profiler/lib`; copy `profiler/session.mjs`, `profiler/drive.mjs`, `profiler/package.json`,
     `profiler/lib/common.mjs`, `profiler/lib/instrument.js` into the same places (copies, not links: Node resolves a
     linked module to its real path, which would bring back the shared `.session`);
   - links: `$ISO/profiler/node_modules → $MAPS/profiler/node_modules`, `$ISO/profiler/.profiles → $MAPS/profiler/.profiles`
     (the persistent guest identity), `$ISO/captures → $MAPS/captures` (so the capture lands in the project);
   - `cmp` each copy with its original (receipt for the record);
   - port **9341** (check `lsof -nP -iTCP:9341 -sTCP:LISTEN` is empty).
4. Helper commands (scratchpad): `D="node $ISO/profiler/drive.mjs"`; every `text` reading goes to a scratch file and is
   summarised (href, title, the visible text's first lines, items with coordinates).

## B. Session

1. `node $ISO/profiler/session.mjs --target ftg --headful --port 9341` (background; no `--profile` anywhere today, no
   `--instrument`). Wait for `recording → …/captures/ftg/<stamp>/session`; note the stamp. Check `$ISO/profiler/.session`
   names port 9341 and that outDir.
2. `D text`, `D shot landing`.
3. **Cookie or consent notice?** If a banner or dialog is present: `text` + `shot`, then click only the control that
   declines non-essential cookies (or closes the notice without accepting). Never "accept all", never terms. If the only
   way forward is accepting something new: STOP (step F1, reason `consent-required`).
4. **Allowance check on the landing.** Expected: the "No sign-up required!" block with the button "Create one-time
   settlement". If the page instead asks to sign in, create an account, pay or upgrade, or says the day's settlement is
   used: STOP (F1, reason `allowance-refused` or the case in words).

## C. The form (a `text` and a `shot` reading before every click or select)

1. Count hit-testable matches of `^Create one-time settlement$` with `D eval` (the same hit test `clicktext` uses: the
   element's centre must hit the element itself). Exactly 1 → `D clicktext "^Create one-time settlement$"`.
2. `D text`, `D shot form-open`. The dialog "Create Temporary Settlement" must be open. Look for the inline sentence
   about cookies that store the settlement (present on 2026-09-21's first visit only): it is the site's notice that the
   temporary settlement is kept in a cookie, part of the approved create step — record whether it appears. A separate
   notice that asks to accept anything goes to B3.
3. `D eval` (inspection) the visible selects with their option texts and values, and the visible checkboxes with their
   label texts, `checked` and centres. The size select is visible select **0** in the simple form (in the All settings
   view the indexes shift — never open it).
4. Size: find the option whose value is the slot's request key; `D text`, `D shot pre-size`;
   `D select 0 "^<that option's text, regex-escaped>$"`; re-read and confirm the selected value.
5. Coast: the coast select (the one whose current text is "No coast" or "Coastal"; on 2026-09-25 it was visible select
   7). If it does not show the slot's option: `text` + `shot`, then `D select <n> "^No coast$"` (or `"^Coastal$"`).
6. Boxes, one at a time, re-reading coordinates each time (they move when the form changes): Rivers to the slot's
   state; Farms, Forests, Reserve natural area, Walled on. For each box to change: `D text`, `D shot pre-<box>`,
   `D click <x> <y>`, then confirm its `checked` by `eval`.
7. Final verification by `eval`: every visible select's selected text and every box's state equal the table above and
   the base; the name field is empty. `D shot form-final`.

## D. Create (the one irreversible step of the day)

1. `D text`; `D eval` the count of hit-testable matches of `^Create Temporary Settlement$` and their centres. Proceed
   only if the count is exactly **1** and that centre lies inside the dialog (the 2026-09-21 session hit a same-named
   element elsewhere first). `D shot pre-create`.
2. `D clicktext "^Create Temporary Settlement$"` (no `--profile`; the session records the network either way).
3. Poll `$CAP/session/network/index.jsonl` (up to 5 minutes) for: the `PUT …/prod/settlements` row with `postData`, its
   intercepted response (the settlement id, `intercept-*.json`), and the intercepted `GET …/settlements/<id>/layout`
   body (`intercept-*.bin`). A non-200 status, an error text on the page, or a sign-in / upgrade prompt → F1.
4. `D text`, `D shot after-create`. Wait until a canvas is present and the map is drawn.

## E. Map shots and stop

1. `D shot map-overview` (the whole settlement; the scale bar should read 500 m).
2. One core zoom: `D wheel 850 700 -600` (no `--profile`), then `D shot core`.
3. `touch $CAP/session/STOP` (or `D stop`); wait for `session closed`. `df -h /Users/cstokes`.

## F. After the capture (no site contact)

1. **Refused day:** `python3 research/baselines/plan.py --fail-ftg <slot>=<reason>` (lower-case words joined by `-`),
   note it in the day's record and stop; the next day retries the same size and water.
2. **Request:** take the PUT row's `postData` from `index.jsonl`; `requestHash` = sha256 of its exact UTF-8 bytes, first 12
   hex; save it pretty-printed as `$CAP/create-request.json`; check `size` = the slot's key, the coast type is the no-coast
   value (day 1, 2) or the coastal value (days 3–6) and `rivers` is false (days 1, 2) or true; diff it against
   `research/ftg-capture/create-request.json` (2026-09-21) into `$CAP/request-diff.txt` — expected semantic differences:
   the size and the water keys only.
3. **Server time:** layout GET request time minus PUT request time (`ts` columns of `index.jsonl`); recorded, CONTENDED
   (M0's build seats share the machine; plan-check PC-11), feeds no time row.
4. **Payload check:** `python3 tools/pb_raw.py <layout .bin> --out $CAP/structure.md`; field 3 with 3.1 (edges) and 3.2
   (nodes) and field 8 (buildings) must be present; buildings = the count of field 8; extent from field 5 decoded as
   zig-zag sint32 in cm (BIG_TOWN ±2 000 m, BIG_CITY ±2 750 m by the size ladder's widths); top-level fields all within
   the known schema 1–27, which has no resident count → `populationSource: nominal` (5 600 / 24 500).
5. `$CAP/README.md`: capture id (the folder name), slot and label, size, `WaterSetting`, population and its source,
   server date and time, server time, buildings, `requestHash`, `referenceBuild` `ftg:<server date>+<requestHash>`,
   the settlement id prefix, the files, the form values, what was clicked.
6. `python3 research/baselines/plan.py --bind-ftg <slot>=<stamp>`; `python3 research/baselines/plan.py --check` → SAME.
7. Record `docs/calibration/E02-ftg-captures.md` + `.json` (one section per day), `df -h /Users/cstokes`, a CHECKPOINT line.

Steps F2–F5 are one command: `python3 research/baselines/ftg_capture_post.py <stamp> --slot <K> --notes <notes.md>`. It
writes `create-request.json`, `request-diff.txt`, `structure.md`, `capture-facts.json` and `README.md`, and exits 0 only
when all 8 checks pass. Run it with `--check-only` first: that writes nothing.

## G. Learned on day 1 (2026-10-03) — read before day 2

1. **The window is smaller than the session's viewport.** This Mac's screen is 1440×900, so the 1500×1100 viewport the
   session sets is larger than the real window (1440×632 CSS px). A plain `shot` captures only the window, at 2×.
   `shot --full` captures the whole 1500×1100 frame, but it **clears the viewport emulation**: the page then lays out
   at 1440×632. Do not use `--full` before the create click. After the click, use it once for the overview.
2. **At 1440×632 the dialog scrolls.** The reserve-area and walled rows sit below its visible edge. A click there lands
   on the dialog's padding and changes nothing. Before clicking those boxes, scroll the dialog with
   `D wheel 720 400 300`, then re-read their coordinates. Check each box's state by `eval` after every click.
3. **Map zoom.** Wheel steps on the map are small, so use the zoom-in control (its coordinates come from the `text`
   reading).
4. **Size-dependent values.** Choosing a size also changes eleven size-dependent values of the layout preset in the
   request (stage parameters, the random-faction count, two shop probabilities). No simple-form control sets them.
   `ftg_capture_post.py` classes them separately and reports them.
5. **Same id each time.** The guest identity's temporary-settlement id was the same as on 2026-09-21 and -25. The new
   settlement replaces the old one.
6. **Shell helpers.** In zsh, `D="node …"` is not word-split. Use a shell function (`D() { node …/drive.mjs "$@"; }`).
7. **If the landing page shows the previous settlement** instead of the create buttons, use the map page's "Create new
   temporary settlement" control, after a `text` and a `shot`. If it says the day's settlement is used, or asks for an
   account, a login, a payment or terms: STOP (F1).

## H. Signed-in captures (J163; slots 1–5, 2026-10-03) — read before slot 2

Written by lane `m1/W-02-slot1` after slot 1 (`captures/ftg/2026-10-03T22-04-25`; record: E02 sections 9 and 10). Owner
ruling J163 replaces J159's "no account" rule for FTG only. Slots 1–5 are created one after another, the same day, in
the owner's signed-in free account in `profiler/.profiles/ftg`. Every rule of sections A–G still holds unless this section
says otherwise. The table in section "The day's slot" still gives each slot's size, coast and rivers.

**Never click or open:** "Sign out" / "Logout" (on the landing at its foot, on the settlements view at the top right,
and on the map page at the **top left, (26, 21), next to the home link**); "Settings"; "New Folder"; a settlement row's
"…" menu (delete, rename, share live there); the map toolbar's "Re-roll settlement with previous settings" (it makes a
second settlement); the size option "★ Metropolis" (premium; disabled); anything upgrade, Patreon or premium.
**STOP without clicking** (a `shot`, then report in `owner_notes`): a settlement-limit message or a counter at 10 / 10;
a payment or upgrade prompt; new terms; a sign-in or Google prompt, or a landing without the "Signed in as" line (the
session expired); a cookie notice with no decline option; anything else not described here.

**Privacy.** The account's display name is on the landing ("Signed in as …"), at the top of the settlements view and
in the shots. Never write it, the email, an account or user id, a token or a cookie value into any file you choose to
write, inside `captures/` too (the recording itself stays local and is never quoted). Read every `text` through
`research/baselines/ftg_text_summary.mjs`, which prints a redacted summary and saves nothing (this replaces A4's scratch
files). Never `eval` page text wholesale. Records say only "the owner's signed-in free account". Settlement ids are not
account ids; records keep their first 8 hex, as on day 1.

Shell (zsh; a function, G6): `D() { node $ISO/profiler/drive.mjs "$@"; }`, `T() { D text | node $MAPS/research/baselines/ftg_text_summary.mjs "${1:-40}"; }`,
`HIT() { D eval "$(node $MAPS/research/baselines/ftg_text_summary.mjs --hit "$1")"; }` (prints the count of matches
and each hit-testable one as `[x, y, tag, insideTheCreateDialog]`).

1. **Pre-flight and session:** A1–A3 and B1 unchanged (own runner copies, `cmp`, port 9341, `pgrep -fl profiles/ftg`
   empty and no `Singleton*` in the profile, the shared `profiler/.session` absent before and after). Check the capture
   folders and `plan.json` first: never create a second settlement for a slot whose PUT is already in a folder's
   `session/network/index.jsonl`.
2. **Landing:** `T`, `D shot landing`. Expect "Signed in as [name]", "Sign out", "Home" and the membership text (the free
   limit: "Free accounts have a limit of 10 settlements, which will not be deleted."). `HIT '^Home$'` → 2 matches, 1
   hit-testable (≈ 896, 931 at 1500×1100). `D clicktext "^Home$"`.
3. **Settlements view** (`/user/settlements`): `T`, then `D shot settlements-full --full`. Read the counter `N / 10`:
   before slot k it should read k (one earlier settlement, plus one per slot created). STOP at 10 / 10. The `--full`
   shot clears the viewport emulation: from here on the page runs in the 1440×632 window, where every plain shot shows
   what is clicked.
4. **Open the form:** `T`, `D shot pre-new-settlement`, `HIT '^New Settlement$'` → 1 of 1 (≈ 1377, 576);
   `D clicktext "^New Settlement$"`. `T`, `D shot form-open`: the dialog "Create New Settlement", with the same fields
   as day 1's. Visible select 0 is the size (it opens at "Town (~4000 people)"), select 7 the coast; the boxes are at
   x 1008, y 498 (rivers), 527 (farms, on), 556 (forests), 585 (reserve area), 614 (walled) before any scroll. The
   other ~25 "visible" selects belong to All settings; never touch them.
5. **Set the slot** (a `T` and a `shot` before each step, an `eval` of the result after):
   - size: `D select 0 '^Big town \(~6000 people\)$'` (slots 2, 4) or `'^Big city \(~25000 people\)$'` (slots 3, 5);
   - coast (slots 2–5): `D select 7 '^Coastal$'`; then re-read every box's coordinates by `eval` (the form may change);
   - rivers on (slots 2–5) and forests on: check `document.elementFromPoint(x, y)` names the box, `D click x y`, `eval`;
   - `D wheel 720 400 300` (the dialog scrolls; reserve area and walled sit at its clipped edge), re-read, then the
     reserve-area and walled boxes the same way (slot 1: (1008, 367) and (1008, 396) after the scroll);
   - final `eval`: the eight selects' texts and the six inputs (name empty; rivers per slot; farms, forests, reserve
     area, walled on). `D shot form-final`.
6. **Create:** `T`, `HIT '^Create Settlement$'` → exactly 1 hit-testable, with `insideTheCreateDialog` true (slot 1:
   ≈ 947, 522 after the scroll). `D shot pre-create`. Append a CHECKPOINT line saying the create click happens now (a
   resumed seat then knows), then `D clicktext "^Create Settlement$"` — once. Poll `index.jsonl` for the
   `PUT …/prod/settlements` row with `postData`, its intercepted response, and the intercepted
   `GET …/settlements/<id>/layout?asPublic=false` body (`intercept-*.bin`) — the same calls as the guest flow.
7. **Map:** `T` (the map is at `/user/settlements/<id>`), `D shot after-create` (500 m bar), `D shot map-overview --full`;
   two zoom-in clicks at the control `T` lists as "Zoom in" (slot 1: (1418, 471); check it by `elementFromPoint`), each
   after a `T` and a `shot`; `D shot core` (250 m bar).
8. **Back to the list:** check `elementFromPoint(63, 21)` is the home link (`A … /user/settlements`; **(26, 21) is
   Logout**), `T`, `D shot pre-home`, `D click 63 21`; `T`, `D shot settlements-after`: the counter is now N + 1. The
   list call (`GET …/prod/settlements`) gives the new settlement's listed population, which the post script records.
9. **Stop:** `D stop`; wait for "session closed"; no `Singleton*` left; `df -h /Users/cstokes`.
10. **Post:** `python3 research/baselines/ftg_capture_post.py <stamp> --slot K --signed-in --notes <notes.md>`,
    `--check-only` first; all **10** checks must pass. The size-dependent class is now 16 named values (the script's
    `SIZE_DEPENDENT`, R-24). The same-size check makes slots 2 and 4 repeat day 1's 16 values exactly, and slots 3 and 5
    repeat slot 1's. The slot-0 check allows only the slot keys, the water-implied resource entries and those 16 values.
    If the coastal option brings a new kind of difference, do not widen the class without the same evidence slot 1 gave
    (two captures whose form steps differ in one option only); record it and return `failed`.
    Then `plan.py --bind-ftg K=<stamp>` and `--check` (SAME), and an E02 section and `E02-ftg-captures.json` entry.
11. **Privacy grep** of every file you wrote or changed (the capture's README, `capture-facts.json`, `request-diff.txt`,
    `structure.md`, `create-request.json`, your notes, the E02 files, the result file, your `lane-events.log` lines)
    for an email pattern, the display name, a token prefix (`eyJ`) and full ids. Only `create-request.json`'s 45
    partner ids may match the id pattern, apart from `steps.jsonl`, which `drive.mjs` writes itself: it holds the new
    settlement's full id (the map page's address) and the scratchpad's session folder name, neither an account id
    (slots 1 and 2 alike; noted by slot 2).

Slot 2 (2026-10-03, lane `m1/W-02-slot2`) followed H1–H11 without change: the coast select moved no box, and the
reserve-area and walled boxes sat at (1008, 367) and (1008, 396) after the scroll, as in slot 1.

12. **Guarded clicks; the window is not ours alone** (added by lane `m1/W-02-slot3`, 2026-10-03, after a stopped
    attempt: `captures/ftg/2026-10-03T22-29-23/README.md`, E02 section 12). The session window is headful and visible
    on the Mac, and something other than the seat closed the create dialog mid-form. It then opened Settings,
    "Support me on Patreon!", Patreon checkout and a Google sign-in page. The seat had sent two box clicks in the same
    shell command as their `text` readings, so it never saw that the dialog was gone. Rules from now on:
    - never put a `click`, `clicktext` or `select` in the same shell command as the reading it depends on: read,
      check the result, then act in a new command;
    - make every coordinate click a guarded one, in one `eval` + `click` pair whose `eval` returns
      `document.elementFromPoint(x, y)` and the expected control's identity (for a box, the element is that
      `input[type=checkbox]` and the create dialog is open). Click only if it matches;
    - at any sign of another hand (a dialog closed or a page changed without a command, a hover tooltip where the
      driver did not move, a page outside the site): `shot`, `drive.mjs stop`, and report. Do not chase it, and do
      not click on the foreign page;
    - before starting, ask (through the session) that the owner leave the window alone while a seat runs.

Slot 3 (2026-10-03, lane `m1/W-02-slot3b`, `captures/ftg/2026-10-03T22-43-28`) followed H1–H12 with the changes of H13;
every coordinate click had its own `elementFromPoint` reading, and a form-state reading followed every step.

13. **The account is premium from slot 3 on** (owner ruling J164, 2026-10-03; E02 section 9.3). The hard limits are
    unchanged, and a premium-only option is used only where the plan names one (it names none for slots 4 and 5).
    What changed, and what to do:
    - The settlements view shows **no `N / 10` counter**. H3's counter reading and its 10 / 10 stop are replaced by
      counting the account list's rows: read the intercepted `GET …/prod/settlements` body in
      `session/network/bodies/` and count rows by size, numbers only (never print names or ids). Before slot k
      (k ≥ 4) it should hold k rows (the earlier settlement plus slots 1 to k − 1). More rows of the slot's size
      than the captures explain mean a create may already have happened: STOP and report.
    - A new header icon "Premium Settings" (a star, between "User guide" and "Settings") joins the never-click list.
      So does the size option "★ Metropolis (~50000 people)", which is now enabled.
    - The form, its coordinates, "Create Settlement" (1 of 1, ≈ 947, 522 after the scroll, inside the dialog), the
      wire and the map page are unchanged. The landing still shows "Signed in as …", "Sign out" and "Home"; a landing
      without them is still a STOP (session expired).
    - Post-process with `python3 research/baselines/ftg_capture_post.py <stamp> --slot K --signed-in --premium --notes
      <notes.md>` (`--check-only` first). `--premium` changes the account wording only; the 10 checks are the same.
    - Shell helpers used by slot 3, beside H's `D`, `T` and `HIT` (zsh functions in a sourced scratch file):
      `EP() { D eval "(() => { const t = document.elementFromPoint($1, $2); return t ? t.tagName + ' ' + (t.type || '') + ' | ' + ((t.closest('div') || {}).innerText || '').trim().slice(0, 40) : null; })()"; }`
      before every coordinate click, and a form-state reading `G` (the eight selects' texts, the five boxes'
      label, `checked` and centre, and whether the create dialog is open) after every step.

Slot 4 (2026-10-03, lane `m1/W-02-slot4b`, `captures/ftg/2026-10-03T22-57-34`) followed H1–H13 without change: the
account list held 4 rows before (big town 2, big city 2) and 5 after; the form, the coordinates and "Create Settlement"
(1 of 1, (947, 522), inside the dialog) were as in slots 1–3.

14. **Redact the `elementFromPoint` helper too** (added by lane `m1/W-02-slot4b`). H13's `EP` prints the enclosing
    block's text; on the landing's "Home" button that block holds the "Signed in as …" line, so its first reading
    showed the display name, and `drive.mjs`, which logs every `eval` result, wrote it into `steps/steps.jsonl` (slot
    4 redacted that one value afterwards). Use this form, which replaces that line before printing:
    `EP() { D eval "(() => { const t = document.elementFromPoint($1, $2); return t ? t.tagName + ' ' + (t.type || '') + ' | ' + ((t.closest('div') || {}).innerText || '').trim().slice(0, 40).replace(/\\n/g,' / ').replace(/Signed in as [^\\/]*/g, 'Signed in as [name] ') : null; })()"; }`
    For icon buttons (the map's "Zoom in", whose point hits an `svg` `path`), name the control by
    `t.closest('[role=button],button')`'s `aria-label` instead. The map toolbar's re-roll control is shown in the first
    map frames and may vanish after a zoom; it stays on the never-click list either way.

Slot 5 (2026-10-03, lane `m1/W-02-slot5b`, `captures/ftg/2026-10-03T23-10-37`) followed H1–H14 without change: the
account list held 5 rows before (big town 3, big city 2) and 6 after; the form, the coordinates and "Create Settlement"
(1 of 1, (947, 522), inside the dialog) were as in slots 1–4; the redacting `EP` of H14 kept `steps.jsonl` free of the
display name. Programme 1 (slots 0–5) is complete.

## I. Programme 2: the premium slots 6–27 (J164; plan section 2.1b) — read before slot 6

Written by lane `m1/plan-fix-3` (2026-10-03, before any programme-2 capture) from plan section 2.1b (1)–(10). Plan
2.1b (10) first gave this section to the first programme-2 seat; it was written here instead so that every programme-2
seat reads the same procedure. Owner ruling J164: one month of FTG premium (unlimited saves, the premium-only size). The
seats buy nothing, renew nothing and change no account setting. Sections A–H still hold unless this section says
otherwise, H12–H14 included.

| slot | size (request key) | form size option | coast select | rivers box | label |
|---|---|---|---|---|---|
| 6 | `METROPOLIS` | the option whose value is `METROPOLIS` | "No coast" | off | `capture/FTG/METROPOLIS/none/0` |
| 7 | `METROPOLIS` | the option whose value is `METROPOLIS` | "Coastal" | on | `capture/FTG/METROPOLIS/coast+river/0` |
| 8 | `METROPOLIS` | the option whose value is `METROPOLIS` | "Coastal" | on | `capture/FTG/METROPOLIS/coast+river/1` |
| 9 | `METROPOLIS` | the option whose value is `METROPOLIS` | "Coastal" | on | `capture/FTG/METROPOLIS/coast+river/2` |
| 10 | `BIG_TOWN` | the option whose value is `BIG_TOWN` | "No coast" | off | `capture/FTG/BIG_TOWN/none/1` |
| 11 | `BIG_CITY` | the option whose value is `BIG_CITY` | "No coast" | off | `capture/FTG/BIG_CITY/none/1` |
| 12 | `BIG_TOWN` | the option whose value is `BIG_TOWN` | "Coastal" | on | `capture/FTG/BIG_TOWN/coast+river/2` |
| 13 | `BIG_CITY` | the option whose value is `BIG_CITY` | "Coastal" | on | `capture/FTG/BIG_CITY/coast+river/2` |
| 14 | `BIG_TOWN` | the option whose value is `BIG_TOWN` | "No coast" | off | `capture/FTG/BIG_TOWN/none/2` |
| 15 | `BIG_CITY` | the option whose value is `BIG_CITY` | "No coast" | off | `capture/FTG/BIG_CITY/none/2` |
| 16 | `BIG_TOWN` | the option whose value is `BIG_TOWN` | "Coastal" | on | `capture/FTG/BIG_TOWN/coast+river/3` |
| 17 | `BIG_CITY` | the option whose value is `BIG_CITY` | "Coastal" | on | `capture/FTG/BIG_CITY/coast+river/3` |
| 18 | `BIG_TOWN` | the option whose value is `BIG_TOWN` | "No coast" | off | `capture/FTG/BIG_TOWN/none/3` |
| 19 | `BIG_CITY` | the option whose value is `BIG_CITY` | "No coast" | off | `capture/FTG/BIG_CITY/none/3` |
| 20 | `BIG_TOWN` | the option whose value is `BIG_TOWN` | "Coastal" | on | `capture/FTG/BIG_TOWN/coast+river/4` |
| 21 | `BIG_CITY` | the option whose value is `BIG_CITY` | "Coastal" | on | `capture/FTG/BIG_CITY/coast+river/4` |
| 22 | `BIG_TOWN` | the option whose value is `BIG_TOWN` | "Coastal" | on | `capture/FTG/BIG_TOWN/coast+river/5` |
| 23 | `BIG_CITY` | the option whose value is `BIG_CITY` | "Coastal" | on | `capture/FTG/BIG_CITY/coast+river/5` |
| 24 | `CITY` | the option whose value is `CITY` | "No coast" | off | `capture/FTG/CITY/none/0` |
| 25 | `CITY` | the option whose value is `CITY` | "Coastal" | on | `capture/FTG/CITY/coast+river/2` |
| 26 | `TOWN` | the option whose value is `TOWN` | "No coast" | off | `capture/FTG/TOWN/none/0` |
| 27 | `TOWN` | the option whose value is `TOWN` | "Coastal" | on | `capture/FTG/TOWN/coast+river/0` |

The table is `plan.json`'s `ftg.slots` 6–27. One seat records one slot, by slot number; `plan.py --bind-ftg` refuses a
slot while an earlier one is open. Every other form value is as in H5: farms, forests, reserve area and walled on, the
name blank, All settings never opened.

1. **Before the slot (no site contact).** In `plan.json`, slot K must be open and every earlier slot bound or failed.
   No folder in `captures/ftg/` newer than the last recorded slot's may hold a `PUT …/prod/settlements` row; if one
   does, a create already happened for this slot (H1): STOP and report. Run `df -h /Users/cstokes`: stop under 1 GB
   free (a METROPOLIS folder is about 60 MB).
2. **Landing and list (H2, H3, H13).** The landing must show "Signed in as …", "Sign out" and "Home". Without them,
   STOP: the session has expired, the owner signs in once in that window, and the seat is relaunched. The settlements
   view shows no `N / 10` counter. Count the account list's rows from the intercepted `GET …/prod/settlements` body, by
   size, numbers only. Before slot K the list should hold one row (the earlier settlement) plus one for each slot
   1 … K − 1 whose create made a settlement: K rows when every earlier slot made one, so 6 before slot 6. More rows of
   the slot's size than the captures explain mean a create may already have happened: STOP and report.
3. **Never click or open:** H's list and H13's additions stand. That covers "Sign out" / "Logout" (on the map page at
   the top left, (26, 21)), "Settings", "Premium Settings", "New Folder", a row's "…" menu, the map toolbar's
   re-roll control, and anything about an upgrade, Patreon, billing or the subscription. The one change: the size option
   "★ Metropolis (~50000 people)" is now chosen, for slots 6–9 only.
4. **The size (plan 2.1b (2)).** `eval` the size select's options (visible select 0) with their values. Pick the option
   whose value is the slot's request key: for slots 6–9 the one whose value is `METROPOLIS`. Its text on 2026-10-03 was
   the one in step 3, but never select by a remembered or guessed text. Then `D select 0 "^<that option's text,
   regex-escaped>$"`, re-read, and confirm the selected value by `eval`. TOWN (slots 26, 27) is the option the form
   opens at: confirm the value by `eval` (selecting it again changes nothing). The coast, the rivers and the other boxes
   follow H5: coast select 7; re-read every box's coordinates after the coast select and after the dialog scroll; guarded
   clicks (H12) with H14's redacting `EP`; a form-state reading `G` after every step; `D shot form-final`.
5. **Create, and the retry rule (plan 2.1b (6), corrected).** Append a CHECKPOINT line saying that the create click
   happens now. Then `D clicktext "^Create Settlement$"`, once: 1 of 1 hit-testable, inside the dialog (H6). Poll
   `index.jsonl` for up to five minutes for the `PUT …/prod/settlements` row with `postData` and its status, its
   intercepted response and the intercepted layout body. A METROPOLIS build takes about 10 s on the server and its payload
   is about 2–3 MB; the five-minute poll stands. Then go back to the list (H8) and count its rows (step 2).
   - **PUT 200 and one new row of the slot's size:** the create made one settlement. Go on to step 6.
   - **The PUT did not return 200 (no PUT row, a non-200 status, or an error on the page) AND the list shows no new
     row:** no settlement was made. The seat may retry, with at most three create attempts for the slot in all (V12
     §3.12's rule). Before each attempt, take a fresh `T`, `shot` and `G`, and append its own CHECKPOINT line.
   - **A PUT 200 with no new row is ambiguous.** The list may lag, or the settlement may exist where the seat did not
     look. STOP the run and report it in `owner_notes`. **Never retry it**: a retry could make a second settlement in
     the owner's account. Any other combination is reported the same way and never retried (for example, a new row
     after a PUT that did not return 200, or two new rows).
   - **Three attempts and no settlement:** run `python3 research/baselines/plan.py --fail-ftg K=create-failed`, keep the
     folders, report, and return `failed`.
   - **A site refusal** (a limit, a payment or upgrade prompt, a sign-in or Google prompt, an expired premium, new
     terms): STOP as section H says. The slot stays **open** in `plan.json` as the programme's shortfall, never faked
     (ARCHITECTURE §13.6 (12)).
6. **Map, back to the list, stop:** H7–H9. That means the overview, two zoom clicks and `core`; the home link at
   (63, 21), never (26, 21); `D stop`; `df`.
7. **Post (plan 2.1b (3), (5)):** `python3 research/baselines/ftg_capture_post.py <stamp> --slot K --signed-in --premium
   --notes <notes.md>`, with `--check-only` first; all 10 checks must pass. The border check reads the size's half width
   (`HALF_WIDTH_M`: METROPOLIS 3 000, BIG_CITY 2 750, CITY 2 500, BIG_TOWN 2 000, TOWN 1 750 m). The request-diff and
   slot-0 checks admit the six water-implied resource leaves only when the whole resource list is the one the slot's water
   setting implies (`WATER_IMPLIED`). Then run `python3 research/baselines/plan.py --bind-ftg K=<stamp>` and
   `plan.py --check` (SAME), and write an E02 section and an `E02-ftg-captures.json` entry. `plan.py` refuses any change
   to a recorded slot's label, size, water, programme or day (m1/plan-guard-2): never edit `FTG_PREMIUM_SCHEDULE` rows at or before the last recorded slot.
8. **A created settlement that fails a post check** (and is not step 9's case): run
   `python3 research/baselines/plan.py --fail-ftg K=<reason>` (lower-case words joined by `-`), keep the folder, record
   the failure in E02, and return `failed`. Nothing slides: the slots are fixed by number, and slot K + 1 is the next
   seat's.
9. **The first capture of a new size (R-41): slot 6 (METROPOLIS), slot 24 (CITY) and slot 26 (TOWN).** Each is itself
   the controlled comparison: its form steps differ from slot 0's (BIG_TOWN, `none`, the same water) in the size option
   only. If `--check-only` fails in `requestDiff` or `vsSlot0` and in nothing else:
   1. Confirm the form steps. The form-final `eval` must show every select except the size, and every box, as slot 0's,
      and `steps/steps.jsonl` must hold no other form change. If either fails, it is a deviation: go to step 8.
   2. List the leaves that the two checks name as `other` (the `--check-only` output's `requestDiff.semantic` and the
      `vsSlot0` receipt).
   3. Examine each leaf. A value of the layout preset that the size sets may join the class: no simple-form control sets
      it, and it sits among the preset's layout, building, faction or religion parameters, as the 16 named ones do.
      Anything else is a deviation (step 8) and is never widened in: a resource, a water key, a form value, a name.
   4. Add the qualifying leaves **by name** to `SIZE_DEPENDENT` in `research/baselines/ftg_capture_post.py`. Work on a
      scratch copy. `--check-only` on this capture must exit 1 before the change and 0 after, and every bound slot must
      still pass 10 of 10. Then install the copy by an atomic rename, after checking that the file's hash is unchanged.
   5. Record the evidence in E02: the capture, the steps comparison, and a table of the new leaves with their values at
      the new size, at slot 0's and slot 1's sizes and in the base (as E02 section 10.3). Name the leaves in the
      CHECKPOINT line and the result.
   6. Run the writing run and bind (step 7). The size's later captures must repeat those values exactly: the same-size
      check, which is vacuous on a size's first capture.
   CITY's first slot (24) may need no new leaf, because the base request is itself a CITY capture (PLAUSIBLE until slot
   24 shows it). Any other failing check on a first capture is step 8's case. Report the decoded border half width in
   the result.
10. **The window is not ours alone (plan 2.1b (8)).** The owner leaves the recording window alone while a seat runs
    (J164). At any sign of another hand, stop as H12 says.
11. **Privacy (plan 2.1b (9)):** as H11 and H14. Records say "the owner's signed-in account, premium since J164".

Slot 6, first seat (2026-10-04, lane `m1/W-02-slot6`, attempt `captures/ftg/2026-10-04T02-18-09`, E02 section 16):
STOPPED on the landing before any click, because the page scrolled while the seat only read it. The landing's scroll
lives in its root container (`.root-component`), not the window: `window.scrollY` stays 0. Its `scrollTop` went 0 →
653 → 2 769 px, "Home" moved from (896, 931) to (896, 278), the lazy feature images were fetched at those moments, and
the `:hover` chain showed a pointer over the page. The next seat reads `document.querySelector('.root-component').scrollTop`
with its first landing reading and again right before the "Home" click. A change between the two is H12's sign of another
hand.

Slot 6, relaunch (2026-10-04, lane `m1/W-02-slot6b`, `captures/ftg/2026-10-04T02-55-56`, E02 section 17) followed H1–H14
and I1–I11 with one create; the root scroll read 0 → 0 across the landing. Three things for slots 7 onward:
- **The size option's request key (I4).** Each size option's `value` attribute equals its display text, so "the option
  whose value is the request key" is read from the option's React element key, which is the display text followed by
  the key: `D eval "(() => { const s = [...document.querySelectorAll('select')].filter((e) => e.getBoundingClientRect().width > 2)[0]; return JSON.stringify([...s.options].map((o) => { const k = Object.keys(o).find((x) => x.startsWith('__reactFiber')); return [o.text, k ? o[k].key : null]; })); })()"`.
  Pick the one option whose key ends in the slot's request key, select it by its exact text, then re-read the selected
  option's key. On 2026-10-04 exactly one of 12 options ended in `METROPOLIS`.
- **SIZE_DEPENDENT has 17 names** (R-41, slot 6): `.layoutParameters.stages[1].maxSpokesInStage` joined (1 at CITY,
  BIG_TOWN and BIG_CITY; 2 at METROPOLIS; the client's per-size second-stage table sets it). METROPOLIS slots 7–9 must
  repeat slot 6's 17 values exactly; the same-size check compares them with slot 6.
- **The METROPOLIS form is slot 1's form** but for the size option: forests (1008, 556) before the scroll, the reserve
  area (1008, 367) and walled (1008, 396) after `wheel 720 400 300`, "Create Settlement" 1 of 1 at (947, 522) inside the
  dialog. The premium size raised no prompt. The PUT answered in about 11 s and the payload was 2.1 MB.

Slot 7 (2026-10-04, lane `m1/W-02-slot7b`, `captures/ftg/2026-10-04T03-13-14`, E02 section 18) followed H1–H14 and I1–I11
without change: the root scroll read 0 → 0 across the landing; the account list held 7 rows before (big town 3, big
city 3, metropolis 1) and 8 after; the size option was read by its React key as the slot-6 note says (1 of 12 ends in
`METROPOLIS`); the coast select ("Coastal", select 7) moved no box; rivers (1008, 498) and forests (1008, 556) before
the scroll, the reserve area (1008, 367) and walled (1008, 396) after it; "Create Settlement" 1 of 1 at (947, 522)
inside the dialog. The post script passed 10 of 10 on its first run with the 17 same-size values equal to slot 6's, so
`SIZE_DEPENDENT` was not touched.

Slot 8 (2026-10-04, lane `m1/W-02-slot8b`, `captures/ftg/2026-10-04T03-26-16`, E02 section 19) followed H1–H14 and I1–I11
without change: the root scroll read 0 → 0 across the landing; the account list held 8 rows before (big town 3, big
city 3, metropolis 2) and 9 after; 1 of 12 size options ends in `METROPOLIS`; the 13 form, map and navigation commands
equal slot 7's in order and coordinates ("Create Settlement" 1 of 1 at (947, 522) inside the dialog). The post script
passed 10 of 10 on its first run with the 17 same-size values equal to slot 6's; the request equals slot 7's apart from
the 45 partner ids. The map toolbar's re-roll control was already gone in the overview shot, before any zoom (never
clicked).

Slot 9 (2026-10-04, lane `m1/W-02-slot9b`, `captures/ftg/2026-10-04T03-40-45`, E02 section 20) followed H1–H14 and I1–I11
without change: the root scroll read 0 → 0 across the landing; the account list held 9 rows before (big town 3, big
city 3, metropolis 3) and 10 after; 1 of 12 size options ends in `METROPOLIS`; the 13 form, map and navigation commands
equal slots 7 and 8's in order and coordinates ("Create Settlement" 1 of 1 at (947, 522) inside the dialog). The post
script passed 10 of 10 on its first run with the 17 same-size values equal to slot 6's; the request equals slots 7 and
8's apart from the 45 partner ids. The re-roll control showed in the overview shots and was gone after the zooms (never
clicked). The METROPOLIS slots 6–9 are done; slot 10 onward never chooses the metropolis option (I3). The account now
holds 10 settlements, the free tier's stated limit: the premium account showed no counter and no prompt, and any limit
or upgrade prompt on a later slot is I5's site refusal (STOP, the slot stays open).

Slot 10 (2026-10-04, lane `m1/W-02-slot10b`, `captures/ftg/2026-10-04T03-53-59`, E02 section 21) followed H1–H14 and
I1–I11 without change: the root scroll read 0 → 0 across the landing; the account list held 10 rows before (big town 3,
big city 3, metropolis 4) and 11 after, the eleventh past the free tier's limit with no prompt; 1 of 12 size options ends
in `BIG_TOWN` ("Big town (~6000 people)"), read by its React key as the slot-6 note says. For a `none` slot the coast
select already reads "No coast" and the rivers box is already off, so neither is touched: the 11 form, map and
navigation commands equal slots 1 and 6's in order and coordinates apart from the size text (forests (1008, 556) before
the scroll, the reserve area (1008, 367) and walled (1008, 396) after it, "Create Settlement" 1 of 1 at (947, 522)
inside the dialog). The post script passed 10 of 10 on its first run with the 17 same-size values equal to slot 0's; the
request equals slot 0's (the guest capture) apart from the 45 partner ids. The overview `--full` shot drew the scale bar
without its label; the window shot just before it reads 500 m.

Slot 11 (2026-10-04, lane `m1/W-02-slot11b`, `captures/ftg/2026-10-04T04-07-26`, E02 section 22) followed H1–H14 and
I1–I11 without change: the root scroll read 0 → 0 across the landing; the account list held 11 rows before (big town 4,
big city 3, metropolis 4) and 12 after; 1 of 12 size options ends in `BIG_CITY` ("Big city (~25000 people)"), read by
its React key. The 11 form, map and navigation commands equal slot 1's (the same cell) in order, coordinates and size
text; coast and rivers were already at the slot's values and not touched. The post script passed 10 of 10 on its first
run with the 17 same-size values equal to slot 1's; the request equals slot 1's apart from the 45 partner ids. The hover
reading just before the create click names the walled box, the driver's own last click point: that is not another hand.

Slot 12 (2026-10-04, lane `m1/W-02-slot12b`, `captures/ftg/2026-10-04T04-20-04`, E02 section 23) followed H1–H14 and
I1–I11 without change: the root scroll read 0 → 0 across the landing; the account list held 12 rows before (big town 4,
big city 4, metropolis 4) and 13 after; 1 of 12 size options ends in `BIG_TOWN`, read by its React key. The 13 form, map
and navigation commands equal slots 2 and 4's (the same cell) in order, coordinates and size text: the coast select
("Coastal", select 7) moved no box; rivers (1008, 498) and forests (1008, 556) before the scroll, the reserve area
(1008, 367) and walled (1008, 396) after it; "Create Settlement" 1 of 1 at (947, 522) inside the dialog. The post script
passed 10 of 10 on its first run with the 17 same-size values equal to slot 0's; the request equals slots 2 and 4's
apart from the 45 partner ids. **The town came out with no wall** (no wall edge, no tower field) although the walled box
was on and the request's wall settings equal slots 2 and 4's: a per-draw outcome, not a capture fault. A later seat
that sees the same binds the slot as usual and records it (E02 23.3 finding 2, 23.4 call 2); the wall is not one of the
10 checks.

Slot 13 (2026-10-04, lane `m1/W-02-slot13b`, `captures/ftg/2026-10-04T04-35-38`, E02 section 24) followed H1–H14 and
I1–I11 without change: the root scroll read 0 → 0 across the landing; the account list held 13 rows before (big town 5,
big city 4, metropolis 4) and 14 after; 1 of 12 size options ends in `BIG_CITY`, read by its React key. The 13 form, map
and navigation commands equal slots 3 and 5's (the same cell) in order, coordinates and size text. The post script
passed 10 of 10 on its first run with the 17 same-size values equal to slot 1's; the request equals slots 3 and 5's
apart from the 45 partner ids; the wall is present again (58 wall edges, 37 towers). Two things for later seats:
- **A browser helper can outlive `drive.mjs stop`.** After "session closed", one Chrome network-service helper of this
  run stayed alive with no parent for about seven minutes, so `pgrep -fl profiles/ftg` was not empty. Check that it is
  your own run's (its `--user-data-dir` is your runner's `profiler/.profiles/ftg` link, and its start time, by
  `ps -o lstart`, is your session's start), then end it with a plain `kill -TERM <pid>`. Never end a process whose
  user-data directory or start time is not your run's.
- **The site may renew its sign-in in the background.** As the landing loads, the site's own sign-in library may call
  its identity provider once to renew the session tokens (slots 8 and 13; answered 200). That is not a sign-in prompt
  and needs no action; a sign-in page or prompt on screen is still I5's STOP.

Slot 14 (2026-10-04, lane `m1/W-02-slot14b`, `captures/ftg/2026-10-04T04-53-21`, E02 section 25) followed H1–H14 and
I1–I11 without change: the root scroll read 0 → 0 across the landing; the account list held 14 rows before (big town 5,
big city 5, metropolis 4) and 15 after; 1 of 12 size options ends in `BIG_TOWN`, read by its React key. The 11 form, map
and navigation commands equal slot 10's (the same cell) in order, coordinates and size text; coast and rivers were
already at the slot's values and not touched. The post script passed 10 of 10 on its first run with the 17 same-size
values equal to slot 0's; the request equals slots 0 and 10's apart from the 45 partner ids. The town has two small ponds
(field 6 × 2) under the `none` option, where slots 0 and 10 had none: a per-draw outcome like slot 12's missing wall, not
a capture fault (E02 25.3 finding 3). The orphaned network helper of slot 13's note appeared again; it was checked as
this run's own and ended by `kill -TERM` about three minutes after the stop.

Slot 15 (2026-10-04, lane `m1/W-02-slot15b`, `captures/ftg/2026-10-04T05-07-56`, E02 section 26) followed H1–H14 and
I1–I11 in its clicks: the root scroll read 0 → 0 across the landing; the account list held 15 rows before (big town 6,
big city 5, metropolis 4) and 16 after; 1 of 12 size options ends in `BIG_CITY`, read by its React key. The 11 form, map
and navigation commands equal slots 1 and 11's (the same cell) in order, coordinates and size text; coast and rivers were
already at the slot's values and not touched. The post script passed 10 of 10 on its first run with the 17 same-size
values equal to slot 1's; the request equals slots 1 and 11's apart from the 45 partner ids. The seat took no separate
`pre-create` shot (H6): the form-final shot was its last shot before the click, followed only by readings. Take the
`pre-create` shot after the hit test, as slots 1–14 did (E02 26.4 call 2). The orphaned network helper of slot 13's note
appeared for the third run in a row and was ended by `kill -TERM` as that note says.

Slot 16 (2026-10-04, lane `m1/W-02-slot16b`, `captures/ftg/2026-10-04T05-24-24`, E02 section 27) followed H1–H14 and
I1–I11 without change: the root scroll read 0 → 0 across the landing; the account list held 16 rows before (big town 6,
big city 6, metropolis 4) and 17 after; 1 of 12 size options ends in `BIG_TOWN`, read by its React key. The 13 form, map
and navigation commands equal slots 2, 4 and 12's (the same cell) in order, coordinates and size text, and the
`pre-create` shot was taken after the hit test (slot 15's note). The post script passed 10 of 10 on its first run with
the 17 same-size values equal to slot 0's; the request equals slots 2, 4 and 12's apart from the 45 partner ids. The
wall is present but short (29 wall edges, 16 towers, round one harbour quarter): a per-draw outcome like slot 12's
missing wall, bound as usual (E02 27.3 finding 2). The orphaned network helper of slot 13's note appeared for the fourth
run in a row and was ended by `kill -TERM` as that note says.

Slot 17 (2026-10-04, lane `m1/W-02-slot17b`, `captures/ftg/2026-10-04T05-40-57`, E02 section 28) followed H1–H14 and
I1–I11 without change: the root scroll read 0 → 0 across the landing; the account list held 17 rows before (big town 7,
big city 6, metropolis 4) and 18 after; 1 of 12 size options ends in `BIG_CITY`, read by its React key. The 13 form, map
and navigation commands equal slots 3, 5 and 13's (the same cell) in order, coordinates and size text, and the
`pre-create` shot was taken after the hit test. The post script passed 10 of 10 on its first run with the 17 same-size
values equal to slot 1's; the request equals slots 3, 5 and 13's apart from the 45 partner ids. The wall is the shortest
at BIG_CITY (40 wall edges, 25 towers), one line closing the harbour quarter on its land side: a per-draw outcome like
slot 16's, bound as usual (E02 28.3 finding 2). The leftover helper of slot 13's note appeared for the fifth run in a
row, but exited by itself within about a minute of the stop, before any signal: wait a minute and re-check
`pgrep -fl profiles/ftg` before ending it.

Slot 18 (2026-10-04, lane `m1/W-02-slot18b`, `captures/ftg/2026-10-04T06-00-29`, E02 section 29) followed H1–H14 and
I1–I11 without change: the root scroll read 0 → 0 across the landing; the account list held 18 rows before (big town 7,
big city 7, metropolis 4) and 19 after; 1 of 12 size options ends in `BIG_TOWN`, read by its React key. The 11 form, map
and navigation commands equal slots 10 and 14's (the same cell) in order, coordinates and size text; coast and rivers
were already at the slot's values and not touched; the `pre-create` shot was taken after the hit test. The post script
passed 10 of 10 on its first run with the 17 same-size values equal to slot 0's; the request equals slots 0, 10 and 14's
apart from the 45 partner ids. The town has four small ponds under the `none` option (slot 14 had two): a per-draw
outcome, bound as usual (E02 29.3 finding 3). No browser helper outlived the stop this time (`pgrep -fl profiles/ftg`
empty at once and four minutes later), so nothing was signalled; the slot-13 and slot-17 notes stand for runs where one
does.

Slot 19 (2026-10-04, lane `m1/W-02-slot19b`, `captures/ftg/2026-10-04T06-30-03`, E02 section 30) followed H1–H14 and
I1–I11 without change: the root scroll read 0 → 0 across the landing; the account list held 19 rows before (big town 8,
big city 7, metropolis 4) and 20 after; 1 of 12 size options ends in `BIG_CITY`, read by its React key. The 11 form, map
and navigation commands equal slots 1, 11 and 15's (the same cell) in order, coordinates and size text; coast and rivers
were already at the slot's values and not touched; the `pre-create` shot was taken after the hit test. The post script
passed 10 of 10 on its first run with the 17 same-size values equal to slot 1's; the request equals slots 1, 11 and 15's
apart from the 45 partner ids. No browser helper outlived the stop (`pgrep -fl profiles/ftg` empty at once and half a
minute later), as in slot 18, so nothing was signalled.

Slot 20 (2026-10-04, lane `m1/W-02-slot20b`, `captures/ftg/2026-10-04T06-42-05`, E02 section 31) followed H1–H14 and
I1–I11 without change: the root scroll read 0 → 0 across the landing; the account list held 20 rows before (big town 8,
big city 8, metropolis 4) and 21 after; 1 of 12 size options ends in `BIG_TOWN`, read by its React key. The 13 form, map
and navigation commands equal slots 2, 4, 12 and 16's (the same cell) in order, coordinates and size text, and the
`pre-create` shot was taken after the hit test. The post script passed 10 of 10 on its first run with the 17 same-size
values equal to slot 0's; the request equals slots 2, 4, 12 and 16's apart from the 45 partner ids. The wall is one line
closing a harbour quarter (32 wall edges, 499 m, 14 towers, the fewest towers and the shortest wall so far): a per-draw
outcome like slot 16's, bound as usual (E02 31.3 finding 2). No browser helper outlived the stop, as in slots 18 and 19.
The page reported window focus from the settlements view on (not on the landing), with no hover, scroll or page change:
read as the `--full` shot raising the window, not another hand (E02 31.4 call 4); a later seat that sees focus change
together with a hover, scroll or page change it did not cause still stops as H12 says.

Slot 21 (2026-10-04, lane `m1/W-02-slot21b`, `captures/ftg/2026-10-04T06-55-42`, E02 section 32) followed H1–H14 and
I1–I11 without change: the root scroll read 0 → 0 across the landing; the account list held 21 rows before (big town 9,
big city 8, metropolis 4) and 22 after; 1 of 12 size options ends in `BIG_CITY`, read by its React key. The 13 form, map
and navigation commands equal slots 3, 5, 13 and 17's (the same cell) in order, coordinates and size text, and the
`pre-create` shot was taken after the hit test. The post script passed 10 of 10 on its first run with the 17 same-size
values equal to slot 1's; the request equals slots 3, 5, 13 and 17's apart from the 45 partner ids. The wall is one line
closing the harbour quarter (41 wall edges, 789 m, 23 towers: the fewest towers and the shortest wall at BIG_CITY), the
shape of slots 16, 17 and 20: a per-draw outcome, bound as usual (E02 32.3 finding 2). No browser helper outlived the
stop, as in slots 18 to 20. The landing made no background call to the identity provider this time (slot 13's note
covers runs where it does); the focus change after the `--full` shot came again with no hover, scroll or page change
(slot 20's note).

Slot 22 (2026-10-04, lane `m1/W-02-slot22b`, `captures/ftg/2026-10-04T07-07-33`, E02 section 33) followed H1–H14 and
I1–I11 without change: the root scroll read 0 → 0 across the landing; the account list held 22 rows before (big town 9,
big city 9, metropolis 4) and 23 after; 1 of 12 size options ends in `BIG_TOWN`, read by its React key. The 13 form, map
and navigation commands equal slots 2, 4, 12, 16 and 20's (the same cell) in order, coordinates and size text, and the
`pre-create` shot was taken after the hit test. The post script passed 10 of 10 on its first run with the 17 same-size
values equal to slot 0's; the request equals slots 2, 4, 12, 16 and 20's apart from the 45 partner ids. BIG_TOWN now
has its ten captures (4 `none`, 6 `coast+river`). The town has seven water bodies, four of them small ponds: a per-draw
outcome, bound as usual (E02 33.3 finding 5). No browser helper outlived the stop, as in slots 18 to 21. The page
reported window focus already at the first settlements-view reading, right after the seat's own "Home" click and before
the `--full` shot, with the hover on a list row under that click's point and no scroll or page change of its own: read as
the seat's navigation, not another hand (E02 33.4 call 4); slot 20's note on focus stands.

Slot 23 (2026-10-04, lane `m1/W-02-slot23b`, `captures/ftg/2026-10-04T07-21-10`, E02 section 34) followed H1–H14 and
I1–I11 without change: the root scroll read 0 → 0 across the landing; the account list held 23 rows before (big town 10,
big city 9, metropolis 4) and 24 after; 1 of 12 size options ends in `BIG_CITY`, read by its React key. The 13 form, map
and navigation commands equal slots 3, 5, 13, 17 and 21's (the same cell) in order, coordinates and size text, and the
`pre-create` shot was taken after the hit test. The post script passed 10 of 10 on its first run with the 17 same-size
values equal to slot 1's; the request equals slots 3, 5, 13, 17 and 21's apart from the 45 partner ids. BIG_CITY now
has its ten captures (4 `none`, 6 `coast+river`), as BIG_TOWN does. The wall is two open lines (83 wall edges, 1 557 m,
47 towers), the shape of slots 3, 5 and 13: a per-draw outcome, bound as usual (E02 34.3 finding 3). No browser helper
outlived the stop and the landing made no identity-provider call, as in slots 21 and 22; focus came with the seat's own
"Home" click, as in slot 22 (slot 20's note stands). Slot 24 is the first CITY: checklist I9's first-of-size steps apply.

Slot 24 (2026-10-04, lane `m1/W-02-slot24b`, `captures/ftg/2026-10-04T07-34-12`, E02 section 35) followed H1–H14 and
I1–I11 without change: the root scroll read 0 → 0 across the landing; the account list held 24 rows before (big town 10,
big city 10, metropolis 4, city 0) and 25 after. The 11 form, map and navigation commands equal slots 1, 6, 10, 11, 14,
15, 18 and 19's (every signed-in `none` capture) in order and coordinates; only the size text differs ("City (~10000
people)"); coast and rivers were already at the slot's values and not touched; the `pre-create` shot was taken after the
hit test. **I9 (R-41) named no leaf:** the first `--check-only` passed 10 of 10, with `other` 0 against the CITY base and
against slot 0; the request differs from the base only by the water options, so the 17 values equal the base's and
`SIZE_DEPENDENT` stays at 17 names. Slot 25 (CITY, `coast+river`) must repeat slot 24's 17 values (the same-size check).
One thing for slots 25–27:
- **Match the size option by the whole part of its React key after the text, not by "ends in".** The slot-6 note's
  reading picks the option whose key ends in the request key; that was unique for `METROPOLIS`, `BIG_TOWN` and
  `BIG_CITY`, but three keys end in `CITY` (`SMALL_CITY`, `CITY`, `BIG_CITY`) and three in `TOWN` (`SMALL_TOWN`, `TOWN`,
  `BIG_TOWN`). Read `key.slice(o.text.length)` for each option (the key starts with the option's text) and take the one
  option whose remainder equals the slot's request key exactly: on 2026-10-04 that was "City (~10000 people)" for
  `CITY`, and the form opens at "Town (~4000 people)", whose remainder is `TOWN`. Confirm the selected option's remainder
  by `eval` after the select and in the form-final reading. To check the name field, find it by its placeholder; the
  first `input[type=text]` on the page is a hidden All settings field, not the name.

Slot 25 (2026-10-04, lane `m1/W-02-slot25b`, `captures/ftg/2026-10-04T07-50-43`, E02 section 36) followed H1–H14 and
I1–I11 without change: the root scroll read 0 → 0 across the landing; the account list held 25 rows before (big town 10,
big city 10, metropolis 4, city 1) and 26 after; the size option was matched by the whole remainder of its React key
after the text, as the slot-24 note says (1 of 12 is exactly `CITY`; 3 end in it). The 13 form, map and navigation
commands equal every signed-in `coast+river` capture's (slots 2–5, 7–9, 12, 13, 16, 17, 20–23) in order and
coordinates, only the size text differing, and the `pre-create` shot was taken after the hit test. The post script
passed 10 of 10 on its first run with the 17 same-size values equal to slot 24's; the request equals the 2026-09-21 CITY
base apart from the 45 partner ids, so the CITY family now has three usable captures. One hover reading taken just after
the form opened named the dialog's full-window layer under the "New Settlement" click point: `elementFromPoint` there
returns that layer, so it is the seat's own pointer, not another hand. The landing made one background call to the
identity provider again (slot 13's note). No browser helper outlived the stop. Slots 26 and 27 are TOWN: slot 26 is the
next first-of-size capture (I9), and the form opens at the TOWN option, so confirm its remainder `TOWN` by `eval`
(I4) rather than selecting it.

Slot 26 (2026-10-04, lane `m1/W-02-slot26b`, `captures/ftg/2026-10-04T08-06-17`, E02 section 37) followed H1–H14 and
I1–I11, with I9's first-of-size steps: the root scroll read 0 → 0 across the landing; the account list held 26 rows
before (big town 10, big city 10, metropolis 4, city 2, town 0) and 27 after. The form opened at "Town (~4000 people)",
whose React key remainder is exactly `TOWN` (1 of 12; 3 keys end in `TOWN`), so the size was confirmed by `eval` and
not selected; coast and rivers were already at the slot's values. The 10 form, map and navigation commands equal every
signed-in `none` capture's 11 without their size select, and the `pre-create` shot was taken after the hit test. **I9
(R-41) named 11 leaves:** the first `--check-only` failed `requestDiff` and `vsSlot0` (8 of 10) on the same 11, all in
the layout stage list, because FTG's client gives SMALL_TOWN and TOWN one stage (the `GAPS` stage, key `2`) where the
larger sizes have the `DENSE` stage (key `dense`) and then the `GAPS` stage. `SIZE_DEPENDENT` now has **28 names**:
`.layoutParameters.stages[0].key`, `stages[0].buildingPlacement`, and `stages[1].key`, `.buildingPlacement`,
`.branchType`, `.buildingMaterial`, `.maxMainRoadAngle`, `.maxNormalRoadAngle`, `.placeWallAfter`,
`.spokeStaySpokeProbability`, `.wallPlacement` joined (red first; slots 0–25 at 10 of 10 under both scripts; post script
`735922948e3970fb…` → `c4ad4ddf76bd1f2a…`). Two things for slot 27 (TOWN, `coast+river`, the last slot):
- **Its 28 size-dependent values must equal slot 26's** (the same-size check; the nine second-stage leaves are absent
  in both). Its form is slot 26's plus the coast select ("Coastal", select 7) and the rivers box (1008, 498), as in every
  signed-in `coast+river` capture; the size is again the form's opening option, confirmed by its key remainder `TOWN`.
- **W-05b's reader cannot read a TOWN request.** `measure_ftg_slots.py`'s `request_size_values` reads `stages[1]` by
  position and raises an index error on slot 26's request; that is W-05b's file, reported by this lane, and it does not
  touch a recording seat's checks. Leave E02's class-form table (section 17.3) as the last one: a new size table must
  keep a header outside that form, as sections 35.3 and 37.3 do.

Slot 27, first seat (2026-10-04, lane `m1/W-02-slot27b`, attempt `captures/ftg/2026-10-04T08-26-40`, E02 section 38):
STOPPED before the create click, nothing created. The form was set and checked as in slot 25 (but the size, confirmed at
the opening town option), and the create hit test passed. Then, between two readings with no seat command, the create
dialog scrolled back to its top (boxes from y 280–396 to 498–614) and the `:hover` chain left the walled box and then
the page. For the relaunch, under a new lane key:
- **Re-read the box coordinates with the create hit test.** Right before the create CHECKPOINT line, take the form-state
  reading `G` together with `HIT '^Create Settlement$'`. The five boxes must still read y 280–396 (the form-final
  reading's), and the `:hover` chain should still name the walled box, the driver's last click point (slots 6 and
  11–26; slot 10's was empty). A dialog that moved back to its top is H12's sign of another hand: stop, do not
  re-scroll.
- Slot 27's form is otherwise unchanged: the 8 commands before the create equal slot 25's first 9 without its size
  select, in order and coordinates.

Slot 27, relaunch (2026-10-04, lane `m1/W-02-slot27c`, `captures/ftg/2026-10-04T09-33-54`, E02 section 39) followed H1–H14
and I1–I11 with the first seat's slot-27 note: the root scroll read 0 → 0 across the landing; the account list held 27
rows before (big town 10, big city 10, metropolis 4, city 2, town 1) and 28 after; the form opened at the town option
(key remainder exactly `TOWN`), confirmed by `eval` and not selected. The 12 form, map and navigation commands equal every
signed-in `coast+river` capture's 13 without their size select. Just before the create CHECKPOINT, the form-state reading
with the hit test put the boxes at y 280–396 as the form-final reading did, and the hover named the checkbox under the
wall box's point. The post script passed 10 of 10 on its first run with the 28 same-size values equal to slot 26's. With
slot 27 bound, programme 2 is complete (all 28 FTG slots bound, none failed). One thing for any later seat:
- **The list's size is a label; match the new row by the PUT's settlement id.** The new row carried this create's
  settlement id, but the list named it a big town with 5 725 people, although the request's size key was `TOWN` and the
  payload's border the town's 1 750 m. For slots 1–26 every listed size equals the request's. PLAUSIBLY FTG labels a
  saved settlement by its generated population. So I5's "one new row of the slot's size" is read as one new row
  carrying the PUT's settlement id (the post script reads the listed population that way), with every other row
  unchanged. Two new rows, or a new row with another id, stay I5's stop. A row count by size (H13, I2) is a count of
  labels.
