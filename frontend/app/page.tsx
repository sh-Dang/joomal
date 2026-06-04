"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Header from "../components/layout/Header";
import NavBar from "../components/layout/NavigationBar";

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

    const storedToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!storedToken);
  }, [searchParams]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <NavBar />

      <main className="mx-auto max-w-7xl p-6 bg-[var(--background)] text-[var(--foreground)]">

        {/* Hero */}
        <section className="mb-10 rounded-xl bg-[var(--secondary)] p-12 text-center">
          <h1 className="mb-4 text-5xl font-bold">
            🍸 주말(酒末)
          </h1>

          <p className="text-lg text-[var(--foreground)]/70">
            한 주의 끝, 한 잔의 술
          </p>
        </section>

        {/* 인기 레시피 */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">
            인기 레시피
          </h2>

          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-[var(--border)] bg-white p-4 hover:shadow-md transition"
              >
                칵테일 카드
              </div>
            ))}
          </div>
        </section>

        {/* 추천 */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            오늘의 추천
          </h2>

          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-[var(--border)] bg-white p-4 hover:shadow-md transition"
              >
                추천 칵테일
              </div>
            ))}
          </div>
        </section>

      </main>
    </>
  );
}