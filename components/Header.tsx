"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const isBlog = pathname?.startsWith("/blog");
  const isHome = pathname === "/";

  return (
    <header className="flex items-center justify-between py-6">
      <Link href="/" className="font-serif text-xl font-medium text-foreground">
        Bassim Eledath
      </Link>
      <nav aria-label="Main navigation" className="flex items-center gap-6 text-sm text-muted">
        <Link
          href="/"
          className={`transition-colors hover:text-foreground ${
            isHome ? "text-foreground" : ""
          }`}
        >
          About
        </Link>
        <Link
          href="/blog"
          className={`transition-colors hover:text-foreground ${
            isBlog ? "text-foreground" : ""
          }`}
        >
          Blog
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
