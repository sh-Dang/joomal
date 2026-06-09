import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav className="border-b border-[var(--border)] bg-[var(--secondary)]">
      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-3">

        <Link
          href="/cocktails"
          className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition"
        >
          칵테일
        </Link>

        <Link
          href="/liquors"
          className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition"
        >
          주류
        </Link>
        <Link
          href="/ingredients"
          className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition"
        >
          재료
        </Link>

        <Link
          href="/community"
          className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition"
        >
          커뮤니티
        </Link>

      </div>
    </nav>
  );
}