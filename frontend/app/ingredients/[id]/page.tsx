"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface IngredientDetail {
    id: number;
    korName: string;
    engName: string;
}

export default function CocktailDetails(){
    const { id } = useParams();
    const [ingredientDetails, setIngredientDetails] = useState<IngredientDetail | null>(null);

    useEffect(() => {
        fetch(`http://localhost:9999/api/ingredients/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setIngredientDetails(data)
            });
    }, [id]);

    return (
        <h1>재료 디테일페이지 입니다.</h1>
    );    
}