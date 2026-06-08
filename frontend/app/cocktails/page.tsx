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

    return(
        <>
            <h1>칵테일 목록을 보여주는 페이지 입니다.</h1>
            {cocktails.map((cocktail) => (
                <div key={cocktail.id}>
                    <ol onClick={() => getDetail(cocktail.id)}>
                        <li>{cocktail.korName}</li>
                        <li>{cocktail.engName}</li>
                    </ol>
                </div>
            ))}
        </>
    )

}