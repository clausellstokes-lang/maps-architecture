# Generation profiler

Records what the CPU does while a browser-based map generator builds a map, plus what it draws.
Uses the system Google Chrome through the DevTools Protocol (`puppeteer-core`, no bundled browser).

## Automated targets (unlimited generations)

```bash
cd profiler
node record.mjs --target mfcg            # Medieval Fantasy City Generator
node record.mjs --target village         # Village Generator
node record.mjs --target neighbourhood   # Neighbourhood
node record.mjs --target manor           # Fantasy Manor (no URL parameters, no per-generation console marker; see captures/manor/README.md)
node analyze.mjs ../captures/mfcg/<timestamp>        # → report.md + report.json in that folder
```

Options: `--runs N` regenerations after the cold load (default 2) · `--passes profile,coverage,draw` ·
`--regen key:Enter|reload` · `--seed N` and `--query "size=80&river=1"` (URL parameters of the generator; with
`--regen reload` the seed is incremented per run, which makes captures reproducible) · `--headful` ·
`--interval 100` (sampling interval in µs) · `--detailed` (coverage also records V8 block counts, nested `ranges` per function;
coverage then stays on for the whole pass, is reset per generation, and runs with the debugger on and the HTTP cache off
so that reloads recompile). `analyze.mjs` accepts `--root "City\.build$"` to print only the
call tree under a function, `--top N`, `--tree-min <percent>`.

Each pass runs in its own fresh browser so one cannot disturb another:

| pass | what is recorded | files |
|---|---|---|
| `profile` | V8 sampling CPU profile (100 µs) and a Chrome trace. No page instrumentation. | `gen-N.cpuprofile` (open in Chrome DevTools → Performance → Load profile), `gen-N.trace.json` |
| `coverage` | V8 precise coverage: the exact number of calls of every function during the generation. | `gen-N.coverage.json`, after analysis `gen-N.calls.json` |
| `draw` | Injected recorder (`lib/instrument.js`): Canvas2D/WebGL call counts, fill and stroke colours, line widths, joins/caps, dash patterns, fonts, label texts, path complexity, canvas sizes, `Math.random` use, and an ordered paint log (layer order). With `--vertices` also the vertex list of every painted path (see below). | `gen-N.draw.json` (+ `gen-N.paths.json` with `--vertices`) |

Every pass also stores `gen-N.png` (screenshot), `gen-N.idle.json` (main-thread activity timeline used to detect
"generation finished"), `console.jsonl` (watabou's builds print their own per-stage timings), and `network/`
(every response body, so profile positions can be mapped back to source; the index redacts auth headers).
`gen-0` is the cold load plus first generation; `gen-1…` are regenerations inside the running app.

Haxe/OpenFL builds keep `Class.__name__ = "pkg.Class"` markers even though local names are mangled;
`analyze.mjs` uses them to attribute profile nodes and call counts to classes (`com.watabou.mfcg.model.City.build`).

**Class ranges (label fix 2026-09-25, `captures/README-labelfix-2026-09-25.md`).** Each class owns the bytes from its constructor (`Var=function`, found just before its marker) to the next class's constructor. Code outside every class range is labelled `(unattributed).<fn>` instead of borrowing the nearest marker. This covers the preamble before the first class (Lime wrapper, polyfills, `$extend`) and everything from Haxe's `String/Array/Date.__name__` registrations on: static initialisers, Lime's embed glue and embedded JS libraries. Before the fix, these showed up as the bogus classes `?` and `Date`. Minified builds reuse class variable names for locals, so a V8 name counts as a class's constructor or static only when the function lies next to that class's marker. A dotted `Var.fn` name is also accepted in the static initialisers, which run up to the `ApplicationMain.main()` call. Reports written before this fix can differ in class tables. The README lists what moved in each re-analysed capture and which captures still carry old labels.

### Vertex record: `--vertices` (draw pass, opt-in; added 2026-09-25 for the NG bent-cut lane)

`node record.mjs --target neighbourhood --passes draw --vertices --regen reload --seed 7171 --query "tags=ring,medium"`
makes `lib/instrument.js` store, for every painted Canvas2D path (`fill`, `stroke`, `fillRect`, `strokeRect`), the
ordered vertex list in **canvas pixels** of the canvas being painted: each `moveTo`/`lineTo`/`quadraticCurveTo`/
`bezierCurveTo`/`arc`/`ellipse`/`arcTo`/`rect` argument is transformed by the CTM current at that call, and `closePath`
sets the subpath's closed flag, following Canvas2D path semantics. It is written to `gen-N.paths.json` next to
`gen-N.draw.json`. Without the flag the vertex layer is not installed, and `gen-N.draw.json` is identical with or without
it (checked). `session.mjs --instrument` injects the file unchanged, so the flag is off there.

* File: `{format:"paths/1", coords, fields, caps, counts:{paints, records, vertices, skippedLong, droppedTotal, path2d,
  nonFinite, errors}, paths:[…]}`. One record per paint call: `n` paint sequence number · `i` index of the same call in
  draw.json's `rec.log` (-1 if the log was full) · `op` · `k` style key as in the log · `w` raw `lineWidth` (strokes; the
  width in pixels is `w·√|ad−bc|` of `m`) · `c` canvas id, `cv` its W×H · `m` CTM at paint time `[a,b,c,d,e,f]` · `nv`
  vertex count · `s` subpaths `[{v:[x0,y0,x1,y1,…], z:1 if closed, x:[[vertexIndex, "q"|"c"|"arc"|"ellipse"|"arcTo", …]]}]`.
  Curve control points and the raw arguments of arcs are kept in `x`. Arc start and end points are vertices. Also:
  `same:j` means the same, unmodified path is painted again (fill then stroke), and record j holds the vertices.
