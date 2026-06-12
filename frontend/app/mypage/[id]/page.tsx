"use client";

import { useState, useEffect } from "react";

interface Member{
    korName: string;
    engName: string;
}

export default function MyPage(){

    const [member, setMember] = useState();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        fetch("http://localhost:9999/api/member/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.json())
        .then((data) => setMember(data));
    }, []);
    
    return(
        <div
            className="flex gap-8 rounded-2xl border p-8"
            style={{
                borderColor: "var(--border)",
                backgroundColor: "white",
            }}
        >
            <div className="flex flex-1 flex-col gap-4">

                {/* 이미지 + 이름 */}
                <div className="flex items-start gap-5">

                    <img
                        src="http://localhost:9999/images/default_image.png"
                        alt="기본 이미지"
                        className="h-20 w-20 rounded-full object-cover"
                    />

                    <div>
                        <h1 className="text-2xl font-medium">
                            이세형님 어서오세요!
                        </h1>

                        <p
                            className="mt-1 text-sm italic"
                            style={{ color: "var(--primary-hover)" }}
                        >
                            태그라인
                        </p>
                    </div>

                </div>

                {/* 설명 */}
                <p className="text-sm leading-7 text-gray-600">
                    넌 이세형이야
                </p>

                {/* 통계 */}
                <div className="grid grid-cols-2 gap-2">
                    {[
                        { label: "즐겨찾기", value: "즐겨찾기" },
                        { label: "최근 본", value: "최근 본 칵테일" },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="flex flex-col gap-1 rounded-lg px-4 py-3"
                            style={{
                                backgroundColor: "#fffaf5",
                                border: "0.5px solid var(--border)",
                            }}
                        >
                            <span
                                className="text-xs"
                                style={{ color: "var(--primary-hover)" }}
                            >
                                {stat.label}
                            </span>

                            <span className="text-xl font-medium">
                                {stat.value}
                            </span>
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

                    <button
                        className="rounded-lg px-4 py-2 text-sm hover:opacity-80"
                        style={{
                            border: "0.5px solid var(--primary)",
                            color: "var(--primary-hover)",
                            backgroundColor: "transparent",
                        }}
                    >
                        즐겨찾기 보기
                    </button>
                </div>

            </div>
        </div>
    );
}