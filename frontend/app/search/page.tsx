"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface CocktailResult {
    id: number;
    korName: string;
    engName: string;
    description: string;
    imageUrl: string;
    abv: number;
}

interface IngredientResult {
    id: number;
    korName: string;
    engName: string;
    imageUrl: string;
    type: "LIQUOR" | "INGREDIENT";
    relatedCocktails: CocktailResult[];
}

interface SearchResponse {
    cocktails: CocktailResult[];
    liquors: IngredientResult[];
    ingredients: IngredientResult[];
}

export async function fetchSearch(keyword: string): Promise<SearchResponse> {
    const res = await fetch(
        `http://localhost:9999/search?keyword=${encodeURIComponent(keyword)}`
    );
    if (!res.ok) throw new Error("검색 요청 실패");
    const data = await res.json();
    console.log("API 응답 데이터:", data);

    return data;
}

export default function SearchPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const keyword = searchParams.get("keyword") ?? ""; // 들어온 keyword를 찾아서 렌더링시작(useEffect)
    const [result, setResult] = useState<SearchResponse | null>(null);

    useEffect(() => {
        if (!keyword) return; // keyword가 없다면 바로 렌더링
        // 받은 data를 result에 전달
        fetchSearch(keyword)
            .then((data) => setResult(data))
            .catch(console.error)
    }, [keyword]);

    // result가 없는 경우 null반환
    if (!result) return null;

    // 검색 결과가 모두 비어있는지 판단하는 boolean 값
    const isEmpty =
    result.cocktails.length === 0 &&
    result.liquors.length === 0 &&
    result.ingredients.length === 0;

    return (
        <main className="mx-auto max-w-7xl px-6 py-10">
            <div className="mb-6 flex items-center gap-3">
                <button
                    onClick={() => router.back()}
                    className="h-fit rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 cursor-pointer"
                >
                    ←
                </button>

                <h1 className="text-xl font-bold">
                    "{keyword}" 검색 결과
                </h1>
            </div>
            {isEmpty && <p className="text-gray-400">검색 결과가 없습니다.</p>}

            {result.cocktails.length > 0 && (
                <>
                    <section className="mb-8">
                        <h2 className="mb-3 text-lg font-semibold">칵테일</h2>
                        <ul className="flex flex-col gap-3">
                        {result.cocktails.map((cocktail) => (
                            <li key={cocktail.id} className="rounded-lg border p-4">
                            <p className="font-bold">{cocktail.korName} ({cocktail.engName})</p>
                            <p className="text-sm text-gray-500">{cocktail.description}</p>
                            </li>
                        ))}
                        </ul>
                    </section>
                </>
            )}

            {result.liquors.length > 0 && (
                <>
                    {/* 재료 영역 */}
                    <section className="mb-8">
                    <h2 className="mb-3 text-lg font-semibold">주류</h2>
                    <ul className="flex flex-col gap-3">
                        {result.liquors.map((liquor) => (
                        <li key={liquor.id} className="rounded-lg border p-4">
                            <p className="font-bold">{liquor.korName}</p>
                        </li>
                        ))}
                    </ul>
                    </section>

                    {/* 관련 칵테일 영역 */}
                    {result.liquors.some((liquor) => liquor.relatedCocktails.length > 0) && (
                    <section className="mb-8">
                        <h2 className="mb-3 text-lg font-semibold">이 재료로 만들 수 있는 칵테일</h2>
                        <ul className="flex flex-col gap-3">
                        {result.liquors
                            .flatMap((liquor) => liquor.relatedCocktails)
                            // 중복 칵테일 제거
                            .filter((cocktail, index, arr) => arr.findIndex((x) => x.id === cocktail.id) === index)
                            .map((cocktail) => (
                            <li key={cocktail.id} className="rounded-lg border p-4">
                                <p className="font-bold">{cocktail.korName} ({cocktail.engName})</p>
                                <p className="text-sm text-gray-500">{cocktail.description}</p>
                            </li>
                            ))}
                        </ul>
                    </section>
                    )}
                </>
            )}

            {result.ingredients.length > 0 && (
                <>
                    {/* 재료 영역 */}
                    <section className="mb-8">

                    <h2 className="mb-3 text-lg font-semibold">재료</h2>
                    <ul className="flex flex-col gap-3">
                        {result.ingredients.map((ingredient) => (
                        <li key={ingredient.id} className="rounded-lg border p-4">
                            <p className="font-bold">{ingredient.korName}</p>
                        </li>
                        ))}
                    </ul>
                    </section>

                    {/* 관련 칵테일 영역 */}
                    {result.ingredients.some((ingredient) => ingredient.relatedCocktails.length > 0) && (
                    <section className="mb-8">
                        <h2 className="mb-3 text-lg font-semibold">이 재료로 만들 수 있는 칵테일</h2>
                        <ul className="flex flex-col gap-3">
                        {result.ingredients
                            .flatMap((ingredient) => ingredient.relatedCocktails)
                            // 중복 칵테일 제거
                            .filter((cocktail, index, arr) => arr.findIndex((x) => x.id === cocktail.id) === index)
                            .map((cocktail) => (
                            <li key={cocktail.id} className="rounded-lg border p-4">
                                <p className="font-bold">{cocktail.korName} ({cocktail.engName})</p>
                                <p className="text-sm text-gray-500">{cocktail.description}</p>
                            </li>
                            ))}
                        </ul>
                    </section>
                    )}
                </>
            )}
        </main>
    );
}