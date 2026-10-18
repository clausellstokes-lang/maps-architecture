// The arena key's layer as a word for the entity key (item M0-d-01; §6.1, §2.1, §2.2; C-0143). §2.1 names the layers
// by string; the entity key mixes their codes, so the one comparison of a layer name lives here, outside the mixer,
// which reads only words (test/rng/no-string.test.ts).
import type { Layer } from '../types/index.js';
import { R_ARENA_LAYER, refuse } from './text.js';

/** The layer's code in the entity key: ground 0, underground 1, sky 2. */
export function layerCode(layer: Layer): number {
  switch (layer) {
    case 'ground':
      return 0;
    case 'underground':
      return 1;
    case 'sky':
      return 2;
    default:
      return refuse(R_ARENA_LAYER, layer);
  }
}
