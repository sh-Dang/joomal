"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationBar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);
  return (
    <nav className="border-b border-[var(--border)] bg-[var(--secondary)]">
      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-3">

        <Link
          href="/cocktails"
          className={`text-sm font-medium transition ${
            isActive("/cocktails")
              ? "text-amber-500 border-b-2 border-amber-500"
              : "text-[var(--foreground)] hover:text-[var(--primary)]"
          }`}
        >
          칵테일
        </Link>

        <Link
          href="/liquors"
          className={`text-sm font-medium transition ${
            isActive("/liquors")
              ? "text-amber-500 border-b-2 border-amber-500"
              : "text-[var(--foreground)] hover:text-[var(--primary)]"
          }`}
        >
          주류
        </Link>
        <Link
          href="/ingredients"
          className={`text-sm font-medium transition ${
            isActive("/ingredients")
              ? "text-amber-500 border-b-2 border-amber-500"
              : "text-[var(--foreground)] hover:text-[var(--primary)]"
          }`}
        >
          재료
        </Link>

        <Link
          href="/community"
          className={`text-sm font-medium transition ${
            isActive("/community")
              ? "text-amber-500 border-b-2 border-amber-500"
              : "text-[var(--foreground)] hover:text-[var(--primary)]"
          }`}
        >
          커뮤니티
        </Link>

      </div>
    </nav>
  );
}