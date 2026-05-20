import { cache } from "react";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { Metadata } from "next";
import ReadingProgress from "@/components/ReadingProgress";
import SubscribeForm from "@/components/SubscribeForm";
import TableOfContents from "@/components/TableOfContents";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { extractHeadings } from "@/lib/extract-headings";
import { getPostBySlug } from "@/lib/blog";
import { remarkPlugins, rehypePlugins } from "@/lib/mdx-options";
import { formatDate } from "@/lib/utils";

const getCachedPost = cache((slug: string) => getPostBySlug(slug));

export function getBlogPostMetadata(slug: string): Metadata {
  try {
    const post = getCachedPost(slug);
    const metadata: Metadata = {
      title: `${post.title} — Bassim Eledath`,
      description: post.description,
    };
    if (post.thumbnail) {
      metadata.openGraph = {
        images: [{ url: post.thumbnail }],
      };
      metadata.twitter = {
        card: "summary_large_image",
        images: [post.thumbnail],
      };
    }
    return metadata;
  } catch {
    return { title: "Post Not Found" };
  }
}

export default function BlogPostPageContent({ slug }: { slug: string }) {
  let post;
  try {
    post = getCachedPost(slug);
  } catch {
    notFound();
  }

  const headings = extractHeadings(post.content);
  const showModified =
    post.modified &&
    post.published &&
    post.modified.slice(0, 10) !== post.published.slice(0, 10);

  return (
    <div className="relative py-16 toc:flex toc:gap-16 toc:justify-center">
      <ReadingProgress />
      <article className="mx-auto max-w-[72ch] toc:mx-0">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
        >
          &larr; All posts
        </Link>
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

        <SubscribeForm />
      </article>

      <TableOfContents headings={headings} />
    </div>
  );
}
