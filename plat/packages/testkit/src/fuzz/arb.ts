// The `arb` namespace (M0-k-01's interface: arb.polygon, arb.holedPolygon, arb.chain, arb.thin, arb.nearCollinear,
// arb.selfTouching, arb.regularSnapped, arb.field, arb.faceSet(kind)), with the builds' remaining families —
// duplicated-vertex, zero-area and ≥ 300-vertex shapes, and strokes. Each member is a factory taking optional options,
// fast-check's own convention (`arb.polygon()`, `arb.faceSet('curved')`), so a caller can bound the range or pick the
// chain form (C-0161 (3)).
import { chain, stroke } from './chain.js';
import { duplicated, large, zeroArea } from './degenerate.js';
import { faceSet } from './faces.js';
import { field } from './field.js';
import { holedPolygon } from './holed.js';
import { nearCollinear } from './collinear.js';
import { polygon } from './polygon.js';
import { regularSnapped } from './regular.js';
import { selfTouching } from './touching.js';
import { thin } from './thin.js';

/** The fuzz arbitraries of §13.1 (1) and the builds' families. */
export const arb = Object.freeze({
  polygon,
  holedPolygon,
  chain,
  thin,
  nearCollinear,
  selfTouching,
  regularSnapped,
  field,
  faceSet,
  duplicated,
  zeroArea,
  large,
  stroke,
});
