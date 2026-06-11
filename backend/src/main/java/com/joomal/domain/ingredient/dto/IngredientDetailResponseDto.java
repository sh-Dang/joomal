package com.joomal.domain.ingredient.dto;

import com.joomal.domain.ingredient.entity.Ingredient;

import java.math.BigDecimal;

public record IngredientDetailResponseDto(
        Long id,
        String korName,
        String engName,
        String imageUrl,
        BigDecimal abv,
        String description
) {
    public static IngredientDetailResponseDto from(Ingredient ingredient) {
        return new IngredientDetailResponseDto(
                ingredient.getId(),
                ingredient.getKorName(),
                ingredient.getEngName(),
                ingredient.getImageUrl(),
                ingredient.getAbv(),
                ingredient.getDescription()
        );
    }
}