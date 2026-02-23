"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/extract-headings";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -75% 0px" }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden toc:block w-[260px] flex-shrink-0">
      <nav aria-label="Table of contents" className="sticky top-28">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          On this page
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          {headings.map((heading) => (
            <li key={heading.id} className={heading.level === 3 ? "pl-3" : ""}>
              <a
                href={`#${heading.id}`}
                className={`block leading-snug transition-colors ${
                  activeId === heading.id
                    ? "text-foreground font-medium"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
