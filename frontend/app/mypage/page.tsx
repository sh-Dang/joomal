"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


interface Member{
    nickname: string;
    profileImage: string;
}

interface MemberIngredient {
    id: number;
    ingredientKorName: string;
    ingredientEngName: string;
    imageUrl: string;
}

interface Cocktail {
    id: number;
    korName: string;
    engName: string;
    description: string;
    imageUrl: string;
    abv: number;
    glassType: string;
}

interface Favorite{
    id: number,
    targetId: number,
    engName: string,
    korName: string,
    imageUrl: string,
    favoriteType: FavoriteType;
}

type FavoriteType = "COCKTAIL" |"INGREDIENT" | "LIQUOR" | "ALL";

export default function MyPage(){

    const [member, setMember] = useState<Member | null>(null);
    const [memberIngredients, setMemberIngredients] = useState<MemberIngredient[]>([]);
    const [favorites, setFavorites] = useState<Cocktail[]>([]);
    const router = useRouter();
    
    // 최초 실행하여 유저정보를 불러오는 메서드
    useEffect(() => {
        // localStorage의 accessToken을 추출
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        Promise.all([
            fetch("http://localhost:9999/api/members/me", { headers }),
            fetch("http://localhost:9999/api/members/me/ingredients", { headers }),
            fetch("http://localhost:9999/api/members/me/favorites", { headers }),
        ])
            .then(async ([memberRes, memberIngredientRes, favoriteRes]) => {
                const memberData = await memberRes.json();
                const memberIngredientData = await memberIngredientRes.json();
                const favoriteData = await favoriteRes.json();

                setMember(memberData);

                // 미리보기용 10개
                setMemberIngredients(memberIngredientData.slice(0, 10));
                setFavorites(favoriteData.slice(0, 10));
            })
            .catch(console.error);
    }, []);
    

    return(
        <div className="flex justify-center">
            {member && (
            <div
                className="w-full max-w-3xl rounded-2xl border p-8"
                style={{
                    borderColor: "var(--border)",
                    backgroundColor: "white",
                }}
            >
                <div className="flex flex-1 flex-col gap-4">

                    {/* 이미지 + 닉네임 */}
                    <div className="flex items-start gap-5">

                        <img
                            src={member.profileImage}
                            alt={`${member?.nickname}의 프로필 이미지`}
                            className="h-20 w-20 rounded-full object-cover"
                        />

                        <h1 className="text-2xl font-medium">
                            {member.nickname}님 어서오세요!
                        </h1>
                    </div>

                    {/* 내가 가진 재료 미리보기 */}
                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <h2 className="text-sm font-semibold">내가 가진 재료</h2>
                                <span
                                    className="rounded-full px-2 py-0.5 text-xs"
                                    style={{ backgroundColor: "var(--secondary)", color: "var(--primary)" }}
                                >
                                    {memberIngredients.length}
                                </span>
                            </div>
 
                            <button
                                onClick={() => router.push("/mypage/ingredients")}
                                className="text-sm transition-opacity hover:opacity-70 cursor-pointer"
                                style={{ color: "var(--primary)" }}
                            >
                                전체보기 →
                            </button>
                        </div>
 
                        {/* 가로 스크롤 한 줄 */}
                        <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                            {memberIngredients.map((memberIngredient) => (
                                <div
                                    key={memberIngredient.id}
                                    className="flex flex-shrink-0 flex-col items-center gap-1 rounded-lg border px-2 py-2 transition-opacity hover:opacity-75"
                                    style={{
                                        minWidth: 70,
                                        borderColor: "var(--border)",
                                        backgroundColor: "var(--background)",
                                    }}
                                >
                                    <img
                                        src={memberIngredient.imageUrl}
                                        alt={memberIngredient.ingredientKorName}
                                        className="h-8 w-8 object-contain"
                                    />
                                    
                                    <p
                                        className="w-16 text-center text-xs"
                                        style={{
                                            color: "var(--foreground)",
                                            opacity: 0.7,
                                        }}
                                    >
                                        {memberIngredient.ingredientKorName}
                                    </p>
                                    
                                </div>
                            ))}
                        </div>
                    </div>
 
                    {/* 즐겨찾기 미리보기 */}
                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <h2 className="text-sm font-semibold">즐겨찾기</h2>
                                <span
                                    className="rounded-full px-2 py-0.5 text-xs"
                                    style={{ backgroundColor: "var(--secondary)", color: "var(--primary)" }}
                                >
                                    {favorites.length}
                                </span>
                            </div>
 
                            <button
                                onClick={() => router.push("/mypage/favorites")}
                                className="text-sm transition-opacity hover:opacity-70 cursor-pointer"
                                style={{ color: "var(--primary)" }}
                            >
                                전체보기 →
                            </button>
                        </div>
 
                        {/* 가로 스크롤 한 줄 */}
                        <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                            {favorites.map((cocktail) => (
                                <div
                                    key={cocktail.id}
                                    className="flex flex-shrink-0 flex-col items-center gap-1 rounded-lg border px-2 py-2 transition-opacity hover:opacity-75"
                                    style={{
                                        minWidth: 70,
                                        borderColor: "var(--border)",
                                        backgroundColor: "var(--background)",
                                    }}
                                >
                                    <img
                                        src={cocktail.imageUrl}
                                        alt={cocktail.korName}
                                        className="h-8 w-8 rounded-md object-cover"
                                    />

                                    <p
                                        className="w-16 text-center text-xs"
                                        style={{
                                            color: "var(--foreground)",
                                            opacity: 0.7,
                                        }}
                                    >
                                        {cocktail.korName}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
 
                    {/* 구분선 */}
                    <div style={{ height: "0.5px", backgroundColor: "var(--border)" }} />
 
                    {/* 버튼 */}
                    <div className="flex gap-2">
                        <button
                            className="rounded-xl px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-85"
                            style={{ backgroundColor: "var(--primary)" }}
                        >
                            프로필 수정
                        </button>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}