import { cache } from "react";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { remarkPlugins, rehypePlugins } from "@/lib/mdx-options";
import { extractHeadings } from "@/lib/extract-headings";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import TableOfContents from "@/components/TableOfContents";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

const getCachedPost = cache((slug: string) => getPostBySlug(slug));

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  try {
    const post = getCachedPost(params.slug);
    return {
      title: `${post.title} — Bassim Eledath`,
      description: post.description,
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default function BlogPostPage({ params }: Props) {
  let post;
  try {
    post = getCachedPost(params.slug);
  } catch {
    notFound();
  }

  const headings = extractHeadings(post.content);
  const showModified =
    post.modified &&
    post.published &&
    post.modified.slice(0, 10) !== post.published.slice(0, 10);

  return (
    <div className="relative py-16 toc:flex toc:gap-16">
      <article className="mx-auto max-w-[72ch] toc:mx-0">
        <header className="mb-10">
          <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-3 flex flex-wrap gap-x-4 text-sm text-muted">
            <time>{formatDate(post.published)}</time>
            {showModified && (
              <span className="text-muted/60">
                Updated {formatDate(post.modified)}
              </span>
            )}
          </div>
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[rgb(var(--tag-bg))] px-2.5 py-0.5 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: remarkPlugins as never,
                rehypePlugins: rehypePlugins as never,
              },
            }}
          />
        </div>
      </article>

      <TableOfContents headings={headings} />
    </div>
  );
}
