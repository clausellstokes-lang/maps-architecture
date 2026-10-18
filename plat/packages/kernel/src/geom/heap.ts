// BinaryHeap: the priority queue of Dijkstra and A* (§3.1: "path search: build: binary-heap A* / Dijkstra"; C-0040: our
// own heap, no `flatqueue`). M0-a-10. A min-heap of (item, priority) pairs in typed arrays, growing by doubling. Ties
// are broken by the smaller item, so the pop order is a function of the pushed pairs alone — never of the push order —
// and a search over it is deterministic (§6.5).

export class BinaryHeap {
  private items: Int32Array;
  private keys: Float64Array;
  private n = 0;

  /** An empty heap with room for `capacity` pairs before it first grows. */
  constructor(capacity = 16) {
    const c = Number.isInteger(capacity) && capacity >= 1 ? capacity : 16;
    this.items = new Int32Array(c);
    this.keys = new Float64Array(c);
  }

  /** The number of pairs held. */
  get size(): number {
    return this.n;
  }

  /** Empties the heap (its storage is kept). */
  clear(): void {
    this.n = 0;
  }

  /** Is pair i before pair j: the smaller priority, then the smaller item? */
  private less(i: number, j: number): boolean {
    const a = this.keys[i];
    const b = this.keys[j];
    return a < b || (a === b && this.items[i] < this.items[j]);
  }

  private swap(i: number, j: number): void {
    const it = this.items[i];
    this.items[i] = this.items[j];
    this.items[j] = it;
    const k = this.keys[i];
    this.keys[i] = this.keys[j];
    this.keys[j] = k;
  }

  /** Adds an item (an i32) at a priority (not NaN). */
  push(item: number, priority: number): void {
    if ((item | 0) !== item) throw new RangeError(`BinaryHeap.push: the item must be an i32, got ${String(item)}`);
    if (Number.isNaN(priority)) throw new RangeError('BinaryHeap.push: the priority is NaN');
    if (this.n === this.items.length) {
      const items = new Int32Array(this.n * 2);
      items.set(this.items);
      const keys = new Float64Array(this.n * 2);
      keys.set(this.keys);
      this.items = items;
      this.keys = keys;
    }
    let i = this.n;
    this.n += 1;
    this.items[i] = item;
    this.keys[i] = priority;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (!this.less(i, parent)) break;
      this.swap(i, parent);
      i = parent;
    }
  }

  /** The item that `pop` would return. Throws a RangeError on an empty heap. */
  peek(): number {
    if (this.n === 0) throw new RangeError('BinaryHeap.peek: the heap is empty');
    return this.items[0];
  }

  /** The least priority held. Throws a RangeError on an empty heap. */
  peekPriority(): number {
    if (this.n === 0) throw new RangeError('BinaryHeap.peekPriority: the heap is empty');
    return this.keys[0];
  }

  /** Removes and returns the item of least priority (ties: the smaller item). Throws a RangeError on an empty heap. */
  pop(): number {
    if (this.n === 0) throw new RangeError('BinaryHeap.pop: the heap is empty');
    const top = this.items[0];
    this.n -= 1;
    if (this.n > 0) {
      this.items[0] = this.items[this.n];
      this.keys[0] = this.keys[this.n];
      let i = 0;
      for (;;) {
        const l = 2 * i + 1;
        const r = l + 1;
        let m = i;
        if (l < this.n && this.less(l, m)) m = l;
        if (r < this.n && this.less(r, m)) m = r;
        if (m === i) break;
        this.swap(i, m);
        i = m;
      }
    }
    return top;
  }
}
