"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { log } from "console";

// 주류를 담아둘 인터페이스 객체
interface Liquor {
    id: number;
    type: string;
    category: string;
    subcategory: string;
    korName: string;
    engName: string;
    imageUrl: string;
}

export default function Liquors(){
    const [liquors, setLiquors] = useState<Liquor[]>([]);
    const router = useRouter();

    // RESTful한 설계를 위해 liquors 도메인은 생성하지 않음
    const getDetail = (id: number) => {
        router.push(`/ingredients/${id}`)
    }

    useEffect(()=> {
        fetch("http://localhost:9999/api/ingredients?type=LIQUOR")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setLiquors(data);
            });
    }, []);
    
    return(
            <div className="mx-auto max-w-4xl p-8">
            <h1 className="mb-8 text-center text-4xl font-bold">
                Liquor List
            </h1>

            <div className="space-y-4">
        {liquors.map((liquor) => (
            <div
                key={liquor.id}
                onClick={() => getDetail(liquor.id)}
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
                                {liquor.korName}
                            </h2>

                            <p className="mt-2 text-lg italic text-gray-500">
                                {liquor.engName}
                            </p>
                        </div>

                        {/* 오른쪽 */}
                        <img
                            src={liquor.imageUrl}
                            alt={liquor.korName}
                            className="h-32 w-32 rounded-xl object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}