import { visit } from "unist-util-visit";
import { parse } from 'json5';

export default function remarkCodeDataset(options) {
  return function transform(tree) {
    visit(tree, 'code', function (node) {
      const attrs = parse(node.meta ?? "");

      const {
        exclude = [],
        include = Object.keys(attrs)
      } = options ?? {}

      node.data ??= {}

      node.data.hProperties = Object.fromEntries(
        Object.entries(attrs)
          .filter(([k]) => !exclude.includes(k))
          .filter(([k]) => include.includes(k))
          .map(([k, v]) => [`data-${k}`, v])
      )
    })
  }
}
