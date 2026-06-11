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
        fetch("http://localhost:9999/api/ingredients?type=MIXER")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setIngredients(data);
            });
    }, []);
    
    return(
            <div className="mx-auto max-w-4xl p-8">
            <h1 className="mb-8 text-center text-4xl font-bold">
                Ingredient List
            </h1>

            <div className="space-y-4">
        {ingredients.map((ingredient) => (
            <div
                key={ingredient.id}
                onClick={() => getDetail(ingredient.id)}
                    className="
                        flex
                        items-center
                        justify-between
                        cursor-pointer
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        p-6
                        shadow-sm
                        transition
                        hover:-translate-y-1
                        hover:shadow-lg
                    "
            >
                        {/* 왼쪽 */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                {ingredient.korName}
                            </h2>

                            <p className="mt-2 text-lg italic text-gray-500">
                                {ingredient.engName}
                            </p>
                        </div>

                        {/* 오른쪽 */}
                        <img
                            src={ingredient.imageUrl}
                            alt={ingredient.korName}
                            className="h-32 w-32 rounded-xl object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}