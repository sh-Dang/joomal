"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// 객체의 타입을 정리하는 TypeScript 문법
interface Ingredient {
    id: number;
    korName: string;
    engName: string;
    description: string;
    imageUrl: string;
    abv: number;
    glassType: string;
}

export default function Ingredients(){

    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    return(
        <h1> 재료 페이지 입니다.</h1>
    );
}