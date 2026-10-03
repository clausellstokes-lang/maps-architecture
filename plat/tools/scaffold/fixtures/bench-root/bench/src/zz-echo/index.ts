// A fixture harness of the scaffold's dispatcher test (C-0095, C-0113): it prints the arguments it receives as one
// JSON line and exits 0, so the test sees what a shortcut's `-- <file>` reaches the harness as. Never a real harness.
export function run(args: string[]): number {
  process.stdout.write(`${JSON.stringify(args)}\n`);
  return 0;
}
