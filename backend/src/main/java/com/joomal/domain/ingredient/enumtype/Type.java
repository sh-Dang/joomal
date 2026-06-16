package com.joomal.domain.ingredient.enumtype;

import lombok.Getter;

@Getter
public enum Type {
    LIQUOR("주류", "Liquor"),
    INGREDIENT("재료", "Ingredient");

    private final String korDescription;
    private final String engDescription;

    Type(String korDescription, String engDescription) {
        this.korDescription = korDescription;
        this.engDescription = engDescription;
    }
}
