import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import type { Node } from "unist";

function rehypeMermaid() {
  return (tree: Node) => {
    visit(tree, "element", (node: any, index: number, parent: any) => {
      if (node.tagName !== "pre") return;
      const code = node.children?.[0];
      if (code?.tagName !== "code") return;
      const classes: string[] = code.properties?.className || [];
      const langMatch = classes.some(
        (c: string) => c === "language-mermaid"
      );
      if (!langMatch) return;

      const chart = toString(code);
      parent.children[index] = {
        type: "element",
        tagName: "mermaid-chart",
        properties: { chart },
        children: [],
      };
    });
  };
}

export const remarkPlugins = [remarkGfm];

export const rehypePlugins = [
  rehypeMermaid,
  rehypeSlug,
  [
    rehypePrettyCode,
    {
      theme: {
        light: "github-light",
        dark: "github-dark",
      },
      keepBackground: false,
    },
  ],
  [
    rehypeAutolinkHeadings,
    {
      behavior: "wrap",
      properties: {
        className: ["anchor"],
      },
    },
  ],
] as const;
