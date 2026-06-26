"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
// npm install lucide-react
import { Star } from "lucide-react";

interface RecipeIngredient {
    id: number;
    ingredientKorName: string;
    ingredientEngName: string;
    amount: number;
    korUnit: string;
    engUnit: string;
}

interface RecipeStep {
    id: number,
    stepNo: number;
    instruction: string;
}

interface CocktailDetail {
    id: number;
    korName: string;
    engName: string;
    description: string;
    imageUrl: string;
    abv: number;
    glassType: string;
    ingredients: RecipeIngredient[];
    steps: RecipeStep[];
}

export default function CocktailDetails(){
    const { id } = useParams();
    const router = useRouter(); 
    const [cocktailDetail, setCocktailDetail] = useState<CocktailDetail | null>(null);
    const [isFavorite, setIsFavorite] = useState(false); // 즐겨찾기 상태인지 점검

    const toggleFavorite = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            if (!token) return;

            // 현재 상태 기준으로 분기
            if (isFavorite) {
                await fetch(
                    `http://localhost:9999/api/members/me/favorites/cocktails/${id}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else {
                await fetch(
                    `http://localhost:9999/api/members/me/favorites/cocktails/${id}`,
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("accessToken");

                // 1. 칵테일 상세 조회
                const detailResponse = await fetch(
                    `http://localhost:9999/api/cocktails/${id}`
                );

                const detailData = await detailResponse.json();
                setCocktailDetail(detailData);

                // 2. 즐겨찾기 여부 조회
                if (token) {
                    const favoriteResponse = await fetch(
                        `http://localhost:9999/api/members/me/favorites/cocktails/${id}/exists`,
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
        <div className="mx-auto max-w-4xl p-8">
            {cocktailDetail && (
                <div className="flex gap-4">
                    <button
                        onClick={() => router.back()}
                        className="h-fit rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 cursor-pointer"
                    >
                        ←
                    </button>
                    <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                        <div className="flex items-start justify-between gap-8">
                            <div className="flex-1">
                                {/* 칵테일 이름 */}
                                <div className="flex items-center justify-between">
                                    <h1 className="text-4xl font-bold">
                                        {cocktailDetail.korName}
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
                                    {cocktailDetail.engName}
                                </p>

                                {/* 설명 */}
                                <p className="mt-6 leading-7 text-gray-700">
                                    {cocktailDetail.description}
                                </p>

                                {/* 정보 */}
                                <div className="mt-6 flex gap-3">
                                    <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
                                        🍷 {cocktailDetail.abv}%
                                    </span>

                                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                                        🥃 {cocktailDetail.glassType}
                                    </span>
                                </div>
                            </div> 

                            {/* 오른쪽 이미지 */}
                            <div className="flex h-72 w-72 shrink-0 items-start justify-end">
                                <img
                                    src={cocktailDetail.imageUrl}
                                    alt={cocktailDetail.korName}
                                    className="max-h-full max-w-full object-contain rounded-xl"
                                />
                            </div>

                        </div>
                        {/* 재료 */}
                        <div className="mt-10">
                            <h2 className="mb-4 text-2xl font-bold">
                                🥄 재료
                            </h2>

                            <ul className="space-y-2">
                                {cocktailDetail.ingredients.map((ing) => (
                                    <li
                                        key={ing.id}
                                        className="flex justify-between rounded-lg border border-gray-200 p-3"
                                    >
                                        <span>{ing.ingredientKorName}</span>

                                        <span className="font-semibold text-gray-600">
                                            {ing.amount} {ing.korUnit}({ing.engUnit})
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 만드는 순서 */}
                        <div className="mt-10">
                            <h2 className="mb-4 text-2xl font-bold">
                                👨‍🍳 만드는 방법
                            </h2>

                            <ol className="space-y-4">
                                {cocktailDetail.steps.map((step) => (
                                    <li
                                        key={step.id}
                                        className="flex gap-4 rounded-lg border border-gray-200 p-4"
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white font-bold">
                                            {step.stepNo}
                                        </div>

                                        <p className="flex-1 text-gray-700">
                                            {step.instruction}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );    
}