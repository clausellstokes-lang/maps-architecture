// Every own-key enumeration of a plain object is refused in model code.
export function f(o: Record<string, number>): number {
  let n = 0;
  for (const k in o) n += k.length; // planted: forIn
  n += Object.keys(o).length; // planted: keyEnumeration
  n += Object.values(o).length + Object.entries(o).length; // planted: keyEnumeration, keyEnumeration
  n += Object.getOwnPropertyNames(o).length; // planted: keyEnumeration
  n += Reflect.ownKeys(o).length; // planted: keyEnumeration
  n += globalThis.Object.keys(o).length; // planted: keyEnumeration
  return n;
}
