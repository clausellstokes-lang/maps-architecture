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
