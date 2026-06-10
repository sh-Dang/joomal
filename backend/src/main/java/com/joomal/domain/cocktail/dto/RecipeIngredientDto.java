package com.joomal.domain.cocktail.dto;

import java.math.BigDecimal;

// Dto로 만들어 객체 전달 시 Unit의 description을 문자열로 빼기위한 Dto
public record RecipeIngredientDto(
        Long id,
        String ingredientKorName,
        String ingredientEngName,
        BigDecimal amount,
        String korUnit,
        String engUnit
) {
}
