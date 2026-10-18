// plat/repository-path (§17.1 (3); CLEAN-ROOM.md rule 4): no import, fixture or script path written in a plat/ source
// file resolves outside plat/, symbolic links resolved. Judged: every module specifier (static, dynamic, require,
// TypeScript's import types and import-equals), `new URL('<path>', import.meta.url)`, `import.meta.resolve('<path>')`
// and `join` / `resolve` of `import.meta.dirname` (or `__dirname`) with literal segments. A path leaving plat/ is
// refused lexically, before any file there is touched; a path inside plat/ is followed through its links; a bare
// specifier must be found in a node_modules folder inside plat/. The resolver is ../resolve.mjs's (shared with the
// whole-tree check `repository-path` in ../paths.mjs).
import { dirname, resolve } from 'node:path';
import { judgePath, judgeSpecifier } from '../resolve.mjs';
import { lintedFile, specifierVisitors, staticMemberName, stringValue } from './shared.mjs';

const isImportMeta = (n, prop) =>
  n && n.type === 'MemberExpression' && n.object.type === 'MetaProperty' && n.object.meta.name === 'import' &&
  staticMemberName(n) === prop;

export default {
  meta: {
    type: 'problem',
    docs: { description: 'no import, fixture or script path resolves outside plat/ (§17.1 (3))' },
    schema: [],
    messages: {
      outside: '{{what}} {{spec}} resolves outside plat/ (§17.1 (3)).',
      link: '{{what}} {{spec}} resolves outside plat/ through a symbolic link (to {{target}}; §17.1 (3)).',
      unresolved: 'The package {{spec}} is found in no node_modules folder inside plat/, so it would resolve outside it (§17.1 (3)).',
    },
  },
  create(context) {
    const { root, filename } = lintedFile(context);
    const dir = dirname(filename);

    function report(node, what, spec, j) {
      if (j.ok) return;
      context.report({ node, messageId: j.reason, data: { what, spec: JSON.stringify(spec), target: j.target } });
    }

    const visitors = specifierVisitors((spec, node) => report(node, 'The import', spec, judgeSpecifier(root, filename, spec)));

    /** A literal path judged relative to this file's folder. */
    function judgeLiteralPath(node, what, value) {
      if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return; // a URL with a scheme
      report(node, what, value, judgePath(root, resolve(dir, value)));
    }

    return {
      ...visitors,
      NewExpression(node) {
        if (node.callee.type !== 'Identifier' || node.callee.name !== 'URL' || node.arguments.length < 2) return;
        const value = stringValue(node.arguments[0]);
        if (value !== null && isImportMeta(node.arguments[1], 'url')) judgeLiteralPath(node.arguments[0], 'The path', value);
      },
      CallExpression(node) {
        visitors.CallExpression(node);
        const callee = node.callee;
        if (isImportMeta(callee, 'resolve')) {
          const value = stringValue(node.arguments[0]);
          if (value !== null) report(node.arguments[0], 'The import', value, judgeSpecifier(root, filename, value));
          return;
        }
        const name = callee.type === 'Identifier' ? callee.name : staticMemberName(callee);
        if (name !== 'join' && name !== 'resolve') return;
        const [base, ...rest] = node.arguments;
        const fromHere = isImportMeta(base, 'dirname') || (base && base.type === 'Identifier' && base.name === '__dirname');
        if (!fromHere || rest.length === 0) return;
        const parts = rest.map(stringValue);
        if (parts.some((p) => p === null)) return;
        judgeLiteralPath(node, 'The path', parts.join('/'));
      },
    };
  },
};
