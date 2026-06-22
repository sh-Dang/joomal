"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Favorite{
    id: number,
    targetId: number,
    engName: string,
    korName: string,
    imageUrl: string,
    favoriteType: FavoriteType;
}

type FavoriteType = "COCKTAIL" |"INGREDIENT" | "LIQUOR" | "ALL";

export default function MyFavorites(){
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<FavoriteType>("ALL");
    // 목록 (칵테일 / 재료 / 주류 공용)
    const [items, setItems] = useState<Favorite[]>([]);

    // 데이터 fetch
    const fetchItems = async (type?: FavoriteType) => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const url =
            type && type !== "ALL"
            ? `http://localhost:9999/api/members/me/favorites?type=${type}`
            : `http://localhost:9999/api/members/me/favorites`;

        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("데이터 조회 실패");

        const data = await res.json();
        console.log("API RESPONSE:", data);
        setItems(data);
    }

    // 최초 로딩
    useEffect(() => {
        fetchItems(activeTab);
    }, []);
    
    // 탭 변경
    const handleTabChange = (type: FavoriteType) => {
        setActiveTab(type);
        fetchItems(type);
    };

    const deleteIngredient = () => {
        console.log("삭제합니다");
    };

    // 디테일 불러오는 메서드
    const moveToDetail = (favorite: Favorite) => {
        console.log("디테일 불러오기");
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
                <h1 className="text-4xl font-bold">나의 즐겨찾기</h1>
                
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
                        onClick={() => handleTabChange("COCKTAIL")}
                        className={`
                            px-4 py-2 rounded-full text-sm font-semibold border transition
                            ${
                                activeTab === "COCKTAIL"
                                    ? "bg-foreground text-secondary"
                                    : "bg-secondary text-foreground"
                            }
                        `}
                    >
                        칵테일
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
                {items.map((favorite) => (
                    <div
                        key={favorite.id}
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
                                `/ingredients/${favorite.id}`
                            )
                        }
                    >
                        {/* 이미지 */}
                        <img
                            src={favorite.imageUrl}
                            alt={favorite.korName}
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        {/* 오버레이 */}
                        <div className="absolute inset-0 bg-black/10" />

                        {/* 내용 */}
                        <div className="relative z-10 flex h-full flex-col justify-between p-4">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <h2 className="text-xl font-bold text-black">
                                        {favorite.korName}
                                    </h2>
                                    <p className="text-sm italic text-gray-600">
                                        {favorite.engName}
                                    </p>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteIngredient(
                                            // favorite.id
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
