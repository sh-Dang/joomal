"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Cocktail {
    id: number;
    korName: string;
    engName: string;
    description: string;
    imageUrl: string;
    abv: number;
    glassType: string;
}


export default function CocktailDetails(){
    const { id } = useParams();
    const [cocktail, setCocktail] = useState<Cocktail | null>(null);

    useEffect(() => {
        fetch(`http://localhost:9999/api/cocktails/${id}`)
            .then((res) => res.json())
            .then((data) => setCocktail(data));
    }, [id]);
    
    return(
        <>
            <h1>칵테일의 상세 페이지 입니다.</h1>
            {cocktail && (
                <div>
                    <h2>{cocktail.korName}</h2>
                    <p>{cocktail.engName}</p>
                    <p>{cocktail.description}</p>
                    <p>도수: {cocktail.abv}%</p>
                    <p>잔: {cocktail.glassType}</p>
                </div>
            )}
            
        </>
    )
}