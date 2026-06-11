package com.joomal.domain.ingredient.dto;

import java.math.BigDecimal;

public record IngredientDetailResponseDto(
        Long id,
        String korName,
        String engName,
        String imageUrl,
        BigDecimal abv,
        String description
) {
}
