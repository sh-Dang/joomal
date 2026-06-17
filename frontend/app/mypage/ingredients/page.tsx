"use client";

import { useState, useEffect } from "react";
   
interface MemberIngredient{
    ingredientId : number,
    ingredientKorName : string,
    ingredientEngName : string,
    imageUrl : string
}

export default function MyIngredients(){
    // 내가가진 재료
    const[memberIngredients, setMemberIngredients] = useState<MemberIngredient[]>([]);

    // 최초 실행하여 유저가 가진 재료를 불러오는 메서드
    useEffect(() => {
        // localStorage의 accessToken을 추출
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        // 토큰에 Bearer를 붙여 백엔드에 최초 요청을 보냄
        fetch("http://localhost:9999/api/members/me/ingredients", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            console.log(res);
            return res.json();
        })
        .then((data) => {
            setMemberIngredients(data);
            console.log(data);
        });
    }, []);

    return(
        <h1>내가 가진재료 페이지입니다.</h1>
    );
}