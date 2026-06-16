"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationBar() {
  // usePathname()은 현재 사용자가 보고 있는 URL 경로를 알려주는 Hook이고, 메뉴 활성화 표시, 권한 체크, 브레드크럼 생성 등에 자주 사용
  const pathname = usePathname();

  // 매개변수로 들어온 문자열로 요청주소가 시작하는지 검증하는 메서드
  // 일치하면 true, 아니면 false를 반환한다.
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