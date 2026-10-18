// @plat/kernel's rng module (item M0-d-01; §6.1, §14, §17.1 (8)): xoshiro128** streams with §6.1's draw helpers, the
// seed key, the entity key, the one structured stream mixer and its derivation cache (Rng.stream), the textual key form
// for reports, and the distinctness harness. The registries the mixer reads (stage ids, concerns, STAGE_VIEW) are
// ../registry/'s.
export { Deck, Stream, streamFromKey, ZERO_STATE_NUDGE } from './stream.js';
export { entityKey, laneKey, mixInto, packComponents, packInto, SEED_SALTS, seedKey, streamKey } from './mixer.js';
export { layerCode } from './layer.js';
export { createRng, type Rng, type RngOptions } from './rng.js';
export { concernText, keyText, stageText, type KeyComponents } from './text.js';
export { KeyCensus, type CensusCollision, type CensusResult } from './census.js';
