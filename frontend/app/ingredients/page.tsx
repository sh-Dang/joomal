"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// 객체의 타입을 정리하는 TypeScript 문법
interface Ingredient {
    id: number;
    type: string;
    category: string;
    subcategory: string;
    korName: string;
    engName: string;
    imageUrl: string;
}

export default function Ingredients(){

    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const router = useRouter();

    // liquors와 양식은 동일하게 가져가기
    const getDetail = (id: number) =>{
        router.push(`/ingredients/${id}`);
    }

        useEffect(() => {
        fetch("http://localhost:9999/api/ingredients?type=INGREDIENT")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setIngredients(data);
            });
    }, []);
    
    return(
        <div className="mx-auto max-w-7xl px-10 py-10">
            <h1 className="mb-10 text-center text-4xl font-bold">
                Liquor List
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {ingredients.map((ingredient) => (
                    <div
                        key={ingredient.id}
                        onClick={() => getDetail(ingredient.id)}
                        className="
                            relative
                            h-56
                            cursor-pointer
                            overflow-hidden
                            rounded-xl
                            shadow-md
                            transition
                            hover:scale-105
                        "
                    >
                        {/* 배경 이미지 */}
                        <img
                            src={ingredient.imageUrl}
                            alt={ingredient.korName}
                            className="
                                absolute
                                inset-0
                                h-full
                                w-full
                                object-cover
                            "
                        />

                        {/* 어두운 오버레이 */}
                        <div className="absolute inset-0 bg-black/5"></div>

                        {/* 텍스트 */}
                        <div
                            className="
                                relative
                                z-10
                                flex
                                h-full
                                flex-col
                                p-4
                                text-white
                            "
                        >
                            <h2 className="text-xl font-bold text-black">
                                {ingredient.korName}
                            </h2>

                            <p className="italic text-sm text-gray-500">
                                {ingredient.engName}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}