package com.joomal.domain.ingredient.enumtype;

public enum Type {
    LIQUOR("주류"),
    MIXER("재료");

    private final String description;

    Type(String description) {
        this.description = description;
    }
}
