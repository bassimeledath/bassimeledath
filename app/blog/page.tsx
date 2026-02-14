import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { getAllPosts } from "@/lib/blog";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "...";
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="py-16">
      <div className="animate-fade-up">
        <h1 className="font-serif text-6xl font-medium tracking-tight text-foreground sm:text-7xl">
          writing.
        </h1>
        <p className="mt-5 max-w-xl text-muted leading-relaxed">
          Writing about AI engineering, machine learning, and building things.
        </p>
      </div>
      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="animate-fade-up group flex flex-col rounded-lg border border-border p-5 transition-colors hover:border-muted"
            style={{ animationDelay: `${(i + 1) * 80}ms` }}
          >
            <div className="flex items-center justify-between text-xs text-muted">
              <span>
                {post.tags.length > 0
                  ? post.tags.slice(0, 2).join(" · ")
                  : "Writing"}
              </span>
              <FiArrowUpRight
                size={14}
                className="opacity-0 transition-opacity group-hover:opacity-100"
              />
            </div>

            <div className="mt-auto pt-10">
              <h2 className="font-serif text-xl font-medium leading-snug text-foreground">
                {post.title}
              </h2>
              <time className="mt-1.5 block text-xs text-muted">
                {formatDate(post.published)}
              </time>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {truncate(post.description, 140)}
              </p>
            </div>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="col-span-full py-8 text-muted">
            No posts yet. Check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
