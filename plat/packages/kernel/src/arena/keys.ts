// sortedKeys (C-0009; §6.5 (3): "any dependence on object-key … iteration order beyond insertion order" is forbidden):
// the one place model code reads an object's key set, for the few places a key set is iterated. The keys come back in
// one total order — UTF-16 code units, a key before every longer key it begins (`compareKeys`) — whatever order they
// were inserted in, so integer-like keys, which an engine enumerates in numeric order first, take no special place.
// M0-a-02.
//
// The lint refuses every listed own-key enumeration in model code (C-0009, C-0125 (3), C-0128) and, unlike `ratio`'s
// division (C-0125 (6)), names no exemption for the function its own messages point to; so the one enumeration here
// is `Object.assign` copying the object's own enumerable properties into a recording proxy — an enumeration whose order
// never escapes, because the result is sorted before it is returned (C-0146 (7)).

/** Two keys in one total order: UTF-16 code units, a key before every longer key it begins (the order `<` gives). */
export function compareKeys(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** The object's own enumerable string keys, sorted by `compareKeys` — one order for any insertion order. */
export function sortedKeys(o: object): string[] {
  const keys: string[] = [];
  const recorder = new Proxy({}, {
    set(_target, k) {
      if (typeof k === 'string') keys.push(k);
      return true;
    },
    defineProperty() {
      return true;
    },
  });
  Object.assign(recorder, o);
  return keys.sort(compareKeys);
}
