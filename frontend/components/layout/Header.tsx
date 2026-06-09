"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Header 컴포넌트에서 사용할 로그인 관련 속성 정의
interface HeaderProps {
  // 현재 로그인 여부 flag
  isLoggedIn: boolean;
  // 로그아웃 버튼 클릭 시 실행 될 함수
  onLogout: () => void;
}

export default function Header() {
  // 현재 URL의 Query Parameter를 조회하기 위한 객체 // 예) /?token=abcd1234 -> searchParams.get("token")
  const searchParams = useSearchParams();
  // 초기 로그인상태를 false로 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // URL에 포함된 accessToken값 조회
    // 초기에는 백엔드가 redirect 하며 http://localhost:3000/?accessToken=eyJhbGc...의 형식으로 보내주는데
    // 해당하는 accessToken에 대한 값을 받아서 accessToken 변수에 저장하는 역할을 해줌
    const accessToken = searchParams.get("accessToken");

    // token이 전달된 경우
    if (accessToken) {
      // localStorage에 accessToken이라는 이름으로 token 저장
      localStorage.setItem("accessToken", accessToken);

      // 주소창에서 token을 제거하여 URL에 노출되지 않도록 변경
      window.history.replaceState({}, "", "/");

      // accessToken을 저장한 후 로그인 true 상태로 변경
      setIsLoggedIn(true);
      // 이후 로직은 실행하지 않고 종료
      return;
    }

    //token이 전달되지 않은 경우
    // 기존에 저장된 Access Token 존재 여부 확인
    const storedToken = localStorage.getItem("accessToken");
    // accessToken 존재여부에 따른 로그인 상태 수정메서드
    setIsLoggedIn(!!storedToken);
  }, [searchParams]);

  const handleLogout = () => {
    // localStorage에 저장된 accessToken제거
    localStorage.removeItem("accessToken");
    // 로그인 상태를 false로 설정
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