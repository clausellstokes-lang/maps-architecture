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
