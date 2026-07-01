"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Header() {
    // 현재 URL의 Query Parameter를 조회하기 위한 객체 // 예) /?token=abcd1234 -> searchParams.get("token")
    const searchParams = useSearchParams();
    const router = useRouter(); // 라우터 사용
    // 초기 로그인상태를 false로 관리
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // 검색시 키워드 지정
    const [keyword, setKeyword] = useState("");

    function isTokenExpired(token: string) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp * 1000 <= Date.now();
    }

    useEffect(() => {
        // URL에 포함된 accessToken값 조회
        // 초기에는 백엔드가 redirect 하며 http://localhost:3000/?accessToken=eyJhbGc...의 형식으로 보내주는데
        // 해당하는 accessToken에 대한 값을 받아서 accessToken 변수에 저장하는 역할을 해줌
        const accessToken = searchParams.get("accessToken");

        // 현재 토근의 상태
        let presentToken = accessToken;

        // token이 전달된 경우
        if (accessToken) {
            // localStorage에 accessToken이라는 이름으로 token 저장
            localStorage.setItem("accessToken", accessToken);

            // 주소창에서 token을 제거하여 URL에 노출되지 않도록 변경
            window.history.replaceState({}, "", "/");
            // // accessToken을 저장한 후 로그인 true 상태로 변경
            // setIsLoggedIn(true);
            // // 이후 로직은 실행하지 않고 종료
            // return;
        } else {
            // accessToken이 전달되지 않은 경우 현재 토큰상태를 localStorage의 상태와 동기화
            presentToken = localStorage.getItem("accessToken");
        }

        // 현재 토큰이 존재하지 않는 경우
        if (!presentToken) {
            // 로그인 플래그 false 설정
            setIsLoggedIn(false);
            return; // 함수 종료
        }

        // 현재 토큰의 exp가 만료된 경우
        if (isTokenExpired(presentToken)) {
            // localStorage에서 accessToken을 제거(로그아운 상태로 만듦)
            localStorage.removeItem("accessToken");
            // 로그인 플래그 false 설정
            setIsLoggedIn(false);
            return; // 함수 종료
        }

        // 위 검증 통과 후 로그인 플래그 true
        setIsLoggedIn(true);
        // TODO : useEffect 특성상 새로고침이나 최초 렌더링 시에만 토큰검증 및 렌더링을 수행하는 문제 해결방안 구축
    }, [searchParams]);

    const handleLogout = () => {
        // localStorage에 저장된 accessToken제거
        localStorage.removeItem("accessToken");
        // 로그인 상태를 false로 설정
        setIsLoggedIn(false);
    };

    // 검색 실행 → /search?keyword=aaa로 이동
    const handleSearch = () => {
        if (!keyword.trim()) return; // 공백제거 후 false이면 실행종료
        // encodeURIComponent => URL에 안전하게 넣기 위한 인코딩 로직
        router.push(`/search?keyword=${encodeURIComponent(keyword)}`); 
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
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}  // input 값 변경 시 실시간 keyword state 업데이트 
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} // 엔터로 검색
            placeholder="칵테일, 재료를 검색해 보세요"
            className="flex-1 rounded-lg border border-[var(--border)] bg-white px-4 py-2 outline-none transition focus:border-[var(--primary)]"
            />

            <button onClick={handleSearch}
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
                cursor-pointer
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