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

    // 재료삭제 메서드
    const deleteIngredient = async (id: number) => {
        
        const ok = window.confirm("나의 재료에서 삭제하시겠습니까?");
        if(!ok) return;

        const token = localStorage.getItem("accessToken");
        if (!token) return;

        try {
            const response = await fetch(`http://localhost:9999/api/members/me/ingredients/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("삭제 실패");

            setMemberIngredients((prev) =>
                prev.filter((ingredient) => ingredient.ingredientId !== id)
            );
            alert("나의 술장고에서 제거했습니다.");
        } catch (err) {
            console.error(err);
        }
    };

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

    return (
        <div className="mx-auto max-w-7xl px-10 py-10">
            <h1 className="mb-10 text-left text-4xl font-bold">
                나의 술장고
            </h1>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {memberIngredients.map((ingredient) => (
                    <div
                        key={ingredient.ingredientId}
                        className="
                            relative
                            h-56
                            overflow-hidden
                            rounded-xl
                            shadow-md
                        "
                    >
                        {/* 배경 이미지 */}
                        <img
                            src={ingredient.imageUrl}
                            alt={ingredient.ingredientKorName}
                            className="
                                absolute
                                inset-0
                                h-full
                                w-full
                                object-cover
                            "
                        />

                        {/* 오버레이 */}
                        <div className="absolute inset-0 bg-black/10" />

                        {/* 내용 */}
                        <div
                            className="
                                relative
                                z-10
                                flex
                                h-full
                                flex-col
                                justify-between
                                p-4
                            "
                        >
                            {/* 상단: 텍스트 + 삭제 버튼 한 줄로 */}
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <h2 className="text-xl font-bold text-black">
                                        {ingredient.ingredientKorName}
                                    </h2>
                                    <p className="text-sm italic text-gray-600">
                                        {ingredient.ingredientEngName}
                                    </p>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteIngredient(ingredient.ingredientId);
                                    }}
                                    className="
                                        shrink-0
                                        rounded-full
                                        bg-white/90
                                        px-3
                                        py-1
                                        text-xs
                                        font-bold
                                        text-red-500
                                        hover:bg-white
                                        cursor-pointer
                                    "
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}