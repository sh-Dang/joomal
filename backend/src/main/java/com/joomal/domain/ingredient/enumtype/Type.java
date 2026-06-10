package com.joomal.domain.ingredient.enumtype;

import lombok.Getter;

@Getter
public enum Type {
    LIQUOR("주류", "Liquor"),
    MIXER("재료", "Mixer");

    private final String korDescription;
    private final String engDescription;

    Type(String korDescription, String engDescription) {
        this.korDescription = korDescription;
        this.engDescription = engDescription;
    }
}
