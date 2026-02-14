import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-6">
      <Link href="/" className="font-serif text-xl font-medium text-foreground">
        Bassim Eledath
      </Link>
      <nav className="flex gap-6 text-sm text-muted">
        <Link href="/" className="transition-colors hover:text-foreground">
          About
        </Link>
        <Link href="/blog" className="transition-colors hover:text-foreground">
          Blog
        </Link>
      </nav>
    </header>
  );
}
