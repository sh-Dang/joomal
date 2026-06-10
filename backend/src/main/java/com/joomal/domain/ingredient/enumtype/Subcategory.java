package com.joomal.domain.ingredient.enumtype;

import lombok.Getter;

@Getter
public enum Subcategory {
    WHITE_RUM("화이트 럼", "White Rum"),
    MINT("민트", "Mint"),
    LIME("라임", "Lime"),
    SYRUP("시럽", "Syrup"),
    SODA("소다", "Soda");

    private final String korDescription;
    private final String engDescription;
    Subcategory(String korDescription, String engDescription){
        this.korDescription = korDescription;
        this.engDescription = engDescription;
    }
}
