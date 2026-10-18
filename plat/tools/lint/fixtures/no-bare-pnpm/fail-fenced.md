# A fixture: fenced command lines

```sh
corepack pnpm install --frozen-lockfile
pnpm install <!-- planted -->
$ pnpm test <!-- planted -->
CI=1 pnpm lint <!-- planted -->
node scripts/build.mjs && pnpm build <!-- planted -->
```

~~~
pnpm -r exec true <!-- planted -->
~~~
