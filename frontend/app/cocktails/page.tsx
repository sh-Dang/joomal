"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// 객체의 타입을 정리하는 TypeScript 문법
interface Cocktail {
    id: number;
    korName: string;
    engName: string;
    description: string;
    imageUrl: string;
    abv: number;
    glassType: string;
}

export default function Cocktails(){
    // 칵테일 목록 상태 (Cocktail 객체 배열), (State)
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);
    const router = useRouter();

    const getDetail = (id: number) =>{
        router.push(`/cocktails/${id}`);
    }

    useEffect(() => {
        fetch("http://localhost:9999/api/cocktails")
            .then((res) => res.json())
            .then((data) => setCocktails(data));
    }, []);

    return (
        <div className="mx-auto max-w-4xl p-8">
            <h1 className="mb-8 text-center text-4xl font-bold">
                🍸 Cocktail List
            </h1>

            <div className="space-y-4">
                {cocktails.map((cocktail) => (
                    <div
                        key={cocktail.id}
                        onClick={() => getDetail(cocktail.id)}
                        className="
                            cursor-pointer
                            rounded-xl
                            border
                            border-gray-200
                            bg-white
                            p-5
                            shadow-sm
                            transition
                            duration-200
                            hover:-translate-y-1
                            hover:shadow-lg
                        "
                    >
                        <h2 className="text-xl font-semibold text-gray-800">
                            {cocktail.korName}
                        </h2>

                        <p className="mt-1 text-gray-500 italic">
                            {cocktail.engName}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}