package com.joomal.domain.ingredient.enumtype;

public enum Subcategory {
    WHITE_RUM("화이트 럼"),
    MINT("민트"),
    LIME("라임"),
    SYRUP("시럽"),
    SODA("소다");

    private final String description;
    Subcategory(String description){
        this.description = description;
    }
}
