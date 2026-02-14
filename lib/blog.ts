import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const DATES_FILE = path.join(process.cwd(), "content/blog-dates.json");

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

interface BlogDates {
  [slug: string]: {
    published: string;
    modified: string;
  };
}

function loadDates(): BlogDates {
  try {
    const raw = fs.readFileSync(DATES_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): BlogPost {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const dates = loadDates();
  const postDates = dates[slug] || {
    published: new Date().toISOString(),
    modified: new Date().toISOString(),
  };

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    thumbnail: data.thumbnail,
    tags: data.tags || [],
    published: postDates.published,
    modified: postDates.modified,
    content,
  };
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
