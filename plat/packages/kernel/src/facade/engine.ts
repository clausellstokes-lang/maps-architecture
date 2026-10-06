// The engine id the generation report names (M0-a-16; §3.7 "The generation report names the engine that ran — the
// arrangement engine, `plat-arrangement@<version>` (§5.4); an engine change: §6.5 (7)"; §5.4's `kernel.engine`; readings
// C-0219 (6)). The version is the arrangement engine's own integer — never the package's version — raised by one on
// every change that moves an integer output of the booleans, buffers or bands (a declared golden shift, §6.5 (7), §13.3).
// A Clipper2-WASM engine taken by §3.7's fallback would carry its own id.

/** The arrangement engine's version: 1 is M0's engine. */
export const ENGINE_VERSION = 1;

/** §3.7 / §5.4: the report's `kernel.engine`. */
export const ENGINE_ID = `plat-arrangement@${String(ENGINE_VERSION)}`;
