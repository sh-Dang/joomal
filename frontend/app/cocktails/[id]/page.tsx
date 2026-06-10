"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
    const [cocktailDetail, setCocktailDetail] = useState<CocktailDetail | null>(null);

    useEffect(() => {
        fetch(`http://localhost:9999/api/cocktails/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCocktailDetail(data)
            });
    }, [id]);

    return (
        <div className="mx-auto max-w-4xl p-8">
            {cocktailDetail && (
                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">

                    {/* 칵테일 이름 */}
                    <h1 className="text-4xl font-bold">
                        {cocktailDetail.korName}
                    </h1>

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
            )}
        </div>
    );    
}