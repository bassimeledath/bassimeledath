# Fix React Best Practices Findings

- [x] Fix #1: Deduplicate `loadDates()` in `lib/blog.ts` — added optional `dates` param to `getPostBySlug`, `getAllPosts` reads once and passes through
- [x] Fix #5: Use `React.cache()` in `app/blog/[slug]/page.tsx` — wrapped `getPostBySlug` with `cache()`, used in both `generateMetadata` and `BlogPostPage`
- [x] Fix #2: Add `sizes` prop to project grid images in `app/page.tsx` — matches grid breakpoints (100vw / 50vw / 33vw)
- [x] Fix #8: Add `aria-label` to all icon-only links in `app/page.tsx` (5 links) and `components/Footer.tsx` (3 links)
- [x] Fix #9: Add visually hidden `<h1>` to home page in `app/page.tsx` — `<h1 className="sr-only">`
- [x] Fix #10: Wrap TableOfContents in `<nav aria-label="Table of contents">` in `components/TableOfContents.tsx`
- [x] Fix #14: Extract duplicate `formatDate` to `lib/utils.ts` and update both `app/blog/page.tsx` and `app/blog/[slug]/page.tsx`
- [x] Write summary of all changes to .dispatch/tasks/fix-react-best-practices/output.md
