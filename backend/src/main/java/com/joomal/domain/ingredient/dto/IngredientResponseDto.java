package com.joomal.domain.ingredient.dto;

import com.joomal.domain.ingredient.entity.Ingredient;

public record IngredientResponseDto(
        Long id,
        String korName,
        String engName,
        String imageUrl
) {

    public static IngredientResponseDto from(Ingredient ingredient) {
        return new IngredientResponseDto(
                ingredient.getId(),
                ingredient.getKorName(),
                ingredient.getEngName(),
                ingredient.getImageUrl()
        );
    }
}