* Caps: a path with more than 5 000 vertices (`--max-path-verts N`) is recorded as a stub `skip:1` and counted in
  `skippedLong`. Past 4 000 000 stored vertices per generation, stubs get `skip:2` (`droppedTotal`). Coordinates are
  rounded to 0.01 px.
* `analyze.mjs` notes the counts in `report.md`. `python3 paths_stats.py <capture dir | gen-N.paths.json> [--md]
  [--json out.json]` summarises Neighbourhood per colour class (roads, lot/footprint outlines, roof faces): vertex
  counts, turn and interior angles, segment lengths, bends, arrival angles and the width law. Worked example:
  `captures/neighbourhood/README-vertices.md`.

## One-shot / server-side targets (Fantasy Town Generator)

FTG generates settlements on its server (AWS API) and allows one new settlement per IP per day, so the CPU work
of *generation* cannot be observed from a browser. What can be recorded is the full settlement payload the
server returns, the client-side work of building and rendering the scene, and the visuals. Nothing is clicked
automatically:

```bash
node session.mjs --target ftg --headful     # terminal 1: opens the site and records everything, clicks nothing
node drive.mjs text                         # terminal 2: what is on the page (texts, buttons with coordinates)
node drive.mjs shot landing
node drive.mjs clicktext "one-time" --profile create     # one deliberate step, CPU-profiled until idle
node drive.mjs stop
```

`drive.mjs` commands: `shot`, `text`, `click x y`, `clicktext "<regex>"` (only elements that would really receive
the click — a same-named page button hidden behind a modal is ignored), `select <n> "<option regex>"`, `key`,
`type`, `wheel`, `drag`, `eval`, `goto`, `stop`. Add `--profile <name>` to CPU-profile a step until the page is idle
(no requests in flight, main thread quiet, and with `--until-canvas` a canvas present; `--max`/`--min` in ms).

FTG streams its gzip'd protobuf layout into a WASM decoder, which makes the normal DevTools body capture come back
empty, so `session.mjs` also pauses matching responses at the Fetch stage and stores them as
`network/bodies/intercept-*.bin|json` (`--intercept "*execute-api*"` by default). Inspect such a payload with
`python3 ../tools/pb_raw.py <file> --out structure.md` (schema-less protobuf structure: counts, kinds, ranges, samples).

The session keeps a persistent browser profile in `profiler/.profiles/ftg`, streams every response body to
`captures/ftg/<timestamp>/session/network/` the moment it arrives, and `drive.mjs` writes numbered
screenshots/profiles to `captures/ftg/<timestamp>/steps/`. Analyse with `node analyze.mjs ../captures/ftg/<timestamp>`.

### Coverage and draw record in a session (added 2026-09-25 for the MFCG style-options lane)

These additions let a canvas-menu generator be driven through options that the URL cannot set. Nothing here changes existing behaviour.

