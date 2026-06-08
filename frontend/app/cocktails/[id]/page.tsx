"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface RecipeIngredient {
    ingredientId: number;
    name: string;
    amount: number;
    unit: string;
}
interface RecipeStep {
    stepNo: number;
    instruction: string;
}

interface CocktailDetail {
    id: number;
    korName: string;
    engName: string;
    description: string;
    imageUrl: string;
    abv: number;
    glassType: string;
    ingredients: RecipeIngredient[];
    steps: RecipeStep[];
}

export default function CocktailDetails(){
    const { id } = useParams();
    const [CocktailDetail, setCocktailDetail] = useState<CocktailDetail | null>(null);

    useEffect(() => {
        fetch(`http://localhost:9999/api/cocktails/${id}`)
            .then((res) => res.json())
            .then((data) => setCocktailDetail(data));
    }, [id]);
    
    return(
        <>
            <h1>칵테일의 상세 페이지 입니다.</h1>
            {CocktailDetail && (
                <div>
                    <h2>{CocktailDetail.korName}</h2>
                    <p>{CocktailDetail.engName}</p>
                    <p>{CocktailDetail.description}</p>
                    <p>도수: {CocktailDetail.abv}%</p>
                    <p>잔: {CocktailDetail.glassType}</p>
                    <div>
                        <h3>레시피</h3>
                        <ul>
                            {CocktailDetail.ingredients.map((ing) => (
                                <li key={ing.ingredientId}>
                                    {ing.name} - {ing.amount} {ing.unit}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>만드는 순서</h3>
                        <ol>
                            {CocktailDetail.steps.map((step) => (
                                <li key={step.stepNo}>
                                    {step.instruction}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

            )}


            
            
        </>
    )
}