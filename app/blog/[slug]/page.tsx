import type { Metadata } from "next";
import BlogPostPageContent, {
  getBlogPostMetadata,
} from "@/components/blog/BlogPostPageContent";
import { getAllPostSlugs } from "@/lib/blog";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  return getBlogPostMetadata(params.slug);
}

export default function BlogPostPage({ params }: Props) {
  return <BlogPostPageContent slug={params.slug} />;
}