- **`session.mjs --instrument`** injects the draw recorder (`lib/instrument.js`) into every document before any page script runs.
- **`--coverage [name]`** can be added to any step that accepts `--profile`, alone or combined with it. It starts V8 precise coverage (`callCount:true, detailed:false`, the same mode as record.mjs's non-detailed pass) right before the action, then takes and stops it once the page is idle. The result goes to `steps/<n>-<name>.coverage.json`. Start and take happen in ONE invocation because precise coverage belongs to the CDP session, which ends when drive.mjs disconnects.
- **`--draw [name]`** resets the recorder before the action and writes `steps/<n>-<name>.draw.json` once the page is idle (format as record.mjs's draw pass). It needs a session started with `--instrument`.
- **`--marker "<regex>"`** makes the idle wait also require a matching console line, e.g. `--marker "buildGeometry \d+"` for an MFCG regeneration.
- **analyze.mjs** attributes a `steps/` directory using the sibling `session/network` bodies.

```bash
node session.mjs --target mfcg --instrument --url "<build>?size=40&seed=555001" &
node drive.mjs key s                                   # MFCG: open the Style window (canvas menu; hotkeys in devlog 494692)
node drive.mjs click 625 553 --coverage trees-on --draw            # toggle an option: records the immediate re-render
node drive.mjs key Enter --coverage trees-regen --draw --marker "buildGeometry \d+"   # full regeneration with it on
node drive.mjs stop && node analyze.mjs ../captures/mfcg/<timestamp>
```
Worked example: `captures/mfcg/2026-09-25T10-38-58/README.md`.

### Generator exports: `export.mjs` (added 2026-09-25 for the MFCG export lane)

`export.mjs` captures a file that the generator itself downloads, such as MFCG's `export=json|svg|png` URL key. It connects to a running `session.mjs`. For as long as it is connected, it does two things:
- It sets CDP `Browser.setDownloadBehavior(allowAndName, eventsEnabled)` and waits for `Browser.downloadProgress` to report `completed`.
- It hooks `URL.createObjectURL` and anchor clicks on every new document, so a Blob or `data:` URL is also caught inside the page.

One invocation is one navigation. Its outputs are:
- `<out>/<name>.<ext>`, the browser's download renamed from its suggested filename;
- `<out>/<name>.blob-<i>.<ext>`, written only when an in-page Blob differs from the download or no download happened;
- `<out>/<name>.png`, written with `--shot`;
- one line in `<out>/export-log.jsonl`.

```bash
node session.mjs --target mfcg --no-goto --url "<build>" &
node export.mjs "<build>?size=40&seed=555001&gates=4&export=json" --out ../captures/mfcg/exports-2026-09-25 --name gates4 --shot
node drive.mjs stop
```
Worked example: `captures/mfcg/exports-2026-09-25/README.md`.

**Menu-driven exports (added 2026-09-26 for the Dwellings export lane).** Some generators have no export URL key; Dwellings, for one, ignores `export=`. For them, `export.mjs` can run a fixed input sequence once the page is ready. These options change nothing when they are absent:
- `--port N` connects to that DevTools port instead of the one in `profiler/.session`. Lanes that run in parallel share that file, so a session started with `--port` is safe from another lane's session.
- `--marker "<regex>"` waits for a console line that matches, such as Dwellings' `House\.hx:\d+: \d+`, and then waits `--pre` ms more (default 800).
- `--actions "<a> <a> …"` runs the actions in order: `wait:<ms>`, `key:<Key or Mod+Key>`, `click:x,y`, `rclick:x,y` (right button), `move:x,y` (hover, for submenus) and `shot:<file.png>` (a screenshot, relative to `--out`).
- With `--actions`, `--shot` is taken **before** the actions run, so it shows the generated page and not the open menu.
- The log line adds `hrefReady` (the URL when the marker appeared), `markerDt` and the executed actions with their times.
- Coordinates are viewport pixels of the 1500×1100 session. A dry run whose actions stop at a `shot:` shows where a click will land before anything is exported.

```bash
node session.mjs --target dwellings --no-goto --port 9361 --url "<build>" &
node export.mjs "<build>?seed=260926101&tags=small" --port 9361 --out ../captures/dwellings/exports-2026-09-26 --name s260926101-small \
     --marker 'House\.hx:\d+: \d+' --shot \
     --actions "click:27,27 wait:700 move:60,410 wait:500 move:180,410 wait:300 move:182,470 wait:300 click:182,470"   # Export > as JSON
touch ../captures/dwellings/<stamp>/session/STOP     # stop exactly this session (drive.mjs stop follows profiler/.session)
```
Worked example: `captures/dwellings/exports-2026-09-26/README.md`.
