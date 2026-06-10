package com.joomal.domain.ingredient.enumtype;

import lombok.Getter;

@Getter
public enum Category {
    RUM("럼", "Rum"),
    HERB("허브", "Herb"),
    FRUIT("과일", "Fruit"),
    SWEETENER("감미료", "Sweetener"),
    MIXER("재료", "Mixer");

    private final String korDescription;
    private final String engDescription;

    Category(String korDescription, String engDescription) {
        this.korDescription = korDescription;
        this.engDescription = engDescription;
    }
}
