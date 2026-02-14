import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export const remarkPlugins = [remarkGfm];

export const rehypePlugins = [
  rehypeSlug,
  [
    rehypePrettyCode,
    {
      theme: "github-light",
      keepBackground: true,
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
