"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { useSearchParams } from "next/navigation";

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function Header() {
  const searchParams = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("accessToken", token);
      window.history.replaceState({}, "", "/");
      setIsLoggedIn(true);
      return;
    }

    const storedToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!storedToken);
  }, [searchParams]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <header className="border-b border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* 로고 */}
        <Link
          href="/"
          className="text-2xl font-bold text-[var(--primary)]"
        >
          🍸 주말(酒末)
        </Link>

        {/* 검색창 */}
        <div className="flex w-full max-w-2xl items-center gap-2">
          <input
            type="text"
            placeholder="칵테일, 재료를 검색해 보세요"
            className="flex-1 rounded-lg border border-[var(--border)] bg-white px-4 py-2 outline-none transition focus:border-[var(--primary)]"
          />

          <button
            className="
              rounded-lg
              bg-[var(--primary)]
              px-5
              py-2
              font-semibold
              text-white
              transition
              hover:opacity-90
              active:scale-95
              whitespace-nowrap
            "
          >
            검색
          </button>
        </div>

        {/* 우측 메뉴 */}
        <div className="flex items-center gap-4">

          {isLoggedIn ? (
            <>
              <Link
                href="/mypage"
                className="rounded-lg bg-[var(--primary)] px-4 py-2 text-white hover:bg-[var(--primary-hover)] transition"
              >
                마이페이지
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-lg border border-[var(--border)] px-4 py-2 text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-[var(--primary)] px-4 py-2 text-white hover:bg-[var(--primary-hover)] transition"
            >
              로그인
            </Link>
          )}

        </div>
      </div>
    </header>
  );
}