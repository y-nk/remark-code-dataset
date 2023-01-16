import { parse } from "node:querystring";
import { visit } from "unist-util-visit";

export default function remarkCodeDataset({
  metaDelimiter = " ",
  includeMetas = null,
} = {}) {
  return function transform(tree) {
    visit(tree, 'code', function (node) {
      const attrs = parse(node.meta ?? "", metaDelimiter);

      node.data ??= {}

      node.data.hProperties = Object.fromEntries(
        Object.entries(attrs)
          .filter(([k]) => !includeMetas || includeMetas.includes(k))
          .map(([k, v]) => [`data-${k}`, v])
      )
    })
  }
}
