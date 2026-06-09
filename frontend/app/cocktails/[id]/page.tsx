"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { log } from "console";
import { isMainThread } from "worker_threads";

// interface RecipeIngredient {
//     ingredientId: number;
//     name: string;
//     amount: number;
//     unit: string;
// }
// interface RecipeStep {
//     stepNo: number;
//     instruction: string;
// }
interface Ingredient{
    name: string;
}
interface RecipeIngredient {
    id: number;
    name: string;
    amount: number;
    unit: string;
    ingredient: Ingredient[];
}

interface RecipeStep {
    id: number,
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
    const [cocktailDetail, setCocktailDetail] = useState<CocktailDetail | null>(null);

    useEffect(() => {
        fetch(`http://localhost:9999/api/cocktails/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCocktailDetail(data)
            });
    }, [id]);
    
    return(
        <>
            <h1>칵테일의 상세 페이지 입니다.</h1>
            {cocktailDetail && (
                <div>
                    <h2>{cocktailDetail.korName}</h2>
                    <p>{cocktailDetail.engName}</p>
                    <p>{cocktailDetail.description}</p>
                    <p>도수: {cocktailDetail.abv}%</p>
                    <p>잔: {cocktailDetail.glassType}</p>
                    <div>
                        <h3>재료</h3>
                        <ul>
                            {cocktailDetail.ingredients.map((ing) => (
                                // <li key={ing.ingredientId}>
                                //     {ing.name} - {ing.amount} {ing.unit}
                                // </li>
                                <li key={ing.id}>
                                    {ing.ingredient.name} - {ing.amount} {ing.unit}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>만드는 순서</h3>
                        <ol>
                            {cocktailDetail.steps.map((step) => (
                                <li key={step.id}>
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