"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// 주류를 담아둘 인터페이스 객체
interface Liquor {
    id: number;
    type: string;
    category: string;
    subcategory: string;
    korName: string;
    engName: string;
}

export default function Liquors(){
    const [liquors, setLiquors] = useState<Liquor[]>([]);
    useEffect(()=> {
        fetch("http://localhost:9999/api/liquors")
    })
    
    return(
        <h1> 술 페이지 입니다.</h1>
    );
}