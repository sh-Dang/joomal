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
        <div className="mx-auto max-w-7xl px-10 py-10">
            <h1 className="mb-10 text-center text-4xl font-bold">
                🍸 Cocktail List
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cocktails.map((cocktail) => (
                <div
                    key={cocktail.id}
                    onClick={() => getDetail(cocktail.id)}
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
                        src={cocktail.imageUrl}
                        alt={cocktail.korName}
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
                            {cocktail.korName}
                        </h2>

                        <p className="italic text-sm text-gray-500">
                            {cocktail.engName}
                        </p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}