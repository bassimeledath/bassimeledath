import type { Metadata } from "next";
import BlogPostPageContent, {
  getBlogPostMetadata,
} from "@/components/blog/BlogPostPageContent";

const SLUG = "tokenmaxxing";

export function generateMetadata(): Metadata {
  return getBlogPostMetadata(SLUG);
}

export default function TokenmaxxingPage() {
  return <BlogPostPageContent slug={SLUG} />;
}
