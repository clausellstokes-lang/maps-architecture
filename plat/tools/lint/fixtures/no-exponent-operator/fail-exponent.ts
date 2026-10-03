// `**` and `**=` are refused whatever the exponent (C-0008).
export function f(x: number): number {
  let y = 2 ** 0.5; // planted: exponent
  y += x ** 2; // planted: exponent
  y **= 3; // planted: exponent
  return y;
}
