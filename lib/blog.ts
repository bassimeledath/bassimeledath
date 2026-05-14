import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  thumbnail?: string;
  tags: string[];
  published: string;
  modified: string;
  content: string;
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function getRequiredDate(
  data: Record<string, unknown>,
  field: "published" | "modified",
  slug: string
): string {
  const value = data[field];
  if (typeof value !== "string" || Number.isNaN(Date.parse(value))) {
    throw new Error(`Blog post "${slug}" is missing a valid "${field}" date.`);
  }
  return value;
}

export function getPostBySlug(slug: string): BlogPost {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const published = getRequiredDate(data, "published", slug);
  const modified = getRequiredDate(data, "modified", slug);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    thumbnail: data.thumbnail,
    tags: data.tags || [],
    published,
    modified,
    content,
  };
}

/** Extract the first plain-text snippet from MDX content. */
export function getExcerpt(content: string, max: number = 140): string {
  const plain = content
    .replace(/!\[.*?\]\(.*?\)/g, "")   // remove images
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1") // links → text
    .replace(/```[\s\S]*?```/g, "")    // remove code blocks
    .replace(/`[^`]+`/g, "")           // remove inline code
    .replace(/^#{1,6}\s+.*$/gm, "")    // remove headings
    .replace(/[*_~]+/g, "")            // remove bold/italic/strike
    .replace(/<[^>]+>/g, "")           // strip JSX/HTML tags
    .replace(/\n+/g, " ")             // collapse newlines
    .replace(/\s+/g, " ")             // collapse whitespace
    .trim();
  if (plain.length <= max) return plain;
  return plain.slice(0, max).trimEnd() + "…";
}

export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  return slugs
    .map((slug) => getPostBySlug(slug))
    .sort(
      (a, b) =>
        new Date(b.published).getTime() - new Date(a.published).getTime()
    );
}
