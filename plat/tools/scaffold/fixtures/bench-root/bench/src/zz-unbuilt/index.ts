// Test fixture of tools/scaffold/workspace.test.mjs (M0-s-01's second fix round, C-0095): a bench harness folder whose
// index exports no `run`. With PLAT_BENCH_FIXTURE_ROOT set to tools/scaffold/fixtures/bench-root, the dispatcher
// (scripts/bench.mjs) resolves the harness `zz-unbuilt` here and exits 2 with "not built: M0-zz-00" — M0-zz-00 is a
// fixture id, not a work item. This file lies outside every TypeScript project and is ignored by the lint.
export {};
