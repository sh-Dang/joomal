package com.joomal.domain.ingredient.enumtype;

public enum Category {
    RUM("럼"),
    HERB("허브"),
    FRUIT("과일"),
    SWEETENER("감미료"),
    MIXER("음료");

    private final String description;

    Category(String description) {
        this.description = description;
    }
}
