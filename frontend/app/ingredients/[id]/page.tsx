"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
    const [ingredientDetail, setIngredientDetail] = useState<IngredientDetail | null>(null);
    // 이미 가진재료인지 아닌지 판단하는 플래그
    const [isOwned, setIsOwned] = useState(false);
    // const [isOwned, setIsOwned] = useState(true);

    // 내가 가진 재료에 추가됨
    const addToMyIngredient = async () => {
        const ok = window.confirm("내가 가진 재료에 추가하시겠습니까?");

        if (!ok) {
            return;
        }

        // API 호출
        // await fetch(...);
        setIsOwned(!isOwned);
        alert("내가 가진 재료에 추가되었습니다.");
    };

    useEffect(() => {
        fetch(`http://localhost:9999/api/ingredients/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setIngredientDetail(data)
            });
    }, [id]);

    return (
        <div className="mx-auto max-w-5xl p-8">
            {ingredientDetail && (
                <div className="flex gap-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">

                    {/* 왼쪽 내용 */}
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold">
                            {ingredientDetail.korName}
                        </h1>

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
                            <div className="inline-block mt-8 rounded-xl bg-gray-200 px-6 py-3 text-center font-semibold text-gray-500 shadow-md transition duration-200">
                                ✅ 이미 내가 가진 재료입니다.
                            </div>
                        ) : (
                            <button onClick={addToMyIngredient}
                                className="mt-8 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-amber-600 hover:shadow-lg active:scale-95">
                                내가 가진 재료에 추가
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
            )}
        </div>
    );    
}