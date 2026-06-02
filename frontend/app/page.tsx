"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
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

    // 페이지 최초 진입 시 로그인 상태 확인
    const storedToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!storedToken);
  }, [searchParams]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">🍸 주말(酒末)</h1>
      <p className="text-lg text-gray-600">
        한 주의 끝, 한 잔의 술
      </p>

      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-6 py-3 text-white"
        >
          로그아웃
        </button>
      ) : (
        <Link
          href="/login"
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          로그인
        </Link>
      )}
    </main>
  );
}