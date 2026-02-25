# Fix React Best Practices — Summary

All 7 planned fixes applied. Files changed: 7 (6 modified, 1 created).

## Changes

### 1. Deduplicate `loadDates()` — `lib/blog.ts`
Added optional `dates?: BlogDates` parameter to `getPostBySlug()`. `getAllPosts()` now calls `loadDates()` once and passes the result, eliminating N redundant file reads.

### 2. `React.cache()` for post dedup — `app/blog/[slug]/page.tsx`
Wrapped `getPostBySlug` with `cache()` from React. Both `generateMetadata()` and `BlogPostPage()` now use `getCachedPost()`, deduplicating the file read within a single request.

### 3. Image `sizes` prop — `app/page.tsx`
Added `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"` to project grid `<Image>` components, matching the grid breakpoints (1-col / 2-col / 3-col).

### 4. `aria-label` on icon-only links — `app/page.tsx`, `components/Footer.tsx`
Added descriptive `aria-label` to all 8 icon-only links:
- 3 social links in hero section (GitHub/LinkedIn/X)
- 2 per-project links (GitHub repo / external link, dynamic labels)
- 3 social links in footer

### 5. Visually hidden `<h1>` — `app/page.tsx`
Added `<h1 className="sr-only">Bassim Eledath — AI Engineer</h1>` for accessibility and SEO.

### 6. `<nav>` landmark for TOC — `components/TableOfContents.tsx`
Wrapped TOC content in `<nav aria-label="Table of contents">` inside the existing `<aside>`.

### 7. Extract `formatDate` — `lib/utils.ts` (new), `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`
Created `lib/utils.ts` with the shared `formatDate` function. Removed duplicate definitions from both blog pages and replaced with imports.
