"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Star } from "lucide-react";

interface IngredientDetail {
    id: number;
    korName: string;
    engName: string;
    imageUrl: string;
    abv: number;
    description: string;
}

export default function IngredientDetails(){
    const { id } = useParams();
    const router = useRouter();
    const [ingredientDetail, setIngredientDetail] = useState<IngredientDetail | null>(null);
    // 이미 가진재료인지 아닌지 판단하는 플래그
    const [isOwned, setIsOwned] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false); // 즐겨찾기 상태인지 점검

    const toggleFavorite = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            if (!token) return;

            // 현재 상태 기준으로 분기
            if (isFavorite) {
                await fetch(
                    `http://localhost:9999/api/members/me/favorites/ingredients/${id}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else {
                await fetch(
                    `http://localhost:9999/api/members/me/favorites/ingredients/${id}`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }

            // UI 즉시 반영
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteFromMyIngredient = async () => {
        if (!ingredientDetail) return; // 존재하지 않는 재료일 경우 종료
        const ok = window.confirm("나의 재료에서 삭제할까요?");
        if (!ok) return;

        try {
            const token = localStorage.getItem("accessToken");

            const response = await fetch(
                `http://localhost:9999/api/members/me/ingredients/${ingredientDetail.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                alert(await response.text());
                return;
            }

            setIsOwned(false);
            alert("나의 재료에서 제거했습니다.");
        } catch (error) {
            console.error(error);
            alert("재료 삭제 중 오류가 발생했습니다.");
        }
    }

    // 내가 가진 재료에 추가됨
    const addToMyIngredient = async () => {
        if (!ingredientDetail) return; // 존재하지 않는 재료일 경우 종료
        
        const ok = window.confirm("내가 가진 재료에 추가하시겠습니까?");
        if (!ok) return;

        try {
            const token = localStorage.getItem("accessToken");

            const res = await fetch(
                `http://localhost:9999/api/members/me/ingredients/${ingredientDetail.id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                throw new Error("재료 추가 실패");
            }

            setIsOwned(true);
            alert("내가 가진 재료에 추가되었습니다.");
        } catch (error) {
            console.error(error);
            alert("재료 추가 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("accessToken");

                // 1. 재료 상세 조회
                const detailResponse = await fetch(
                    `http://localhost:9999/api/ingredients/${id}`
                );

                const detailData = await detailResponse.json();

                console.log(detailData);
                setIngredientDetail(detailData);

                // 2. 로그인한 경우에만 보유 여부 조회
                if (token) {
                    const ownedResponse = await fetch(
                        `http://localhost:9999/api/members/me/ingredients/${id}/exists`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    const owned = await ownedResponse.json();
                    setIsOwned(owned); // true || false
                }

                // 3. 즐겨찾기 여부 조회
                if (token) {
                    const favoriteResponse = await fetch(
                        `http://localhost:9999/api/members/me/favorites/ingredients/${id}/exists`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    const favoriteData = await favoriteResponse.json();
                    setIsFavorite(favoriteData); // true || false
                }
                
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className="mx-auto max-w-5xl p-8">

            {ingredientDetail && (
                <div className="flex gap-4">
                    <button
                        onClick={() => router.back()}
                        className="h-fit rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 cursor-pointer"
                    >
                        ←
                    </button>
                    <div className="flex flex-1 gap-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">

                        {/* 왼쪽 내용 */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <h1 className="text-4xl font-bold">
                                    {ingredientDetail.korName}
                                </h1>
                                <button onClick={toggleFavorite}>
                                <Star
                                    size={28}
                                    fill={isFavorite ? "#facc15" : "none"}
                                    stroke={isFavorite ? "#facc15" : "#9ca3af"}
                                />
                                </button>
                            </div>

                            <p className="mt-2 text-xl text-gray-500 italic">
                                {ingredientDetail.engName}
                            </p>

                            <p className="mt-6 leading-7 text-gray-700">
                                {ingredientDetail.description}
                            </p>

                            {ingredientDetail.abv != null && (
                                <div className="mt-6">
                                    <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
                                        🍷 {ingredientDetail.abv}%
                                    </span>
                                </div>
                            )}

                            {/* 내가 가진 재료에 추가하는 버튼 */}
                            {isOwned ? (
                                <button onClick={deleteFromMyIngredient}
                                    className="mt-8 rounded-xl bg-gray-200 px-6 py-3 font-semibold text-gray shadow-md transition duration-200 hover:bg-gray-600 hover:shadow-lg active:scale-95 cursor-pointer">
                                    이 재료를 가지고 있어요
                                </button>
                            ) : (
                                <button onClick={addToMyIngredient}
                                    className="mt-8 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-amber-600 hover:shadow-lg active:scale-95 cursor-pointer">
                                    나의 재료에 추가
                                </button>
                            )}
                        </div>

                        {/* 오른쪽 이미지 */}
                        <div className="w-72 h-72 flex items-center justify-center">
                            <img
                                src={ingredientDetail.imageUrl}
                                alt={ingredientDetail.korName}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>

                    </div>
                </div>
            )}
        </div>
    );    
}