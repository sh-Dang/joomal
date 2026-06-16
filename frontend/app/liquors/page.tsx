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
        router.push(`/liquors/${id}`)
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
        <div className="mx-auto max-w-7xl px-10 py-10">
            <h1 className="mb-10 text-center text-4xl font-bold">
                Liquor List
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {liquors.map((liquor) => (
                    <div
                        key={liquor.id}
                        onClick={() => getDetail(liquor.id)}
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
                            src={liquor.imageUrl}
                            alt={liquor.korName}
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
                                {liquor.korName}
                            </h2>

                            <p className="italic text-sm text-gray-500">
                                {liquor.engName}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}