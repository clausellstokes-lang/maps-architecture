// The adapter of flatbush 4.6.2 (ISC; §3.1's adopted packed static index, §3.3's static partitions; SCL-2, J-K6): the
// one file of plat/ that imports the library (§14). M0-a-03. The library is vendored with C-0152's patch (its one `**`
// replaced by an exact product), so a search returns the same ids on every host. A packed tree holds a double-precision
// box and an index per node, one inner node per 16 below it (§2.2's `PackedIndex`). The node size is fixed here; the
// index width is the library's choice — 16-bit below 16 384 nodes, 32-bit from there — so §3.3's 38.4 B per item holds
// for the larger trees only and a smaller tree is smaller (no answer reads the width; M1's frozen-copy accounting reads
// `byteLength`). The tree is opaque to the kernel: its ids are the order the boxes were handed in, never a slot.
import Flatbush from 'flatbush';

/** The node size: one inner node per 16 below it (§2.2's `PackedIndex`). */
export const PACKED_NODE_SIZE = 16;

/** A built static tree over n boxes (n ≥ 1). Opaque: read only through this adapter. */
export interface PackedTree {
  /** The number of boxes it holds. */
  readonly size: number;
  /** Its bytes (header, node boxes, node indices) — what a frozen copy would transfer (M1's pool). */
  readonly byteLength: number;
}

interface Held extends PackedTree {
  readonly fb: Flatbush;
}

/**
 * Packs `n` boxes — `boxes[4i … 4i + 3]` = minX, minY, maxX, maxY of box i, each min ≤ max and finite — into a static
 * tree; box i is answered as id i. `n` must be at least 1 (an empty partition holds no tree).
 */
export function packBoxes(boxes: Float64Array, n: number): PackedTree {
  if (!(Number.isInteger(n) && n >= 1 && boxes.length >= 4 * n)) throw new Error('flatbush adapter: n ≥ 1 boxes of four numbers each');
  const fb = new Flatbush(n, PACKED_NODE_SIZE, Float64Array);
  for (let i = 0; i < n; i++) {
    const minX = boxes[4 * i];
    const minY = boxes[4 * i + 1];
    const maxX = boxes[4 * i + 2];
    const maxY = boxes[4 * i + 3];
    if (!(Number.isFinite(minX) && Number.isFinite(minY) && minX <= maxX && minY <= maxY)) {
      throw new Error(`flatbush adapter: box ${i} is not a finite box with min ≤ max`);
    }
    fb.add(minX, minY, maxX, maxY);
  }
  fb.finish();
  const held: Held = { size: n, byteLength: fb.data.byteLength, fb };
  return held;
}

/**
 * The ids of the boxes that meet the closed box [minX, maxX] × [minY, maxY] (touching counts), in the tree's own
 * order — callers sort what they return by canonical keys, never by this order.
 */
export function searchPacked(tree: PackedTree, minX: number, minY: number, maxX: number, maxY: number): number[] {
  return (tree as Held).fb.search(minX, minY, maxX, maxY);
}
