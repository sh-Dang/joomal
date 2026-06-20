"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MemberIngredient {
    id: number;
    ingredientKorName: string;
    ingredientEngName: string;
    imageUrl: string;
}

type TabType = "INGREDIENT" | "LIQUOR" | "ALL";

export default function MyIngredients() {
    const router = useRouter();

    // 현재 탭
    const [activeTab, setActiveTab] = useState<TabType>("ALL");

    // 목록 (재료 / 주류 공용)
    const [items, setItems] = useState<MemberIngredient[]>([]);

    // 데이터 fetch
    const fetchItems = async (type?: TabType) => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const url =
            type && type !== "ALL"
            ? `http://localhost:9999/api/members/me/ingredients?type=${type}`
            : `http://localhost:9999/api/members/me/ingredients`;

        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("데이터 조회 실패");

        const data = await res.json();
        console.log("API RESPONSE:", data);
        setItems(data);
    };

    // 최초 로딩
    useEffect(() => {
        fetchItems(activeTab);
    }, []);

    // 탭 변경
    const handleTabChange = (type: TabType) => {
        setActiveTab(type);
        fetchItems(type);
    };

    // 삭제
    const deleteIngredient = async (id: number) => {
        const ok = window.confirm("삭제하시겠습니까?");
        if (!ok) return;

        const token = localStorage.getItem("accessToken");
        if (!token) return;

        try {
            const response = await fetch(
                `http://localhost:9999/api/members/me/ingredients/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) throw new Error("삭제 실패");

            setItems((prev) =>
                prev.filter((item) => item.id !== id)
            );

            alert("삭제 완료");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-10 py-10">
            {/* 헤더 + 탭 */}
            <div className="mb-8 flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="h-fit rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 cursor-pointer"
                >
                    ←
                </button>
                <h1 className="text-4xl font-bold">나의 술장고</h1>

                <div className="flex gap-2">
                    <button
                        onClick={() => handleTabChange("ALL")}
                        className={`
                            px-4 py-2 rounded-full text-sm font-semibold border transition
                            ${
                                activeTab === "ALL"
                                    ? "bg-foreground text-secondary"
                                    : "bg-secondary text-foreground"
                            }
                        `}
                    >
                        전체
                    </button>
                    <button
                        onClick={() => handleTabChange("INGREDIENT")}
                        className={`
                            px-4 py-2 rounded-full text-sm font-semibold border transition
                            ${
                                activeTab === "INGREDIENT"
                                    ? "bg-foreground text-secondary"
                                    : "bg-secondary text-foreground"
                            }
                        `}
                    >
                        재료
                    </button>

                    <button
                        onClick={() => handleTabChange("LIQUOR")}
                        className={`
                            px-4 py-2 rounded-full text-sm font-semibold border transition
                            ${
                                activeTab === "LIQUOR"
                                    ? "bg-foreground text-secondary"
                                    : "bg-secondary text-foreground"
                            }
                        `}
                    >
                        주류
                    </button>
                </div>
            </div>

            {/* 카드 리스트 */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((ingredient) => (
                    <div
                        key={ingredient.id}
                        className="
                            relative
                            h-56
                            overflow-hidden
                            rounded-xl
                            shadow-md
                            cursor-pointer
                        "
                        onClick={() =>
                            router.push(
                                `/ingredients/${ingredient.id}`
                            )
                        }
                    >
                        {/* 이미지 */}
                        <img
                            src={ingredient.imageUrl}
                            alt={ingredient.ingredientKorName}
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        {/* 오버레이 */}
                        <div className="absolute inset-0 bg-black/10" />

                        {/* 내용 */}
                        <div className="relative z-10 flex h-full flex-col justify-between p-4">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <h2 className="text-xl font-bold text-black">
                                        {ingredient.ingredientKorName}
                                    </h2>
                                    <p className="text-sm italic text-gray-600">
                                        {ingredient.ingredientEngName}
                                    </p>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteIngredient(
                                            ingredient.id
                                        );
                                    }}
                                    className="
                                        relative z-20
                                        shrink-0
                                        rounded-full
                                        px-4 py-2
                                        text-sm font-semibold
                                        bg-secondary
                                        text-foreground
                                        border border-border
                                        transition
                                        duration-200
                                        cursor-pointer
                                        hover:bg-foreground
                                        hover:text-secondary
                                        active:scale-95
                                    "
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}