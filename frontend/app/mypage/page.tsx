"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


interface Member{
    nickname: string;
    profileImage: string;
}

export default function MyPage(){

    const [member, setMember] = useState<Member | null>(null);
    const router = useRouter();
    
    // 최초 실행하여 유저정보를 불러오는 메서드
    useEffect(() => {
        // localStorage의 accessToken을 추출
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        // 토큰에 Bearer를 붙여 백엔드에 최초 요청을 보냄
        fetch("http://localhost:9999/api/members/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            console.log(res);
            return res.json();
        })
        .then((data) => {
            setMember(data);
            console.log(data);
        });
    }, []);
    

    return(
        <div className="flex justify-center">
            {member && (
            <div
                className="w-full max-w-3xl rounded-2xl border p-8"
                style={{
                    borderColor: "var(--border)",
                    backgroundColor: "white",
                }}
            >
                <div className="flex flex-1 flex-col gap-4">

                    {/* 이미지 + 닉네임 */}
                    <div className="flex items-start gap-5">

                        <img
                            src={member.profileImage}
                            alt={`${member?.nickname}의 프로필 이미지`}
                            className="h-20 w-20 rounded-full object-cover"
                        />

                        <h1 className="text-2xl font-medium">
                            {member.nickname}님 어서오세요!
                        </h1>
                    </div>

                    {/* 통계 */}
                    <div className="grid grid-cols-1 gap-2">
                        {[
                            {
                                label: "내가 가진 재료",
                                value: "나의 재료",
                                href: "/mypage/ingredients",
                            },
                            {
                                label: "나의 즐겨찾기",
                                value: "즐겨찾기",
                                href: "/mypage/favorites",
                            },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-lg px-4 py-3"
                                style={{
                                    backgroundColor: "#fffaf5",
                                    border: "0.5px solid var(--border)",
                                }}
                            >
                                <div className="flex items-start justify-between">
                                    <span
                                        className="text-xs"
                                        style={{ color: "var(--primary-hover)" }}
                                    >
                                        {stat.label}
                                    </span>

                                    <button
                                        onClick={() => router.push(stat.href)}
                                        className="text-xs transition hover:underline cursor-pointer"
                                        style={{ color: "var(--primary)" }}
                                    >
                                        전체보기 →
                                    </button>
                                </div>

                                <div className="mt-1 text-xl font-medium">
                                    {stat.value}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* 구분선 */}
                    <div
                        style={{
                            height: "0.5px",
                            backgroundColor: "var(--border)",
                        }}
                    />

                    {/* 버튼 */}
                    <div className="flex gap-2">
                        <button
                            className="rounded-lg px-4 py-2 text-sm text-white hover:opacity-90"
                            style={{ backgroundColor: "var(--primary)" }}
                        >
                            프로필 수정
                        </button>
                    </div>

                </div>
            </div>
            )}
        </div>
    );
}